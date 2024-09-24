# Backend with NodeJs, Express and MongoDB

## Project Description

This is the final backend project for a movie app developed during the backend module of the EDIT School's Full Stack Web Developer course.

## Features REST API Endpoints

- POST /auth/register - User registration.
- POST /auth/login - User login to obtain a JWT.
- GET /auth/users - (Admin only) Fetch a list of users.
- PUT /auth/users/:id - (Admin only) Update user details.
- DELETE /auth/user/:id - (Admin only) Delete a user.
- GET /api/movies - (Only logged users) Fetch a list of movie trailers with details.
- GET /api/movies/search - (Only logged users) Fetch a list of movie with pagination and sort and filters (sortBy realiseDate, search by realise year, name or genre).
- POST /api/movies - (Admin only) Add a new movie.
- PUT /api/movies/:id - (Admin only) Update movie details.
- DELETE /api/movies/:id - (Admin only) Delete a movie.



## Technologies Used

Node.js <br>
Express.js <br>
Typescript <br>
MongoDB <br>
Bcrypt <br>
JWT <br>
Mongoose <br>
CORS <br>



## How to Run the Project

### Clone the repository:

```
git clone https://github.com/sofialzira/BACKEND.git
cd BACKEND-FINAL-PROJECT
```

### Install dependencies:

```
npm install
```

### Run the development server:

```
npm run dev
```