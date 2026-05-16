import React, { useState, useEffect } from 'react';
import { Header, ExpenseForm, ExpenseList, StatsCard } from './components';
import { expenseAPI } from './services/api';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({ total: 0, count: 0, average: 0 });
  const [filter, setFilter] = useState('all');
  const [searchUserId, setSearchUserId] = useState('');

  // Fetch all expenses
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await expenseAPI.getAll();
      if (response.data.success) {
        setExpenses(response.data.data);
        calculateStats(response.data.data);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({ total: 0, count: 0, average: 0 });
      return;
    }
    const total = data.reduce((sum, exp) => sum + (parseFloat(exp.totalCost) || 0), 0);
    setStats({
      total: total.toFixed(2),
      count: data.length,
      average: (total / data.length).toFixed(2)
    });
  };

  // Load expenses on mount
  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (editingExpense) {
        // Update existing expense
        const response = await expenseAPI.update(editingExpense._id, formData);
        if (response.data.success) {
          setSuccess('Expense updated successfully!');
          setEditingExpense(null);
        }
      } else {
        // Create new expense
        const response = await expenseAPI.create(formData);
        if (response.data.success) {
          setSuccess('Expense added successfully!');
        }
      }
      
      // Refresh expenses list
      fetchExpenses();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
      console.error('Error saving expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await expenseAPI.delete(id);
      if (response.data.success) {
        setSuccess('Expense deleted successfully!');
        fetchExpenses();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete expense');
      console.error('Error deleting expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter expenses
  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (searchUserId) {
      filtered = filtered.filter(exp =>
        exp.userId.toLowerCase().includes(searchUserId.toLowerCase())
      );
    }

    if (filter === 'current_month') {
      const currentMonth = new Date().toISOString().slice(0, 7);
      filtered = filtered.filter(exp => exp.month === currentMonth);
    }

    return filtered;
  };

  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Alert Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-4xl mx-auto mt-4">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-4xl mx-auto mt-4">
          <span>{success}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Expenses"
            value={`$${stats.total}`}
            icon="💰"
            color="blue"
          />
          <StatsCard
            title="Records"
            value={stats.count}
            icon="📊"
            color="green"
          />
          <StatsCard
            title="Average"
            value={`$${stats.average}`}
            icon="📈"
            color="purple"
          />
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <ExpenseForm
            onSubmit={handleFormSubmit}
            initialData={editingExpense}
            isLoading={isLoading}
          />
          {editingExpense && (
            <div className="text-center mt-4">
              <button
                onClick={() => setEditingExpense(null)}
                className="btn-secondary"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>

        {/* Filter Section */}
        <div className="card max-w-6xl mx-auto mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by User ID
              </label>
              <input
                type="text"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                placeholder="Enter user ID..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Expenses</option>
                <option value="current_month">Current Month</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchUserId('');
                  setFilter('all');
                }}
                className="btn-secondary w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredExpenses.length} of {expenses.length} expenses
          </p>
        </div>

        {/* Expenses List Section */}
        <div>
          {isLoading && filteredExpenses.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500">Loading expenses...</p>
            </div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Boarding Estimate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
