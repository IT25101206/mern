import React, { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleAddItem = (newItem) => {
    setItems([newItem, ...items]);
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE'
      });
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleToggleComplete = async (item) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...item,
          completed: !item.completed
        })
      });
      const updatedItem = await response.json();
      setItems(items.map(i => i._id === updatedItem._id ? updatedItem : i));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading...</p></div>;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 Item Manager</h1>
          <p>Manage your tasks with priority and categories</p>
        </header>

        <div className="main-content">
          <ItemForm onAddItem={handleAddItem} />

          <div className="items-section">
            <h2>Your Items ({items.length})</h2>
            {items.length === 0 ? (
              <div className="no-items">
                <p>📭 No items yet</p>
                <p>Add one in the form above to get started!</p>
              </div>
            ) : (
              <ItemList 
                items={items}
                onDelete={handleDeleteItem}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
