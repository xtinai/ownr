import './Checklist.css'

function ChecklistPreview({ checklist, onToggle, onExpand }) {
  const visible = checklist.slice(0, 5)
  const remaining = checklist.length - visible.length

  return (
    <div className="checklist-preview">
      {visible.map((item) => (
        <label key={item.id} className="checklist-row">
          <input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} />
          <span className={item.done ? 'checklist-done' : ''}>{item.text}</span>
        </label>
      ))}
      <button className="checklist-expand" onClick={onExpand}>
        {remaining > 0 ? `+${remaining} more · View full checklist →` : 'View full checklist →'}
      </button>
    </div>
  )
}

export default ChecklistPreview
