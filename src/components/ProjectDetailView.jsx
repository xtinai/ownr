import { useState } from 'react'
import './Checklist.css'
import './ProjectDetailView.css'
import { STATUS, formatCost, formatDate } from '../lib/projectMeta'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'checklist', label: 'Checklist' },
  { key: 'quotes', label: 'Quotes' },
  { key: 'inspo', label: 'Inspo' },
  { key: 'photos', label: 'Before & After' },
  { key: 'wishlist', label: 'Wishlist' },
  { key: 'documents', label: 'Documents' },
  { key: 'payments', label: 'Payments' },
  { key: 'timeline', label: 'Timeline' },
]

const QUOTE_STATUSES = ['pending', 'accepted', 'declined']
const WISHLIST_STATUSES = ['considering', 'chosen', 'rejected']
const PRIORITIES = ['low', 'medium', 'high']
const DOC_TYPES = ['receipt', 'contract', 'permit', 'warranty', 'manual', 'other']
const PAYMENT_STATUSES = ['pending', 'partial', 'paid']

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function ProjectDetailView({
  project,
  onBack,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onMoveItem,
  onUpdateProject,
}) {
  const [activeTab, setActiveTab] = useState('overview')

  function addRecord(key, record) {
    onUpdateProject(project.id, (p) => ({ ...p, [key]: [...(p[key] || []), record] }))
  }

  function removeRecord(key, id) {
    onUpdateProject(project.id, (p) => {
      const removed = (p[key] || []).find((r) => r.id === id)
      if (removed?.url) URL.revokeObjectURL(removed.url)
      if (removed?.fileUrl) URL.revokeObjectURL(removed.fileUrl)
      return { ...p, [key]: (p[key] || []).filter((r) => r.id !== id) }
    })
  }

  function updateRecord(key, id, patch) {
    onUpdateProject(project.id, (p) => ({
      ...p,
      [key]: (p[key] || []).map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }))
  }

  function updateField(key, value) {
    onUpdateProject(project.id, (p) => ({ ...p, [key]: value }))
  }

  const checklist = project.checklist || []

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <button className="back-link" onClick={onBack}>
            ← Back
          </button>
          <h1>{project.title}</h1>
          <p className="tagline">
            <span className={`badge badge-${project.status}`}>{STATUS[project.status].label}</span>{' '}
            {project.category}
            {project.contractor ? ` · ${project.contractor}` : ''}
            {project.budget_estimated ? ` · ${formatCost(project.budget_estimated)}` : ''}
          </p>
        </div>
      </header>

      <div className="detail-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`filter-pill ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="detail-tab-panel">
        {activeTab === 'overview' && <OverviewTab project={project} onUpdateField={updateField} />}

        {activeTab === 'checklist' && (
          <ChecklistTab
            project={project}
            checklist={checklist}
            onToggleItem={onToggleItem}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onMoveItem={onMoveItem}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesTab
            projectId={project.id}
            quotes={project.quotes || []}
            onAdd={(r) => addRecord('quotes', r)}
            onRemove={(id) => removeRecord('quotes', id)}
            onUpdate={(id, patch) => updateRecord('quotes', id, patch)}
          />
        )}

        {activeTab === 'inspo' && (
          <PhotoGallery
            title="Inspiration"
            emptyText="No inspiration photos yet — add images of styles, colors, or ideas you like."
            projectId={project.id}
            photos={project.inspoPhotos || []}
            onAdd={(r) => addRecord('inspoPhotos', r)}
            onRemove={(id) => removeRecord('inspoPhotos', id)}
            onUpdate={(id, patch) => updateRecord('inspoPhotos', id, patch)}
          />
        )}

        {activeTab === 'photos' && (
          <BeforeAfterGallery
            projectId={project.id}
            photos={project.beforeAfterPhotos || []}
            onAdd={(r) => addRecord('beforeAfterPhotos', r)}
            onRemove={(id) => removeRecord('beforeAfterPhotos', id)}
            onUpdate={(id, patch) => updateRecord('beforeAfterPhotos', id, patch)}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistTab
            projectId={project.id}
            items={project.wishlist || []}
            onAdd={(r) => addRecord('wishlist', r)}
            onRemove={(id) => removeRecord('wishlist', id)}
            onUpdate={(id, patch) => updateRecord('wishlist', id, patch)}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            projectId={project.id}
            documents={project.documents || []}
            onAdd={(r) => addRecord('documents', r)}
            onRemove={(id) => removeRecord('documents', id)}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentsTab
            projectId={project.id}
            payments={project.payments || []}
            budgetEstimated={project.budget_estimated}
            onAdd={(r) => addRecord('payments', r)}
            onRemove={(id) => removeRecord('payments', id)}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineTab
            projectId={project.id}
            milestones={project.milestones || []}
            onAdd={(r) => addRecord('milestones', r)}
            onRemove={(id) => removeRecord('milestones', id)}
            onUpdate={(id, patch) => updateRecord('milestones', id, patch)}
          />
        )}
      </div>
    </div>
  )
}

