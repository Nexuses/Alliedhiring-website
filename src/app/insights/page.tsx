import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import "../about/about.css";

export const metadata: Metadata = {
  title: "Insights | Allied Hiring",
  description: "Insights and updates from Allied Hiring.",
};

export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="ab-hero">
          <div className="wrap">
            <div className="ab-herobox">
              <span className="chip">Coming soon</span>
              <h1>
                Allied Hiring <b>Insights</b>
              </h1>
              <p>
                Articles, hiring guides and India talent trends will live here
                soon.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
