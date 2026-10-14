import Link from "next/link";
import { ArrowUpRight, Bot, Code2, Workflow, Search, ShieldCheck, Layers3, LineChart, Zap } from "lucide-react";
const items = [
  [Bot,"AI & workflow automation","Reduce repetitive work and connect the tools your team already uses."],
  [Code2,"Web design & development","Responsive, accessible, search-friendly websites with a clear conversion path."],
  [Layers3,"Custom web applications","Portals, dashboards, booking journeys and internal business tools."],
  [Workflow,"CRM & system integration","Connect enquiry forms, sales pipelines, calendars and communication tools."],
  [Search,"SEO & digital visibility","Technical foundations and useful content that help the right people find you."],
  [LineChart,"Digital campaigns & analytics","Campaigns and reporting tied to meaningful business actions."],
  [ShieldCheck,"Maintenance & support","Security updates, monitoring, fixes and thoughtful ongoing improvements."],
  [Zap,"Performance & optimisation","Improve load speed, reduce friction and make user journeys easier."],
] as const;
export default function Services(){return <main><section className="page-hero"><div className="container"><div className="eyebrow">Our services</div><h1>Everything digital.<br/>One accountable team.</h1><p>Practical technology and growth services for businesses that want less friction, better customer experiences and systems that can scale.</p></div></section><section className="section"><div className="container"><div className="service-grid">{items.map(([Icon,title,text])=><article className="service-card" key={title}><div className="service-icon"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><Link href="/contact">Discuss your project <ArrowUpRight size={14}/></Link></article>)}</div></div></section><section className="section section-soft"><div className="container"><div className="cta-panel"><div><div className="eyebrow">Not sure where to start?</div><h2>Start with the problem.</h2><p>We’ll help you identify a sensible first step, define the scope and choose the right tools for the job.</p></div><Link className="button" href="/contact">Talk to our team <ArrowUpRight size={16}/></Link></div></div></section></main>}
