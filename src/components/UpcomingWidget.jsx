import './HomeRail.css'
import { formatDate } from '../lib/projectMeta'

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function buildCalendarCells(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells = Array(startWeekday).fill(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  return cells
}

function UpcomingWidget({ projects }) {
  const upcoming = projects
    .filter((p) => p.target_date)
    .sort((a, b) => (a.target_date > b.target_date ? 1 : -1))

  if (upcoming.length === 0) {
    return <p className="empty-note">Nothing with a target date yet.</p>
  }

  const [year, month] = upcoming[0].target_date.split('-').map(Number)
  const monthIndex = month - 1
  const cells = buildCalendarCells(year, monthIndex)
  const monthLabel = new Date(year, monthIndex, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const eventDays = new Set(
    upcoming
      .filter((p) => p.target_date.startsWith(`${year}-${String(month).padStart(2, '0')}`))
      .map((p) => Number(p.target_date.split('-')[2])),
  )

  return (
    <>
      <p className="mini-cal-month">{monthLabel}</p>
      <div className="mini-cal-grid">
        {WEEKDAY_LABELS.map((label, i) => (
          <span className="mini-cal-weekday" key={i}>
            {label}
          </span>
        ))}
        {cells.map((day, i) => (
          <span key={i} className={`mini-cal-day ${day && eventDays.has(day) ? 'has-event' : ''}`}>
            {day || ''}
          </span>
        ))}
      </div>
      <div className="rail-list">
        {upcoming.map((project) => (
          <div className="rail-list-row" key={project.id}>
            <span className="rail-list-main">{project.title}</span>
            <span className="rail-list-date">
              {formatDate(project.target_date, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default UpcomingWidget
