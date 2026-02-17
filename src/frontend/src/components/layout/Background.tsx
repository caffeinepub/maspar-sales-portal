export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src="/assets/generated/maspar-glass-bg.dim_1920x1080.png"
        alt=""
        className="w-full h-full object-cover opacity-30 no-drag no-select"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
    </div>
  );
}
