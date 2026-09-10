import { useEffect, useState } from 'react'
import './HomeRail.css'

function NotesWidget({ property }) {
  const storageKey = `ownr-notes-${property.id}`
  const [note, setNote] = useState('')

  useEffect(() => {
    try {
      setNote(localStorage.getItem(storageKey) || '')
    } catch {
      setNote('')
    }
  }, [storageKey])

  function handleChange(e) {
    const value = e.target.value
    setNote(value)
    try {
      localStorage.setItem(storageKey, value)
    } catch {
      // Storage unavailable (private browsing, etc.) — note just won't persist.
    }
  }

  return (
    <textarea
      className="notes-textarea"
      placeholder="Jot down a quick note…"
      value={note}
      onChange={handleChange}
    />
  )
}

export default NotesWidget
