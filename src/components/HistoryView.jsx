import { useEffect, useRef, useState } from 'react'
import './HistoryView.css'
import { STATUS, formatCost, formatDate } from '../lib/projectMeta'

const MONTHS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
]

const QUARTERS = [
  { value: '1', label: 'Q1' },
  { value: '2', label: 'Q2' },
  { value: '3', label: 'Q3' },
  { value: '4', label: 'Q4' },
]

function getYear(dateStr) {
  return dateStr.slice(0, 4)
}

function getMonth(dateStr) {
  return dateStr.slice(5, 7)
}

function getQuarter(dateStr) {
  return String(Math.ceil(Number(getMonth(dateStr)) / 3))
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function MultiSelectDropdown({ label, options, selected, onToggle }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const count = selected.length

  return (
    <div className="history-dropdown" ref={ref}>
      <button
        type="button"
        className={`history-dropdown-btn ${count > 0 ? 'active' : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        {count > 0 ? ` (${count})` : ''}
        <span className="history-dropdown-caret">▾</span>
      </button>
      {open && (
        <div className="history-dropdown-menu">
          {options.map((opt) => (
            <label key={opt.value} className="history-dropdown-option">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => onToggle(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function HistoryView({ property, projects, onAddProject }) {
  const [selectedYears, setSelectedYears] = useState([])
  const [selectedQuarters, setSelectedQuarters] = useState([])
  const [selectedMonths, setSelectedMonths] = useState([])

  const entries = [...projects]
    .filter((p) => p.logged_date)
    .sort((a, b) => (a.logged_date < b.logged_date ? 1 : -1))

  const yearOptions = [...new Set(entries.map((p) => getYear(p.logged_date)))]
    .sort((a, b) => b - a)
    .map((y) => ({ value: y, label: y }))

  const filtered = entries.filter((p) => {
    if (selectedYears.length > 0 && !selectedYears.includes(getYear(p.logged_date))) return false
    if (selectedQuarters.length > 0 && !selectedQuarters.includes(getQuarter(p.logged_date))) return false
    if (selectedMonths.length > 0 && !selectedMonths.includes(getMonth(p.logged_date))) return false
    return true
  })

  const hasActiveFilters =
    selectedYears.length > 0 || selectedQuarters.length > 0 || selectedMonths.length > 0

  function clearFilters() {
    setSelectedYears([])
    setSelectedQuarters([])
    setSelectedMonths([])
  }

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

      <div className="history-filters">
        {yearOptions.length > 0 && (
          <MultiSelectDropdown
            label="Year"
            options={yearOptions}
            selected={selectedYears}
            onToggle={(v) => setSelectedYears((prev) => toggleValue(prev, v))}
          />
        )}
        <MultiSelectDropdown
          label="Quarter"
          options={QUARTERS}
          selected={selectedQuarters}
          onToggle={(v) => setSelectedQuarters((prev) => toggleValue(prev, v))}
        />
        <MultiSelectDropdown
          label="Month"
          options={MONTHS}
          selected={selectedMonths}
          onToggle={(v) => setSelectedMonths((prev) => toggleValue(prev, v))}
        />
        {hasActiveFilters && (
          <button className="history-filters-clear" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      <div className="timeline">
        {filtered.length > 0 ? (
          filtered.map((project) => {
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
          <p className="empty-note">
            {entries.length > 0 ? 'Nothing logged in this period.' : 'Nothing logged yet.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default HistoryView
