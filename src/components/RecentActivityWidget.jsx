import './HomeRail.css'
import { STATUS, formatDate } from '../lib/projectMeta'

function RecentActivityWidget({ projects }) {
  const recent = [...projects]
    .filter((p) => p.logged_date)
    .sort((a, b) => (a.logged_date < b.logged_date ? 1 : -1))
    .slice(0, 4)

  return recent.length > 0 ? (
    <div className="rail-list">
      {recent.map((project) => (
        <div className="rail-list-row" key={project.id}>
          <span className="rail-list-main">
            {project.title} <span className="rail-list-status">· {STATUS[project.status].label}</span>
          </span>
          <span className="rail-list-date">
            {formatDate(project.logged_date, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p className="empty-note">Nothing logged yet.</p>
  )
}

export default RecentActivityWidget
