export default function StarryBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Reduced from 3 to 2 layers for better performance */}
      <div className="star-layer stars1"></div>
      <div className="star-layer stars2"></div>
    </div>
  );
}
