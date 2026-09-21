import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ProjectsView from './components/ProjectsView'
import IdeasView from './components/IdeasView'
import PeopleView from './components/PeopleView'
import MoneyView from './components/MoneyView'
import HistoryView from './components/HistoryView'
import ChecklistPreview from './components/ChecklistPreview'
import ProjectDetailView from './components/ProjectDetailView'
import SideWidget from './components/SideWidget'
import AddProjectModal from './components/AddProjectModal'
import { properties, mockProjects } from './data/mockProjects'
import { STATUS, formatCost, getGreeting } from './lib/projectMeta'

const ACTIVE_STATUSES = ['quoting', 'scheduled', 'in_progress']
const PLANNED_STATUSES = ['idea', 'planning']
const USER_NAME = 'Christina'

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{STATUS[status].label}</span>
}

function ProjectCard({ project, onToggleItem, onOpenProject }) {
  return (
    <div className="project-card">
      <div className="project-card-top">
        <StatusBadge status={project.status} />
        <span className="project-category">{project.category}</span>
      </div>
      <h3>{project.title}</h3>
      <div className="project-meta">
        {project.contractor && <span>{project.contractor}</span>}
        {project.budget_estimated && <span>{formatCost(project.budget_estimated)}</span>}
        {project.completed_date && <span>{project.completed_date}</span>}
      </div>
      {project.next_action && <p className="project-next-action">{project.next_action}</p>}
      {project.checklist && project.checklist.length > 0 && (
        <ChecklistPreview
          checklist={project.checklist}
          onToggle={(itemId) => onToggleItem(project.id, itemId)}
          onExpand={() => onOpenProject(project.id)}
        />
      )}
    </div>
  )
}

