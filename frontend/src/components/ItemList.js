import React from 'react';
import './ItemList.css';

function ItemList({ items, onDelete, onToggleComplete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#dc3545';
      case 'Medium':
        return '#ffc107';
      case 'Low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Work':
        return '💼';
      case 'Personal':
        return '👤';
      case 'Shopping':
        return '🛒';
      case 'Other':
        return '📌';
      default:
        return '📝';
    }
  };

  return (
    <div className="items-grid">
      {items.map(item => (
        <div 
          key={item._id} 
          className={`item-card ${item.completed ? 'completed' : ''}`}
        >
          <div className="item-header">
            <h3 className={item.completed ? 'line-through' : ''}>
              {item.name}
            </h3>
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(item.priority) }}
            >
              {item.priority}
            </span>
          </div>

          {item.description && (
            <p className="description">{item.description}</p>
          )}

          <div className="item-meta">
            <span className="category">
              {getCategoryEmoji(item.category)} {item.category}
            </span>
            <span className="created-date">
              📅 {new Date(item.createdAt).toLocaleDateString()}
            </span>
          <span className="created-date">⏰ {item.time}</span>  
)}
          </div>

          <div className="item-status">
            {item.completed ? (
              <span className="badge-completed">✅ Completed</span>
            ) : (
              <span className="badge-pending">⏳ Pending</span>
            )}
          </div>

          <div className="item-actions">
            <button
              className={`btn-action btn-toggle ${item.completed ? 'btn-undo' : 'btn-complete'}`}
              onClick={() => onToggleComplete(item)}
              title={item.completed ? 'Mark as pending' : 'Mark as complete'}
            >
              {item.completed ? '↩️ Undo' : '✓ Complete'}
            </button>
            <button
              className="btn-action btn-delete"
              onClick={() => {
                if (window.confirm(`Delete "${item.name}"?`)) {
                  onDelete(item._id);
                }
              }}
              title="Delete item"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
