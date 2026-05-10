const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getTotalCost,
  getExpensesByUser,
} = require('../controllers/expenseController');

// Total cost route (must be before :id routes to avoid route conflicts)
router.get('/total/cost', asyncHandler(getTotalCost));

// Get expenses by user ID
router.get('/user/:userId', asyncHandler(getExpensesByUser));

// Get all expenses and create new expense
router.get('/', asyncHandler(getAllExpenses));
router.post('/', asyncHandler(createExpense));

// Get, update, delete single expense
router.get('/:id', asyncHandler(getExpenseById));
router.put('/:id', asyncHandler(updateExpense));
router.delete('/:id', asyncHandler(deleteExpense));

module.exports = router;
