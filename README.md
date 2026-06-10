# 🤖 Asad Ali — AI/ML Engineer Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0085?logo=framer)](https://www.framer.com/motion)
[![EmailJS](https://img.shields.io/badge/EmailJS-Integrated-orange)](https://www.emailjs.com)

A modern, responsive, and professional AI/ML Engineer portfolio built with React + Vite + Tailwind CSS + Framer Motion.

---

## ✨ Features

- **Hero Section** — Animated typing effect, professional summary, CTA buttons (View Projects, Download Resume, View Resume, Contact Me)
- **About Section** — Education card (CGPA, duration), interests, quick highlights
- **Skills Section** — Categorized progress bars (Python, Scikit-learn, TensorFlow, Pandas, NumPy…) + Tools & Core Concepts
- **Experience Section** — Built & Soft internship timeline with checklist responsibilities
- **Projects Section** — ML project cards with accuracy badges, achievement checklists, GitHub & Live Demo links
- **Certifications Section** — Verified certification card with badge
- **Achievements Section** — Animated counters (ML Projects, Internship, Model Accuracy, CGPA)
- **Contact Section** — EmailJS form, copy-to-clipboard with toast notifications, social links
- **Footer** — Full navigation, contact info, social links, copyright
- **Navbar** — Sticky, active-section highlighting, mobile hamburger, Resume download
- **Scroll-to-top FAB** — Smooth scroll back to top
- **Dark/Light theme** — Persisted in localStorage
- **Fully responsive** — Desktop, tablet, mobile

---

## 🛠️ Tech Stack

| Category       | Technology                                      |
|----------------|-------------------------------------------------|
| Framework      | React 19, Vite 8                                |
| Styling        | Tailwind CSS 4, Custom CSS variables            |
| Animation      | Framer Motion 12                                |
| Email          | @emailjs/browser                                |
| Font           | Inter + Poppins (Google Fonts)                  |
| Deployment     | Vercel / GitHub Pages                           |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone the Repository
```bash
git clone https://github.com/asadrealone/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env
```
Then open `.env` and fill in your EmailJS credentials (see [EmailJS Setup](#-emailjs-setup) below).

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## 📧 EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails without a backend.

### Step-by-Step

1. **Create a free account** at [emailjs.com](https://www.emailjs.com/)
2. **Add an Email Service** — connect your Gmail / Outlook / SMTP
3. **Create an Email Template** — use these exact variable names in your template:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Message: {{message}}
   ```
4. **Copy your credentials:**
   - **Service ID** → Email Services → your service
   - **Template ID** → Email Templates → your template
   - **Public Key** → Account → API Keys

5. **Paste into `.env`:**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxx
   ```

> **Note:** Without credentials, the form runs in **demo mode** — it shows the success state after a delay but does not actually send an email. A yellow label will indicate demo mode.

---

## 📄 Updating the Resume PDF

1. Replace `public/Asad_Ali_AI_ML_Resume.pdf` with your new PDF
2. Keep the same filename, **or** update all references in:
   - `src/components/Hero.jsx` — `href` and `download` attributes
   - `src/components/Navbar.jsx` — desktop and mobile `<a>` tags

The resume file is served directly from the `public/` folder (no import needed).

---

## 🌐 Deploying to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables on Vercel
In your Vercel dashboard:
1. Go to **Project → Settings → Environment Variables**
2. Add all three `VITE_EMAILJS_*` variables

### GitHub Pages Deploy
```bash
# Build
npm run build

# Deploy dist/ folder to GitHub Pages using gh-pages
npm install -D gh-pages
npx gh-pages -d dist
```

Add to `vite.config.js` if using GitHub Pages with a sub-path:
```js
base: '/your-repo-name/',
```

---

## 🏗️ Project Structure

```
portfolio/
├── public/
│   ├── Asad_Ali_AI_ML_Resume.pdf   ← Resume PDF
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   ├── Achievements.jsx
│   │   ├── Contact.jsx             ← EmailJS form
│   │   ├── Toast.jsx               ← Notification component
│   │   └── Footer.jsx
│   ├── config/
│   │   └── emailjs.js              ← EmailJS config (reads from .env)
│   ├── data/
│   │   └── portfolioData.js        ← All content (single source of truth)
│   ├── hooks/
│   │   └── useAnimations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                    ← Copy → .env and fill credentials
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## 📸 Screenshots

| Section | Preview |
|---------|---------|
| Hero | *(screenshot placeholder)* |
| Skills | *(screenshot placeholder)* |
| Projects | *(screenshot placeholder)* |
| Contact | *(screenshot placeholder)* |

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🔒 Security Notes

- **Never commit `.env`** — it's excluded via `.gitignore`
- EmailJS public key is safe to expose in browser-side code
- Service ID and Template ID are also safe to expose
- No backend / server-side secrets involved

---

## 📬 Contact

**Asad Ali** — Aspiring AI/ML Engineer

- 📧 [asadrealone@gmail.com](mailto:asadrealone@gmail.com)
- 💼 [linkedin.com/in/asadrealone](https://linkedin.com/in/asadrealone)
- 🐙 [github.com/asadrealone](https://github.com/asadrealone)
- 📱 +92 307 7546633

---

## 📄 License

MIT © 2026 Asad Ali