function HomeView({ property, projects, onToggleChecklistItem, onOpenProject }) {
  const [showPlanned, setShowPlanned] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [greeting, setGreeting] = useState(getGreeting())
  const completed = projects.filter((p) => p.status === 'completed')
  const active = projects.filter((p) => ACTIVE_STATUSES.includes(p.status))
  const planned = projects.filter((p) => PLANNED_STATUSES.includes(p.status))

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting((current) => {
        const next = getGreeting()
        return next === current ? current : next
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>{greeting}, {USER_NAME}.</h1>
          <p className="tagline">Here’s what’s happening with your {property.type}.</p>
        </div>
      </header>

      <section className="overview-grid">
        <div className="overview-card">
          <span className="overview-label">{property.name}</span>
          <p className="overview-sub">{property.address || property.type}</p>
          <div className="overview-counts">
            <div>
              <strong>{completed.length}</strong>
              <span>completed</span>
            </div>
            <div>
              <strong>{active.length}</strong>
              <span>active</span>
            </div>
            <div>
              <strong>{planned.length}</strong>
              <span>planned</span>
            </div>
          </div>
        </div>
        <SideWidget property={property} projects={projects} />
      </section>

      <section>
        <h2>Current projects</h2>
        <div className="project-grid">
          {active.length > 0 ? (
            active.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleItem={onToggleChecklistItem}
                onOpenProject={onOpenProject}
              />
            ))
          ) : (
            <p className="empty-note">Nothing active right now.</p>
          )}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Planned</h2>
          <button className="toggle-btn" onClick={() => setShowPlanned((s) => !s)}>
            {showPlanned ? 'Hide' : `Show (${planned.length})`}
          </button>
        </div>
        {showPlanned && (
          <div className="project-grid">
            {planned.length > 0 ? (
              planned.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onToggleItem={onToggleChecklistItem}
                  onOpenProject={onOpenProject}
                />
              ))
            ) : (
              <p className="empty-note">Nothing planned yet.</p>
            )}
          </div>
        )}
      </section>

      <section>
        <div className="section-header">
          <h2>Completed</h2>
          <button className="toggle-btn" onClick={() => setShowCompleted((s) => !s)}>
            {showCompleted ? 'Hide' : `Show (${completed.length})`}
          </button>
        </div>
        {showCompleted && (
          <div className="project-grid">
            {completed.length > 0 ? (
              completed.map((project) => (
                <div className="mini-card" key={project.id}>
                  <h3>{project.title}</h3>
                  <span>{project.completed_date}</span>
                </div>
              ))
            ) : (
              <p className="empty-note">Nothing completed yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function ComingSoonView({ label }) {
  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>{label}</h1>
          <p className="tagline">This section is coming soon.</p>
        </div>
      </header>
    </div>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0].id)
  const [allProjects, setAllProjects] = useState(mockProjects)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [showAddProject, setShowAddProject] = useState(false)

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId)
  const propertyProjects = allProjects.filter((p) => p.property_id === selectedPropertyId)
  const selectedProject = allProjects.find((p) => p.id === selectedProjectId)

  function updateChecklist(projectId, updater) {
    setAllProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, checklist: updater(p.checklist || []) } : p)),
    )
  }

  function handleToggleChecklistItem(projectId, itemId) {
    updateChecklist(projectId, (list) =>
      list.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)),
    )
  }

  function handleAddChecklistItem(projectId, text) {
    updateChecklist(projectId, (list) => [
      ...list,
      { id: `${projectId}-${Date.now()}`, text, done: false },
    ])
  }

  function handleRemoveChecklistItem(projectId, itemId) {
    updateChecklist(projectId, (list) => list.filter((item) => item.id !== itemId))
  }

  function handleMoveChecklistItem(projectId, itemId, direction) {
    updateChecklist(projectId, (list) => {
      const index = list.findIndex((item) => item.id === itemId)
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= list.length) return list
      const copy = [...list]
      ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
      return copy
    })
  }

  function handleAddProject(fields) {
    setAllProjects((prev) => {
      const newId = Math.max(0, ...prev.map((p) => p.id)) + 1
      const newProject = {
        id: newId,
        property_id: selectedPropertyId,
        budget_actual: null,
        completed_date: null,
        logged_date: new Date().toLocaleDateString('sv-SE'),
        checklist: [],
        ...fields,
      }
      return [...prev, newProject]
    })
    setShowAddProject(false)
  }

  function handleNavChange(nav) {
    setSelectedProjectId(null)
    setActiveNav(nav)
  }

  function handleSelectProperty(propertyId) {
    setSelectedProjectId(null)
    setSelectedPropertyId(propertyId)
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={handleSelectProperty}
      />
      <main className="app-main">
        {selectedProject ? (
          <ProjectDetailView
            project={selectedProject}
            onBack={() => setSelectedProjectId(null)}
            onToggleItem={handleToggleChecklistItem}
            onAddItem={handleAddChecklistItem}
            onRemoveItem={handleRemoveChecklistItem}
            onMoveItem={handleMoveChecklistItem}
          />
        ) : (
          <>
            {activeNav === 'home' && (
              <HomeView
                property={selectedProperty}
                projects={propertyProjects}
                onToggleChecklistItem={handleToggleChecklistItem}
                onOpenProject={setSelectedProjectId}
              />
            )}
            {activeNav === 'projects' && (
              <ProjectsView
                property={selectedProperty}
                projects={propertyProjects}
                onAddProject={() => setShowAddProject(true)}
              />
            )}
            {activeNav === 'ideas' && (
              <IdeasView
                property={selectedProperty}
                projects={propertyProjects}
                onAddProject={() => setShowAddProject(true)}
              />
            )}
            {activeNav === 'people' && (
              <PeopleView
                property={selectedProperty}
                projects={propertyProjects}
                onAddProject={() => setShowAddProject(true)}
              />
            )}
            {activeNav === 'money' && (
              <MoneyView
                property={selectedProperty}
                projects={propertyProjects}
                onAddProject={() => setShowAddProject(true)}
              />
            )}
            {activeNav === 'history' && (
              <HistoryView
                property={selectedProperty}
                projects={propertyProjects}
                onAddProject={() => setShowAddProject(true)}
              />
            )}
            {!['home', 'projects', 'ideas', 'people', 'money', 'history'].includes(activeNav) && (
              <ComingSoonView label={activeNav[0].toUpperCase() + activeNav.slice(1)} />
            )}
          </>
        )}
      </main>

      {showAddProject && (
        <AddProjectModal
          property={selectedProperty}
          onClose={() => setShowAddProject(false)}
          onSubmit={handleAddProject}
        />
      )}
    </div>
  )
}

export default App
