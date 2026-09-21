import { useState } from 'react'
import './Sidebar.css'

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'projects', label: 'Projects', icon: '📋' },
  { key: 'ideas', label: 'Ideas', icon: '💡' },
  { key: 'people', label: 'People', icon: '👥' },
  { key: 'money', label: 'Money', icon: '💰' },
  { key: 'history', label: 'History', icon: '🕐' },
]

const TYPE_ICON = {
  home: '🏠',
  vehicle: '🚗',
}

function PropertySwitcher({ properties, selectedProperty, onSelect }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="property-switcher">
      <span className="property-switcher-label">Current property</span>
      <button className="property-switcher-current" onClick={() => setOpen((o) => !o)}>
        <span className="property-icon">{TYPE_ICON[selectedProperty.type] || '📦'}</span>
        <span>
          <strong>{selectedProperty.name}</strong>
          <span className="property-type">{selectedProperty.type}</span>
        </span>
        <span className="property-switcher-chevron">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="property-switcher-menu">
          {properties.map((p) => (
            <button
              key={p.id}
              className="property-switcher-option"
              onClick={() => {
                onSelect(p.id)
                setOpen(false)
              }}
            >
              <span className="property-icon">{TYPE_ICON[p.type] || '📦'}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Sidebar({ activeNav, onNavChange, properties, selectedProperty, onSelectProperty }) {
  return (
    <aside className="sidebar">
      <button className="sidebar-brand" onClick={() => onNavChange('home')}>
        <span className="sidebar-logo">O</span>
        <div>
          <strong>Ownr</strong>
          <p>Your {selectedProperty.type}, documented.</p>
        </div>
      </button>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sidebar-nav-item ${activeNav === item.key ? 'active' : ''}`}
            onClick={() => onNavChange(item.key)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <PropertySwitcher
        properties={properties}
        selectedProperty={selectedProperty}
        onSelect={onSelectProperty}
      />
    </aside>
  )
}

export default Sidebar
