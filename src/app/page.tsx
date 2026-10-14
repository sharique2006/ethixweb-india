import IndiaNetwork from "@/components/india-network";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Code2,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  MousePointer2,
  Search,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

const tickerItems = [
  "AI AGENTS",
  "CRM SYSTEMS",
  "WEBSITES",
  "SEO",
  "PAID ADS",
  "ANALYTICS",
  "AUTOMATIONS",
  "INTEGRATIONS",
];

const services = [
  {
    number: "01",
    icon: Bot,
    title: "AI agents & automation",
    description:
      "Put repetitive tasks on autopilot. Connect your tools and give your team more time for meaningful work.",
    tags: ["AI workflows", "Smart assistants"],
  },
  {
    number: "02",
    icon: Layers3,
    title: "CRM & sales systems",
    description:
      "Keep enquiries, follow-ups and customer relationships organised in one connected workflow.",
    tags: ["Lead management", "Integrations"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Websites & development",
    description:
      "Build a fast, credible digital presence that explains what you do and makes taking action simple.",
    tags: ["Web design", "Web applications"],
  },
  {
    number: "04",
    icon: Search,
    title: "SEO & discoverability",
    description:
      "Help the right people find your business with a stronger search presence and useful content.",
    tags: ["Technical SEO", "Content"],
  },
  {
    number: "05",
    icon: ChartNoAxesCombined,
    title: "Paid growth & analytics",
    description:
      "Understand what brings customers in and make informed decisions about your marketing spend.",
    tags: ["Campaigns", "Reporting"],
  },
  {
    number: "06",
    icon: Workflow,
    title: "Business integrations",
    description:
      "Connect forms, email, calendars and business tools so information moves without unnecessary manual work.",
    tags: ["Connected tools", "Workflows"],
  },
  {
    number: "07",
    icon: Database,
    title: "Dashboards & data",
    description:
      "Turn scattered business information into clear dashboards that help your team see what matters.",
    tags: ["Reporting", "Insights"],
  },
  {
    number: "08",
    icon: ShieldCheck,
    title: "Ongoing optimisation",
    description:
      "Keep your digital systems reliable, secure and improving as your business grows.",
    tags: ["Maintenance", "Performance"],
  },
];

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start with your goals, your customers and the problems that are worth solving.",
  },
  {
    number: "02",
    title: "Build the plan",
    description:
      "We agree on priorities, scope and a practical approach before work begins.",
  },
  {
    number: "03",
    title: "Make it happen",
    description:
      "We build, test and refine the solution with clear communication along the way.",
  },
  {
    number: "04",
    title: "Keep improving",
    description:
      "We use feedback and performance data to identify what to improve next.",
  },
];

