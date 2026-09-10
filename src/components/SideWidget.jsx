import { useEffect, useState } from 'react'
import './HomeRail.css'
import NotesWidget from './NotesWidget'
import RecentActivityWidget from './RecentActivityWidget'
import UpcomingWidget from './UpcomingWidget'

const WIDGET_OPTIONS = [
  { key: 'notes', label: 'Notes' },
  { key: 'activity', label: 'Recent Activity' },
  { key: 'upcoming', label: 'Upcoming' },
]

const STORAGE_KEY = 'ownr-side-widget'

function SideWidget({ property, projects }) {
  const [selected, setSelected] = useState('notes')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setSelected(saved)
    } catch {
      // Storage unavailable — just fall back to the default.
    }
  }, [])

  function handleChange(e) {
    const value = e.target.value
    setSelected(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Selection just won't persist across reloads.
    }
  }

  return (
    <div className="overview-card side-widget-card">
      <select className="widget-select" value={selected} onChange={handleChange}>
        {WIDGET_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="side-widget-body">
        {selected === 'notes' && <NotesWidget property={property} />}
        {selected === 'activity' && <RecentActivityWidget projects={projects} />}
        {selected === 'upcoming' && <UpcomingWidget projects={projects} />}
      </div>
    </div>
  )
}

export default SideWidget
