import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Allied Hiring",
  description:
    "Share your requirement with Allied Hiring. We reply with a free shortlist plan for your India team.",
};

export default function Page() {
  return <ContactPage />;
}
