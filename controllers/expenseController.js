const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
exports.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses,
  });
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Public
exports.getExpenseById = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({
      success: false,
      error: 'Expense not found',
    });
  }

  res.status(200).json({
    success: true,
    data: expense,
  });
};

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Public
exports.createExpense = async (req, res) => {
  const { userId, month, roomRent, electricity, water, wifi, food, transport, notes } = req.body;

  // Validation
  if (!userId || !month) {
    return res.status(400).json({
      success: false,
      error: 'User ID and month are required',
    });
  }

  const expense = new Expense({
    userId,
    month,
    roomRent: roomRent || 0,
    electricity: electricity || 0,
    water: water || 0,
    wifi: wifi || 0,
    food: food || 0,
    transport: transport || 0,
    notes: notes || '',
  });

  // Calculate totalCost
  expense.totalCost = expense.roomRent + expense.electricity + expense.water + expense.wifi + expense.food + expense.transport;

  await expense.save();

  res.status(201).json({
    success: true,
    message: 'Expense created successfully',
    data: expense,
  });
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Public
exports.updateExpense = async (req, res) => {
  const { roomRent, electricity, water, wifi, food, transport, month, notes } = req.body;

  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({
      success: false,
      error: 'Expense not found',
    });
  }

  // Update fields if provided
  if (month) expense.month = month;
  if (roomRent !== undefined) expense.roomRent = roomRent;
  if (electricity !== undefined) expense.electricity = electricity;
  if (water !== undefined) expense.water = water;
  if (wifi !== undefined) expense.wifi = wifi;
  if (food !== undefined) expense.food = food;
  if (transport !== undefined) expense.transport = transport;
  if (notes !== undefined) expense.notes = notes;

  // Recalculate totalCost
  expense.totalCost = expense.roomRent + expense.electricity + expense.water + expense.wifi + expense.food + expense.transport;

  await expense.save();

  res.status(200).json({
    success: true,
    message: 'Expense updated successfully',
    data: expense,
  });
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Public
exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    return res.status(404).json({
      success: false,
      error: 'Expense not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Expense deleted successfully',
    data: expense,
  });
};

// @desc    Get total boarding cost for a user
// @route   GET /api/expenses/total/cost
// @access  Public
exports.getTotalCost = async (req, res) => {
  const { userId } = req.query;

  let filter = {};
  if (userId) {
    filter.userId = userId;
  }

  const expenses = await Expense.find(filter);

  const totalCost = expenses.reduce((sum, expense) => sum + expense.totalCost, 0);
  const avgCost = expenses.length > 0 ? totalCost / expenses.length : 0;

  res.status(200).json({
    success: true,
    count: expenses.length,
    totalCost,
    averageCostPerRecord: avgCost.toFixed(2),
    data: expenses,
  });
};

// @desc    Get expenses by user ID
// @route   GET /api/expenses/user/:userId
// @access  Public
exports.getExpensesByUser = async (req, res) => {
  const expenses = await Expense.find({ userId: req.params.userId }).sort({
    createdAt: -1,
  });

  if (expenses.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No expenses found for this user',
    });
  }

  const totalCost = expenses.reduce((sum, expense) => sum + expense.totalCost, 0);

  res.status(200).json({
    success: true,
    count: expenses.length,
    totalCost,
    data: expenses,
  });
};
