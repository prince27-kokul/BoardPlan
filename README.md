# Smart Boarding Cost Estimator

## Problem Description

Students often struggle to estimate their total boarding expenses. With multiple costs spread across accommodation, utilities, food, and transport, it's difficult to track and plan finances. The Smart Boarding Cost Estimator solves this by providing a centralized platform to record, manage, and calculate total boarding expenses.

## Target Users

- College and university students living in hostels or rented accommodations
- Parents helping manage their children's boarding expenses
- Hostel administrators for budget tracking

## Proposed Solution

A web-based backend API that allows users to:
1. Add multiple expense records (room rent, electricity, water, Wi-Fi, food, transport)
2. View all recorded expenses
3. Update existing expense records
4. Delete expense records
5. Auto-calculate total boarding costs
6. Categorize expenses for better organization

## Features

- ✅ RESTful API with CRUD operations
- ✅ MongoDB integration for persistent storage
- ✅ Expense categorization (rent, utilities, food, transport, etc.)
- ✅ Automatic total cost calculation
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API Testing**: Postman
- **Version Control**: Git & GitHub
- **Development**: Nodemon

## Project Structure

```
BoardingEstimate/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/           # Business logic layer (coming in step 2)
├── models/               # MongoDB schemas (coming in step 2)
├── routes/               # API endpoints (coming in step 2)
├── middleware/           # Custom middleware (coming in step 2)
├── index.js              # Main server file
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
└── README.md             # This file
```

## API Endpoints (To be implemented in Step 2)

### Expenses
- `GET /api/expenses` - Get all expense records
- `POST /api/expenses` - Create a new expense record
- `GET /api/expenses/:id` - Get a specific expense record
- `PUT /api/expenses/:id` - Update an expense record
- `DELETE /api/expenses/:id` - Delete an expense record
- `GET /api/expenses/total/cost` - Get total boarding cost

### Health Check
- `GET /api/health` - Check server status

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas connection string)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/BoardingEstimate.git
   cd BoardingEstimate
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/boarding-estimator
   NODE_ENV=development
   ```

4. Update `MONGODB_URI` with your MongoDB connection string

## How to Run the Project

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:5000` with auto-restart on file changes.

### Production Mode
```bash
npm start
```

### Check Server Status
```
GET http://localhost:5000/api/health
```

Expected Response:
```json
{
  "message": "Server is running",
  "status": "OK"
}
```

## Development Phases

- **Phase 1** ✅: Project setup and MongoDB connection
- **Phase 2** ⏳: Controller and Model layer implementation
- **Phase 3** ⏳: API testing with Postman and bug fixes

## MongoDB Connection

This project uses MongoDB with Mongoose for data modeling and validation. The connection is established in `config/db.js` and called during server startup in `index.js`.

## Commit History

1. **Commit 1**: Initial project setup with Express server and MongoDB connection

## Next Steps

- Implement Expense model and schema
- Create controllers for CRUD operations
- Define API routes
- Test all endpoints using Postman

## Author

[Your Name]

## License

ISC

---

**Note**: This README will be updated as the project progresses through each development phase.
