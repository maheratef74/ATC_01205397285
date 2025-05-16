# 🎉 Event Booking System - Backend (ASP.NET Core API)

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

🌐 Production API:
https://ayadtytest.runasp.net/swagger/index.html

👥 Default Accounts

🛠 Admin Account

Email: admin@gmail.com

Password: 123456

👤 User Account

Email: maheratef600@gmail.com

Password: 123456


🧠 AI Tools Used
This project was developed using AI assistance from:

🤖 ChatGPT — for code generation, architectural planning, debugging, and documentation.

🧠 GitHub Copilot — for inline code suggestions and productivity boosts.
