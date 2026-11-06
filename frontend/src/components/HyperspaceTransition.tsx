import type { CSSProperties } from 'react'

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
  return <div className="hyperspace-transition" role="status" aria-label="Jumping to the next quote">
    <div className="hyperspace-rays" aria-hidden="true">
      {rays.map((ray, index) => <div
        className={`hyperspace-ray hyperspace-ray-tone-${ray.tone}`}
        key={index}
        style={{
          '--ray-angle': `${ray.angle}deg`,
          '--ray-offset': `${ray.offset}px`,
          '--ray-length': `${ray.length}vmax`,
          '--ray-width': `${ray.width}px`,
          '--ray-delay': `${ray.delay}s`,
        } as CSSProperties}
      />)}
    </div>
    <div className="hyperspace-vortex-core" aria-hidden="true"/>
  </div>
}