function OverviewTab({ project, onUpdateField }) {
  const [notes, setNotes] = useState(project.notes || '')
  const paidSoFar = (project.payments || [])
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  return (
    <div className="overview-tab">
      <div className="overview-tab-grid">
        <div className="detail-card">
          <span className="plist-label">Budget</span>
          <p className="detail-card-value">
            {formatCost(project.budget_actual ?? project.budget_estimated) || '—'}
          </p>
          {project.budget_estimated != null && (
            <p className="detail-card-sub">Estimated: {formatCost(project.budget_estimated)}</p>
          )}
        </div>
        <div className="detail-card">
          <span className="plist-label">Paid so far</span>
          <p className="detail-card-value">{formatCost(paidSoFar) || '$0'}</p>
        </div>
        <div className="detail-card">
          <span className="plist-label">Contractor</span>
          <p className="detail-card-value">{project.contractor || '—'}</p>
        </div>
        {project.target_date && (
          <div className="detail-card">
            <span className="plist-label">Target date</span>
            <p className="detail-card-value">{formatDate(project.target_date)}</p>
          </div>
        )}
      </div>

      {project.next_action && (
        <div className="detail-section">
          <h3>Next action</h3>
          <p>{project.next_action}</p>
        </div>
      )}

      <div className="detail-section">
        <h3>Notes</h3>
        <textarea
          className="detail-notes"
          placeholder="Scope, decisions, anything worth remembering about this project…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => onUpdateField('notes', notes)}
          rows={6}
        />
      </div>
    </div>
  )
}

function ChecklistTab({ project, checklist, onToggleItem, onAddItem, onRemoveItem, onMoveItem }) {
  const [newTask, setNewTask] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!newTask.trim()) return
    onAddItem(project.id, newTask.trim())
    setNewTask('')
  }

  return (
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
  )
}

