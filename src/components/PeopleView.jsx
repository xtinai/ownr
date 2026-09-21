import './PeopleView.css'
import { STATUS } from '../lib/projectMeta'

function buildContractors(projects) {
  const byName = new Map()
  for (const project of projects) {
    if (!project.contractor) continue
    if (!byName.has(project.contractor)) byName.set(project.contractor, [])
    byName.get(project.contractor).push(project)
  }
  return Array.from(byName.entries()).map(([name, projects]) => ({ name, projects }))
}

function PersonCard({ name, projects }) {
  return (
    <div className="plist-card person-card">
      <span className="person-avatar">{name.charAt(0)}</span>
      <h3>{name}</h3>
      <p className="plist-subtitle">
        {projects.length} project{projects.length === 1 ? '' : 's'} on record
      </p>
      <div className="person-project-list">
        {projects.map((project) => (
          <p key={project.id}>
            {project.title} · {STATUS[project.status].label}
          </p>
        ))}
      </div>
    </div>
  )
}

function PeopleView({ property, projects, onAddProject }) {
  const contractors = buildContractors(projects)

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <span className="eyebrow">People</span>
          <h1>Who has worked on your {property.type}?</h1>
          <p className="tagline">Keep contractor history attached to the work they actually performed.</p>
        </div>
        <div className="plist-header-actions">
          <button className="icon-btn" aria-label="Search">
            🔍
          </button>
          <button className="primary-btn" onClick={onAddProject}>+ Add project</button>
        </div>
      </header>

      <div className="project-grid">
        {contractors.length > 0 ? (
          contractors.map((c) => <PersonCard key={c.name} name={c.name} projects={c.projects} />)
        ) : (
          <p className="empty-note">No contractors on record yet.</p>
        )}
      </div>
    </div>
  )
}

export default PeopleView
