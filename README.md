To-Do List Application
This is a simple To-Do List application built using Next.js, React, and Prisma with a PostgreSQL database. The app allows users to create, update, delete, and search tasks.

Tech Stack:
- Next.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- TypeScript

Setup & Installation:
1. Clone the repository:
   `git clone https://github.com/your-username/todo-app.git`
   `cd todo-app`
2. Install dependencies:
   `npm install`
3. Setup the database and run Prisma migration:
   `npx prisma migrate dev --name init`
4. Start the development server:
   `npm run dev`

Running the Application:
The app will be available at `http://localhost:3000`. Use the interface to view, add, edit, and delete tasks.

Environment Variables:
- `DATABASE_URL`: Your PostgreSQL connection string.
Scripts:
`npm run dev`: Start the development server
`npm run build`: Build the app for production
`npm run start`: Start the app in production
`npm run prisma:migrate`: Run Prisma migrations
