import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { Mail, Clock, FileDown, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import assets directly
import discordIcon from '../../All data/assets/discord.webp';
import linkedinIcon from '../../All data/assets/linkedin-logo.webp';
import githubIcon from '../../All data/assets/github.webp';
import xIcon from '../../All data/assets/X.webp';
import emailIcon from '../../All data/assets/email.webp';
import resumePdf from '../../All data/assets/Swar-Res.pdf';

const SOCIALS = [
  { label: 'Discord', icon: discordIcon, val: 'itsme.3974', action: () => navigator.clipboard.writeText('itsme.3974') },
  { label: 'LinkedIn', icon: linkedinIcon, val: 'swar-shinde', action: () => window.open('https://www.linkedin.com/in/swar-shinde-91131a2b9/', '_blank') },
  { label: 'Github', icon: githubIcon, val: 'Swarspage', action: () => window.open('https://github.com/Swarspage', '_blank') },
  { label: 'X', icon: xIcon, val: '@Swars_page', action: () => window.open('https://x.com/Swars_page', '_blank') },
  { label: 'Email', icon: emailIcon, val: 'shindeswar@hotmail.com', action: () => window.open('mailto:shindeswar@hotmail.com', '_blank') },
];

export const ContactSection = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toast, setToast] = useState(null); // { msg, type }
  
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const COOLDOWN_MINUTES = 5;
  const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000;

  // Custom toast implementation
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatISTTime = () =>
    currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  // Handle Form Change
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Cooldown check
    const lastSent = localStorage.getItem('lastEmailSent');
    if (lastSent) {
      const timeElapsed = Date.now() - parseInt(lastSent, 10);
      if (timeElapsed < COOLDOWN_MS) {
        const minutesLeft = Math.ceil((COOLDOWN_MS - timeElapsed) / 60000);
        showToast(`Please wait ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} before sending another message.`, 'error');
        return;
      }
    }

    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        showToast("Message sent successfully! I'll be in touch.", 'success');
        setFormData({ name: '', email: '', message: '' });
        localStorage.setItem('lastEmailSent', Date.now().toString());
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        showToast('Something went wrong. Please try again.', 'error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Entrance Animation
  useEffect(() => {
    const elements = containerRef.current.children;
    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative pt-16 pb-24 max-w-6xl mx-auto px-4">
      {/* Floating Code Accents */}
      <div className="absolute top-6 left-6 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '0.6s' }}>
        <span className="font-handwriting font-bold text-3xl text-[#2d5da1]">{`</>`}</span>
      </div>
      <div className="absolute top-10 right-8 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1.5s' }}>
        <span className="font-handwriting font-bold text-3xl text-[#ff4d4d]">{`{ }`}</span>
      </div>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <Badge variant="blue" rotate="right" icon={Mail}>
          Initiate Connection
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          Let's Get In Touch
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          Got a project in mind or just want to say hi? Send me a message!
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-7">
          <Card variant="postit" decoration="tape" rotate="none" className="p-6 sm:p-10 w-full">
            <h3 className="font-heading font-bold text-3xl text-[var(--color-ink)] mb-8 wobbly-line inline-block pb-2">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <Input
                label="Your Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
              <TextArea
                label="Your Message"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
              />
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                  icon={isSubmitting ? undefined : Mail}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Side: Socials & Status */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Socials Card */}
          <Card variant="default" decoration="tack" rotate="slightRight" className="p-6 sm:p-8">
            <h3 className="font-heading font-bold text-2xl text-[var(--color-ink)] mb-6">
              Digital Footprint
            </h3>
            <div className="flex flex-col gap-4">
              {SOCIALS.map((social) => (
                <button
                  key={social.label}
                  onClick={() => {
                    social.action();
                    if (social.label === 'Discord') showToast('Copied Discord ID to clipboard!', 'success');
                  }}
                  className="flex items-center gap-4 p-3 bg-[var(--color-bg)] border-2 border-[var(--color-ink)] rounded-xl hover:bg-[var(--color-muted)] hover:-translate-y-1 hover:-rotate-1 transition-all shadow-hard-sm group"
                >
                  <div className="w-10 h-10 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] rounded-lg flex items-center justify-center p-1.5 transform -rotate-2 group-hover:rotate-0 transition-transform">
                    <img src={social.icon} alt={social.label} loading="lazy" width="24" height="24" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="font-heading font-bold text-lg leading-tight text-[var(--color-ink)]">{social.label}</span>
                    <span className="font-handwriting text-[#00618A] text-sm group-hover:underline underline-offset-2 decoration-wavy">
                      {social.val}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Status HUD (Hand-drawn style) */}
          <Card variant="muted" decoration="tape" rotate="slightLeft" className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#00618A] uppercase tracking-wider font-handwriting">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d4d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff4d4d] border border-[#2d2d2d]"></span>
                  </span>
                  Status: Online
                </div>
                <div className="font-heading font-bold text-3xl text-[var(--color-ink)]">
                  {formatISTTime()}
                </div>
                <div className="font-handwriting text-[var(--color-ink)]/70 text-sm">
                  Navi Mumbai | Pune, IN
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="bg-[var(--color-surface)] whitespace-nowrap" 
                icon={FileDown}
                onClick={onOpenResume}
              >
                Access CV
              </Button>
            </div>
          </Card>

        </div>
      </div>

      {/* Hand-drawn Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`
            flex items-center gap-3 px-5 py-3 rounded-lg border-4 border-[var(--color-ink)] shadow-hard-lg font-handwriting text-lg font-bold wobbly-card transform -rotate-1
            ${toast.type === 'error' ? 'bg-[#ff4d4d] text-white' : 'bg-[var(--color-postit)] text-[var(--color-ink)]'}
          `}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            )}
            {toast.msg}
          </div>
        </div>
      )}
    </section>
  );
};
