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

· MySQL 



**Backend Setup (Spring Boot)**

**1.**  Clone the repository
	git clone https://github.com/YasasSri2002/task-management-system.git  

	cd task-management-system/backend

**2.**  Configure environmental  variables  
		- ACTIVE_PROFILE= active application property file
		- DATABASE_HOST = database host name
		- DATABASE_NAME = database name
		- DATABASE_PORT = database port
		- DATABASE_USERNAME=your database username 
		- DATABASE_PASSWORD=your database password 
		- JWT_EXPIRE_TIME = token expire time give in milli-seconds 
		- JWT_SECRET_KEY = jwt secrect key
		- SUPER_ADMIN_USERNAME= new admin username 
		- SUPER_ADMIN_EMAIL = new admin email
		- SUPER_ADMIN_PASSWORD= new password


	

**3.**  Run the backend

	mvn spring-boot:run
	
	Backend will start at:
	
	[http://localhost:8080](http://localhost:8080)

**Frontend Setup**

**1.** Navigate to frontend folder

	cd frontend

**2.**  Install dependencies

	npm install
	
**3.**  Configure local variable
	NEXT_PUBLIC_SPRING_BOOT_API_URL
	
**4.**  Run the frontend

	configure local variables
	
	npm run dev
	
	Frontend will start at:
	
	[http://localhost:3000](http://localhost:3000)


##  frontend Structure
│
├── app
│   ├── admin
│   │   
│   │
│   ├── login
│   │   
│   │
│   ├── register
│   │   
│   │
│   ├── task
│   │   
│   │
│   ├── user
│   ├── layout.tsx
│   ├── navBar.tsx
│   └── globals.css
│
├── services
│   ├── auth
│   ├── task
│   └── user
│
├── dto
├── types
├── util
└── public

## Backend Structure

·├── controller  
 ├── service  
 ├── repository  
 ├── model

 ├── Util  
 ├── filter  
 └── config