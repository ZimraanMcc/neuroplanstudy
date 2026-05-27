});

  const [plan, setPlan] = useState("");

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generatePlan() {
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
        : "3 focused sessions per day with proper breaks";

    const breakAdvice =
      form.energy === "Low"
        ? "Take a 10–15 minute break after each short session. Low energy still counts as progress."
        : form.energy === "High"
        ? "Use your energy, but do not overdo it. Take breaks before you crash."
        : "Take a 5–10 minute break between sessions to keep your focus steady.";

    let modeAdvice = "";

    if (form.studyStyle === "ADHD-friendly") {
      modeAdvice =
        "Use short timers, visible checklists and quick wins. Start with the easiest useful action so your brain gets momentum.";
    } else if (form.studyStyle === "Autism-friendly") {
      modeAdvice =
        "Use a predictable routine, clear start and stop times, and reduce unnecessary choices where possible.";
    } else if (form.studyStyle === "Burnout / low-energy") {
      modeAdvice =
        "Your goal is not maximum productivity. Your goal is staying connected to revision without pushing yourself into shutdown.";
    } else if (form.studyStyle === "Last-minute panic mode") {
      modeAdvice =
        "Focus on the highest-value topics first. Prioritise exam-style questions, key definitions and common mistakes.";
    } else {
      modeAdvice =
        "Use a flexible routine with realistic sessions, breaks and catch-up space.";
    }

    const generatedPlan = `
Your NeuroPlan Study revision plan

Qualification:
${form.qualification}

Subjects:
${subjects}

Important dates:
${exams}

Current priority:
${form.priority}

Energy level:
${form.energy}

Study mode:
${form.studyStyle}

Main challenge:
${struggles}


1. Your revision structure

Use ${sessionLength} study blocks.

Aim for:
${sessionsPerDay}.

Break guidance:
${breakAdvice}

Mode guidance:
${modeAdvice}


2. Today’s first step

Do not start with the whole subject.

Start with this:

- Choose one subject.
- Choose one small topic.
- Set a timer for ${sessionLength} minutes.
- Write down 3 tiny tasks.
- Complete only the first task.


3. Your 7-day calm revision plan

Day 1 — Reduce overwhelm
- Pick the subject that feels most urgent.
- Choose one small topic.
- Make a quick list of what needs doing.
- Complete one short revision block.
- Stop before you feel completely drained.

Day 2 — Build momentum
- Revise one weaker topic.
- Use active recall: close your notes and test yourself.
- Make 5–10 flashcards or summary points.
- End by writing one thing you understand better now.

Day 3 — Mixed subject day
- Do one session on a harder subject.
- Do one session on an easier subject.
- Keep the easier session as a confidence builder.
- Take a proper break between them.

Day 4 — Low-energy backup day
- If you feel okay, do one normal session.
- If you feel low, do one tiny task:
  - organise notes
  - watch one short explanation video
  - make 3 flashcards
  - answer one question

Day 5 — Practice day
- Try exam-style questions.
- Mark them honestly.
- Write down your common mistakes.
- Choose one mistake to fix next time.

Day 6 — Review day
- Revisit something from Day 1 or Day 2.
- Test yourself before looking at notes.
- Repeat the parts you forgot.
- Keep the session short and focused.

Day 7 — Reset and plan ahead
- Lightly review the week.
- Pick your top 3 topics for next week.
- Move unfinished tasks forward without guilt.
- Take a proper rest break.


4. If you fall behind

Do not restart the whole plan.

Use this reset rule:

- Missed 1 day: continue from today.
- Missed 2–3 days: choose only the most urgent topic.
- Missed a week: make a new 3-day emergency plan.
- Feeling overwhelmed: do a 5-minute starter task only.


5. Low-energy version

If everything feels too much, use this instead:

- 5 minutes: open your notes and choose one topic.
- 10 minutes: read or watch one explanation.
- 10 minutes: write down 3 key points.
- 5 minutes: close everything and stop.

That still counts.


6. Reminder

NeuroPlan is a study-planning tool. It can help you structure revision, but it is not medical, mental health or academic guarantee advice.


Your first task now

Choose one subject and do just ${sessionLength} minutes.

Do not aim for perfect.
Aim for started.
`;

    setPlan(generatedPlan.trim());
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

        <h1>A calmer way to revise.</h1>

        <p className="subtitle">
          Create realistic revision plans for GCSEs, A-Levels, BTECs and
          university work — built for overwhelmed, ADHD and autistic students in
          the UK.
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
            <h3>ADHD-friendly structure</h3>
            <p>
              Short sessions, quick wins and clear first steps so starting feels
              less impossible.
            </p>
          </div>

          <div className="card">
            <h3>Autism-friendly routine</h3>
            <p>
              Predictable plans, reduced overwhelm and clear steps without
              unnecessary pressure.
            </p>
          </div>

          <div className="card">
            <h3>Burnout-aware planning</h3>
            <p>
              Low-energy alternatives and catch-up space so one bad day does not
              ruin the whole week.
            </p>
          </div>
        </div>
      </section>

      <section className="planner" id="planner">
        <h2>Create your revision plan</h2>

        <p>
          Enter your study details below. NeuroPlan will create a calm 7-day
          revision structure you can start using today.
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

          <button type="button" onClick={generatePlan}>
            Generate my plan
          </button>
        </div>

        {plan && (
          <div className="resultBox">
            <div className="resultHeader">
              <h3>Your plan</h3>
              <button type="button" onClick={copyPlan}>
                Copy plan
              </button>
            </div>

            <pre>{plan}</pre>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Why NeuroPlan is different</h2>
        <p>
          NeuroPlan is designed around real student struggles: overwhelm,
          procrastination, low energy, anxiety, ADHD, autism and burnout. It
          helps turn revision into smaller steps instead of one huge impossible
          task.
        </p>
      </section>

      <footer>
        <p>© 2026 NeuroPlan Study. Built in the UK.</p>
      </footer>
    </main>
  );
}
