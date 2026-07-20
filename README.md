# 🛒 ShopSphere

A production-ready E-Commerce Backend built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**, following modern backend architecture and industry best practices.

ShopSphere provides a secure and scalable REST API for managing authentication, users, products, categories, carts, wishlists, orders, payments, reviews, coupons, and administrative operations. The project also integrates Redis caching, BullMQ background jobs, Docker containerization, automated testing, API documentation, and CI/CD to simulate a real-world backend application.

---

## 🚀 Features

### Authentication & Authorization

- JWT Authentication (Access & Refresh Tokens)
- Secure HTTP-only Cookie Authentication
- Role-Based Access Control (Admin / Customer)
- Password Hashing using bcrypt
- Protected Routes
- Logout & Token Refresh

### User Features

- User Registration & Login
- Profile Management
- Change Password
- Upload Profile Image
- Cloudinary Image Storage

### Product Management

- Product CRUD Operations
- Category Management
- Search Products
- Filter Products
- Sort Products
- Pagination

### Shopping Features

- Shopping Cart
- Wishlist
- Product Reviews & Ratings
- Coupon System
- Order Management

### Payment Integration

- Razorpay Payment Gateway
- Payment Verification
- Order Confirmation

### Performance & Scalability

- Redis Caching
- BullMQ Background Jobs
- Background Email Processing

### Security

- Helmet
- CORS Configuration
- Rate Limiting
- Input Validation with Zod
- Secure Password Hashing
- Environment Variables
- HTTP-only Cookies

### Documentation & Developer Experience

- Swagger API Documentation
- Docker Support
- GitHub Actions CI
- Winston Logging
- Jest Testing
- Supertest Integration
- TypeScript
- ESLint & Prettier

---

# 🛠 Tech Stack

## Backend

| Technology     | Purpose                |
| -------------- | ---------------------- |
| Node.js        | Runtime Environment    |
| Express.js     | REST API Framework     |
| TypeScript     | Type Safety            |
| MongoDB        | Database               |
| Mongoose       | ODM                    |
| JWT            | Authentication         |
| bcrypt         | Password Hashing       |
| Zod            | Request Validation     |
| Redis          | Caching                |
| BullMQ         | Background Jobs        |
| Nodemailer     | Email Service          |
| Cloudinary     | Image Storage          |
| Razorpay       | Payment Gateway        |
| Winston        | Logging                |
| Swagger        | API Documentation      |
| Docker         | Containerization       |
| Jest           | Unit Testing           |
| Supertest      | API Testing            |
| GitHub Actions | Continuous Integration |

---

# 🏗 Project Architecture

The project follows a modular and scalable architecture where every feature is separated into dedicated layers.

```text
Client
   │
   ▼
Express Routes
   │
   ▼
Middleware
(Authentication, Validation, Security)
   │
   ▼
Controllers
   │
   ▼
Services / Business Logic
   │
   ▼
Database (MongoDB)

        │
        ├── Redis (Caching)
        ├── BullMQ (Background Jobs)
        ├── Cloudinary (Media Storage)
        ├── Razorpay (Payments)
        └── Nodemailer (Emails)
```

This layered architecture improves maintainability, scalability, testing, and separation of concerns.

---

# 📂 Project Structure

```text
ShopSphere
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── validations
│   │   ├── utils
│   │   ├── jobs
│   │   ├── queues
│   │   ├── workers
│   │   ├── emails
│   │   └── ...
│   │
│   ├── tests
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│
├── docker-compose.yml
│
└── README.md
```

---

# ✨ Highlights

- Production-ready REST API
- Secure Authentication System
- Role-Based Authorization
- Background Job Processing using BullMQ
- Redis Performance Caching
- Razorpay Payment Integration
- Cloudinary Media Storage
- Docker Container Support
- Swagger API Documentation
- Automated Testing with Jest & Supertest
- CI/CD using GitHub Actions
- Modular & Scalable Folder Structure

---

## 📖 What's Next?

The next sections include:

- Installation
- Environment Setup
- Docker Setup
- API Documentation
- Authentication Flow
- Redis Integration
- BullMQ Jobs
- Testing
- CI/CD
- Deployment
- Future Improvements

