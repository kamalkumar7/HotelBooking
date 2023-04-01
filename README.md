# Hotel Booking MERN Site

This is a hotel booking web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to search for available hotels, view their details and book a room.

##Features

🔒 User authentication and authorization

🔍Search for hotels by location, dates and number of guests

🧾View hotel details, amenities and room types

👍Book a room

🕐View booking history and cancel bookings


## Technologies

MongoDB

Express.js

React

Node.js

Context-API

Material-UI

FireBase Authentication

Firebase Store to store pictures



## Getting Started
To get started with the project, clone the repository to your local machine:
```
git clone https://github.com/kamalkumar7/HotelBooking.git
```

## Installation
After cloning the repository, install give all the environment variables in .env file. ```MONGO_URL``` for mongo connection url and ```JWT``` for JWT secret key the dependencies for both the server and client:


```
cd HotelBooking
cd api
npm install
node index.js      // Backend is running (by default on port ```4000```)
cd..
cd client
npm install
yarn run dev   // Frontend is running (by default on port ```http://localhost:5173```)
```



