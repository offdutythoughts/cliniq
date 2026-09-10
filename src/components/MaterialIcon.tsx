'use client'
// ── Material Symbols ─────────────────────────────────────────────────────────
// Inlined path data from Google's Material Symbols (Outlined, weight 400), the
// same glyphs Google Docs uses for its formatting toolbar. Apache License 2.0 —
// https://github.com/google/material-design-icons
//
// Inlined rather than loaded as an icon font: the app is offline-capable (notes
// sync from localStorage when the network is gone), and a webfont that fails to
// load leaves a toolbar of ligature text ("format_bold") behind. These paths
// ship in the bundle and take `currentColor`, so they follow the theme.
//
// All glyphs use Material's 24px viewBox: `0 -960 960 960`.

export const MI = {
  format_bold: 'M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z',
  format_italic: 'M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z',
  format_underlined: 'M200-120v-80h560v80H200Zm123-223q-56-63-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63q-101 0-157-63Z',
  format_strikethrough: 'M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z',
  format_size: 'M560-160v-520H360v-120h520v120H680v520H560Zm-360 0v-320H80v-120h360v120H320v320H200Z',
  font_download: 'M256-240h84l44-122h192l44 122h84L522-720h-84L256-240Zm152-192 70-198h4l70 198H408ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0-640v640-640Z',
  format_color_text: 'M80 0v-160h800V0H80Zm140-280 210-560h100l210 560h-96l-50-144H368l-52 144h-96Zm176-224h168l-82-232h-4l-82 232Z',
  format_ink_highlighter: 'M80 0v-160h800V0H80Zm504-480L480-584 320-424l103 104 161-160Zm-47-160 103 103 160-159-104-104-159 160Zm-84-29 216 216-189 190q-24 24-56.5 24T367-263l-27 23H140l126-125q-24-24-25-57.5t23-57.5l189-189Zm0 0 187-187q24-24 56.5-24t56.5 24l104 103q24 24 24 56.5T857-640L669-453 453-669Z',
  format_list_bulleted: 'M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm-56.5-263.5Q120-687 120-720t23.5-56.5Q167-800 200-800t56.5 23.5Q280-753 280-720t-23.5 56.5Q233-640 200-640t-56.5-23.5Z',
  format_list_numbered: 'M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z',
  format_clear: 'm528-546-93-93-121-121h486v120H568l-40 94ZM792-56 460-388l-80 188H249l119-280L56-792l56-56 736 736-56 56Z',
} as const

export type MaterialIconName = keyof typeof MI

/** The colour bar along the bottom of `format_color_text` and
 *  `format_ink_highlighter` — an exact copy of that sub-path, drawn over the
 *  glyph so the swatch shows the colour the button will apply. */
export const MI_COLOUR_BAR = 'M80 0v-160h800V0H80Z'

export function MaterialIcon({
  name, size = 16, className, children,
}: {
  name: MaterialIconName
  size?: number
  className?: string
  /** Extra sub-paths drawn on top (the colour bar). */
  children?: React.ReactNode
}) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={MI[name]} />
      {children}
    </svg>
  )
}
