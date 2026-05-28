import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const form = await request.json();

    const prompt = `
You are NeuroPlan Study, a UK-focused revision planning assistant.

Create a personalised revision plan for a student using the information below.

Student details:
- Qualification: ${form.qualification}
- Main priority: ${form.priority}
- Subjects: ${form.subjects}
- Exam dates or deadlines: ${form.examDates}
- Hours available per day: ${form.hoursPerDay}
- Energy level: ${form.energy}
- Study mode: ${form.studyStyle}
- Current struggles: ${form.struggles}

Important instructions:
- Write in supportive UK English.
- Make the plan specific to the student's subjects, dates, energy and struggles.
- The plan should be realistic, calm and not overwhelming.
- Include ADHD/autism/burnout-friendly adjustments where relevant.
- Do not diagnose the student.
- Do not give medical or mental health advice.
- Do not guarantee grades.
- Keep the output structured and easy to follow.
- Avoid generic advice where possible.
- If exam dates are unclear, still create a useful 7-day plan.
- Include a low-energy backup version.
- Include what to do if the student falls behind.
- Include a clear first task they can do today.

Use this structure:

1. Your NeuroPlan summary
2. Today’s first step
3. Your 7-day revision plan
4. Low-energy backup plan
5. If you fall behind
6. Exam/deadline strategy
7. Reminder
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 1400,
    });

    return Response.json({
      plan: response.output_text,
    });
  } catch (error) {
    console.error("Generate plan error:", error);

    return Response.json(
      {
        error:
          "Sorry, NeuroPlan could not generate a plan right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
