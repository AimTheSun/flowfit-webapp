# FlowFit

Please note that **the application is currently not deployed on AWS**. It was initially deployed as part of our final course (bootcamp) presentation, but we are now focusing on enhancing and improving the platform. The entire project was developed within **only** a **72-hour timeframe** to meet the requirements of the course's final presentation. We are now refining the app, optimizing performance, and adding new features before **re-deploying it**. Stay tuned for further updates!

FlowFit is a platform developed to address the specific needs of a gym in Vagos, designed to optimize gym operations and improve both client and operational experiences. It combines modern technologies to provide an efficient and user-friendly system.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot, Spring MVC, JPA, Hibernate, REST APIs, Maven, Lombok, Embedded Tomcat (for deployment)
- **Database:** MySQL
- **Authentication:** JWT
- **Testing:** Postman
- **Design:** Modern animations, gradients, and progress bars.
- **Deploy:** AWS

## Key Features
- Client management system
- Intuitive dashboard for gym operations
- QR Code check-in for clients
- Client app view with chatbot (with Identities - Personal Trainer and a Nutricionist)

## Impact
- Increased operational efficiency
- More engaged clients
- Data-driven decision-making

## Challenges Faced During Development

The development of this project was not without its challenges. The main difficulty was the **extremely limited time** we had to build such a complex application. We had only **72 hours** to develop everything, which created a lot of pressure throughout the process. Additionally, the **deployment on AWS** was another major obstacle. Since we were dealing with two applications within the same deployment, many configuration issues arose, leading to a real headache. After many hours of attempts and with the help of a senior developer, we managed to resolve the issue. On the frontend side, some parts of the application didn't communicate properly due to the lack of time to perform more detailed integrations. All of this happened under **immense pressure** to deliver the project on time. However, despite these challenges, we managed to overcome the obstacles and, in the end, **won the Best Application** award for the challenge, with a certificate as recognition. The experience was tough, but rewarding!


## How to Run Locally

### Prerequisites
- Java (for backend)
- MySQL (for database)
- Node.js (for frontend, if applicable)

### Backend Setup
1. Clone the repository.
2. Navigate to the `backend-flowfit` directory.
4. Build and run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
5. Ensure MySQL is running and configure the database in the application.properties file.

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

