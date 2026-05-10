const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      trim: true,
    },
    month: {
      type: String,
      required: [true, 'Month is required'],
      trim: true,
    },
    roomRent: {
      type: Number,
      default: 0,
      min: [0, 'Room rent cannot be negative'],
    },
    electricity: {
      type: Number,
      default: 0,
      min: [0, 'Electricity cost cannot be negative'],
    },
    water: {
      type: Number,
      default: 0,
      min: [0, 'Water cost cannot be negative'],
    },
    wifi: {
      type: Number,
      default: 0,
      min: [0, 'Wi-Fi cost cannot be negative'],
    },
    food: {
      type: Number,
      default: 0,
      min: [0, 'Food cost cannot be negative'],
    },
    transport: {
      type: Number,
      default: 0,
      min: [0, 'Transport cost cannot be negative'],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
