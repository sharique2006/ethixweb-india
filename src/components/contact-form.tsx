"use client";
import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function ContactForm(){
 const [status,setStatus]=useState(""); const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); setStatus(""); setBusy(true);
  const form=e.currentTarget; const data=Object.fromEntries(new FormData(form).entries());
  try{
   const res=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const body=await res.json();
   if(!res.ok) throw new Error(body.error||"We couldn’t submit your enquiry. Please try again.");
   setStatus("Thanks — your enquiry has been received."); form.reset();
  }catch(err){setStatus(err instanceof Error?err.message:"Something went wrong. Please try again.");}
  finally{setBusy(false);}
 }
 return <form className="contact-form" onSubmit={submit}>
  <div className="field-grid"><div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Name"/></div><div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@company.com"/></div></div>
  <div className="field-grid"><div className="field"><label htmlFor="company">Business name</label><input id="company" name="company" autoComplete="organization" maxLength={120} placeholder="Your company"/></div><div className="field"><label htmlFor="service">What do you need? *</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Website design & development</option><option>AI & automation</option><option>Web application</option><option>CRM & integrations</option><option>SEO & digital marketing</option><option>Other / not sure yet</option></select></div></div>
  <div className="field"><label htmlFor="message">Tell us a little about your project *</label><textarea id="message" name="message" minLength={10} maxLength={3000} required placeholder="What are you trying to improve or build?"/></div>
  <div aria-hidden="true" style={{position:"absolute",left:"-10000px",width:1,height:1,overflow:"hidden"}}><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
  <p className="form-note">By submitting, you agree that we may contact you about this enquiry. Your details should be used only to respond to your request.</p>
  <button className="button" type="submit" disabled={busy}>{busy?"Sending…":"Send enquiry"} <Send size={15}/></button>
  {status&&<p className="form-status" role="status" aria-live="polite">{status}</p>}
 </form>
}
