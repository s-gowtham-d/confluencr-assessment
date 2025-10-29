# 🚀 Full Stack Assessment Project

A complete full-stack application featuring a **transaction webhook processing service** (Backend) and a **voice agent analytics dashboard** (Frontend).

---

## 🔗 Quick Links

| Component    | Live Demo                                                                    | Repository                |
| ------------ | ---------------------------------------------------------------------------- | ------------------------- |
| **Frontend** | [Voice Agent Analytics Dashboard](https://confluencr-assessment.vercel.app/) | [`/frontend`](./frontend) |
| **Backend**  | [Webhook Transaction API](https://webhook.gowtham.work)                      | [`/service`](./service)   |

---

## 📁 Project Structure

```
.
├── frontend/              # React + TypeScript Analytics Dashboard
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services (Supabase)
│   │   ├── types/        # TypeScript type definitions
│   │   └── App.tsx       # Main application
│   ├── package.json
│   └── README.md         # Frontend setup guide
│
├── service/              # FastAPI Webhook Processing Service
│   ├── app/
│   │   ├── main.py       # FastAPI application
│   │   ├── worker.py     # Celery background worker
│   │   ├── models.py     # Database models
│   │   └── schemas.py    # Pydantic schemas
│   ├── docker-compose.yml
│   └── README.md         # Backend setup guide
│
└── README.md             # This file
```

---

## 🎯 Project Overview

### Frontend: Voice Agent Analytics Dashboard

A modern analytics dashboard built with **React**, **TypeScript**, and **Recharts** that displays call center metrics with interactive, editable charts. Data is persisted using **Supabase**.

**Key Features:**

- 📊 Multiple chart types (Bar, Line, Pie)
- ✏️ Editable chart with data persistence
- 📧 Email-based user identification
- 💾 Previous data tracking with overwrite confirmation
- 🎨 Modern glassmorphism UI with dark theme
- 📱 Fully responsive design

### Backend: Webhook Transaction Processing Service

A production-ready **FastAPI** service that receives transaction webhooks, processes them asynchronously using **Celery**, and stores results in **PostgreSQL**.

**Key Features:**

- ⚡ Fast webhook response (<500ms)
- 🔄 Asynchronous background processing
- 🔐 Idempotent transaction handling
- 💾 PostgreSQL for reliable data storage
- 🐳 Fully dockerized with Docker Compose
- 📊 Transaction status tracking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Docker & Docker Compose (for backend)
- Git

### Clone the Repository

```bash
git clone https://github.com/s-gowtham-d/confluencr-assessment.git
cd confluencr-assessment.git
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

### Run Backend

```bash
cd service
docker compose up -d
```

Visit: http://localhost:8000

---

## 📖 Detailed Setup Instructions

For detailed setup instructions, please refer to the README files in each directory:

- **Frontend Setup**: [`frontend/README.md`](./frontend/README.md)
- **Backend Setup**: [`service/README.md`](./service/README.md)

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose            |
| ------------ | ------------------ |
| React 18     | UI Framework       |
| TypeScript   | Type Safety        |
| Vite         | Build Tool         |
| Recharts     | Data Visualization |
| Tailwind CSS | Styling            |
| Supabase     | Backend & Database |
| Lucide React | Icons              |

### Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| FastAPI    | REST API Framework    |
| Celery     | Background Task Queue |
| Redis      | Message Broker        |
| PostgreSQL | Database              |
| SQLAlchemy | ORM                   |
| Docker     | Containerization      |

---

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run dev

# Visit http://localhost:5173
# 1. Click "Edit" on Weekly Call Volume chart
# 2. Enter email when prompted
# 3. Modify values and save
# 4. Refresh page - data should persist
# 5. Edit again - should show overwrite confirmation
```

### Backend Testing

```bash
# Health check
curl http://localhost:8000/

# Send webhook
curl -X POST http://localhost:8000/v1/webhooks/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "txn_test123",
    "source_account": "ACC1001",
    "destination_account": "ACC2001",
    "amount": 1500.50,
    "currency": "INR"
  }'

# Check transaction status (wait 30s)
curl http://localhost:8000/v1/transactions/txn_test123
```

---

## 🚀 Deployment

### Frontend Deployment

**Vercel (Recommended):**

```bash
cd frontend
npm install -g vercel
vercel
```

**Netlify:**

```bash
cd frontend
npm run build
# Upload dist/ folder to Netlify
```

**Environment Variables:**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend Deployment

**Docker Hub:**

```bash
cd service
docker build -t username/webhook-api .
docker push username/webhook-api
```

**Deploy on any Docker host:**

- Coolify
- Railway
- Render
- AWS ECS
- DigitalOcean App Platform

**Environment Variables:**

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`
- `REDIS_URL`

---

## 📊 Architecture Diagrams

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│  Components Layer                       │
│  ├── Header, StatsCard, ChartCard      │
│  ├── EditableChart, DurationChart      │
│  └── Modals (Email, Overwrite)         │
├─────────────────────────────────────────┤
│  Hooks Layer                            │
│  └── useUserData (State Management)    │
├─────────────────────────────────────────┤
│  Services Layer                         │
│  └── Supabase API Client                │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│          Supabase Backend               │
│  ├── PostgreSQL Database                │
│  └── REST API                           │
└─────────────────────────────────────────┘
```

### Backend Architecture

```
┌────────────────────┐
│   Webhook API      │  ← FastAPI (POST /v1/webhooks/transactions)
│   (Port 8000)      │
└────────────────────┘
        │
        ▼ (Enqueue Task)
┌────────────────────┐
│   Redis Queue      │  ← Celery Broker
│   (Port 6379)      │
└────────────────────┘
        │
        ▼ (Process Task)
┌────────────────────┐
│   Celery Worker    │  ← Background processing (30s delay)
└────────────────────┘
        │
        ▼ (Store Result)
┌────────────────────┐
│   PostgreSQL DB    │  ← Transaction storage
│   (Port 5432)      │
└────────────────────┘
```

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Component-based React architecture
- ✅ TypeScript for type safety
- ✅ Custom hooks for state management
- ✅ RESTful API design
- ✅ Asynchronous task processing
- ✅ Docker containerization
- ✅ Database design and ORM usage
- ✅ Message queue patterns
- ✅ Idempotency handling
- ✅ Cloud deployment

---

## 📝 Assessment Requirements

### Frontend Requirements ✅

- [x] Similar theme to SuperBryn (dark, modern, glassmorphism)
- [x] Multiple chart types with dummy data
- [x] At least one editable chart
- [x] Email collection before editing
- [x] Data persistence in Supabase
- [x] Previous data detection and overwrite confirmation
- [x] Deployed on cloud (Vercel/Netlify)

### Backend Requirements ✅

- [x] POST /v1/webhooks/transactions endpoint
- [x] Responds with 202 Accepted within 500ms
- [x] Background processing with 30s delay
- [x] Idempotent transaction handling
- [x] GET /v1/transactions/{id} endpoint
- [x] GET / health check endpoint
- [x] Persistent storage (PostgreSQL)
- [x] Deployed on cloud

---

## 🐛 Troubleshooting

### Frontend Issues

**Charts not rendering:**

```bash
npm install recharts lucide-react
```

**Environment variables not working:**

```bash
# Restart dev server
npm run dev
```

**Supabase connection errors:**

- Check `.env` file has correct credentials
- Verify table name is `analytics_data`
- Check RLS policies in Supabase

### Backend Issues

**Services not starting:**

```bash
docker compose down
docker compose up -d
docker compose logs -f
```

**Database connection failed:**

```bash
# Check PostgreSQL is ready
docker compose exec db pg_isready -U postgres
```

**Celery worker not processing:**

```bash
# Check worker logs
docker compose logs worker
```

---

## 📧 Contact

**Author:** Gowtham Selvam  
**Email:** gowthamselvam809@gmail.com  
**GitHub:** [@your-username](https://github.com/s-gowtham-d/)

---