# ⚙️ Getting Started

Follow the steps below to set up the project locally.

---

## 📋 Prerequisites

Make sure the following tools are installed on your system before running the project.

| Software            | Recommended Version |
| ------------------- | ------------------- |
| Node.js             | v20+                |
| npm                 | Latest              |
| MongoDB             | Latest              |
| Redis               | Latest              |
| Docker _(Optional)_ | Latest              |
| Git                 | Latest              |

Verify your installation:

```bash
node -v
npm -v
git --version
```

---

# 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ShopSphere.git
```

### 2. Navigate to the backend

```bash
cd ShopSphere/backend
```

### 3. Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

A sample environment configuration is already available inside:

```text
backend/.env.example
```

Copy the file and rename it to:

```text
.env
```

Update the placeholder values with your own credentials before starting the application.

> **Note**
>
> The `.env` file is ignored by Git for security reasons. Only `.env.example` is committed to the repository.

---

# ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

---

# 🐳 Running with Docker

The project includes Docker support for quick local setup.

Build and start all required services:

```bash
docker compose up --build
```

Run containers in detached mode:

```bash
docker compose up -d
```

Stop all containers:

```bash
docker compose down
```

---

# 📚 API Documentation

Interactive API documentation is available through Swagger.

Once the server is running, open:

```text
http://localhost:5000/api-docs
```

Swagger provides:

- Complete API Reference
- Request & Response Examples
- Authentication Support
- Endpoint Testing

---

# 📜 Available Scripts

The backend provides several useful npm scripts for development and testing.

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start development server           |
| `npm run build`  | Build TypeScript project           |
| `npm start`      | Start production server            |
| `npm test`       | Run test suite                     |
| `npm run lint`   | Lint the project _(if configured)_ |
| `npm run format` | Format code _(if configured)_      |

---

# 📦 Services Used

The application integrates multiple services to provide production-ready functionality.

| Service    | Purpose                   |
| ---------- | ------------------------- |
| MongoDB    | Primary Database          |
| Redis      | Caching Layer             |
| BullMQ     | Background Job Processing |
| Cloudinary | Image Storage             |
| Razorpay   | Payment Gateway           |
| Gmail SMTP | Email Delivery            |

---

# 💡 Development Workflow

The recommended development workflow is:

```text
Clone Repository
        │
        ▼
Install Dependencies
        │
        ▼
Configure .env
        │
        ▼
Start MongoDB & Redis
        │
        ▼
Run Development Server
        │
        ▼
Open Swagger
        │
        ▼
