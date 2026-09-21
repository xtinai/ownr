import './HistoryView.css'
import { STATUS, formatCost, formatDate } from '../lib/projectMeta'

function HistoryView({ property, projects, onAddProject }) {
  const entries = [...projects]
    .filter((p) => p.logged_date)
    .sort((a, b) => (a.logged_date < b.logged_date ? 1 : -1))

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <span className="eyebrow">History</span>
          <h1>Your {property.type} story.</h1>
          <p className="tagline">A chronological record of what changed, when, and who was involved.</p>
        </div>
        <div className="plist-header-actions">
          <button className="icon-btn" aria-label="Search">
            🔍
          </button>
          <button className="primary-btn" onClick={onAddProject}>+ Add project</button>
        </div>
      </header>

      <div className="timeline">
        {entries.length > 0 ? (
          entries.map((project) => {
            const amount = project.budget_actual ?? project.budget_estimated
            return (
              <div className="timeline-entry" key={project.id}>
                <span className="timeline-dot" />
                <span className="timeline-date">{formatDate(project.logged_date).toUpperCase()}</span>
                <p className="timeline-title">
                  {project.title} · {STATUS[project.status].label}
                </p>
                <p className="timeline-sub">
                  {project.category}
                  {project.contractor ? ` · ${project.contractor}` : ''}
                  {amount ? ` · ${formatCost(amount)} tracked` : ''}
                </p>
              </div>
            )
          })
        ) : (
          <p className="empty-note">Nothing logged yet.</p>
        )}
      </div>
    </div>
  )
}

export default HistoryView
