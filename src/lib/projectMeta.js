export const STATUS = {
  idea: { label: 'Idea' },
  planning: { label: 'Researching' },
  quoting: { label: 'Getting Quotes' },
  scheduled: { label: 'Scheduled' },
  in_progress: { label: 'In Progress' },
  completed: { label: 'Completed' },
}

export const CATEGORY_ICONS = {
  Exterior: '🧱',
  Systems: '⚡',
  Interior: '🛋️',
  Maintenance: '🔧',
  Detailing: '✨',
  Upgrades: '🔩',
}

export function formatDate(dateStr, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', options)
}

export function formatCost(amount) {
  if (amount == null) return null
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
