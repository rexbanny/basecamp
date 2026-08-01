# Colaborate — Setup Guide

## Install dependencies
```
npm install
```

## Start the server
```
node server.js
```

## Open in browser
```
http://localhost:3000/opening.html
```

---

## Accounts & Roles

| Role       | How to get it                                      |
|------------|----------------------------------------------------|
| user       | Default for anyone who registers                   |
| admin      | Super admin grants it from the Admin Panel         |
| superadmin | Auto-assigned when elmirabbasli4@gmail.com registers |

## Features

- Register / Login with session-based auth
- Each user only sees their own projects
- Create, Edit, Delete your own projects
- Admin Panel (admin + superadmin only):
  - See all users and their project counts
  - See all projects from all users
  - Delete any user or project
  - Grant / Revoke admin role (superadmin only)

## File Structure

```
basecamp/
├── server.js              ← just starts the app
├── database.js            ← Model (Sequelize)
├── .gitignore             ← NEW
├── package.json
├── style.css
│
├── controllers/           ← NEW — all business logic
│   ├── authController.js
│   ├── projectController.js
│   └── adminController.js
│
├── routes/                ← NEW — all URL definitions
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── adminRoutes.js
│
├── middleware/            ← NEW — requireLogin, requireAdmin
│   └── auth.js
│
└── views/                 ← move all HTML here
    ├── opening.html
    ├── signup/
    ├── login/
    ├── main_menu/
    └── admin/
```
