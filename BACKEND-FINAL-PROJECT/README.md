# Backend with NodeJs, Express and MongoDB

## Project Description

This is a a API to power a website that enables users to discover and watch movie trailers. The website aims to offer a user-friendly interface for users to browse various movie trailers and view movie details. To access to see the movie trailers and posters, users must register and log in. 
<br> 
<br>
This projects was developed during the backend module of the EDIT School's Full Stack Web Developer course.

## Features

- User Registration and Login
- JWT Authentication
- View Movie Trailers
- Role-Based Access Control
- Movie Management (Admin Only)
- Static Folder for Poster Images


## REST API Endpoints

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

- Node.js 
- Express.js 
- Typescript 
- MongoDB 
- Bcrypt 
- JWT 
- Mongoose 
- CORS 


## Project Structure

Structured MVC (Model-View-Controller) pattern with separate folders for controllers, models, services, middleware, and routes. 
Authentication middleware to protect endpoints requiring authentication.


### Models
- User Model: Represents a registered website user with fields for username, email, password, and role.
- Movie Model: Describes a movie with fields for title, release date, trailer link, poster URL, and genres.


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