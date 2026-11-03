'use client'

import React, { useEffect, useRef } from 'react'

import type { Phase } from './simulator'

// Where each phase sits on the ring, in radians (top is task, then clockwise).
const ANGLES: Record<Phase, number> = {
  task: Math.PI / 2,
  idle: Math.PI / 2,
  microtask: -Math.PI / 6,
  render: (-5 * Math.PI) / 6,
}

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// One full-screen quad; the ring, phase markers and the moving dot are all
// distance fields, so they stay crisp at any size.
const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uAngle;
uniform vec3 uBg;
uniform vec3 uLine;
uniform vec3 uInk;
uniform vec3 uAccent;

const float TAU = 6.2831853;
const float R = 0.36;

float marker(vec2 p, float a) {
  return smoothstep(0.018, 0.013, length(p - R * vec2(cos(a), sin(a))));
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float r = length(p);
  float a = atan(p.y, p.x);
  float onRing = smoothstep(0.012, 0.006, abs(r - R));

  vec3 col = mix(uBg, uLine, onRing);
  float m = marker(p, 1.5707963) + marker(p, -0.5235988) + marker(p, -2.6179939);
  col = mix(col, uInk, clamp(m, 0.0, 1.0) * 0.55);

  // A soft trail behind the dot, which moves clockwise.
  float behind = mod(a - uAngle + TAU, TAU);
  col = mix(col, uAccent, smoothstep(1.1, 0.0, behind) * onRing * 0.85);

  vec2 dot = R * vec2(cos(uAngle), sin(uAngle));
  float d = length(p - dot);
  col += uAccent * (exp(-d * d * 900.0) * 0.6 + exp(-d * d * 90.0) * 0.18);
  col = mix(col, uAccent, smoothstep(0.024, 0.019, d));

  gl_FragColor = vec4(col, 1.0);
}
`

function toRgb(value: string): [number, number, number] {
  const hex = value.trim().replace('#', '')
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function LoopRing({ phase }: { phase: Phase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef(phase)
  const kickRef = useRef<() => void>(() => {})

  useEffect(() => {
    phaseRef.current = phase
    kickRef.current()
  }, [phase])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: true, alpha: false })
    if (!canvas || !gl) return

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let angle = ANGLES[phaseRef.current]
    let target = angle
    let frame = 0

    const setColors = () => {
      const css = getComputedStyle(document.documentElement)
      gl.uniform3fv(u('uBg'), toRgb(css.getPropertyValue('--surface')))
      gl.uniform3fv(u('uLine'), toRgb(css.getPropertyValue('--line-strong')))
      gl.uniform3fv(u('uInk'), toRgb(css.getPropertyValue('--fg')))
      gl.uniform3fv(u('uAccent'), toRgb(css.getPropertyValue('--accent')))
    }

    const draw = () => {
      gl.uniform1f(u('uAngle'), angle)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const resize = () => {
      const size = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(size.width * dpr)
      canvas.height = Math.round(size.height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u('uRes'), canvas.width, canvas.height)
      draw()
    }

    // Draws only while the dot is moving, then stops: no idle GPU work.
    const tick = () => {
      angle += (target - angle) * 0.12
      if (Math.abs(target - angle) < 0.002) angle = target
      draw()
      frame = angle === target ? 0 : requestAnimationFrame(tick)
    }

    kickRef.current = () => {
      let next = ANGLES[phaseRef.current]
      // Always travel clockwise (decreasing angle) to the next phase.
      while (next > angle + 1e-6) next -= Math.PI * 2
      if (angle - next > Math.PI * 2 - 1e-6) next += Math.PI * 2
      target = next
      if (reduceMotion.matches) {
        angle = target
        draw()
      } else if (!frame) {
        frame = requestAnimationFrame(tick)
      }
    }

    const recolor = () => {
      setColors()
      draw()
    }
    const themeObserver = new MutationObserver(recolor)
    themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] })
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', recolor)
    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)

    setColors()
    resize()

    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      sizeObserver.disconnect()
      scheme.removeEventListener('change', recolor)
      kickRef.current = () => {}
    }
  }, [])

  return (
    <canvas
      aria-hidden="true"
      className="absolute inset-0 size-full rounded-2xl"
      data-testid="loop-ring"
      ref={canvasRef}
    />
  )
}
