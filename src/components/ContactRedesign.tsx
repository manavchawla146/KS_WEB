"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

const ContactRedesign = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Front-end validation to match backend rules
    if (formData.fullName.length < 3 || formData.fullName.length > 20) {
      setStatus('error');
      setErrorMessage('Full name must be between 3 and 20 characters.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setStatus('error');
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact-us/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section: Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <p className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Contact</p>
            <h2 className="editorial-title text-ink mb-12">Let's <span className="italic text-accent">Connect</span>.</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Our Address</h4>
                  <p className="text-ink/80 text-sm leading-relaxed">Gujarat University Campus,<br />Navrangpura, Ahmedabad, Gujarat 380009</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Call Us</h4>
                  <p className="text-ink/80 text-sm leading-relaxed">+91 79 2630 1302<br />+91 79 2630 0000</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Email Us</h4>
                  <p className="text-ink/80 text-sm leading-relaxed">info@ksschool.org.in<br />admissions@ksschool.org.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bento-card bg-muted p-12 md:p-16 h-full flex flex-col">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                      <CheckCircle2 size={48} />
                   </div>
                   <h3 className="text-3xl font-display font-bold text-ink">Message Sent!</h3>
                   <p className="text-ink/60 max-w-sm">Thank you for reaching out. We've received your inquiry and will get back to you shortly.</p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="text-accent font-bold uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        className="w-full bg-white border border-black/5 rounded-2xl p-5 text-ink focus:outline-none focus:border-accent transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com" 
                        className="w-full bg-white border border-black/5 rounded-2xl p-5 text-ink focus:outline-none focus:border-accent transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 ml-4">Phone Number</label>
                    <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number" 
                        className="w-full bg-white border border-black/5 rounded-2xl p-5 text-ink focus:outline-none focus:border-accent transition-all" 
                    />
                  </div>
                  <div className="space-y-2 flex-grow flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 ml-4">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?" 
                      className="w-full bg-white border border-black/5 rounded-2xl p-5 text-ink focus:outline-none focus:border-accent transition-all flex-grow resize-none" 
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{errorMessage}</p>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    className={`w-full bg-ink text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-black/5 mt-auto flex items-center justify-center gap-2 ${
                      status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent'
                    }`}
                  >
                    {status === 'loading' ? (
                        <>In Progress...</>
                    ) : (
                        <>Send Message <Send size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Horizontal Map */}
        <div className="w-full h-80 rounded-[40px] overflow-hidden shadow-2xl relative group">
          <iframe
            src="https://www.google.com/maps?q=23.0364395,72.5479925&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-lg flex items-center gap-4 z-10">
            <MapPin className="text-accent" size={20} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-ink/60">Locate Us</p>
              <p className="font-bold text-ink">K.S. School, Ahmedabad</p>
            </div>
            <a 
              href="https://www.google.com/maps?cid=17488788400827168217&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en-GB&source=embed" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white text-ink w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors ml-2"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactRedesign;
