# Fishball – Facebook Auth Project

## 📖 Description

Fishball is a web-based application that integrates the **Facebook Graph API** using **OAuth 2.0**. It allows users to securely log in with their Facebook account and fetch **public profile information**, demonstrating proper authentication flow, API integration, validation, and UI state handling.

This project is built for **academic purposes** and follows best practices for GitHub documentation and project structure.

---

## 📂 Project Structure

```
elec/
│public/
    ├──
    index.html
    script.js
    style.css
├── server.js        # Node.js backend + frontend logic (single file)
├── package.json     # Project dependencies
├── .env             # Environment variables (not pushed to GitHub)
├── README.md        # Project documentation
```

> ℹ️ Note: Frontend HTML, CSS, and JavaScript logic are embedded and served directly from `server.js`.

---

## 🚀 Features

* Facebook Login using OAuth 2.0
* Secure access token exchange
* Fetch public Facebook profile data
* Input validation and error handling
* Loading state UI feedback
* Clean and professional profile card UI

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* Facebook Graph API
* Axios
* JavaScript (ES6)
* HTML & CSS

---

## ⚙️ How to Run the Project

### 1️⃣ Install Dependencies

Run the following command in the project directory:

```bash
npm install express axios dotenv cors cookie-parser
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file in the root folder:

```env
FB_APP_ID=your_facebook_app_id
FB_APP_SECRET=your_facebook_app_secret
```

⚠️ Do not upload `.env` to GitHub.

---

### 3️⃣ Run the Server

```bash
node server.js
```

---

### 4️⃣ Open in Browser

```
http://localhost:3000
```

---

## 🔐 Facebook App Configuration

In the Meta Developer Dashboard:

* App Domains: `localhost`
* Valid OAuth Redirect URI:

  ```
  http://localhost:3000/auth/facebook/callback
  ```
* Product Enabled:

  * Facebook Login (Web)

---

## 🎓 Academic Compliance

This project satisfies the following requirements:

* ✔ OAuth 2.0 Authentication
* ✔ External API integration
* ✔ Input validation & error handling
* ✔ GitHub repository with README
* ✔ Clear instructions on how to run the project

---

## 👨‍💻 Authors

**Rai Garcia**
**Jasmine Prado**
**Cristine Verador**

---

## 📄 License

This project is intended for **educational use only**.
