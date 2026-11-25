# PetVision AI 🐾
### Discover Your Pet's Breed with AI

PetVision AI is a modern, production-ready, full-stack web platform that identifies dog and cat breeds from photographs using Google Gemini Multimodal AI. Beyond basic breed detection, PetVision AI provides deep morphological insights, honest confidence scoring, alternative breed probabilities, physical characteristics, temperament traits, and comprehensive care, diet, and grooming guides.

---

## 🌟 Key Features

- **AI Dog & Cat Recognition**: Distinguishes canine and feline features using Google's vision intelligence.
- **Honest Confidence & Mixed Breed Detection**: Provides calculated match estimates, detects crossbreeds and mixed heritage, and honestly handles low-light or blurry photos.
- **Comprehensive Breed Care Profiles**:
  - Geographic origin, average lifespan, size, height, and weight
  - Personality and temperament tags
  - Physical characteristics and distinguishing marks
  - Energy level, shedding/grooming needs, and daily exercise targets
  - Nutrition guidance and actionable daily care tips
- **Zero-Storage Privacy Architecture**:
  - No user registration, accounts, or passwords
  - No database (MongoDB, SQL, etc.)
  - Images are processed strictly **in-memory** in RAM and never stored on disk
  - EXIF GPS and camera metadata are stripped prior to AI submission
- **Production-Ready Scalability**:
  - Nginx reverse proxy with `least_conn` load balancing across multiple backend instances
  - Dual-tier rate limiting with optional distributed Redis store
  - Docker Compose support for instant multi-container deployment
  - Resilient error handling and security headers via Helmet

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 (Vite) | Fast, responsive Single Page Application |
| **Styling** | Tailwind CSS v3 | Modern dark-mode SaaS UI, gradients, glassmorphism |
| **Icons & Motion** | Lucide React, Framer Motion | Modern SVG iconography and smooth animations |
| **HTTP Client** | Axios | Resilient API communication and timeout management |
| **Notifications** | React Hot Toast | User-friendly alerts and feedback |
| **Backend** | Node.js (ES Modules), Express | REST API microservice |
| **AI Vision** | Google Gemini (`@google/genai`) | Multimodal image understanding and structured JSON output |
| **Image Processing** | Sharp & Multer | In-memory buffer inspection, sanitization, and optimization |
| **Security** | Helmet, CORS, Express-Rate-Limit | Header hardening, origin control, and IP rate limiting |
| **Distributed Cache** | Redis (optional) | Cross-instance rate-limiting store |
| **Reverse Proxy** | Nginx | Load balancing (`least_conn`), SSL termination, static delivery |
| **Containerization**| Docker & Docker Compose | Multi-container orchestration (Backends, Frontend, Nginx, Redis) |

*Note: In accordance with project requirements, no Python or persistent databases are used in this project.*

---

## 📂 Project Folder Structure

```
PetVision-AI/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top brand navigation & CTA
│   │   │   ├── Hero.jsx            # Hero banner & value propositions
│   │   │   ├── UploadSection.jsx   # Drag & drop upload, file preview & sample pets
│   │   │   ├── AnalysisLoading.jsx # Multi-step scanning laser animation
│   │   │   ├── ResultSection.jsx   # Breed profile cards, confidence bar & care tips
│   │   │   ├── HowItWorks.jsx      # 3-step workflow explanation
│   │   │   ├── Features.jsx        # Core product feature cards
│   │   │   ├── About.jsx           # Welfare mission & privacy pillars
│   │   │   └── Footer.jsx          # Navigation, AI disclaimer & legal notices
│   │   ├── services/
│   │   │   └── api.js              # Axios client with baseURL configuration
│   │   ├── App.jsx                 # Application state controller
│   │   ├── main.jsx                # React root mount
│   │   ├── index.css               # Tailwind CSS root imports
│   │   └── App.css                 # Custom styling
│   ├── .env.example
│   ├── index.html                  # HTML entry point with meta tags & Inter font
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   ├── nginx.conf                  # Static SPA configuration for frontend container
│   └── package.json
│
├── backend/
│   ├── config/
│   │   ├── env.js                  # Environment variable schema & defaults
│   │   └── redis.js                # Redis client connection with graceful fallback
│   ├── controllers/
│   │   └── petController.js        # Request handlers for analysis & health
│   ├── services/
│   │   └── geminiService.js        # Google Gemini AI SDK integration & JSON parsing
│   ├── routes/
│   │   ├── petRoutes.js            # POST /api/v1/pet/analyze
│   │   └── healthRoutes.js         # GET /api/v1/health and readiness
│   ├── middlewares/
│   │   ├── upload.js               # Multer memory storage & 5MB file filter
│   │   ├── imageValidator.js       # Sharp content validation, EXIF strip & resize
│   │   ├── rateLimiter.js          # General (100/15m) & AI (5/15m) limiters
│   │   └── errorHandler.js         # Centralized error masking & status mapping
│   ├── server.js                   # Express application setup & lifecycle hooks
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── nginx/
│   └── nginx.conf                  # Reverse proxy & least_conn upstream load balancer
│
├── docker-compose.yml              # Multi-instance orchestration
├── package.json                    # Monorepo root scripts
├── .gitignore
└── README.md
```