export default function Home() {
  return (
    <main className="original-home">
      <section className="original-hero">
        <div className="hero-web" aria-hidden="true">
          <span className="web-ring web-ring-one" />
          <span className="web-ring web-ring-two" />
          <span className="web-ring web-ring-three" />
          <span className="web-cross web-cross-one" />
          <span className="web-cross web-cross-two" />
          <span className="web-cross web-cross-three" />
          <span className="web-cross web-cross-four" />
          <span className="web-dot web-dot-one" />
          <span className="web-dot web-dot-two" />
          <span className="web-dot web-dot-three" />
        </div>

        <div className="container original-hero-inner">
          <div className="original-hero-copy">
            <div className="original-eyebrow">
              <span className="eyebrow-pulse" />
              DIGITAL SYSTEMS FOR AMBITIOUS BUSINESSES
            </div>

            <h1>
              We run the tech.
              <br />
              You run the <span>business.</span>
            </h1>

            <p className="original-hero-description">
              Websites, AI agents, CRM and connected systems that help your
              business work smarter, serve customers better and keep moving
              forward.
            </p>

            <div className="original-hero-actions">
              <Link href="/contact" className="original-primary-button">
                Let&apos;s talk about your business
                <ArrowUpRight size={17} />
              </Link>
              <Link href="/services" className="original-secondary-button">
                Explore what we do
                <ArrowDownRight size={17} />
              </Link>
            </div>

            <div className="original-hero-note">
              <span className="note-mark">✳</span>
              <span>Strategy first. Practical technology. Real outcomes.</span>
            </div>
          </div>

           
        </div>

        <div className="container original-hero-bottom">
          <span>LESS BUSYWORK.</span>
          <span className="hero-bottom-line" />
          <span>BETTER SYSTEMS.</span>
          <span className="hero-bottom-line" />
          <span>ROOM TO GROW.</span>
        </div>
      </section>

      <section className="original-ticker" aria-label="Our services">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={item}>
                  {item}
                  <span className="ticker-star">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="original-section original-services" id="services">
        <div className="container">
          <div className="original-section-top">
            <div>
              <div className="original-eyebrow">
                <span className="eyebrow-pulse" />
                WHAT WE DO
              </div>
              <h2>
                The right tech.
                <br />
                <span>Without the headache.</span>
              </h2>
            </div>
            <div className="original-section-intro">
              <p>
                Your business doesn&apos;t need more disconnected tools. It
                needs a digital setup that makes sense, works together and
                helps you move forward.
              </p>
              <Link href="/services" className="original-inline-link">
                Explore all services <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="original-service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="original-service-card" key={service.number}>
                  <div className="original-service-card-top">
                    <span className="original-card-number">
                      / {service.number}
                    </span>
                    <span className="original-card-icon">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <div className="original-card-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="original-card-link"
                    aria-label={`Discuss ${service.title}`}
                  >
                    <span>Let&apos;s discuss it</span>
                    <ArrowUpRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="original-services-bottom">
            <span>ONE PARTNER. CONNECTED SOLUTIONS.</span>
            <Link href="/services">
              See how we can help <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="original-operations">
        <div className="container original-operations-grid">
          <div className="original-operations-copy">
            <div className="original-eyebrow">
              <span className="eyebrow-pulse" />
              BUILT AROUND YOUR BUSINESS
            </div>
            <h2>
              One connected setup.
              <br />
              <span>Fewer moving parts.</span>
            </h2>
            <p>
              Your website, enquiries, customer relationships and everyday
              workflows should work together. We help you connect the pieces
              instead of adding another layer of complexity.
            </p>

            <div className="operations-list">
              <div>
                <span className="operations-list-icon">
                  <MousePointer2 size={17} />
                </span>
                <span>
                  <strong>Customer experience</strong>
                  <small>Make it easier for people to take the next step.</small>
                </span>
              </div>
              <div>
                <span className="operations-list-icon">
                  <Workflow size={17} />
                </span>
                <span>
                  <strong>Connected workflows</strong>
                  <small>Reduce repeated tasks and manual handoffs.</small>
                </span>
              </div>
              <div>
                <span className="operations-list-icon">
                  <ChartNoAxesCombined size={17} />
                </span>
                <span>
                  <strong>Clearer visibility</strong>
                  <small>Know what is happening and what needs attention.</small>
                </span>
              </div>
            </div>

            <Link href="/contact" className="original-primary-button">
              Discuss your setup <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="operations-visual">
            <div className="operations-window">
              <div className="operations-window-top">
                <span className="window-lights">
                  <i />
                  <i />
                  <i />
                </span>
                <span>YOUR DIGITAL ECOSYSTEM</span>
                <span className="window-live">
                  <span className="status-indicator" />
                  CONNECTED
                </span>
              </div>

              <div className="ecosystem">
                <div className="ecosystem-hub">
                  <span className="ecosystem-hub-mark">E.</span>
                  <span>YOUR BUSINESS</span>
                </div>
                <div className="ecosystem-lines">
                  <span className="eco-line eco-line-a" />
                  <span className="eco-line eco-line-b" />
                  <span className="eco-line eco-line-c" />
                  <span className="eco-line eco-line-d" />
                  <span className="eco-line eco-line-e" />
                  <span className="eco-line eco-line-f" />
                </div>
                <div className="ecosystem-node eco-node-a">
                  <Globe2 size={18} />
                  <span>Website</span>
                </div>
                <div className="ecosystem-node eco-node-b">
                  <MessageCircle size={18} />
                  <span>Enquiries</span>
                </div>
                <div className="ecosystem-node eco-node-c">
                  <Bot size={18} />
                  <span>AI tools</span>
                </div>
                <div className="ecosystem-node eco-node-d">
                  <Database size={18} />
                  <span>CRM</span>
                </div>
                <div className="ecosystem-node eco-node-e">
                  <Zap size={18} />
                  <span>Automation</span>
                </div>
                <div className="ecosystem-node eco-node-f">
                  <ChartNoAxesCombined size={18} />
                  <span>Analytics</span>
                </div>
              </div>

              <div className="operations-window-bottom">
                <span>DESIGNED TO WORK TOGETHER</span>
                <span>ETHIXWEB INDIA ↗</span>
              </div>
            </div>
            <div className="operations-side-note">
              <span className="side-note-symbol">✳</span>
              <span>
                <strong>Built for your reality.</strong>
                <small>Not technology for technology&apos;s sake.</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <IndiaNetwork />

      <section className="original-section original-process">
        <div className="container">
          <div className="original-section-top">
            <div>
              <div className="original-eyebrow">
                <span className="eyebrow-pulse" />
                HOW WE WORK
              </div>
              <h2>
                Clear thinking.
                <br />
                <span>Solid execution.</span>
              </h2>
            </div>
            <p className="original-process-intro">
              No unnecessary complexity or mysterious process. Just a clear
              path from your business challenge to a solution you can use.
            </p>
          </div>

          <div className="original-process-grid">
            {steps.map((step) => (
              <article className="original-process-card" key={step.number}>
                <span className="process-card-number">{step.number}</span>
                <div className="process-card-line" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="original-final-cta">
        <div className="container">
          <div className="original-cta-panel">
            <div className="cta-orbit cta-orbit-one" />
            <div className="cta-orbit cta-orbit-two" />
            <div className="cta-orbit cta-orbit-three" />

            <div className="original-cta-content">
              <div className="original-eyebrow">
                <span className="eyebrow-pulse" />
                YOUR NEXT MOVE STARTS HERE
              </div>
              <h2>
                Let&apos;s make technology
                <br />
                <span>work for you.</span>
              </h2>
              <p>
                Tell us what you&apos;re building, what&apos;s slowing you down
                or where you want to grow. We&apos;ll work through the next
                step together.
              </p>
              <Link href="/contact" className="original-primary-button">
                Tell us about your project <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="original-cta-aside">
              <span className="cta-aside-icon">
                <ArrowUpRight size={26} />
              </span>
              <span>GOOD WORK STARTS WITH A CONVERSATION.</span>
            </div>
          </div>
        </div>
      </section>
      
<section className="original-reviews">
  <div className="container">
    <div className="original-reviews-heading">
      <div className="original-eyebrow">
        <span className="eyebrow-pulse" />
        CLIENT FEEDBACK
      </div>

      <h2>
        Trust built through
        <br />
        <span>good work.</span>
      </h2>

      <p>
        Every project is an opportunity to earn trust through
        clear communication, thoughtful work and reliable delivery.
      </p>
    </div>

    <div className="original-reviews-grid">
      <article className="original-review-card">
        <div className="original-review-stars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
        <p>
          “The team was thorough, responsive and focused on making
          the website work better for our needs.”
        </p>
        <div className="original-review-author">
          <span className="original-review-avatar">C</span>
          <div>
            <strong>Client feedback</strong>
            <span>Website project</span>
          </div>
        </div>
      </article>

      <article className="original-review-card">
        <div className="original-review-stars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
        <p>
          “A modern approach, clear communication and a smooth
          process from the initial discussion to delivery.”
        </p>
        <div className="original-review-author">
          <span className="original-review-avatar">W</span>
          <div>
            <strong>Client feedback</strong>
            <span>Digital solutions</span>
          </div>
        </div>
      </article>

      <article className="original-review-card">
        <div className="original-review-stars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
        <p>
          “The focus on practical solutions and business goals
          made the experience straightforward and useful.”
        </p>
        <div className="original-review-author">
          <span className="original-review-avatar">D</span>
          <div>
            <strong>Client feedback</strong>
            <span>Digital project</span>
          </div>
        </div>
      </article>
    </div>

    <div className="original-reviews-bottom">
      <span>GOOD WORK. HONEST COMMUNICATION. LASTING TRUST.</span>
      <a href="/contact" className="original-primary-button">
        Work with us <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>

    </main>
  );
}