Develop & Test APIs
```

---

## 📖 Next Section

The next section covers:

- Authentication & Authorization
- JWT Authentication
- Refresh Token Flow
- Role-Based Access Control
- Redis Caching
- BullMQ Background Jobs
- Payment Integration
- Testing
- CI/CD Pipeline
- Deployment

# 🔐 Authentication & Authorization

ShopSphere implements a secure authentication and authorization system using **JWT (JSON Web Tokens)** with **Access Tokens** and **Refresh Tokens**.

User sessions are managed using **HTTP-only cookies**, reducing exposure to common client-side attacks while providing a secure authentication flow.

### Features

- JWT Access Token Authentication
- Refresh Token Support
- HTTP-only Cookie Authentication
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Access Control (RBAC)
- Secure Logout

---

# 🛒 Core Modules

The backend is organized into independent modules, making the project scalable and easy to maintain.

| Module     | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| Users      | User registration, authentication and profile management      |
| Categories | Product category management                                   |
| Products   | Product CRUD operations with search, filtering and pagination |
| Cart       | Shopping cart management                                      |
| Wishlist   | Wishlist functionality                                        |
| Reviews    | Product reviews and ratings                                   |
| Coupons    | Discount coupon management                                    |
| Orders     | Order creation and management                                 |

Each module follows a consistent architecture consisting of routes, controllers, models, validation, and middleware.

---

# ⚡ Redis Caching

Redis is integrated to improve application performance by reducing unnecessary database queries.

### Benefits

- Faster API responses
- Reduced MongoDB load
- Improved scalability
- Better user experience

Caching is applied to frequently accessed data where appropriate to optimize read operations.

---

# 📬 Background Jobs with BullMQ

ShopSphere uses **BullMQ** with **Redis** to process time-consuming operations asynchronously.

Instead of executing long-running tasks during an HTTP request, jobs are added to a queue and processed by dedicated workers in the background.

### Current Background Jobs

- Welcome Email Processing

### Features

- Retry Mechanism
- Background Workers
- Queue-based Processing
- Improved API Response Time

This architecture keeps the application responsive while handling asynchronous tasks efficiently.

---

# ☁️ Cloudinary Integration

Cloudinary is used for secure cloud-based media storage.

Uploaded images are stored outside the application server, making media management scalable and reliable.

### Supported Uploads

- User Profile Images
- Product Images

---

# 💳 Razorpay Payment Integration

ShopSphere integrates Razorpay to support secure online payments.

Payment verification is performed before confirming an order, ensuring transaction integrity and preventing invalid payment requests.

### Payment Flow

- Create Order
- Complete Payment
- Verify Signature
- Confirm Order

---

# 📧 Email Service

The application sends transactional emails using **Nodemailer**.

Email templates are separated from business logic, making them reusable and easier to maintain.

Current email functionality includes:

- Welcome Email

Email delivery is processed through BullMQ workers to avoid blocking API requests.

---

# 🧪 Testing

Testing is included to improve application reliability and maintain code quality.

### Tools

- Jest
- Supertest
- mongodb-memory-server

Tests are designed to validate API behavior in an isolated environment without affecting the production database.

---

# 🛡️ Security Features

Several security best practices are implemented throughout the application.

### Security Measures

- Helmet
- CORS Configuration
- Rate Limiting
- Environment Variables
- Zod Request Validation
- Password Hashing (bcrypt)
- HTTP-only Cookies
- JWT Authentication

These measures help protect the application against common security vulnerabilities while ensuring secure communication between clients and the server.

---

# 🔄 Continuous Integration

The project includes a GitHub Actions workflow for Continuous Integration.

### CI Pipeline

- Install Dependencies
- Build Project
- Run Tests
- Verify Build

This helps maintain code quality by automatically validating every change pushed to the repository.

---

# ⭐ Backend Highlights

- Production-ready REST API
- Modular Architecture
- TypeScript Support
- Secure JWT Authentication
- Role-Based Authorization
- Redis Caching
- BullMQ Background Jobs
- Cloudinary Image Storage
- Razorpay Payment Integration
- Swagger Documentation
- Docker Support
- Automated Testing
- GitHub Actions CI
- Scalable Folder Structure

---

## 📖 Next Section

The final section includes:

- Future Improvements
- Contributing
- License
- Author
- Acknowledgements

# 🚀 Future Improvements

The following enhancements are planned for future releases:

- Product Recommendation System
- Inventory & Stock Management
- Order Tracking
- User Notifications
- Sales Analytics Dashboard
- Multi-Vendor Marketplace Support
- Multi-language Support
- API Versioning
- Production Deployment

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve the project:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

Please ensure that new changes follow the existing project structure and coding standards.

---

# 📄 License

License: This project is intended for educational and portfolio purposes.

---

# 👨‍💻 Author

**Developer:** Sonu kushwaha

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 🙏 Acknowledgements

This project was built using several excellent open-source technologies and services.

Special thanks to the communities behind:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Redis
- BullMQ
- Cloudinary
- Razorpay
- Swagger
- Docker
- Jest

Their tools and documentation make modern backend development significantly easier.

---

# 📌 Project Summary

ShopSphere is a production-oriented backend project designed to demonstrate modern backend development practices.

The project focuses on:

- Clean Architecture
- Secure Authentication
- RESTful API Design
- Modular Code Organization
- Performance Optimization
- Background Job Processing
- Payment Integration
- Cloud Media Storage
- API Documentation
- Automated Testing
- Docker-based Development
- Continuous Integration

This repository represents a complete backend foundation for building scalable e-commerce applications.

---

## ⭐ If you like this project

Give this repository a **Star** and feel free to share your feedback or suggestions.
