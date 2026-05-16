import React, { useState, useEffect } from 'react';

export const ExpenseForm = ({ onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    userId: '',
    month: '',
    roomRent: '',
    electricity: '',
    water: '',
    wifi: '',
    food: '',
    transport: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userId.trim() || !formData.month.trim()) {
      alert('User ID and Month are required');
      return;
    }

    onSubmit(formData);
  };

  const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">User ID *</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter user ID"
            className="input-field"
            disabled={!!initialData}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Month *</label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="input-field"
            defaultValue={currentMonth}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Room Rent</label>
          <input
            type="number"
            name="roomRent"
            value={formData.roomRent}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Electricity</label>
          <input
            type="number"
            name="electricity"
            value={formData.electricity}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Water</label>
          <input
            type="number"
            name="water"
            value={formData.water}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Wi-Fi</label>
          <input
            type="number"
            name="wifi"
            value={formData.wifi}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Food</label>
          <input
            type="number"
            name="food"
            value={formData.food}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Transport</label>
          <input
            type="number"
            name="transport"
            value={formData.transport}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes..."
          rows="3"
          className="input-field"
        ></textarea>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : initialData ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};
