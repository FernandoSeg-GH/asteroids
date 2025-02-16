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

### Frontend:

- NextJs 15 with Typescript (with App Router)
- Tailwind for styling
- Server actions to fetch data from our backend

### Backend:

- NestJs with Typescript
- Swagger (for easily check our endpoints)
- In-Memory data storage for storing favorites (_In a real world scenario I would setup a database to store favories_)

### Docker

- Using docker for compiling both backend and frontned in a single instance.
- App deployment to GCLOUD.
