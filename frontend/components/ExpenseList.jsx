import React from 'react';

export const ExpenseList = ({ expenses, onEdit, onDelete, isLoading }) => {
  const getCategoryColor = (category) => {
    const colors = {
      roomRent: 'bg-red-100 text-red-800',
      electricity: 'bg-yellow-100 text-yellow-800',
      water: 'bg-blue-100 text-blue-800',
      wifi: 'bg-purple-100 text-purple-800',
      food: 'bg-orange-100 text-orange-800',
      transport: 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (expenses.length === 0) {
    return (
      <div className="card max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500 text-lg">No expenses found. Start by adding a new expense!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Expense Records</h2>
      
      <div className="grid gap-4">
        {expenses.map((expense) => (
          <div key={expense._id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">User: {expense.userId}</h3>
                <p className="text-gray-500 text-sm">Month: {expense.month}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  ${parseFloat(expense.totalCost).toFixed(2)}
                </div>
                <p className="text-gray-500 text-xs">Total Cost</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
              {[
                { label: 'Room Rent', value: expense.roomRent, key: 'roomRent' },
                { label: 'Electricity', value: expense.electricity, key: 'electricity' },
                { label: 'Water', value: expense.water, key: 'water' },
                { label: 'Wi-Fi', value: expense.wifi, key: 'wifi' },
                { label: 'Food', value: expense.food, key: 'food' },
                { label: 'Transport', value: expense.transport, key: 'transport' },
              ].map((item) => (
                <div key={item.key} className="bg-gray-50 p-3 rounded-lg">
                  <p className={`badge mb-1 ${getCategoryColor(item.key)}`}>
                    {item.label}
                  </p>
                  <p className="font-bold text-lg text-gray-800">
                    ${parseFloat(item.value || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {expense.notes && (
              <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-700"><strong>Notes:</strong> {expense.notes}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-xs text-gray-500">
                Created: {new Date(expense.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this expense?')) {
                      onDelete(expense._id);
                    }
                  }}
                  disabled={isLoading}
                  className="btn-danger text-sm px-3 py-1 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
