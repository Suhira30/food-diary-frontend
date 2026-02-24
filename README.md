# Food Diary Frontend

A Letterboxd-inspired restaurant diary application built with React.

## Features

- 🔐 User authentication (Login/Register)
- 🍽️ Restaurant browsing and search
- ⭐ Personal diary entries with ratings and reviews
- 👤 User profile with timeline and stats
- 💳 Pro subscription with Stripe integration
- 🌙 Beautiful dark theme inspired by Letterboxd

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- FoodTrack backend running on http://localhost:8080

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at http://localhost:3000

## Backend API

This frontend connects to the FoodTrack backend API running on port 8080.

Base URL: `http://localhost:8080/v1/food-diary`

### API Endpoints

- **Auth**: `/register`, `/login`
- **Restaurants**: `/restaurant/all`, `/restaurant/{id}`, `/restaurant/search`
- **Diary**: `/diary/add`, `/diary/update/{id}`, `/diary/favorites`
- **Profile**: `/profile/get/user-profile`, `/profile/timeline`
- **Subscription**: `/subscription/create-checkout`, `/subscription/status`

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable components
│   ├── common/       # Shared components (Navbar, Footer, etc.)
│   ├── restaurant/   # Restaurant-specific components
│   ├── diary/        # Diary entry components
│   └── profile/      # Profile-specific components
├── pages/            # Page components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Design Philosophy

This app is inspired by Letterboxd's elegant design:

- **Dark, premium aesthetic** with carefully chosen colors
- **Card-based layouts** for content organization
- **Typography-first** approach with clear hierarchy
- **Smooth interactions** with hover effects and transitions
- **User-focused** interface that's intuitive and beautiful

## License

MIT
