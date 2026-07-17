# AI Resume Job Matcher

An AI-powered Resume Job Matcher built using **Spring Boot**, **Spring Security**, **Spring Data JPA**, and **MySQL**. The application allows users to register securely and will later support resume parsing, AI-powered job matching, JWT authentication, and job recommendations.

## 🚀 Features (Completed)

- User Registration API
- Spring Boot REST API
- MySQL Database Integration
- Spring Data JPA (Hibernate)
- Spring Security Configuration
- DTO-based Request Handling
- Layered Architecture (Controller, Service, Repository)
- Automatic Table Creation using Hibernate

---

## 🛠️ Tech Stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Lombok
- Postman

---

## 📁 Project Structure

```
src
└── main
    ├── java
    │   └── com.aditya.resumejobmatcher
    │       ├── controller
    │       ├── dto
    │       ├── entity
    │       ├── repository
    │       ├── security
    │       ├── service
    │       └── AiResumeJobMatcherApplication.java
    │
    └── resources
        └── application.properties
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/adityaom589/Ai-Resume-Job-Matcher.git
```

### 2. Open the project

Import the project into IntelliJ IDEA as a Maven project.

### 3. Create MySQL Database

```sql
CREATE DATABASE resume_job_matcher;
```

### 4. Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_job_matcher
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 5. Run the project

```bash
mvn spring-boot:run
```

or run the `AiResumeJobMatcherApplication` class from IntelliJ.

---

## 📌 API

### Register User

**POST**

```
http://localhost:8080/api/auth/register
```

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

---

## 🗄️ Database

Current Table

- users

Columns

- id
- full_name
- email
- password
- role
- created_at

---

## ✅ Current Progress

- Spring Boot Project Setup
- MySQL Connected
- User Entity Created
- User Repository
- User Service
- Registration API
- Spring Security Configuration
- User Registration Stored in Database
- GitHub Repository Created

---

## 🚧 Upcoming Features

- JWT Authentication
- Login API
- BCrypt Password Encryption
- Resume Upload
- Resume Parsing
- AI Resume Analysis
- Job Matching Algorithm
- Job Recommendation Engine
- File Storage
- React Frontend
- Deployment

---

## 🧪 Testing

API tested using **Postman**.

Verified:

- User Registration
- Database Persistence
- HTTP Responses

---

## 📸 Future Screenshots

- Postman Response
- MySQL Workbench
- Swagger UI
- Application Screens

---

## 👨‍💻 Author

**Aditya Maurya**

GitHub:
https://github.com/adityaom589

Project Repository:
https://github.com/adityaom589/Ai-Resume-Job-Matcher

---

## ⭐ Project Status

🚧 In Development

Current Milestone:
✔️ Day 1 Completed
