import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "NeuroPlan Study",
  description:
    "AI revision planning for overwhelmed, ADHD and autistic students in the UK.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
