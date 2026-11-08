// Shared class strings, so every page keeps the same grid and labels.
// One reading width for the whole site (1184px, like the best calm portfolios);
// the lab needs a little more room.
export const container = 'mx-auto w-full max-w-[1184px] px-6 sm:px-8'
export const containerWide = 'mx-auto w-full max-w-[1280px] px-6 sm:px-8'
export const label = 'text-sm font-light text-muted'
/** Ledger proportions: a wide label column beside the reading column. */
export const ledgerCols = 'sm:grid-cols-[18rem_minmax(0,1fr)]'
/** Outlined button: hairline border, 44px tall, highlight on hover. Wrap the label in `buttonLabel`. */
export const outlineButton =
  'inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line-strong px-5 text-[15px] *:translate-y-[0.5px] transition-colors hover:border-highlight hover:text-highlight'
/** Trims the label to cap height so the letters centre exactly (see .button-label). */
export const buttonLabel = 'button-label'
