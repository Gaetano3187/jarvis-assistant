# Jarvis Assistant

This project is a Next.js application built with TypeScript and TailwindCSS. It integrates Supabase for authentication and data storage and OpenAI for some AI features.

## Requirements

- Node.js 18 or later
- A Supabase project with the required tables
- An OpenAI API key for expense categorization

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd jarvis-assistant
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the values for:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON`
     - `OPENAI_API_KEY`
     - `CORS_ORIGIN` (origin allowed for Operator API)
4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

5. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```

## Features

- User authentication via Supabase
- Light/Dark theme toggle
- Shopping lists with voice input and weekly offers
- Expense management with GPT-based category suggestions
- Dashboard with interactive charts
- Profile page for nickname editing and password reset

## License

This project is provided as-is for demonstration purposes.
