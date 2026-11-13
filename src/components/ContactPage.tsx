"use client";

import { contactMarkup } from "./contact-markup";
import { contactScripts } from "./contact-scripts";
import HtmlPage from "./HtmlPage";

export default function ContactPage() {
  return (
    <HtmlPage
      markup={contactMarkup}
      scripts={contactScripts}
      label="contact"
    />
  );
}
