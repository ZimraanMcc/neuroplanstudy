export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="tagline">NeuroPlan Study</p>

        <h1>A calmer way to revise.</h1>

        <p className="subtitle">
          AI revision planning for overwhelmed, ADHD and autistic students.
          Create realistic study timetables for GCSEs, A-Levels, BTECs and
          university work.
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
          Most revision timetables assume you can focus the same way every day.
          NeuroPlan is different. It helps you build a revision plan around your
          energy, attention, deadlines and real life.
        </p>

        <div className="cards">
          <div className="card">
            <h3>Shorter study blocks</h3>
            <p>
              Break revision into manageable sessions with rest time built in.
            </p>
          </div>

          <div className="card">
            <h3>Low-energy options</h3>
            <p>
              Get a gentler version of your plan for days when everything feels
              too much.
            </p>
          </div>

          <div className="card">
            <h3>Catch-up space</h3>
            <p>
              Your plan includes breathing room so one bad day does not ruin the
              whole week.
            </p>
          </div>
        </div>
      </section>

      <section className="planner" id="planner">
        <h2>Revision planner coming soon</h2>
        <p>
          The first version of the AI planner is being built. Soon you’ll be able
          to enter your subjects, exam dates, available time and study style to
          generate a calm revision timetable.
        </p>

        <form className="signupForm">
          <input type="email" placeholder="Enter your email for early access" />
          <button type="button">Join waitlist</button>
        </form>
      </section>

      <footer>
        <p>© 2026 NeuroPlan Study. Built in the UK.</p>
      </footer>
    </main>
  );
}
