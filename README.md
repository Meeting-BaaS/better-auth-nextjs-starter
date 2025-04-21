# Meeting BaaS Auth

A modern authentication system built with Next.js, featuring secure user management, session handling, and email verification capabilities.

## Features

- 🔐 Secure authentication with session management
- 📧 Email verification system
- 👤 User profile management
- 📱 Responsive design
- 🚀 Built with Next.js 15 and Turbopack
- 🎨 Modern UI with Tailwind CSS and Radix UI components

## Tech Stack

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS 4.1.3
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Email**: React Email with Resend
- **Authentication**: Better Auth
- **State Management**: React 19
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm 10.6.5 or later
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd meeting-baas-auth
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables in `.env`

4. Run database migrations:
   ```bash
   pnpm run migrate
   ```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run Biome linter
- `pnpm check-types`: Check TypeScript types

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── database/        # Database configuration and migrations
├── email-templates/ # Email templates
├── lib/            # Utility functions and shared logic
├── migrations/     # Database migration files
├── public/         # Static assets
├── server/         # Server-side code
└── styles/         # Global styles
```

## Authentication Flow

The application uses a secure authentication system with the following features:

- Session-based authentication
- Email verification
- Password-based and OAuth authentication
- Secure cookie handling
- CORS protection for API routes

## Database Schema

The application uses the following main tables:

- `users`: User profiles and company information
- `sessions`: Active user sessions
- `accounts`: Authentication provider accounts
- `verifications`: Email verification tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
