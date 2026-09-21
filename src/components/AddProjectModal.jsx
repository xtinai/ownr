import { useEffect, useRef, useState } from 'react'
import './AddProjectModal.css'
import { STATUS, CATEGORY_ICONS } from '../lib/projectMeta'

const CATEGORIES = Object.keys(CATEGORY_ICONS)
const STATUS_OPTIONS = Object.entries(STATUS).filter(([key]) => key !== 'completed')

function AddProjectModal({ property, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [status, setStatus] = useState('idea')
  const [contractor, setContractor] = useState('')
  const [budget, setBudget] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [nextAction, setNextAction] = useState('')
  const openerRef = useRef(document.activeElement)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      openerRef.current?.focus?.()
    }
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      category,
      status,
      contractor: contractor.trim() || null,
      budget_estimated: budget ? Number(budget) : null,
      target_date: targetDate || null,
      next_action: nextAction.trim() || null,
    })
  }

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="add-project-title">Add a project</h2>
            <p className="modal-subtitle">Adding to {property.name}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Backyard Lighting"
              autoFocus
              required
            />
          </label>

          <div className="modal-form-row">
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUS_OPTIONS.map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal-form-row">
            <label>
              Contractor
              <input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                placeholder="Optional"
              />
            </label>

            <label>
              Estimated budget
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Optional"
              />
            </label>
          </div>

          <label>
            Target date
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </label>

          <label>
            Next action
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="Optional — what's the next step?"
            />
          </label>

          <div className="modal-footer">
            <button type="button" className="modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={!title.trim()}>
              Add project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProjectModal
