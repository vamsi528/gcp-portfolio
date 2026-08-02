export default function Background() {
  return (
    <>
      <div className="cosmic-bg">
        <div className="cosmic-orb" />
        <div className="cosmic-orb" />
        <div className="cosmic-orb" />
      </div>
      <div className="grid-overlay" />
      <div className="floating-particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              opacity: 0.15 + Math.random() * 0.35,
            }}
          />
        ))}
      </div>
    </>
  );
}
