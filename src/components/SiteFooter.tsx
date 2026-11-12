export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="ft-card">
            <a href="/" className="logo" aria-label="Allied Hiring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-footer.png"
                alt="Allied Hiring"
                width={120}
                height={38}
              />
            </a>
            <h3>Build your India team without the detour.</h3>
            <a className="ft-btn" href="/contact">
              <span>Book a call</span>
              <span>↗</span>
            </a>
          </div>
          <div className="ft-r">
            <div className="ft-grid">
              <div>
                <h4>Main pages</h4>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About us</a>
                  </li>
                  <li>
                    <a href="/#services">Services</a>
                  </li>
                  <li>
                    <a href="/insights">Insights</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Explore</h4>
                <ul>
                  <li>
                    <a href="/#why">Why Allied</a>
                  </li>
                  <li>
                    <a href="/#process">How it works</a>
                  </li>
                  <li>
                    <a href="/#talent">Talent</a>
                  </li>
                  <li>
                    <a href="/#billing">Billing</a>
                  </li>
                  <li>
                    <a href="/#results">Case study</a>
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
