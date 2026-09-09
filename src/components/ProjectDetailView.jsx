import { useState } from 'react'
import './Checklist.css'
import { STATUS, formatCost } from '../lib/projectMeta'

function ProjectDetailView({ project, onBack, onToggleItem, onAddItem, onRemoveItem, onMoveItem }) {
  const [newTask, setNewTask] = useState('')
  const checklist = project.checklist || []

  function handleAdd(e) {
    e.preventDefault()
    if (!newTask.trim()) return
    onAddItem(project.id, newTask.trim())
    setNewTask('')
  }

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <button className="back-link" onClick={onBack}>
            ← Back
          </button>
          <h1>{project.title}</h1>
          <p className="tagline">
            <span className={`badge badge-${project.status}`}>{STATUS[project.status].label}</span>
            {' '}
            {project.category}
            {project.contractor ? ` · ${project.contractor}` : ''}
            {project.budget_estimated ? ` · ${formatCost(project.budget_estimated)}` : ''}
          </p>
        </div>
      </header>

      <section>
        <h2>Checklist</h2>
        <div className="checklist-full">
          {checklist.length > 0 ? (
            checklist.map((item, i) => (
              <div className="checklist-full-row" key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onToggleItem(project.id, item.id)}
                  />
                  <span className={item.done ? 'checklist-done' : ''}>{item.text}</span>
                </label>
                <div className="checklist-controls">
                  <button
                    disabled={i === 0}
                    onClick={() => onMoveItem(project.id, item.id, -1)}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    disabled={i === checklist.length - 1}
                    onClick={() => onMoveItem(project.id, item.id, 1)}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button onClick={() => onRemoveItem(project.id, item.id)} aria-label="Remove task">
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-note">No tasks yet.</p>
          )}

          <form className="checklist-add-form" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Add a task…"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetailView
