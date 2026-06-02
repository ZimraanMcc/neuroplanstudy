import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const form = body.form || {};
    const originalPlan = body.plan || "Not provided";
    const latestCheckIn = body.latestCheckIn || {};
    const checkIns = Array.isArray(body.checkIns) ? body.checkIns : [];

    const availableDays = Array.isArray(form.availableDays)
      ? form.availableDays.join(", ")
      : "Not provided";

    const prompt = `
You are NeuroPlan Study, a UK-focused AI revision planning assistant.

The student already has a revision plan. They have now checked in with how today went.

Your job is to create a calm, realistic adjusted plan for TOMORROW only.

Student details:
- Qualification: ${form.qualification || "Not provided"}
- Subjects: ${form.subjects || "Not provided"}
- Exam dates or deadlines: ${form.examDates || "Not provided"}
- Weak areas / hardest topics: ${form.weakAreas || "Not provided"}
- Current situation: ${form.currentSituation || "Not provided"}
- Main priority: ${form.priority || "Not provided"}
- Hours available per study day: ${form.hoursPerDay || "Not provided"}
- Realistic study days: ${availableDays}
- Preferred session length: ${form.sessionLength || "Not provided"}
- Energy level: ${form.energy || "Not provided"}
- Study mode: ${form.studyStyle || "Not provided"}
- If they fall behind, they want NeuroPlan to: ${
      form.adjustmentStyle || "Not provided"
    }
- Current struggles: ${form.struggles || "Not provided"}

Latest check-in:
- Date: ${latestCheckIn.date || "Not provided"}
- Status: ${latestCheckIn.status || "Not provided"}

Total check-ins saved: ${checkIns.length}

Original plan:
${originalPlan}

Meaning of check-in statuses:
- completed = they completed today's plan
- some = they did part of it
- missed = they missed the day
- easier = they need an easier day

Rules:
- Only create a plan for tomorrow, not a whole new 7-day plan.
- Do not shame the student.
- Do not tell them to restart from zero.
- Keep it realistic and specific.
- Use UK English.
- Do not give medical or mental health advice.
- Do not guarantee grades.
- If they missed today, reduce the plan and prioritise the most urgent/important task.
- If they did some, keep momentum but reduce pressure.
- If they completed today, keep tomorrow steady and manageable.
- If they need an easier day, create a low-energy plan.
- Include breaks.
- Include a tiny first task.
- Mention weak areas and exam/deadline urgency where useful.
- Make it feel like NeuroPlan is adapting with them.

Use this exact structure:

# Tomorrow’s adjusted NeuroPlan

## 1. What today means
Briefly explain how NeuroPlan is adjusting based on their check-in.

## 2. Tomorrow’s first tiny task
Give one task that takes 5–15 minutes.

## 3. Tomorrow’s main plan
Give a realistic tomorrow plan using their preferred session length.

## 4. If energy drops
Give an easier fallback version.

## 5. What to ignore tomorrow
Tell them what not to worry about so they do not overload themselves.

## 6. Check-in reminder
Tell them to come back tomorrow and check in again.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 1200,
    });

    return Response.json({
      adjustedPlan: response.output_text,
    });
  } catch (error) {
    console.error("Adjust plan error:", error);

    return Response.json(
      {
        error:
          "Sorry, NeuroPlan could not adjust tomorrow’s plan right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
