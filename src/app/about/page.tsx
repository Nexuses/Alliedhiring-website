import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import "./about.css";

export const metadata: Metadata = {
  title: "About Allied Hiring",
  description:
    "Allied Hiring is a managed staffing partner with India delivery. We recruit, employ and manage your people. You lead the work.",
};

export default function Page() {
  return <AboutPage />;
}
