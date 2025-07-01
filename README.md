# SMS V2 - Next.js Version

A mentor management and messaging system built with Next.js, MongoDB, and Twilio.

## Features

- **Authentication**: Auth0 integration
- **Dashboard**: Overview of matches, users, and messages
- **Matches**: Create and manage mentor-student matches
- **Users**: View all students and mentors
- **Messages**: View all sent messages
- **Send SMS**: Send messages to mentors or students via Twilio

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Auth0
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret



### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Deploy to Vercel

```bash
vercel --prod
```

Make sure to add all environment variables in your Vercel dashboard.

## API Routes

- `GET /api/dashboard` - Dashboard statistics
- `GET /api/matches` - Get all matches
- `POST /api/matches` - Create a new match
- `GET /api/matches/[id]` - Get specific match
- `DELETE /api/matches/[id]` - Delete a match
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send admin SMS
- `GET /api/users` - Get all users (students and mentors)
- `POST /api/send-sms` - Send SMS via Twilio

## Pages

- `/` - Redirects to dashboard or login
- `/login` - Auth0 login page
- `/dashboard` - Main dashboard with statistics
- `/matches` - View and manage matches
- `/users` - View all students and mentors
- `/messages` - View all messages
- `/send-message` - Send SMS to users

## Database Models

- **Match**: Links students and mentors
- **Student**: Student information
- **Mentor**: Mentor information  
- **Message**: Message records

## Technologies Used

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: Auth0
- **SMS**: Twilio
- **Styling**: Tailwind CSS, Headless UI
