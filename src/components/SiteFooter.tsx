import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="ft-card">
            <Link href="/" className="logo" aria-label="Allied Hiring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-footer.png"
                alt="Allied Hiring"
                width={120}
                height={38}
              />
            </Link>
            <h3>Build your India team without the detour.</h3>
            <Link className="ft-btn" href="/contact">
              <span>Book a call</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="ft-r">
            <div className="ft-grid">
              <div>
                <h4>Main pages</h4>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About us</Link>
                  </li>
                  <li>
                    <Link href="/#services">Services</Link>
                  </li>
                  <li>
                    <Link href="/insights">Insights</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Explore</h4>
                <ul>
                  <li>
                    <Link href="/#why">Why Allied</Link>
                  </li>
                  <li>
                    <Link href="/#process">How it works</Link>
                  </li>
                  <li>
                    <Link href="/#talent">Talent</Link>
                  </li>
                  <li>
                    <Link href="/#billing">Billing</Link>
                  </li>
                  <li>
                    <Link href="/#results">Case study</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Get in touch</h4>
                <ul>
                  <li>
                    <a href="mailto:contact@alliedhiring.com">
                      contact@alliedhiring.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+971558837001">+971 55 883 7001</a>
                  </li>
                  <li>Dubai · Delhi · Noida · Bangalore · Mumbai</li>
                </ul>
              </div>
            </div>
            <div className="ft-bottom">
              <div className="ft-copy">
                © 2026 Allied Hiring. All rights reserved.
              </div>
              <a className="ft-top" href="#top">
                BACK TO TOP ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