---

## 🔑 Google Gemini API Key Setup

PetVision AI uses the official Google GenAI SDK (`@google/genai`) to communicate with Gemini.

1. Obtain a free API key at **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Open `backend/.env` (or copy `backend/.env.example` to `backend/.env`).
3. Add your key to `GEMINI_API_KEY`:
   ```bash
   GEMINI_API_KEY=AIzaSyYourActualKeyHere
   ```
4. *Security Notice:* The API key is stored strictly on the server and is **never** sent to the client browser or exposed in frontend code.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port for the Express server |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |
| `GEMINI_API_KEY` | *(Required)* | Google Gemini API key from AI Studio |
| `GEMINI_MODEL` | `gemini-3.5-flash-lite` | Gemini model name (fallback to `gemini-3.5-flash` / `gemini-3.8-flash`) |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
| `MAX_FILE_SIZE` | `5242880` | Maximum upload size in bytes (5 MB) |
| `GENERAL_RATE_LIMIT`| `100` | Allowed general requests per window per IP |
| `AI_RATE_LIMIT` | `5` | Allowed AI analysis requests per window per IP |
| `RATE_LIMIT_WINDOW_MS`| `900000` | Rate limit window in milliseconds (15 minutes) |
| `REDIS_URL` | *(Optional)* | Redis connection string (e.g. `redis://localhost:6379`) |
| `TRUST_PROXY` | `false` | Enable only when behind Nginx or reverse proxy (`true` or `1`) |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000/api/v1` | URL of backend API. For Nginx proxy, set to `/api/v1`. |

---

## 🚀 Running Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Option 1: Quick Start (Two Terminals)

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```
*Backend starts on `http://localhost:5000`.*

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
*Frontend starts on `http://localhost:5173`.*

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🐳 Docker & Multi-Instance Load Balancing

To deploy the scalable architecture with **3 backend instances**, **Nginx load balancer**, and **Redis distributed rate limiting**:

```bash
# 1. Provide your Gemini API key in backend/.env
# 2. Build and launch all services with Docker Compose
docker compose up --build -d
```

### Containers Started:
1. `petvision-nginx`: Reverse proxy on **port 80** balancing requests using `least_conn`.
2. `petvision-frontend`: Serving static optimized Vite build.
3. `petvision-backend-1`: Node instance on port **5001** (internal 5000).
4. `petvision-backend-2`: Node instance on port **5002** (internal 5000).
5. `petvision-backend-3`: Node instance on port **5003** (internal 5000).
6. `petvision-redis`: Shared cache on port **6379** for synchronized IP rate limits.

Access the platform at **`http://localhost`**.

---

## 📡 API Endpoints

