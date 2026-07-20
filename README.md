# AI Resume Job Matcher

A Spring Boot backend application that enables users to securely register, log in, upload resumes, and lays the foundation for AI-powered resume analysis and job matching.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- BCrypt Password Encryption
- JWT Authentication
- Protected REST APIs
- Fetch Logged-in User Profile

### Resume Management
- Upload Resume (PDF)
- JWT Protected Upload API
- Store PDF in Local Storage
- Save Resume Metadata in MySQL
- Link Uploaded Resume with Logged-in User

---

## 🛠️ Tech Stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA (Hibernate)
- MySQL
- JWT (JSON Web Token)
- Maven
- Lombok

---

## 📁 Project Structure

```
src/main/java/com/aditya/resumejobmatcher/

├── controller
│   ├── AuthController.java
│   ├── UserController.java
│   └── ResumeController.java
│
├── dto
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   └── UserProfileResponse.java
│
├── entity
│   ├── User.java
│   └── Resume.java
│
├── repository
│   ├── UserRepository.java
│   └── ResumeRepository.java
│
├── security
│   ├── SecurityConfig.java
│   ├── JwtService.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
│
├── service
│   ├── UserService.java
│   ├── UserServiceImpl.java
│   ├── ResumeService.java
│   └── ResumeServiceImpl.java
│
└── AiResumeJobMatcherApplication.java
```

---

## ⚙️ Setup

### Clone Repository

```bash
git clone https://github.com/adityaom589/Ai-Resume-Job-Matcher.git
```

### Navigate to Project

```bash
cd Ai-Resume-Job-Matcher
```

### Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_job_matcher
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000
```

### Run the Application

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

## 📌 REST APIs

### Register User

```
POST /api/auth/register
```

---

### Login User

```
POST /api/auth/login
```

Returns a JWT Token.

---

### Get Logged-in User Profile

```
GET /api/user/profile
```

Authorization Header

```
Bearer <JWT_TOKEN>
```

---

### Upload Resume

```
POST /api/resume/upload
```

Authorization Header

```
Bearer <JWT_TOKEN>
```

Body

```
form-data

Key : file
Type: File
```

---

## 🔐 Authentication Flow

```
Register
      │
      ▼
BCrypt Password
      │
      ▼
Login
      │
      ▼
JWT Generated
      │
      ▼
Bearer Token
      │
      ▼
JWT Filter
      │
      ▼
Protected APIs
```

---

## 📄 Resume Upload Flow

```
Authenticated User
        │
        ▼
Upload PDF
        │
        ▼
MultipartFile
        │
        ▼
Save File in uploads/
        │
        ▼
Save Resume Metadata
        │
        ▼
MySQL Database
```

---

## 🗄️ Database Tables

### users

- id
- full_name
- email
- password
- role
- created_at

### resumes

- id
- file_name
- file_type
- file_path
- uploaded_at
- user_id

---

## ✅ Completed Features

- ✔ User Registration
- ✔ User Login
- ✔ BCrypt Password Encoding
- ✔ JWT Authentication
- ✔ JWT Authorization
- ✔ Custom UserDetailsService
- ✔ JWT Authentication Filter
- ✔ Protected REST APIs
- ✔ User Profile API
- ✔ Resume Upload API
- ✔ Local PDF Storage
- ✔ Resume Metadata Storage
- ✔ Resume–User Relationship

---

## 🚧 Upcoming Features

- Extract Text from PDF
- Resume Parsing
- AI Resume Analysis
- Job Matching
- Resume Score
- AI Suggestions
- React Frontend
- Admin Dashboard

---

## 📚 Key Concepts Used

- Spring Boot
- Spring Security
- JWT Authentication
- BCrypt Password Encoding
- REST APIs
- JPA & Hibernate
- Repository Pattern
- Service Layer
- DTO Pattern
- Multipart File Upload
- File Handling
- MySQL Relationships

---

## 👨‍💻 Author

**Aditya Maurya**

GitHub: https://github.com/adityaom589
