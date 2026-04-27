import React, { useState } from 'react';
import './ItemForm.css';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Item name is required');
      return;
    }

    setLoading(true);

    const newItem = {
      name: name.trim(),
      description: description.trim(),
      category,
      priority,
      time
    };

    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        const item = await response.json();
        onAddItem(item);

        // Clear form
        setName('');
        setDescription('');
        setCategory('Work');
        setPriority('Medium');
        setError('');
        setName('')
      } else {
        setError('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>➕ Add New Item</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Item Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Buy groceries"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          rows="3"
        />
      </div>
      <div className="form-group">
         <label htmlFor="time">Time</label>
         <input
          id="time"
         type="time"
         value={time}
         onChange={(e) => setTime(e.target.value)}
  />
       </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority"
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-submit"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
}

export default ItemForm;
