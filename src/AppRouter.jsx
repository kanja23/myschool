// src/components/ui/ComingSoon.jsx
export default function ComingSoon({ label, phase = '2' }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
      <div className="w-14 h-14 rounded-full bg-surface-200 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">Coming in Phase {phase}</p>
      </div>
    </div>
  )
}
