// Wrapper to catch errors in async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  try {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (typeof next === 'function') {
        next(err);
      } else {
        console.error('Error in async handler:', err);
        res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
      }
    });
  } catch (error) {
    if (typeof next === 'function') {
      next(error);
    } else {
      console.error('Error in async handler:', error);
      res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
  }
};

module.exports = asyncHandler;
