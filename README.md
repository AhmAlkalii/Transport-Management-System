# Transport Management System

## Overview
The **Transport Management System** is a comprehensive web application designed to enhance the booking experience for bus and train travel. Built using the **MERN** stack (**MongoDB, Express.js, React.js, Node.js**), the system provides a seamless platform for users to search routes, book trips, and manage their itineraries. It also features **JWT-based authentication** for secure logins and **Stripe integration** for payment processing.

## Features
### Frontend:
- Search for bus/train routes by origin, destination, and date.
- Real-time booking system with live seat availability.
- Responsive design optimized for both desktop and mobile devices.

### Backend:
- RESTful APIs for managing users, bookings, vehicles, and routes.
- Secure authentication and role-based authorization.
- Integration with **Stripe** for secure payment processing.

## Tech Stack
- **Frontend:** React.js, Redux, React Router, Material-UI, Bootstrap.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **Payment Gateway:** Stripe.
- **Project Management:** Azure DevOps.
- **Design & Prototyping:** Figma.

## Installation

### Prerequisites:
- **Node.js** and **MongoDB** installed on your system.

### Backend Setup:
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_folder>/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend folder with the following:
   ```env
   PORT=4000
   MONGO_URI=<your_mongo_connection_string>
   SECRET=<your_jwt_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   DISTANCE_KEY=<your_distance_matrix_api_key>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd <project_folder>/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- **User API:** `/User/signup`, `/User/login`
- **Route API:** `/Route`, `/Route/:id`
- **Vehicle API:** `/Vehicle`, `/Vehicle/create`
- **Seat API:** `/Seat`, `/Seat/create`

For a complete list of APIs and request formats, refer to the documentation.

## Future Enhancements
- Mobile application development.
- Real-time bus/train tracking.
- Dynamic pricing and discount features.
- Multi-language support.

## Authors
- **Marcin Siębor**
- **Ahmed Mohammed**
- **Nyengeterayi Mawire**

