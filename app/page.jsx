"use client";

import { useState } from "react";

export default function HomePage() {
  const DAILY_LIMIT = 3;

  const [form, setForm] = useState({
    qualification: "GCSE",
    subjects: "",
    examDates: "",
    hoursPerDay: "1",
    energy: "Medium",
    studyStyle: "ADHD-friendly",
    struggles: "",
    priority: "I feel behind",
  });

  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function generatePlan() {
    setIsLoading(true);
    setErrorMessage("");
    setPlan("");

    const today = new Date().toISOString().split("T")[0];
    const usageKey = "neuroplan_daily_usage";
    const savedUsage = JSON.parse(localStorage.getItem(usageKey) || "{}");

    if (savedUsage.date !== today) {
      savedUsage.date = today;
      savedUsage.count = 0;
    }

    if (savedUsage.count >= DAILY_LIMIT) {
      setIsLoading(false);
      setErrorMessage(
        "You have reached today’s free AI plan limit. Please come back tomorrow."
      );
      return;
    }

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      savedUsage.count += 1;
      localStorage.setItem(usageKey, JSON.stringify(savedUsage));

      setPlan(data.plan);
    } catch (error) {
      setErrorMessage(
        "Sorry, NeuroPlan could not generate a plan right now. Please try again in a moment."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function copyPlan() {
    if (!plan) return;
    navigator.clipboard.writeText(plan);
    alert("Your plan has been copied.");
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="tagline">NeuroPlan Study</p>

        <h1>Revision planning for overwhelmed students.</h1>

        <p className="subtitle">
          Build a calm, realistic revision plan for GCSEs, A-Levels, BTECs and
          university work. Designed for students who struggle with overwhelm,
          ADHD, autism, anxiety, burnout or simply getting started.
        </p>

        <div className="buttons">
          <a href="#planner" className="primaryButton">
            Create my free AI plan
          </a>
          <a href="#how-it-works" className="secondaryButton">
            See how it works
          </a>
        </div>

        <p className="heroNote">
          Free AI version · Built in the UK · No account needed
        </p>
      </section>

      <section className="section introSection" id="how-it-works">
        <div>
          <p className="sectionLabel">Why NeuroPlan exists</p>
          <h2>Most revision timetables are too rigid.</h2>
        </div>

        <p>
          A normal timetable assumes you can focus the same way every day, stay
          motivated, follow long study blocks and never fall behind. NeuroPlan
          works differently. It gives you short sessions, catch-up space,
          low-energy options and a clear first step.
        </p>

        <div className="cards">
          <div className="card">
            <h3>ADHD-friendly structure</h3>
            <p>
              Short sessions, visible steps and quick wins so starting feels
              less impossible.
            </p>
          </div>

          <div className="card">
            <h3>Autism-friendly routine</h3>
            <p>
              Predictable plans, clear start points and reduced unnecessary
              choices.
            </p>
          </div>

          <div className="card">
            <h3>Burnout-aware planning</h3>
            <p>
              Low-energy alternatives and catch-up days so one difficult day
              does not ruin the week.
            </p>
          </div>
        </div>
      </section>

      <section className="section whoSection">
        <p className="sectionLabel">Who it is for</p>
        <h2>Built for UK students who need revision to feel doable.</h2>

        <div className="pillGrid">
          <span>GCSE students</span>
          <span>A-Level students</span>
          <span>BTEC and T-Level learners</span>
          <span>University students</span>
          <span>ADHD learners</span>
          <span>Autistic students</span>
          <span>Anxious students</span>
          <span>Burnt-out students</span>
        </div>
      </section>

      <section className="planner" id="planner">
        <p className="sectionLabel">Free AI planner</p>
        <h2>Create your revision plan</h2>

        <p>
          Enter your study details below. NeuroPlan will create a personalised
          revision structure based on your subjects, deadlines, energy and study
          style.
        </p>

        <p
          style={{
            marginTop: "10px",
            fontWeight: "700",
            color: "#5b4b2f",
          }}
        >
          Free early version: 3 AI plans per day per device.
        </p>

        <div className="plannerForm">
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
              <option>Access course</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Main priority
            <select
              value={form.priority}
              onChange={(e) => updateForm("priority", e.target.value)}
            >
              <option>I feel behind</option>
              <option>I need help starting</option>
              <option>I need a weekly plan</option>
              <option>I have exams soon</option>
              <option>I feel burnt out</option>
              <option>I need structure</option>
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
            Study mode
            <select
              value={form.studyStyle}
              onChange={(e) => updateForm("studyStyle", e.target.value)}
            >
              <option>ADHD-friendly</option>
              <option>Autism-friendly</option>
              <option>Burnout / low-energy</option>
              <option>Last-minute panic mode</option>
              <option>Flexible plan</option>
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

          <button type="button" onClick={generatePlan} disabled={isLoading}>
            {isLoading ? "Creating your plan..." : "Generate my AI plan"}
          </button>
        </div>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        {plan && (
          <div className="resultBox">
            <div className="resultHeader">
              <h3>Your AI plan</h3>
              <button type="button" onClick={copyPlan}>
                Copy plan
              </button>
            </div>

            <pre>{plan}</pre>
          </div>
        )}
      </section>

      <section className="section waitlistSection">
        <p className="sectionLabel">Early updates</p>
        <h2>Want to follow NeuroPlan as it grows?</h2>

        <p>
          Join the early updates list to hear when NeuroPlan adds saved plans,
          printable timetables, accounts, reminders and premium features.
        </p>

        <a
          className="primaryButton"
          href="mailto:help@neuroplanstudy.com?subject=Join%20NeuroPlan%20updates&body=Hi%2C%20please%20add%20me%20to%20the%20NeuroPlan%20Study%20early%20updates%20list."
        >
          Join the early updates list
        </a>

        <p
          style={{
            marginTop: "14px",
            fontSize: "0.95rem",
            color: "#6b5d42",
          }}
        >
          This opens your email app. You can ask to be removed from updates at
          any time.
        </p>
      </section>

      <section className="section trustSection">
        <p className="sectionLabel">Important note</p>
        <h2>A study tool, not pressure.</h2>
        <p>
          NeuroPlan is here to help you structure revision into smaller steps.
          It does not guarantee grades and it is not medical or mental health
          advice. If studying is seriously affecting your wellbeing, speak to a
          trusted adult, teacher, GP, college, university or support service.
        </p>
      </section>

      <footer>
        <p>© 2026 NeuroPlan Study. Built in the UK.</p>

        <div className="footerLinks">
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>
      </footer>
    </main>
  );
}
