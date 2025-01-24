# FlowFit

Please note that **the application is currently not deployed on AWS**. While it was previously deployed as part of the final course presentation, we are now focusing on improving and refining the platform. The initial deployment was done within a **72-hour timeframe**, which allowed us to showcase the core functionalities. However, as we continue to enhance the app, we are working on optimizing its performance and adding additional features before **re-deploying it**. Stay tuned for updates on the deployment!

FlowFit is a platform developed to address the specific needs of a gym in Vagos, designed to optimize gym operations and improve both client and operational experiences. It combines modern technologies to provide an efficient and user-friendly system.

## The Problem
A gym is more than just a place to work out—it's a space to help individuals reach their goals. The gym in Vagos faced a significant challenge: the lack of an efficient client management system. Manual processes were making organization, personalized service, and client motivation difficult.

## The Solution
FlowFit was developed to overcome this challenge. It is a modern, functional platform that digitalizes and optimizes gym operations, enhancing the overall customer experience.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot, Spring MVC, JPA, Hibernate, REST APIs, Maven, Lombok, Embedded Tomcat (for deployment)
- **Database:** MySQL
- **Authentication:** JWT
- **Testing:** Postman
- **Design:** Modern animations, gradients, and progress bars.

## Key Features
- Client management system
- Intuitive dashboard for gym operations
- QR Code check-in for clients
- Real-time reports for better decision-making

## Impact
- Increased operational efficiency
- More engaged clients
- Data-driven decision-making

## How to Run Locally

### Prerequisites
- Java (for backend)
- MySQL (for database)
- Node.js (for frontend, if applicable)

### Backend Setup
1. Clone the repository.
2. Navigate to the `sb-fitflow` directory.
3. Build and run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
4. Ensure MySQL is running and configure the database in the application.properties file.

### Frontend Setup
1. Navigate to the `flowfitClient` and `flowfitAdmin` directories.
2. Install dependencies:
   ```bash
   npm install
   npm start

### Register and Login

1. **Register**: Open the app and navigate to the registration page. Fill in the required details (e.g., name, email, password) and submit the form to create a new account.

2. **Login**: After registration, you can log in with the credentials you just created. Enter your email and password on the login page and submit the form to access the app.

Once logged in, you’ll have access to all the features of the platform, if you're a admin, you see content such as client management, dashboard, and reports. And if you login as a client, you see the features that we've implemented.

