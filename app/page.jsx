"use client";

import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({
    qualification: "GCSE",
    subjects: "",
    examDates: "",
    hoursPerDay: "1",
    energy: "Medium",
    studyStyle: "Short sessions",
    struggles: "",
  });

  const [plan, setPlan] = useState("");

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generatePlan(event) {
    event.preventDefault();

    const subjects = form.subjects.trim() || "your main subjects";
    const exams = form.examDates.trim() || "your upcoming exams";
    const struggles =
      form.struggles.trim() ||
      "getting started, staying consistent and avoiding overwhelm";

    const dailyHours = Number(form.hoursPerDay);

    const sessionLength =
      form.energy === "Low"
        ? "15–20 minute"
        : form.energy === "High"
        ? "35–45 minute"
        : "25–30 minute";

    const sessionsPerDay =
      dailyHours <= 1
        ? "1 focused session per day"
        : dailyHours === 2
        ? "2 focused sessions per day"
        : "3 focused sessions per day, with proper breaks";

    const generatedPlan = `
Your NeuroPlan revision timetable

Qualification: ${form.qualification}
Subjects: ${subjects}
Important dates: ${exams}
Energy level: ${form.energy}
Study preference: ${form.studyStyle}

Your main challenge:
${struggles}

Recommended structure:
Use ${sessionLength} study blocks.
Aim for ${sessionsPerDay}.
After each session, take a real break away from your desk.

7-day calm revision plan:

Day 1 — Set up and reduce overwhelm
- Pick the subject that feels most urgent.
- Choose one small topic, not the whole subject.
- Create a short checklist of 3 tasks.
- Finish with a 5-minute review of what you managed.

Day 2 — First focused revision day
- Revise one weaker topic.
- Use active recall: close your notes and test yourself.
- Write down anything you still do not understand.
- Stop before you burn out.

Day 3 — Mixed subject day
- Do one session on a difficult subject.
- Do one easier session to build confidence.
- Use short breaks between each task.

Day 4 — Low-energy catch-up day
- If you feel tired, only do the easiest useful task.
- Watch a short explanation video, make flashcards, or organise notes.
- This day is for staying connected, not being perfect.

Day 5 — Practice day
- Try exam-style questions.
- Mark them honestly.
- Write down 2–3 mistakes to fix next time.

Day 6 — Review and repeat
- Revisit the topic from Day 1.
- Test yourself without looking first.
- Focus on progress, not perfection.

Day 7 — Reset day
- Do a light review.
- Tidy your revision list.
- Choose next week’s top 3 topics.
- Take a proper break.

If you feel overwhelmed:
Start with a 5-minute task. Open the document, write the title, or answer one question. The goal is to lower the barrier to starting.

Your first step today:
Choose one subject and revise for just ${sessionLength} minutes.
`;

    setPlan(generatedPlan.trim());
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="tagline">NeuroPlan Study</p>
        <h1>A calmer way to revise.</h1>
        <p className="subtitle">
          Create realistic revision plans for GCSEs, A-Levels, BTECs and
          university work — built for overwhelmed, ADHD and autistic students.
        </p>

        <div className="buttons">
          <a href="#planner" className="primaryButton">
            Create my revision plan
          </a>
          <a href="#how-it-works" className="secondaryButton">
            How it works
          </a>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <h2>Built for students who feel overwhelmed</h2>
        <p>
          Most revision timetables are too rigid. NeuroPlan creates flexible
          plans with short study blocks, breaks, catch-up space and low-energy
          options.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Shorter study blocks</h3>
            <p>
              Break revision into manageable sessions instead of forcing long,
              exhausting study marathons.
            </p>
          </div>

          <div className="card">
            <h3>Low-energy options</h3>
            <p>
              Get a gentler structure for days when motivation, focus or energy
              is low.
            </p>
          </div>

          <div className="card">
            <h3>Catch-up space</h3>
            <p>
              Build breathing room into your plan so one difficult day does not
              ruin the whole week.
            </p>
          </div>
        </div>
      </section>

      <section className="planner" id="planner">
        <h2>Create your revision plan</h2>
        <p>
          Enter your study details below. NeuroPlan will create a simple 7-day
          revision structure you can start using today.
        </p>

        <form className="plannerForm" onSubmit={generatePlan}>
          <label>
            Qualification
            <select
              value={form.qualification}
              onChange={(e) => updateForm("qualification", e.target.value)}
            >
              <option>GCSE</option>
              <option>A-Level</option>
              <option>BTEC</option>
              <option>T-Level</option>
              <option>University</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Subjects
            <textarea
              placeholder="Example: Maths, English Literature, Biology"
              value={form.subjects}
              onChange={(e) => updateForm("subjects", e.target.value)}
            />
          </label>

          <label>
            Exam dates or deadlines
            <textarea
              placeholder="Example: Maths paper 1 - 16 May, Biology - 23 May"
              value={form.examDates}
              onChange={(e) => updateForm("examDates", e.target.value)}
            />
          </label>

          <label>
            Hours available per day
            <select
              value={form.hoursPerDay}
              onChange={(e) => updateForm("hoursPerDay", e.target.value)}
            >
              <option value="1">Around 1 hour</option>
              <option value="2">Around 2 hours</option>
              <option value="3">3+ hours</option>
            </select>
          </label>

          <label>
            Energy level right now
            <select
              value={form.energy}
              onChange={(e) => updateForm("energy", e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label>
            Study preference
            <select
              value={form.studyStyle}
              onChange={(e) => updateForm("studyStyle", e.target.value)}
            >
              <option>Short sessions</option>
              <option>Flexible plan</option>
              <option>Routine-based plan</option>
              <option>Catch-up mode</option>
              <option>Low-overwhelm mode</option>
            </select>
          </label>

          <label>
            What are you struggling with?
            <textarea
              placeholder="Example: I feel behind, I avoid starting, I panic when I see everything I need to do..."
              value={form.struggles}
              onChange={(e) => updateForm("struggles", e.target.value)}
            />
          </label>

          <button type="submit">Generate my plan</button>
        </form>

        {plan && (
          <div className="resultBox">
            <h3>Your plan</h3>
            <pre>{plan}</pre>
          </div>
        )}
      </section>

      <footer>
        <p>© 2026 NeuroPlan Study. Built in the UK.</p>
      </footer>
    </main>
  );
}
