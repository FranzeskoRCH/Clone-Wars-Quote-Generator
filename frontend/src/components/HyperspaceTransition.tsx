const rays = Array.from({ length: 40 }, (_, index) => {
  const angle = index * 9
  const offset = 8 + (index * 3) % 7
  const length = 50 + (index * 17) % 45
  const width = index % 8 === 0 ? 2 : 1
  const delay = (index % 7) * 0.025

  return {
    angle,
    offset,
    length,
    width,
    delay,
    tone: index % 3,
  }
})

export default function HyperspaceTransition() {
  return <div className="fixed inset-0 z-[1000] animate-hyperspace-fade overflow-hidden bg-black motion-reduce:animate-none" role="status" aria-label="Jumping to the next quote">
    <div className="absolute left-1/2 top-1/2 h-0 w-0 origin-center animate-hyperspace motion-reduce:animate-none" aria-hidden="true">
      {rays.map((ray, index) => <div
        className={`absolute left-0 top-0 origin-top opacity-0 animate-ray-appear motion-reduce:animate-none ${ray.tone === 0 ? 'bg-gradient-to-b from-cyan/5 via-cyan-500/60 to-white shadow-[0_0_5px_rgba(0,191,255,.95)]' : ray.tone === 1 ? 'bg-gradient-to-b from-electric/5 via-electric/60 to-blue-100 shadow-[0_0_5px_rgba(22,141,255,.8)]' : 'bg-gradient-to-b from-cyan/5 via-cyan-300/50 to-white shadow-[0_0_4px_rgba(124,229,255,.9)]'}`}
        key={index}
        style={{
          width: `${ray.width}px`,
          height: `${ray.length}vmax`,
          transform: `rotate(${ray.angle}deg) translateY(${ray.offset}px)`,
          animationDelay: `${ray.delay}s`,
        }}
      />)}
    </div>
    <div className="absolute left-1/2 top-1/2 z-10 size-[clamp(18px,3vmin,34px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_0_14px_5px_rgba(0,0,0,.98),0_0_24px_2px_rgba(0,42,110,.22)]" aria-hidden="true"/>
  </div>
}
