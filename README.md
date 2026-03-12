# Task Forge – Mini task manager

## Introduction

The **Task Forge** is a Mini task manager full-stack web application designed to manage tasks with secure authentication, role-based authorization, and an interactive user interface. The system allows administrators and users to manage tasks efficiently.

The backend is built with **Spring Boot**, while the frontend is developed using **Next.js with TypeScript**.

# Key Features

- **User registration and login** with JWT authentication.
- **Role-based access control**.
- **Task management system** for creating, updating, deleting, and viewing tasks.
- **Task Filtering** for filter by due date or priority.
- **Admin dashboard** for managing users and tasks.
- **Pagination system** for efficient task listing.
- **API documentation**.
- **Database version control**.
- **Client-side form validation** 
- **Interactive UI alerts and confirmations**.
## Tech Stack

Backend
	- Java
	- Spring Boot
	- Spring Security

Frontend
	- HTML
	- CSS
	- Javascript / TypeScript
	- React
	- Next.js
	

Database
	- MySQL

Tools
	- Postman (API testing)
	- Git & GitHub
	- IntelliJ IDEA / VS Code
	- DBeaver / MySQL Workbench
	
## System Roles 

**USER**

- Register and log in
- Create tasks
- Update tasks
- Delete tasks
- View their own tasks
- Mark tasks as completed

**SUPER ADMIN**
- View all tasks in the system
- Register Admins

**ADMIN**
- View all tasks in the system

## Installation & Setup

**Prerequisites**

· Java 17+

· Node.js 19+

· MySQL or PostgreSQL

· Git

**Backend Setup (Spring Boot)**

**1.**      Clone the repository
	git clone https://github.com/yourusername/task-management-system.git  
	cd task-management-system/backend

**2.**   Configure environmental  variables 
		```bash
			ACTIVE_PROFILE= active application property file
			DATABASE_HOST = database host name
			DATABASE_NAME = database name
			DATABASE_PORT = database port
			DATABASE_USERNAME=your database username 
			DATABASE_PASSWORD=your database password 
			JWT_EXPIRE_TIME = token expire time give in milli-seconds 
			JWT_SECRET_KEY = jwt secrect key
			UPER_ADMIN_USERNAME= new admin username 
			SUPER_ADMIN_EMAIL = new admin email
			SUPER_ADMIN_PASSWORD= new password
		```

	

**3.**  Run the backend

	mvn spring-boot:run
	
	Backend will start at:
	
	[http://localhost:8080](http://localhost:8080)

## Backend Structure
	edu.yasas.task_manager
	│
	├── config
	├── controller
	├── service
	│   └── impl
	├── repository
	├── entity
	├── dto
	│   ├── request
	│   └── response
	├── filter
	├── exception
	└── util


## Frontend Structure
	task_manager_front_end
	└── task_manager_frontend
		│
		├── app
		│   ├── login
		│   ├── register
		│   ├── dashboard
		│   └── tasks
		│
		├── components
		│   ├── task
		│   └── ui
		│
		├── services
		│   ├── auth
		│   │   ├── login
		│   │   └── logout
		│   │
		│   ├── user
		│   ├── task
		│   └── ui
		│
		├── dto
		│
		├── types
		│
		├── lib
		│
		├── utils
		│
		└── middleware
			└── Proxy.ts

## API documentation
	After running backend visit http://localhost:8080/swagger-ui/index.html