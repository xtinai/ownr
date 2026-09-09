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
}

export function formatCost(amount) {
  if (amount == null) return null
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
