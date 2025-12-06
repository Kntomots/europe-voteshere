# 📊 VoteSphere — Interactive European Elections Platform

**VoteSphere** is an interactive web application designed to help users explore, compare, and understand election results across Europe and every region of Greece.

Beyond simply presenting electoral data, the platform integrates a **Voting Advice Application (VAA)** mechanism that allows users to answer a set of political/social questions and estimate how closely their views align with different political parties.

Originally developed for use on  **Huawei IdeaHub** , VoteSphere is now fully accessible from any modern device with a web browser.

---

## 🚀 Key Features

### 🌍 Interactive Maps

* **Europe Map:** Click on any country to view elections data through embedded Wikipedia micro-profiles.
* **Greece Map:** Fully SVG-based interactive map, with per-region election results (2023 data included).

### 🧭 Voting Advice Application (VAA)

* Dynamic questionnaire based on political, economic, social, and cultural topics.
* Algorithmic calculation of user–party similarity.
* Clean match-percentage visualization.

### 🛠 Admin Panel

A dedicated admin interface allowing:

* Adding/removing political questions
* Editing party positions
* Managing admin accounts
* Storing/serving data through MongoDB Atlas

### 📈 Charts & Visual Elements

* Demo doughnut chart on the homepage
* Rotating 3D Earth (Three.js) for enhanced visual appeal

### 🗃 Databases (MongoDB Atlas)

* **BelgiumVotes collection** (with example election data)
* **Questions collection**
* **Parties collection** (party responses for VAA)
* **Admin collection** (credentials for administrators)

---

## 🧱 Technologies Used

### Frontend

* **HTML5 / CSS3 / Bootstrap**
* **JavaScript (Vanilla)**
* **Three.js** (3D Earth rendering)
* **Chart.js** (visualizations)
* **SVG maps**

### Backend

* **Node.js** with Express
* **MongoDB / Mongoose**

### Additional Tools

* Huawei IdeaHub compatibility (initial deployment)
* CSV datasets (Greek elections 2023)

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

<pre class="overflow-visible!" data-start="2701" data-end="2791"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/Kntomots/europe-voteshere.git
</span><span>cd</span><span> europe-voteshere
</span></span></code></div></div></pre>

### 2️⃣ Install dependencies

<pre class="overflow-visible!" data-start="2822" data-end="2845"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install
</span></span></code></div></div></pre>

### 3️⃣ Configure environment variables

Create a `.env` file:

<pre class="overflow-visible!" data-start="2911" data-end="3002"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>MONGODB_URI</span><span>=your_mongodb_atlas_connection_string
</span><span>SESSION_SECRET</span><span>=your_session_secret
</span></span></code></div></div></pre>

### 4️⃣ Start the server

<pre class="overflow-visible!" data-start="3029" data-end="3050"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm start
</span></span></code></div></div></pre>

The application will run on:

<pre class="overflow-visible!" data-start="3082" data-end="3111"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>http:</span><span>//localhost:3000</span><span>
</span></span></code></div></div></pre>

---

## 🔐 Admin Credentials

Default admin (from database):

<pre class="overflow-visible!" data-start="3175" data-end="3216"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>username:</span><span></span><span>kntomots</span><span>
</span><span>password:</span><span></span><span>1234</span><span>
</span></span></code></div></div></pre>

*You should change these credentials before deploying.*

---

## 🖼 Screenshots (Placeholders)

*Add screenshots in the repository and update the paths.*

<pre class="overflow-visible!" data-start="3373" data-end="3591"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>!</span><span>[Home Page]</span><span>(screenshots/home.png)
!</span><span>[Europe Map]</span><span>(screenshots/europe_map.png)
!</span><span>[Greece Map]</span><span>(screenshots/greece_map.png)
!</span><span>[Admin Panel]</span><span>(screenshots/admin_panel.png)
!</span><span>[Questionnaire]</span><span>(screenshots/questionnaire.png)
</span></span></code></div></div></pre>

---

## 📍 How the VAA Algorithm Works

The similarity between user answers and party positions is calculated using:

<pre class="overflow-visible!" data-start="3711" data-end="3768"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>similarity</span><span> = </span><span>1</span><span> - (|userAnswer – partyAnswer| / </span><span>4</span><span>)
</span></span></code></div></div></pre>

The average similarity across all questions produces a  **match percentage** .

---

## 🧪 Future Improvements

* Store Greek regional election results in MongoDB (currently loaded from CSV)
* Add election datasets for all EU countries
* Improve UX/UI for small-screen devices
* Add multilingual support (EN/GR)
* Include historical election timelines

---

## 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute it.

---

## 👤 Author

**Κωνσταντίνος Ντομοτσίδης**

Department of Informatics

Aristotle University of Thessaloniki
