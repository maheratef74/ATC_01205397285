#  Event Booking System - Backend (ASP.NET Core API)     

This is the **backend** component of the **Event Booking System** developed using **ASP.NET Core Web API**. It provides secure authentication, event management, and booking functionality with support for multi-language (English/Arabic), background jobs, image upload, and email confirmation.

## 📁 Project Structure (Three-Layer Architecture) 

📦EventBookingSystem

├── 📂EventBookingSystem.API → Presentation Layer (Controllers, Swagger)

├── 📂BusinessLogicLayer → (Services, Background Jobs)

├── 📂DataAccessLayer → (Repositories, Entities, EF Core) 

--- 

## 🚀 Features

- ✅ Authentication (JWT-based with role support: Admin/User)
- 🎫 Book Events (includes email confirmation)
- 📝 Full CRUD for Events (Create, Read, Update, Delete) via admin panel
- 📬 Background Job to mark completed events
- 🌍 Localization (English 🇺🇸 & Arabic 🇸🇦)
- 🖼️ Upload Event Photos
- 🛡️ Repository Pattern with Unit of Work
- 🌐 Swagger UI for API testing and documentation

---

## ⚙️ Installation & Setup

### ✅ Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### 1. Clone the Repository

```bash
git clone https://github.com/maheratef74/ATC_01205397285.git
cd ATC_01205397285
```

2. Run the API

dotnet run --project EventBookingSystem.API

3.Access Swagger UI 

🧪 Local Development:
http://localhost:xxxx/swagger/index.html

🌐 Production API: (https://eventsystem.runasp.net/swagger/index.html)

👥 Default Accounts

🛠 Admin Account

Email: admin@gmail.com

Password: 123456

👤 User Account

Email: maheratef600@gmail.com

Password: 123456
---
🔐 Authentication – Using Bearer Token in Swagger
To access protected endpoints (e.g., booking events or admin actions), you must authenticate using a JWT token. Here's how to do it:

1. Log in via the /api/auth/login endpoint
Send a POST request with valid user credentials (e.g., email and password).

You will receive a JWT token in the response.

2. Use the token in Swagger
Click on the Authorize button (🔐) at the top of the Swagger UI.

Enter your token in the following format:

Bearer <your_token_here>

🔁 Example:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Click Authorize to apply the token.

Now you can call any protected endpoint.

✅ Make sure to include "Bearer " (with a space) before pasting your token.


🧠 AI Tools Used
This project was developed using AI assistance from:

🤖 ChatGPT — for code generation, architectural planning, debugging, and documentation.

🧠 GitHub Copilot — for inline code suggestions and productivity boosts.


---  

# 🎉 Event Booking System - Frontend (React)
This is the frontend of the Event Booking System, developed using React. It enables users to browse and book events, view event details, and provides a role-based admin panel for managing events. The UI supports multi-language (English/Arabic) and is built using custom components and modern React best practices. This project was developed with the assistance of AI tools.
---  

🚀 Features
- ✅ User Authentication (Login / Register using JWT)
- 🎫 Event Listings with "Book Now" or "Booked" status
- 📄 Event Details Page with booking option
- 🎉 Booking Confirmation Screen
- 🧑‍💼 Admin Panel for event management (CRUD)
- 🌍 Multi-language support (English 🇺🇸 / Arabic 🇸🇦)
- 🎨 Responsive, clean UI with Flexbox/Grid layout
- 🔐 Role-based Access Control (Admin/User)

---  

⚙️ Installation & Setup
✅ Prerequisites
Node.js (v18 or later)

npm 

📦 Setup
Clone the repository:

```bash
git clone https://github.com/maheratef74/ATC_01205397285.git
cd ATC_01205397285/frontend
```

```bash
npm install
npm start
```

👥 Default Test Accounts
🛠 Admin
Email: admin@gmail.com

Password: 123456

👤 User
Email: maheratef600@gmail.com

Password: 123456


🌐 Frontend web : 
https://booking-system-three-hazel.vercel.app/


🧠 AI Tools Used
This project was developed with the support of multiple AI tools to enhance productivity, improve code quality, and streamline development:

🤖 ChatGPT — used extensively for generating React components, resolving bugs, planning architecture, and improving UI logic.

🧠 GitHub Copilot — provided real-time suggestions and boilerplate code while coding in VS Code.

🤖 DeepSeek — assisted in reviewing, refactoring, and optimizing React code for better performance and readability.

📚 Courser — used for structured learning and guidance during the implementation of various frontend features and best practices.


