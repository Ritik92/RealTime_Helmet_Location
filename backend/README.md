# Smart Helmet Backend

## Overview

The Smart Helmet Backend is a comprehensive, real-time system designed to enhance rider safety through automated collision detection, emergency response notifications, and live location tracking. This backend application supports a smart helmet equipped with various sensors to detect collisions and send critical alerts to emergency contacts via SMS and WhatsApp.

## Features

- **Real-Time Collision Detection**: Leverages accelerometer and gyroscope data to detect significant impacts and determine the severity of a collision.
- **Automated Emergency Response**: Notifies emergency contacts with the rider's live location through SMS and WhatsApp in case of an accident.
- **Live Location Tracking**: Continuously tracks and updates the rider's location, sharing it automatically upon detecting a collision.
- **Scalable Architecture**: Built with Node.js, Express.js, and MongoDB to handle concurrent connections and large datasets efficiently.
- **Modular Design**: The codebase is structured with modular components, making it easy to extend or modify individual functionalities.

## Installation

To set up and run the Smart Helmet Backend locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prabhsingh14/smart-helmet-backend.git
   cd smart-helmet-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
   TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
   TEXTBELT_API_KEY=<your-textbelt-api-key>
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

## Tech Stack

- **Node.js & Express.js**: For building the backend server and handling API requests.
- **MongoDB**: For efficient data storage and retrieval of helmet, sensor, and location data.
- **WebSocket**: For real-time communication between the helmet and the server.
- **Twilio API**: For sending emergency notifications via SMS and WhatsApp.
- **Textbelt**: As an alternative SMS service for sending alerts.

## Challenges and Solutions

- **Real-Time Data Processing**: Implemented WebSocket communication to handle real-time sensor data and ensure timely collision detection and response.
- **Reliable Notification Delivery**: Integrated Twilio and Textbelt to ensure emergency messages are sent promptly, even in low-connectivity environments.
- **Scalability**: Designed the system to scale efficiently with MongoDB and modular components, ensuring performance under high load conditions.

## Contributing

We welcome contributions to enhance the Smart Helmet Backend. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## Contact

For questions, feedback, or collaboration, please reach out at [prabhsingh1407@gmail.com](mailto:prabhsingh1407l@gmail.com).
