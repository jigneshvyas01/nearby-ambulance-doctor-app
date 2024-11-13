# Nearby Ambulances and Doctors

## Overview

This application is designed to help users find nearby ambulance services and doctors. Built with a Vite.js frontend and a Node.js backend, it allows users to perform CRUD operations on ambulance and doctor records. The app supports pagination, displays a total count of records, and handles loading, error, and empty states gracefully.

## Technology Stack

### Frontend
- Vite.js
- React with TypeScript
- CSS-in-JS (styled-components)
- Jest and React Testing Library for unit tests

### Backend
- Node.js with TypeScript
- SQLite database
- Drizzle ORM for database operations
- Jest for unit testing

### Additional Services
- Cloudinary for image handling

## Quick Start Guide

### Prerequisites

- Node.js
- npm
- SQLite3

### Setup

1. Clone the repository:

```bash
git clone 
cd nearby-ambulances-and-doctors
```

2. Install dependencies for both frontend and backend:

```bash
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install
```

4. Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL={{server's url}}
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

5. Create a `.env` file in the `backend` directory:

```env
WHITELIST_URL={{client's url}}
```

6. Start the development servers:

```bash
# Backend
cd backend
npm run dev

# Frontend (in a new terminal)
cd frontend
npm run dev
```

7. Open your browser and navigate to `http://localhost:3000`.

## Database Schema

The application uses SQLite with Drizzle ORM for data persistence. Key tables include:

- `ambulances`
- `doctors`

## Functionality

### CRUD Operations

- **Create**: Add new ambulances and doctors with validation
- **Read**: View paginated lists with filtering options
- **Update**: Edit existing records with optimistic updates
- **Delete**: Remove records with confirmation

### Pagination

- Displays 10 records per page by default
- Supports custom page sizes
- Includes total count and page navigation

### Record Details

For each record, the following details are shown:
- Title
- Description
- Location
- Image

### State Management

- **Loading State**: Shows a loading indicator during API calls
- **Error State**: Displays user-friendly error messages
- **Empty State**: Shows appropriate messaging for no results

## Performance Considerations

- Image optimization through Cloudinary
- Pagination for large datasets

## Notes

- The app uses SQLite for easy setup and development
- Production deployments might consider using PostgreSQL
- Images are processed and stored via Cloudinary

## Conclusion

This project demonstrates a production-ready application for managing ambulance and doctor records. It includes comprehensive CRUD operations, robust testing, proper database management, and efficient state handling, making it suitable for real-world deployment.