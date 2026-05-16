# Boarding Estimate - React Frontend

A modern, responsive React frontend for the Boarding Estimate expense tracking system.

## Features

✨ **Modern UI** - Built with Tailwind CSS for a clean, professional design
📊 **Dashboard** - Overview of total expenses, records count, and averages
➕ **Add Expenses** - Easy-to-use form to add new expenses
✏️ **Edit Expenses** - Update existing expense records
🗑️ **Delete Expenses** - Remove expenses you no longer need
🔍 **Search & Filter** - Filter expenses by user ID and month
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already created with default values):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000` in your browser.

### Production Build

Build for production:
```bash
npm run build
```

This creates an optimized build in the `build` folder.

## API Integration

The frontend communicates with the backend API using axios. API endpoints are configured in `src/services/api.js`:

- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get single expense
- `GET /api/expenses/user/:userId` - Get expenses by user
- `GET /api/expenses/total/cost` - Get total cost
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header component
│   │   ├── ExpenseForm.jsx     # Add/Edit expense form
│   │   ├── ExpenseList.jsx     # Display expenses
│   │   ├── StatsCard.jsx       # Statistics cards
│   │   └── index.js            # Components export
│   ├── services/
│   │   └── api.js              # API service with axios
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles (Tailwind)
│   └── index.js                # React entry point
├── .env                        # Environment variables
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── package.json
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Scripts** - Build configuration

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from CRA (irreversible)

## Troubleshooting

### API Connection Issues
- Ensure the backend is running on port 5000
- Check that `REACT_APP_API_URL` in `.env` matches your backend URL
- Check browser console for CORS errors

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
PORT=3001 npm start
```

### Module Not Found Errors
Clear the cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Performance Optimizations

- Lazy loading of components
- Efficient state management
- Debounced search and filter operations
- Optimized re-renders with React hooks

## Future Enhancements

- 📈 Chart visualizations for expense trends
- 📥 Export expenses to CSV/PDF
- 👥 Multi-user dashboard
- 🔐 Authentication & authorization
- 💾 Local storage for offline support
- 🎨 Dark mode theme

## License

ISC

## Support

For issues or questions, please check the backend repository or contact the development team.
