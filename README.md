# Asteroids - Tech Challenge

## ---- Requirements --------------------------------------------

### Test description

Create an app to see information about asteroids.
The app should:

- Display a list of asteroids
- Search by a range of dates
- See the detail of the asteroids by clicking on one of the items
- Sort the asteroids by name

Optional

- Add them to favourite
- Show a list of favourite
- Display details of favourite asteroids by click on the items form the list

_Don't forget that this must be a full-stack application._
We expect an app with the implementation of a backend and a frontend side.

Use the following API:

- <https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY>

## ---- Stack --------------------------------------------

### Backend:

- NestJs with with Swagger (to easily handle endpoints)
- Supabase postgres database to store user registration and favorites
- Strongly typed response (we'll use these same types in our frontend)

### Frontend:

- NextJs 15 with Typescript (with App Router)
- Tailwind for styling
- Server actions to fetch data from our backend
- Next--Auth for session managemnet and route protection
- Context API to create a state context and reuse logic
- Modular/SOLID...

### Docker

- Using docker for compiling both backend and frontned in a single instance.
- App deployment to GCLOUD or IONOS VPS.

## ---- Updates --------------------------------------------

To start the application, follow the setup instructions below:

1. **Docker Setup (Click-and-Go)**:

   - If you have Docker installed locally, the quickest way to run both frontend and backend is using Docker Compose:
     ```
     docker-compose up --build
     ```
   - This will build the necessary containers and run the full application package, including both the backend and frontend.

2. **Backend Setup**:

   - Navigate to the **root/backend** directory and install the dependencies by running:
     ```
     pnpm install
     ```
   - Once the installation is complete, start the backend development server with:
     ```
     pnpm run start:dev
     ```

3. **Frontend Setup**:
   - Navigate to the **root/frontend** directory and install the dependencies using either:
     ```
     pnpm install
     ```
     or
     ```
     npm install
     ```
   - To run the frontend in development mode, execute:
     ```
     pnpm run dev
     ```

### Summary of Core Updates

- **Backend Architecture**:

  - A NestJS-based backend has been developed, incorporating several core services:

    - Asteroid Service: Handles the fetching and management of asteroid data.
    - User Service: Manages user registration, authentication, and JWT token-based sessions.
    - Auth Service: Implements user registration and JWT authentication for secure login.

  - The backend is connected to a Supabase database to handle persistent storage of user data and favorites.

- **Frontend Architecture**:
  - React Context API for efficient state management across various components.
  - 'State Actions' are dispatched via the AsteroidsContext to handle the addition, removal, etc...
  - Reusable Components
  - Server Actions
