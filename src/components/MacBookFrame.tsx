import React from 'react'

/** A front-facing MacBook Pro frame that follows the content column's edges. */
export function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="macbook-frame">
      <div className="macbook-display">
        <span aria-hidden="true" className="macbook-camera" />
        <div className="macbook-screen">{children}</div>
      </div>
      <div aria-hidden="true" className="macbook-base">
        <span className="macbook-notch" />
      </div>
    </div>
  )
}
