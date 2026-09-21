import './MoneyView.css'
import { formatCost } from '../lib/projectMeta'

const TYPE_ICON = { home: '🏠', vehicle: '🚗' }

function buildByCategory(projects) {
  const totals = new Map()
  for (const project of projects) {
    const amount = project.budget_actual ?? project.budget_estimated ?? 0
    if (amount === 0) continue
    totals.set(project.category, (totals.get(project.category) || 0) + amount)
  }
  return Array.from(totals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

function MoneyView({ property, projects, onAddProject }) {
  const completed = projects.filter((p) => p.status === 'completed')
  const completedTotal = completed.reduce((total, p) => total + (p.budget_actual || 0), 0)
  const plannedActiveTotal = projects
    .filter((p) => p.status !== 'completed')
    .reduce((total, p) => total + (p.budget_actual ?? p.budget_estimated ?? 0), 0)
  const byCategory = buildByCategory(projects)

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <span className="eyebrow">Money</span>
          <h1>What have you invested in your {property.type}?</h1>
          <p className="tagline">See completed spending separately from what you're considering next.</p>
        </div>
        <div className="plist-header-actions">
          <button className="icon-btn" aria-label="Search">
            🔍
          </button>
          <button className="primary-btn" onClick={onAddProject}>+ Add project</button>
        </div>
      </header>

      <section className="overview-grid">
        <div className="overview-card money-hero-card">
          <span className="overview-label">Completed Investment</span>
          <p className="overview-amount">{formatCost(completedTotal)}</p>
          <p className="overview-sub">
            Across {completed.length} completed project{completed.length === 1 ? '' : 's'}.
          </p>
          <span className="money-icon">{TYPE_ICON[property.type] || '📦'}</span>
        </div>
        <div className="overview-card overview-card-dark">
          <span className="overview-label">Planned / Active</span>
          <p className="overview-amount">{formatCost(plannedActiveTotal)}</p>
          <p className="overview-sub">Current tracked budgets, not final costs.</p>
        </div>
      </section>

      <section>
        <h2>By category</h2>
        <p className="section-subtitle">Where the money is going.</p>
        <div className="money-category-grid">
          {byCategory.length > 0 ? (
            byCategory.map((c) => (
              <div key={c.category} className="plist-stat-card">
                <strong>{formatCost(c.amount)}</strong>
                <span>{c.category}</span>
              </div>
            ))
          ) : (
            <p className="empty-note">No tracked spending yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default MoneyView
