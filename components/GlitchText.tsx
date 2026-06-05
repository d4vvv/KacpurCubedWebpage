interface GlitchTextProps {
  children: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function GlitchText({ children, className = '', as: Tag = 'span' }: GlitchTextProps) {
  return (
    // @ts-expect-error dynamic tag
    <Tag className={`glitch ${className}`} data-text={children}>
      {children}
    </Tag>
  )
}

export function Brackets() {
  return (
    <>
      <span className="brk brk-tl" /><span className="brk brk-tr" />
      <span className="brk brk-bl" /><span className="brk brk-br" />
    </>
  )
}
