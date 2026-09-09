import { useState } from 'react'
import './ProjectsView.css'
import { STATUS, formatCost } from '../lib/projectMeta'
import ProjectListCard from './ProjectListCard'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'idea', label: STATUS.idea.label },
  { key: 'planning', label: STATUS.planning.label },
  { key: 'quoting', label: STATUS.quoting.label },
  { key: 'scheduled', label: STATUS.scheduled.label },
  { key: 'in_progress', label: STATUS.in_progress.label },
  { key: 'completed', label: STATUS.completed.label },
]

function ProjectsView({ property, projects }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.status === filter)
  const completedCount = projects.filter((p) => p.status === 'completed').length
  const inProgressCount = projects.filter((p) => p.status === 'in_progress').length
  const totalBudget = projects.reduce(
    (total, p) => total + (p.budget_actual ?? p.budget_estimated ?? 0),
    0,
  )

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <span className="eyebrow">Projects</span>
          <h1>Every project, in one place.</h1>
          <p className="tagline">Past work, current work, and what you want to do next.</p>
        </div>
        <div className="plist-header-actions">
          <button className="icon-btn" aria-label="Search">
            🔍
          </button>
          <button className="primary-btn">+ Add project</button>
        </div>
      </header>

      <section className="plist-stats">
        <div className="plist-stat-card">
          <strong>{projects.length}</strong>
          <span>Total projects</span>
        </div>
        <div className="plist-stat-card">
          <strong>{completedCount}</strong>
          <span>Completed</span>
        </div>
        <div className="plist-stat-card">
          <strong>{inProgressCount}</strong>
          <span>In progress</span>
        </div>
        <div className="plist-stat-card">
          <strong>{formatCost(totalBudget)}</strong>
          <span>Total tracked budget</span>
        </div>
      </section>

      <div className="plist-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-pill ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.length > 0 ? (
          filtered.map((project) => <ProjectListCard key={project.id} project={project} />)
        ) : (
          <p className="empty-note">No projects match this filter yet.</p>
        )}
      </div>
    </div>
  )
}

export default ProjectsView
