# AI Resume Job Matcher

An AI-powered Resume Job Matcher backend built with **Spring Boot**, **Spring Security**, **JWT Authentication**, **MySQL**, and **Google Gemini AI**. The application allows users to securely upload resumes, manage them, and receive AI-generated resume reviews.

---

## Features

- User Registration & Login
- JWT Authentication & Authorization
- Secure Password Encryption using BCrypt
- Resume Upload (PDF)
- Resume Management APIs
- AI Resume Review using Google Gemini API
- PDF Text Extraction using Apache PDFBox
- RESTful APIs
- Swagger/OpenAPI Documentation
- Global Exception Handling
- MySQL Database Integration

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 4
- Spring Security
- Spring Data JPA
- JWT
- Hibernate

### Database
- MySQL

### AI
- Google Gemini API

### Documentation
- Swagger OpenAPI

### Libraries
- Apache PDFBox
- Jackson Databind
- Lombok

---

## Project Structure

```
src
 ├── ai
 ├── controller
 ├── dto
 ├── entity
 ├── exception
 ├── repository
 ├── security
 ├── service
 └── util
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adityaom589/Ai-Resume-Job-Matcher.git

cd Ai-Resume-Job-Matcher
```

---

### 2. Create MySQL Database

```sql
CREATE DATABASE resume_job_matcher;
```

---

### 3. Configure Environment Variables

The project uses placeholders for sensitive credentials.

Set the following values before running the application:

| Variable | Description |
|----------|-------------|
| DB_PASSWORD | MySQL database password |
| JWT_SECRET | Secret key used for JWT Authentication |
| GEMINI_API_KEY | Google Gemini API Key |

---

### 4. Configure application.properties

```properties
spring.application.name=ai-resume-job-matcher

spring.datasource.url=jdbc:mysql://localhost:3306/resume_job_matcher
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

gemini.api.key=${GEMINI_API_KEY}
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent

server.port=8080
```

---

### 5. Run the Project

```bash
mvn spring-boot:run
```

Application will start on:

```
http://localhost:8080
```

---

## Swagger API Documentation

```
http://localhost:8080/swagger-ui/index.html
```

---

## REST APIs

### Authentication
- Register User
- Login User

### Resume
- Upload Resume
- View Resume
- Delete Resume

### AI
- AI Resume Review using Google Gemini

---

## Security

- JWT Authentication
- BCrypt Password Encryption
- Protected REST APIs
- Sensitive credentials are excluded from the repository using environment variable placeholders.

---

## Current Status

✅ Backend Completed

- User Authentication
- Resume Management
- PDF Processing
- Google Gemini AI Integration
- Secure REST APIs
- Swagger Documentation
- MySQL Integration

---

## Next Phase

- React Frontend Development
- Backend Deployment
- Frontend Deployment

---

## Author

**Aditya Maurya**

GitHub: https://github.com/adityaom589


