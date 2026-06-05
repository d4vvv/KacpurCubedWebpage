import { ElementType } from 'react'

interface GlitchTextProps {
  children: string
  className?: string
  as?: ElementType
}

export default function GlitchText({ children, className = '', as: Tag = 'span' }: GlitchTextProps) {
  return (
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
