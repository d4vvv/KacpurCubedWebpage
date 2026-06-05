interface IconProps {
  name: string
  size?: number
  stroke?: number
}

export default function Icon({ name, size = 20, stroke = 2 }: IconProps) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    style: { flex: 'none' as const },
  }
  const paths: Record<string, React.ReactNode> = {
    arrow:     <path d="M5 12h14M13 6l6 6-6 6" />,
    instagram: <g><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></g>,
    tiktok:    <path d="M14 4c.3 2.2 1.9 4 4.2 4.3v2.6c-1.5.1-2.9-.4-4.2-1.2v5.5a4.9 4.9 0 1 1-4.9-4.9c.3 0 .6 0 .9.1v2.7a2.3 2.3 0 1 0 1.6 2.1V4H14z" fill="currentColor" stroke="none" />,
    mail:      <g><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></g>,
    close:     <path d="M6 6l12 12M18 6L6 18" />,
    check:     <path d="M4 12l5 5L20 6" />,
    cube:      <g><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" /><path d="M12 20v-9M12 11l8-4.5M12 11L4 6.5" /></g>,
    chevL:     <path d="M15 6l-6 6 6 6" />,
    chevR:     <path d="M9 6l6 6-6 6" />,
    spark:     <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />,
    menu:      <path d="M4 7h16M4 12h16M4 17h16" />,
  }
  return <svg {...common}>{paths[name]}</svg>
}

export function Cube3D({ size = 22 }: { size?: number }) {
  return (
    <span className="cube3d" style={{ width: size, height: size, display: 'inline-block' }}>
      <Icon name="cube" size={size} stroke={1.6} />
    </span>
  )
}
