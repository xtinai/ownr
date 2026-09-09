import ProjectListCard from './ProjectListCard'

const PLANNED_STATUSES = ['idea', 'planning']

function IdeasView({ projects }) {
  const ideas = projects.filter((p) => PLANNED_STATUSES.includes(p.status))

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <span className="eyebrow">Someday / Next</span>
          <h1>Ideas worth remembering.</h1>
          <p className="tagline">Capture the thought now. Figure out the details when you're ready.</p>
        </div>
        <div className="plist-header-actions">
          <button className="icon-btn" aria-label="Search">
            🔍
          </button>
          <button className="primary-btn">+ Add project</button>
        </div>
      </header>

      <div className="project-grid">
        {ideas.length > 0 ? (
          ideas.map((project) => <ProjectListCard key={project.id} project={project} />)
        ) : (
          <p className="empty-note">No ideas on the list yet.</p>
        )}
      </div>
    </div>
  )
}

export default IdeasView
