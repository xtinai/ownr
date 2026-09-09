import { STATUS, CATEGORY_ICONS, formatCost } from '../lib/projectMeta'

function ProjectListCard({ project }) {
  const budget = formatCost(project.budget_actual ?? project.budget_estimated)
  const isCompleted = project.status === 'completed'

  return (
    <div className="plist-card">
      <div className="plist-card-top">
        <span className="plist-icon">{CATEGORY_ICONS[project.category] || '📦'}</span>
        <span className={`badge badge-${project.status}`}>{STATUS[project.status].label}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="plist-subtitle">
        {project.category}
        {project.contractor ? ` · ${project.contractor}` : ''}
      </p>
      <div className="plist-footer">
        <div>
          <span className="plist-label">Budget</span>
          <strong>{budget || '—'}</strong>
        </div>
        <div className="plist-footer-right">
          <span className="plist-label">{isCompleted ? 'Completed' : 'Contractor'}</span>
          <strong>{isCompleted ? project.completed_date : project.contractor || '—'}</strong>
        </div>
      </div>
    </div>
  )
}

export default ProjectListCard
