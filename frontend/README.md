# 📊 Voice Agent Analytics Dashboard

A modern, interactive analytics dashboard for voice agent call centers built with **React**, **TypeScript**, and **Recharts**. Features editable charts with data persistence using **Supabase**.

**Live Demo:** [https://confluencr-assessment.vercel.app/](https://confluencr-assessment.vercel.app/)

---

## ✨ Features

- 📊 **Multiple Chart Types**: Bar, Line, Pie charts for comprehensive analytics
- ✏️ **Editable Charts**: Modify data directly in the UI
- 💾 **Data Persistence**: Save custom values to Supabase
- 📧 **User Identification**: Email-based data storage
- 🔄 **Smart Overwrite**: Detects previous data and asks for confirmation
- 🎨 **Modern UI**: Glassmorphism design with dark theme
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- ⚡ **Fast**: Built with Vite for optimal performance

---

## 🎯 Dashboard Components

### Stats Cards

- **Total Calls**: Aggregate call volume
- **Average Duration**: Mean call length in minutes
- **Success Rate**: Percentage of successful calls

### Charts

1. **Weekly Call Volume** (Bar Chart) - ✏️ Editable
   - Shows daily call counts for the week
   - Users can edit values and save to Supabase
2. **Average Call Duration** (Line Chart)
   - Displays average call duration trends
3. **Call Outcomes** (Pie Chart)
   - Successful, Failed, and Abandoned calls breakdown
4. **Peak Call Hours** (Bar Chart)
   - Identifies busiest hours of the day

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/s-gowtham-d/confluencr-assessment.git
cd confluencr-assessment/frontend

# Install dependencies
npm install
```

### Setup Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create the database table:**
   - Go to SQL Editor in Supabase Dashboard
   - Run this query:

```sql
CREATE TABLE analytics_data (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  call_volume_data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for demo)
CREATE POLICY "Enable all access" ON analytics_data
FOR ALL USING (true);
```

3. **Get your credentials:**

   - Go to Project Settings → API
   - Copy **Project URL** and **anon public key**

4. **Create `.env` file:**

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. **Start development server:**

```bash
npm run dev
```

Visit **http://localhost:5173**

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx        # App header with branding
│   │   ├── StatsCard.tsx     # Metric display cards
│   │   ├── ChartCard.tsx     # Reusable chart wrapper
│   │   ├── EditableChart.tsx # Editable bar chart
│   │   ├── DurationChart.tsx # Line chart component
│   │   ├── OutcomeChart.tsx  # Pie chart component
│   │   ├── PeakHoursChart.tsx# Bar chart for peak hours
│   │   ├── EmailModal.tsx    # Email input dialog
│   │   └── OverwriteModal.tsx# Confirmation modal
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useUserData.ts    # User data management
│   │
│   ├── services/             # External services
│   │   └── supabase.ts       # Supabase API client
│   │
│   ├── types/                # TypeScript definitions
│   │   └── index.ts          # Type interfaces
│   │
│   ├── App.tsx               # Main application
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
│
├── public/                   # Static assets
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Tech Stack

| Technology       | Purpose            | Version |
| ---------------- | ------------------ | ------- |
| **React**        | UI Framework       | 18.x    |
| **TypeScript**   | Type Safety        | 5.x     |
| **Vite**         | Build Tool         | 5.x     |
| **Recharts**     | Data Visualization | 2.x     |
| **Tailwind CSS** | Styling            | 3.x     |
| **Supabase**     | Backend & Database | Latest  |
| **Lucide React** | Icon Library       | Latest  |

---

## 🎨 Design System

### Colors

```css
/* Primary - Purple */
--purple-400: #a78bfa;
--purple-500: #8b5cf6;
--purple-600: #7c3aed;
--purple-900: #581c87;

/* Accent - Blue */
--blue-400: #60a5fa;
--blue-500: #3b82f6;

/* Success - Green */
--green-400: #34d399;
--green-500: #10b981;

/* Background */
--slate-900: #0f172a;
```

### Typography

- Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- Heading: Bold, 2xl-3xl
- Body: Regular, sm-base

---

## 🧪 Development

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard:
# Settings → Environment Variables
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
```

## 🧪 Testing Guide

### Manual Testing Checklist

**Initial Load:**

- [ ] Dashboard loads with default dummy data
- [ ] All 4 charts render correctly
- [ ] Stats cards show calculated values

**Edit Flow:**

- [ ] Click "Edit" button on Weekly Call Volume chart
- [ ] Email modal appears
- [ ] Enter email and click Continue
- [ ] Chart switches to edit mode with input fields
- [ ] Modify values and click Save
- [ ] Data persists (refresh page to verify)

**Overwrite Flow:**

- [ ] Edit chart again with same email
- [ ] Previous data modal appears with timestamp
- [ ] Click "Overwrite" saves new data
- [ ] Click "Cancel" keeps old data

**Responsive Design:**

- [ ] Test on mobile (charts stack vertically)
- [ ] Test on tablet (2-column grid)
- [ ] Test on desktop (2-column grid)

---

## 🐛 Troubleshooting

### Supabase Connection Errors

**Problem:** "Failed to save data" error  
**Solutions:**

- Verify `.env` file has correct credentials
- Check table name is exactly `analytics_data`
- Ensure RLS policies are set up correctly
- Try accessing Supabase URL in browser

### Environment Variables Not Working

**Problem:** Getting `undefined` for env variables  
**Solutions:**

- Variables must start with `VITE_`
- Restart dev server after changing `.env`
- Access with `import.meta.env.VITE_*` (not `process.env`)

### TypeScript Errors

**Problem:** Type errors in components  
**Solution:**

```bash
# Check types/index.ts exists
# Run type check
npm run type-check
```

---

## 📊 Data Flow

```
┌─────────────┐
│   User      │
│   Action    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Click Edit  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Email Modal     │ ◄── First time users
│ (useUserData)   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Edit Mode       │
│ (EditableChart) │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Click Save      │
└──────┬──────────┘
       │
       ▼
┌─────────────────────┐
│ Check Previous Data │ ◄── supabaseService.getUserData()
│ (App.tsx)           │
└──────┬──────────────┘
       │
       ├─── No Previous Data ──────┐
       │                           │
       ├─── Has Previous Data      │
       │    │                      │
       │    ▼                      │
       │ ┌──────────────────┐     │
       │ │ Overwrite Modal  │     │
       │ └────────┬─────────┘     │
       │          │                │
       │          ▼                │
       └────► Save to Supabase ◄──┘
                  │
                  ▼
         ┌────────────────┐
         │ Update UI      │
         └────────────────┘
```

---

## 📝 API Reference

### Supabase Service

**`getUserData(email: string)`**

- Fetches user's saved chart data
- Returns: `Promise<UserData[]>`

**`saveUserData(email, data, isUpdate)`**

- Saves or updates user's chart data
- Returns: `Promise<UserData>`

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 👨‍💻 Author

**Gowtham Selvam**  
GitHub: [@s-gowtham-d/](https://github.com/s-gowtham-d/)

---