function QuotesTab({ projectId, quotes, onAdd, onRemove, onUpdate }) {
  const [form, setForm] = useState({ contractor: '', amount: '', date: '', notes: '', file: null })

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.contractor.trim() || !form.amount) return
    onAdd({
      id: `${projectId}-quote-${Date.now()}`,
      contractor: form.contractor.trim(),
      amount: Number(form.amount),
      date: form.date || null,
      notes: form.notes.trim(),
      status: 'pending',
      fileUrl: form.file ? URL.createObjectURL(form.file) : null,
      fileIsImage: form.file ? form.file.type.startsWith('image/') : false,
    })
    setForm({ contractor: '', amount: '', date: '', notes: '', file: null })
  }

  return (
    <div className="record-tab">
      {quotes.length > 0 ? (
        <div className="record-list">
          {quotes.map((q) => (
            <div
              className={`record-row ${q.status === 'accepted' ? 'record-row-highlight' : ''}`}
              key={q.id}
            >
              {q.fileUrl && q.fileIsImage && (
                <a href={q.fileUrl} target="_blank" rel="noopener noreferrer" className="record-row-thumb-link">
                  <img className="record-row-thumb" src={q.fileUrl} alt={`Quote from ${q.contractor}`} />
                </a>
              )}
              <div className="record-row-main">
                <strong>{q.contractor}</strong>
                <span className="record-row-amount">{formatCost(q.amount)}</span>
                {q.date && <span className="record-row-sub">{formatDate(q.date)}</span>}
                {q.fileUrl && !q.fileIsImage && (
                  <a href={q.fileUrl} target="_blank" rel="noopener noreferrer" className="record-row-link">
                    View quote file ↗
                  </a>
                )}
                {q.notes && <p className="record-row-notes">{q.notes}</p>}
              </div>
              <div className="record-row-actions">
                <select
                  className="status-select"
                  value={q.status}
                  onChange={(e) => onUpdate(q.id, { status: e.target.value })}
                >
                  {QUOTE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {capitalize(s)}
                    </option>
                  ))}
                </select>
                <button className="record-remove-btn" onClick={() => onRemove(q.id)} aria-label="Remove quote">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">No quotes logged yet — add one below to start comparing.</p>
      )}

      <form className="record-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Contractor"
          value={form.contractor}
          onChange={(e) => handleChange('contractor', e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={form.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
        />
        <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
        />
        <label className="photo-upload-btn file-upload-btn">
          {form.file ? form.file.name : 'Attach quote (photo or PDF)'}
          <input type="file" onChange={(e) => handleChange('file', e.target.files?.[0] || null)} hidden />
        </label>
        <button type="submit">Add quote</button>
      </form>
    </div>
  )
}

function PhotoGallery({ title, emptyText, projectId, photos, onAdd, onRemove, onUpdate }) {
  function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    files.forEach((file, i) => {
      onAdd({
        id: `${projectId}-photo-${Date.now()}-${i}`,
        url: URL.createObjectURL(file),
        caption: '',
      })
    })
    e.target.value = ''
  }

  return (
    <div className="photo-gallery">
      <div className="photo-upload-row">
        <label className="photo-upload-btn">
          + Add photos
          <input type="file" accept="image/*" multiple onChange={handleFiles} hidden />
        </label>
        <span className="photo-upload-note">Photos stay for this session only — not saved after reload yet.</span>
      </div>

      {photos.length > 0 ? (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div className="photo-item" key={photo.id}>
              <img src={photo.url} alt={photo.caption || title} />
              <button className="photo-remove-btn" onClick={() => onRemove(photo.id)} aria-label="Remove photo">
                ×
              </button>
              <input
                type="text"
                className="photo-caption-input"
                placeholder="Caption…"
                value={photo.caption || ''}
                onChange={(e) => onUpdate(photo.id, { caption: e.target.value })}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">{emptyText}</p>
      )}
    </div>
  )
}

function BeforeAfterSection({ title, hint, photos, uploadLabel, onFiles, onRemove, onUpdate }) {
  return (
    <div className="detail-section">
      <h3>{title}</h3>
      {hint && <p className="section-hint">{hint}</p>}
      <label className="photo-upload-btn">
        {uploadLabel}
        <input type="file" accept="image/*" multiple onChange={onFiles} hidden />
      </label>
      {photos.length > 0 ? (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div className="photo-item" key={photo.id}>
              <img src={photo.url} alt={photo.caption || title} />
              <button
                className="photo-remove-btn"
                onClick={() => onRemove(photo.id)}
                aria-label={`Remove ${title.toLowerCase()} photo`}
              >
                ×
              </button>
              <input
                type="text"
                className="photo-caption-input"
                placeholder="Caption…"
                value={photo.caption || ''}
                onChange={(e) => onUpdate(photo.id, { caption: e.target.value })}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">No {title.toLowerCase()} photos yet.</p>
      )}
    </div>
  )
}

function BeforeAfterGallery({ projectId, photos, onAdd, onRemove, onUpdate }) {
  const beforePhotos = photos.filter((p) => p.tag === 'before')
  const duringPhotos = photos.filter((p) => p.tag === 'during')
  const afterPhotos = photos.filter((p) => p.tag === 'after')

  function handleFiles(tag) {
    return (e) => {
      const files = Array.from(e.target.files || [])
      files.forEach((file, i) => {
        onAdd({
          id: `${projectId}-photo-${Date.now()}-${i}`,
          url: URL.createObjectURL(file),
          caption: '',
          tag,
          pairedBeforeId: null,
        })
      })
      e.target.value = ''
    }
  }

  return (
    <div className="before-after-gallery">
      <p className="photo-upload-note">Photos stay for this session only — not saved after reload yet.</p>

      <BeforeAfterSection
        title="Before"
        hint="The starting point — the shots you'll match later."
        photos={beforePhotos}
        uploadLabel="+ Add before photo"
        onFiles={handleFiles('before')}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />

      <BeforeAfterSection
        title="During"
        hint="Progress shots along the way."
        photos={duringPhotos}
        uploadLabel="+ Add during photo"
        onFiles={handleFiles('during')}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />

      <div className="detail-section">
        <h3>After</h3>
        <p className="section-hint">
          Match each after photo to the before shot it replaces — pull up the before photo on your phone while
          you're standing there so you can line up the same spot and angle, then upload the after shot and pair
          them here.
        </p>
        <label className="photo-upload-btn">
          + Add after photo
          <input type="file" accept="image/*" multiple onChange={handleFiles('after')} hidden />
        </label>

        {afterPhotos.length > 0 ? (
          <div className="comparison-list">
            {afterPhotos.map((photo) => {
              const pairedBefore = beforePhotos.find((b) => b.id === photo.pairedBeforeId)
              return (
                <div className="comparison-card" key={photo.id}>
                  <div className="comparison-side">
                    <span className="comparison-label">Before</span>
                    {pairedBefore ? (
                      <img src={pairedBefore.url} alt={pairedBefore.caption || 'Before'} />
                    ) : (
                      <div className="comparison-placeholder">No before photo selected</div>
                    )}
                    <select
                      className="status-select"
                      value={photo.pairedBeforeId || ''}
                      onChange={(e) => onUpdate(photo.id, { pairedBeforeId: e.target.value || null })}
                    >
                      <option value="">— Match to a before photo —</option>
                      {beforePhotos.map((b, i) => (
                        <option key={b.id} value={b.id}>
                          {b.caption || `Before photo ${i + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="comparison-side">
                    <span className="comparison-label">After</span>
                    <img src={photo.url} alt={photo.caption || 'After'} />
                    <input
                      type="text"
                      className="photo-caption-input"
                      placeholder="Caption…"
                      value={photo.caption || ''}
                      onChange={(e) => onUpdate(photo.id, { caption: e.target.value })}
                    />
                  </div>
                  <button
                    className="photo-remove-btn comparison-remove-btn"
                    onClick={() => onRemove(photo.id)}
                    aria-label="Remove after photo"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="empty-note">No after photos yet.</p>
        )}
      </div>
    </div>
  )
}

function WishlistTab({ projectId, items, onAdd, onRemove, onUpdate }) {
  const [form, setForm] = useState({ item: '', price: '', link: '', priority: 'medium' })

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.item.trim()) return
    onAdd({
      id: `${projectId}-wish-${Date.now()}`,
      item: form.item.trim(),
      price: form.price ? Number(form.price) : null,
      link: form.link.trim(),
      priority: form.priority,
      status: 'considering',
    })
    setForm({ item: '', price: '', link: '', priority: 'medium' })
  }

  return (
    <div className="record-tab">
      {items.length > 0 ? (
        <div className="record-list">
          {items.map((item) => (
            <div className="record-row" key={item.id}>
              <div className="record-row-main">
                <strong>{item.item}</strong>
                {item.price != null && <span className="record-row-amount">{formatCost(item.price)}</span>}
                <span className={`tag-badge tag-priority-${item.priority}`}>{item.priority}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="record-row-link">
                    View ↗
                  </a>
                )}
              </div>
              <div className="record-row-actions">
                <select
                  className="status-select"
                  value={item.status}
                  onChange={(e) => onUpdate(item.id, { status: e.target.value })}
                >
                  {WISHLIST_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {capitalize(s)}
                    </option>
                  ))}
                </select>
                <button
                  className="record-remove-btn"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove wishlist item"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">Nothing on the wishlist yet.</p>
      )}

      <form className="record-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item"
          value={form.item}
          onChange={(e) => handleChange('item', e.target.value)}
        />
        <input
          type="number"
          placeholder="Est. price"
          min="0"
          value={form.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={form.link}
          onChange={(e) => handleChange('link', e.target.value)}
        />
        <select value={form.priority} onChange={(e) => handleChange('priority', e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {capitalize(p)}
            </option>
          ))}
        </select>
        <button type="submit">Add to wishlist</button>
      </form>
    </div>
  )
}

function DocumentsTab({ projectId, documents, onAdd, onRemove }) {
  const [form, setForm] = useState({ name: '', type: 'receipt', date: '', expirationDate: '', file: null })

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({
      id: `${projectId}-doc-${Date.now()}`,
      name: form.name.trim(),
      type: form.type,
      date: form.date || null,
      expirationDate: form.expirationDate || null,
      fileUrl: form.file ? URL.createObjectURL(form.file) : null,
    })
    setForm({ name: '', type: 'receipt', date: '', expirationDate: '', file: null })
  }

  const today = new Date().toLocaleDateString('sv-SE')

  return (
    <div className="record-tab">
      {documents.length > 0 ? (
        <div className="record-list">
          {documents.map((doc) => {
            const expired = doc.expirationDate && doc.expirationDate < today
            return (
              <div className="record-row" key={doc.id}>
                <div className="record-row-main">
                  <strong>{doc.name}</strong>
                  <span className="tag-badge">{doc.type}</span>
                  {doc.date && <span className="record-row-sub">{formatDate(doc.date)}</span>}
                  {doc.expirationDate && (
                    <span className={`tag-badge ${expired ? 'tag-badge-warn' : ''}`}>
                      {expired ? 'Expired ' : 'Expires '}
                      {formatDate(doc.expirationDate)}
                    </span>
                  )}
                  {doc.fileUrl && (
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="record-row-link">
                      View file ↗
                    </a>
                  )}
                </div>
                <button className="record-remove-btn" onClick={() => onRemove(doc.id)} aria-label="Remove document">
                  ×
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="empty-note">No documents yet — receipts, contracts, permits, warranties.</p>
      )}

      <form className="record-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Document name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <select value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
          {DOC_TYPES.map((t) => (
            <option key={t} value={t}>
              {capitalize(t)}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
          title="Date"
        />
        <input
          type="date"
          value={form.expirationDate}
          onChange={(e) => handleChange('expirationDate', e.target.value)}
          title="Expiration (optional)"
        />
        <label className="photo-upload-btn file-upload-btn">
          {form.file ? form.file.name : 'Attach file'}
          <input type="file" onChange={(e) => handleChange('file', e.target.files?.[0] || null)} hidden />
        </label>
        <button type="submit">Add document</button>
      </form>
    </div>
  )
}

function PaymentsTab({ projectId, payments, budgetEstimated, onAdd, onRemove }) {
  const [form, setForm] = useState({ amount: '', paidTo: '', date: '', status: 'paid' })

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount) return
    onAdd({
      id: `${projectId}-payment-${Date.now()}`,
      amount: Number(form.amount),
      paidTo: form.paidTo.trim(),
      date: form.date || null,
      status: form.status,
    })
    setForm({ amount: '', paidTo: '', date: '', status: 'paid' })
  }

  const total = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  return (
    <div className="record-tab">
      <div className="detail-card">
        <span className="plist-label">Total paid</span>
        <p className="detail-card-value">
          {formatCost(total) || '$0'}
          {budgetEstimated ? ` of ${formatCost(budgetEstimated)} estimated` : ''}
        </p>
      </div>

      {payments.length > 0 ? (
        <div className="record-list">
          {payments.map((p) => (
            <div className="record-row" key={p.id}>
              <div className="record-row-main">
                <strong>{formatCost(p.amount)}</strong>
                {p.paidTo && <span className="record-row-sub">to {p.paidTo}</span>}
                {p.date && <span className="record-row-sub">{formatDate(p.date)}</span>}
                <span className="tag-badge">{p.status}</span>
              </div>
              <button className="record-remove-btn" onClick={() => onRemove(p.id)} aria-label="Remove payment">
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">No payments logged yet.</p>
      )}

      <form className="record-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={form.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
        />
        <input
          type="text"
          placeholder="Paid to"
          value={form.paidTo}
          onChange={(e) => handleChange('paidTo', e.target.value)}
        />
        <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
        <select value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>
        <button type="submit">Add payment</button>
      </form>
    </div>
  )
}

function TimelineTab({ projectId, milestones, onAdd, onRemove, onUpdate }) {
  const [form, setForm] = useState({ name: '', targetDate: '' })

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({
      id: `${projectId}-milestone-${Date.now()}`,
      name: form.name.trim(),
      targetDate: form.targetDate || null,
      actualDate: null,
      status: 'upcoming',
    })
    setForm({ name: '', targetDate: '' })
  }

  function markDone(id) {
    onUpdate(id, { status: 'done', actualDate: new Date().toLocaleDateString('sv-SE') })
  }

  const sorted = [...milestones].sort((a, b) => ((a.targetDate || '') < (b.targetDate || '') ? -1 : 1))

  return (
    <div className="record-tab">
      {sorted.length > 0 ? (
        <div className="record-list">
          {sorted.map((m) => (
            <div className="record-row" key={m.id}>
              <div className="record-row-main">
                <strong>{m.name}</strong>
                {m.targetDate && <span className="record-row-sub">Target: {formatDate(m.targetDate)}</span>}
                {m.actualDate && <span className="record-row-sub">Done: {formatDate(m.actualDate)}</span>}
                <span className={`tag-badge tag-milestone-${m.status}`}>{m.status}</span>
              </div>
              <div className="record-row-actions">
                {m.status !== 'done' && (
                  <button className="toggle-btn" onClick={() => markDone(m.id)}>
                    Mark done
                  </button>
                )}
                <button className="record-remove-btn" onClick={() => onRemove(m.id)} aria-label="Remove milestone">
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-note">No milestones yet.</p>
      )}

      <form className="record-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Milestone (e.g. Permit approved)"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="date"
          value={form.targetDate}
          onChange={(e) => handleChange('targetDate', e.target.value)}
        />
        <button type="submit">Add milestone</button>
      </form>
    </div>
  )
}

export default ProjectDetailView
