import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">BoardPlan</h1>
            <p className="text-blue-100 text-sm mt-1">Track your hostel expenses efficiently</p>
          </div>
          <div className="text-right">
            {user ? (
              <div>
                <p className="text-blue-100 text-sm mb-2">Welcome, {user.username}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <p className="text-blue-100 text-sm">Smart Expense Management</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
