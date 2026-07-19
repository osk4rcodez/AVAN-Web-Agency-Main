export default function Logo({ className = '', showWord = true, size = 36 }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/avan-logo-mark.png"
        alt="AVAN Web Agency"
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      {showWord && (
        <img
          src="/avan-wordmark.png"
          alt="AVAN"
          className="shrink-0 object-contain"
          style={{ height: size * 0.6 }}
        />
      )}
    </span>
  )
}
