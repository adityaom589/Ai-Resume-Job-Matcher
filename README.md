# AI Resume Job Matcher

A Spring Boot backend application that provides secure user authentication using JWT and serves as the foundation for an AI-powered Resume Job Matcher.

## 🚀 Features

- User Registration
- User Login
- Password Encryption using BCrypt
- JWT Authentication
- Protected APIs
- Fetch Logged-in User Profile
- Spring Security Integration
- MySQL Database Integration

## 🛠️ Tech Stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- JWT (JSON Web Token)
- Maven
- Lombok

## 📁 Project Structure

```
src/main/java/com/aditya/resumejobmatcher/

├── controller
│   ├── AuthController
│   └── UserController
│
├── dto
│   ├── RegisterRequest
│   ├── LoginRequest
│   └── UserProfileResponse
│
├── entity
│   └── User
│
├── repository
│   └── UserRepository
│
├── security
│   ├── JwtService
│   ├── JwtAuthenticationFilter
│   ├── CustomUserDetailsService
│   └── SecurityConfig
│
├── service
│   ├── UserService
│   └── UserServiceImpl
```

## ⚙️ Setup

### Clone Repository

```bash
git clone https://github.com/adityaom589/Ai-Resume-Job-Matcher.git
```

### Navigate

```bash
cd Ai-Resume-Job-Matcher
```

### Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password

jwt.secret=your_secret_key
jwt.expiration=86400000
```

### Run Project

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

## 📌 API Endpoints

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

Returns a JWT Token.

### Get Logged-in User Profile

```
GET /api/user/profile
```

Authorization Header:

```
Bearer <JWT_TOKEN>
```

---

## 🔒 Authentication Flow

```
Register
    ↓
Password Encrypted (BCrypt)
    ↓
Login
    ↓
JWT Generated
    ↓
Bearer Token
    ↓
JWT Filter
    ↓
Protected APIs
```

---

## ✅ Completed Progress

- ✔ User Registration
- ✔ Login Authentication
- ✔ BCrypt Password Encoding
- ✔ JWT Token Generation
- ✔ JWT Validation
- ✔ Custom UserDetailsService
- ✔ JWT Authentication Filter
- ✔ Spring Security Configuration
- ✔ Protected REST APIs
- ✔ Logged-in User Profile API

---

## 📅 Upcoming Features

- Resume Upload (PDF)
- Resume Storage
- AI Resume Analysis
- Job Matching
- Resume Score
- Admin Dashboard
- Frontend (React)

---

## 👨‍💻 Author

Aditya Maurya

GitHub:
https://github.com/adityaom589
