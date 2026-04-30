# EduFlow AI

**AI-powered student productivity assistant**

EduFlow AI is a full-stack student assistant SaaS that brings study planning, notes, productivity tracking, mood support, and AI learning tools into one clean dashboard.

---

##  Overview

Students often use too many separate tools for planning, notes, doubts, focus tracking, and motivation. EduFlow AI was built to solve that problem by combining the most useful student workflows in one place.

With EduFlow AI, students can manage study tasks, create and organize notes, ask AI-powered academic questions, track productivity, monitor mood, build daily study streaks, and view weekly progress from a single dashboard.

The goal is simple: help students stay organized, consistent, and supported while studying.

---

##  Features

### Study & Planning

- Study Planner with full CRUD support
- Task completion tracking
- Notifications and reminders
- Daily streak tracking with animations and badges
- Weekly Progress Graph for completed study tasks

### Notes

- Notes CRUD
- AI Notes Generator
- Export notes as PDF
- Shareable notes links
- Organized note management

### AI Learning Tools

- AI Doubt Solver
- AI-generated study notes
- Multi-agent AI architecture
- LLM-powered academic assistance

### Productivity & Wellness

- Productivity Tracker
- Mood Tracker
- Mood-based suggestions
- Dashboard overview cards
- Premium light mint/teal UI

---

##  AI Capabilities

EduFlow AI uses AI APIs through OpenRouter / LLM providers to make studying more interactive and helpful.

### AI Doubt Solver

Students can ask academic questions and receive clear, AI-generated explanations. This helps reduce friction when they get stuck while studying.

### AI Notes Generator

Students can generate structured study notes from prompts, topics, or learning goals. This makes it easier to start studying without staring at a blank page.

### Multi-Agent Architecture

The project includes a multi-agent AI approach, allowing different AI workflows to support different parts of the app, such as doubt solving, notes generation, and productivity assistance.

---

##  Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React

### Backend & Database

- Supabase Auth
- Supabase Database
- Row Level Security policies

### AI & APIs

- Google Gemini API
- AI-powered notes generation
- AI-powered doubt solving

### Utilities

- PDF export
- Notifications and reminders
- Responsive dashboard UI

---

## 📸 Screenshots

> Replace these placeholder images with real screenshots when available.

![Dashboard Screenshot](./public/images/dashboard.png)

![Study Planner Screenshot](./public/images/study-planner.png)

![AI Doubt Solver Screenshot](./public/images/ai-doubt-solver.png)

![Notes Screenshot](./public/images/notes.png)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/eduflow-ai.git
cd eduflow-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
AI_PROVIDER=gemini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
OPENAI_API_KEY=
```

Add your Supabase project URL, Supabase anon key, and AI API key. EduFlow AI uses Gemini when `AI_PROVIDER=gemini`, and can fall back to the OpenRouter/OpenAI-compatible key when `OPENAI_API_KEY` is available.

### 4. Run the development server

```bash
npm run dev
```

Open the app in your browser:

```text
(https://eduflow-ai-olive.vercel.app/)
```

### 5. Build for production

```bash
npm run build
```

---

## Environment Variables

Example `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
AI_PROVIDER=gemini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
OPENAI_API_KEY=
```

##  Key Features Highlight

### Streak System

EduFlow AI tracks daily study consistency based on completed study tasks. The dashboard includes animated streak UI, milestone badges, longest streak tracking, and last active date display.

### Weekly Progress Graph

The dashboard shows a clean 7-day bar chart based on completed study tasks. This helps students quickly understand their study momentum across the week.

### AI Integration

AI tools are built directly into the study workflow, so students can generate notes, solve doubts, and get help without leaving the app.

---

##  Challenges I Faced

Building EduFlow AI involved several real-world challenges:

- Handling async state across multiple dashboard widgets in Next.js
- Keeping the dashboard responsive while showing a lot of useful data
- Fixing TypeScript and production build issues while adding new features
- Integrating AI APIs in a reliable and user-friendly way
- Understanding and configuring Supabase Auth, database queries, and RLS policies
- Managing many features together without breaking existing workflows
- Designing a clean UI that feels premium but still practical for daily student use

---

##  Future Improvements

- Heatmap calendar for long-term study consistency
- Advanced AI study insights
- Personalized study recommendations
- Mobile app version
- Better analytics for productivity and mood trends
- Collaborative study spaces
- More export and sharing options

---

##  Contributing

Contributions are welcome.

If you would like to improve EduFlow AI:

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Submit a pull request

Please keep changes clean, focused, and easy to review.

---

##  License

This project is licensed under the MIT License.

---

##  Acknowledgements

Thanks to the tools and platforms that make this project possible:

- Next.js
- Supabase
- Tailwind CSS
- OpenRouter
- LLM providers
- Vercel ecosystem

---

##  Contact

Created by **Your Name**

- GitHub: https://github.com/prabhakarshukla
- LinkedIn: www.linkedin.com/in/prabhakar-shukla-90334b399
- Instagram: https://www.instagram.com/prabhakar_.shukla
- Gmail: prabhakarshukla669@gmail.com 
