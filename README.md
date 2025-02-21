# FlowFit

FlowFit is a comprehensive platform developed to address the specific needs of a gym in Vagos. Designed to optimize gym operations and improve both client and operational experiences, FlowFit combines modern technologies and a user-friendly interface to deliver efficient, data-driven solutions. The app now includes new features such as real-time monitoring of gym occupancy and an integrated Chat Bot with specialized roles.

---

## Deployment Overview

1. **Cloud Database Setup:**  
   - **AWS RDS:** We created and configured a MySQL cloud database on AWS RDS for a highly available, secure data store.  
   - **Management:** Connected the RDS instance to MySQL Workbench for proper configuration and monitoring.

2. **Backend Integration & Deployment:**  
   - **Spring Boot Backend:** Integrated the cloud database with our Spring Boot backend.  
   - **CORS Configuration:** Added a custom `WebConfig` class to enable CORS, ensuring smooth communication with our frontend hosted on AWS S3.  
   - **EC2 Instance:** Created an AWS EC2 instance to host the backend application.  
   - **Deployment Process:** Connected to the EC2 instance via the command line, built our project, and deployed the updated backend to the EC2 environment.

3. **Frontend Deployment:**  
   - **Vite Build:** Used Vite to build our React/JavaScript frontend (`npm run build`), generating optimized static files.  
   - **AWS S3 Hosting:** Deployed the built static files to an AWS S3 bucket configured for static website hosting.  
   - **Backend Connection:** Configured the frontend to communicate with the EC2-hosted backend via its cloud URL.

4. **Full Flow Testing:**  
   - Performed end-to-end testing to verify that users can seamlessly interact with the system—from accessing the frontend and performing logins/registrations to the backend correctly processing requests.

This deployment strategy leverages AWS services (RDS, EC2, and S3) to provide a robust, scalable, and secure environment for our application.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (with Vite for optimized builds)
- **Backend:** Java, Spring Boot, Spring MVC, JPA, Hibernate, REST APIs, Maven, Lombok, Embedded Tomcat
- **Database:** MySQL (hosted on AWS RDS)
- **Authentication:** JWT
- **Testing:** Postman
- **Design:** Modern animations, gradients, and progress bars
- **Deployment:** AWS (EC2 for backend, S3 for frontend)

---

## Key Features

- **Client Management System:** Efficient management of gym clients.
- **Intuitive Dashboard:** An easy-to-use dashboard for gym operations.
- **QR Code Check-In:** Fast and secure check-in process for clients.
- **Client Gym Monitoring:** Real-time view of the number of clients in the gym.
- **Integrated Chat Bot:** A chat feature offering personalized advice with two distinct roles—Personal Trainer and Nutritionist.

---

## Impact

- **Increased Operational Efficiency:** Streamlined processes for both staff and clients.
- **Enhanced Client Engagement:** Real-time data and interactive features keep clients informed and involved.
- **Data-Driven Decision Making:** Comprehensive analytics to support better management decisions.

---