### 1. Analyze Pet Breed
- **URL:** `POST /api/v1/pet/analyze`
- **Content-Type:** `multipart/form-data`
- **Form Field:** `image` (binary file: JPG, PNG, or WEBP up to 5 MB)
- **Rate Limit:** 5 requests per 15 minutes per IP
- **Success Response (200 OK):**
```json
{
  "success": true,
  "isAnimal": true,
  "animalType": "dog",
  "isDogOrCat": true,
  "isClearImage": true,
  "breed": "Golden Retriever",
  "breedCategory": "Purebred",
  "confidence": 94,
  "isMixedBreed": false,
  "isYoungPet": false,
  "youngPetNote": "",
  "alternativeBreeds": [
    { "name": "Labrador Retriever", "confidence": 4 },
    { "name": "Nova Scotia Duck Tolling Retriever", "confidence": 2 }
  ],
  "identificationSummary": "Distinctive warm golden dense water-repellent coat, broad skull, friendly dark eyes, and balanced athletic build.",
  "breedInformation": {
    "origin": "Scotland, United Kingdom",
    "lifespan": "10-12 years",
    "size": "Large",
    "weight": "25-34 kg (55-75 lbs)",
    "height": "51-61 cm (20-24 in)",
    "temperament": ["Friendly", "Intelligent", "Devoted", "Patient"],
    "physicalCharacteristics": ["Dense double coat", "Feathering on legs and tail", "Broad head", "Gentle expression"],
    "energyLevel": "High",
    "groomingNeeds": "Moderate to High",
    "exerciseNeeds": "At least 60-90 minutes of daily exercise and mental enrichment",
    "dietInformation": "Balanced age-appropriate high-protein diet with joint supplements (glucosamine)",
    "careTips": [
      "Brush 2-3 times weekly to manage shedding",
      "Regular swimming or fetch games for cardiovascular fitness",
      "Routine ear cleanings after water activities to prevent infections"
    ]
  },
  "statusMessage": "Successfully identified as Golden Retriever.",
  "disclaimer": "AI-powered breed identification is an estimate. Results may vary depending on image quality, breed similarity, and mixed-breed characteristics.",
  "meta": {
    "modelUsed": "gemini-2.5-flash-lite",
    "timestamp": "2026-11-25T09:15:00.000Z",
    "imageMetrics": {
      "originalSizeBytes": 2451920,
      "optimizedSizeBytes": 182400,
      "savedBytes": 2269520,
      "compressionRatio": "92.6%"
    }
  }
}
```

### 2. Service Health
- **URL:** `GET /api/v1/health`
- **Response:** `200 OK`
```json
{
  "status": "ok",
  "uptime": 124.5,
  "timestamp": "2026-11-25T09:15:00.000Z",
  "service": "PetVision AI Backend"
}
```

### 3. Service Readiness
- **URL:** `GET /api/v1/health/ready`
- **Response:** `200 OK` (when Gemini key is configured) or `503 Service Unavailable` (if key is missing)

### 4. API Documentation Metadata
- **URL:** `GET /api/v1`
- **Response:** `200 OK`

---

## 🛡️ Edge Cases Handled

1. **Non-Pet Uploads (Humans, Cars, Landscapes, Objects)**:
   - Responds gracefully with `isDogOrCat: false`.
   - Explains that PetVision AI is specialized specifically for dogs and cats.
2. **Other Animals (Birds, Horses, Reptiles)**:
   - Correctly identifies that an animal is present, specifies the animal type, but indicates non-canine/feline status.
3. **Blurry, Dark, or Distant Photos**:
   - Flags `isClearImage: false`.
   - Explains the ambiguity and advises the user on how to capture a clearer angle.
4. **Mixed Breeds & Crossbreeds**:
   - Sets `isMixedBreed: true`.
   - Estimates percentage affinities for contributing ancestor breeds in `alternativeBreeds`.
5. **Puppies & Kittens**:
   - Detects juvenile status (`isYoungPet: true`).
   - Advises the user that features such as coat coloration, ear carriage, and body size will develop as the pet matures.
6. **Rate Limiting Exceeded (HTTP 429)**:
   - Returns friendly JSON error: *"Too many image analysis requests. Please try again later."*
7. **Gemini API Quota Limits**:
   - Transparently handles quota exhaustion and surfaces constructive retry advice.

---

## 🔒 Security & Privacy

- **In-Memory Image Buffering**: Uploads are held in RAM memory via `multer.memoryStorage()`. No image is ever written to disk or stored in a persistent database.
- **Sharp Content Verification**: Deep byte inspection validates image integrity and dimensions, rejecting malicious or spoofed files regardless of file extension.
- **EXIF Stripping**: Sharp strips private camera data, geolocation coordinates, and timestamps before processing.
- **Security Headers**: Hardened with Helmet HTTP response headers.
- **CORS Protection**: Access is restricted to trusted frontend origins.

---

## ☁️ Deployment Instructions

### Frontend (Vercel / Netlify)
1. Push this repository to GitHub.
2. Import the `frontend` folder into Vercel or Netlify.
3. Set the environment variable:
   - `VITE_API_URL`: URL of your deployed backend (e.g. `https://api.yourdomain.com/api/v1`).
4. Build command: `npm run build`
5. Output directory: `dist`

### Backend (Render / Railway / VPS)
1. Create a new Node.js Web Service from the `backend` folder.
2. Add environment variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: Your Google AI Studio API key
   - `FRONTEND_URL`: URL of your deployed frontend (e.g. `https://petvision.vercel.app`)
   - `TRUST_PROXY`: `true`
3. Start command: `node server.js`

---

## 📄 License

This project is licensed under the MIT License.
