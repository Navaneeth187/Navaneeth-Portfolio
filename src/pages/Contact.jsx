import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate form service (replace with Formspree/EmailJS in production)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-16 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-textMain mb-6 tracking-tight">Let's Build Something</h1>
        <p className="text-textMuted text-lg leading-relaxed">
          Actively seeking AI Engineering, Backend Development, and Workflow Automation roles. If you have a challenging problem or an open position, I'd love to hear from you.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Info Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-1/3"
          aria-label="Contact information"
        >
          <div className="bg-cardBg border border-cardBorder rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
            
            <div>
              <h2 className="text-2xl font-bold text-textMain mb-8 relative z-10">Direct Contact</h2>
              
              <div className="space-y-6 relative z-10">
                <a href="mailto:navaneethp1407@gmail.com" className="flex items-start gap-4 group/item" aria-label="Send email to navaneethp1407@gmail.com">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-background transition-colors border border-cardBorder shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-textDarker font-medium mb-1">Email</p>
                    <p className="text-textMain font-medium group-hover/item:text-primary transition-colors text-sm break-all">navaneethp1407@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary border border-cardBorder shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-textDarker font-medium mb-1">Phone</p>
                    <p className="text-textMain font-medium text-sm">+91 7075063050</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary border border-cardBorder shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-textDarker font-medium mb-1">Location</p>
                    <p className="text-textMain font-medium text-sm">NIT Durgapur, West Bengal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-cardBorder relative z-10">
              <p className="text-sm text-textDarker mb-4 font-medium">Profiles</p>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/navaneethp1407" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-textMuted hover:text-primary transition-colors" aria-label="GitHub Profile">
                  <span>GitHub</span>
                  <ArrowUpRight size={16} />
                </a>
                <a href="https://linkedin.com/in/navaneeth-babu-pandiripalli-9b2447287" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-textMuted hover:text-primary transition-colors" aria-label="LinkedIn Profile">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full lg:w-2/3 bg-cardBg border border-cardBorder rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {status === 'success' && (
            <div className="absolute inset-0 bg-cardBg/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="text-3xl font-bold text-textMain mb-4">Message Sent!</h3>
              <p className="text-textMuted text-lg">Thank you for reaching out. I'll respond within 24 hours.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10" aria-label="Contact form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label htmlFor="contact-name" className="text-sm text-textMuted font-medium">Your Name</label>
                 <input
                   type="text"
                   id="contact-name"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   required
                   disabled={status === 'loading'}
                   aria-label="Your full name"
                   aria-required="true"
                   className="bg-background border border-cardBorder rounded-xl px-4 py-3.5 text-textMain placeholder:text-textDarker focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                   placeholder="Jane Doe"
                 />
               </div>
               
               <div className="flex flex-col gap-2">
                 <label htmlFor="contact-email" className="text-sm text-textMuted font-medium">Email Address</label>
                 <input
                   type="email"
                   id="contact-email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   required
                   disabled={status === 'loading'}
                   aria-label="Your email address"
                   aria-required="true"
                   className="bg-background border border-cardBorder rounded-xl px-4 py-3.5 text-textMain placeholder:text-textDarker focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                   placeholder="jane@company.com"
                 />
               </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm text-textMuted font-medium">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                rows={6}
                aria-label="Your message"
                aria-required="true"
                className="bg-background border border-cardBorder rounded-xl px-4 py-3.5 text-textMain placeholder:text-textDarker focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none disabled:opacity-50"
                placeholder="I'd like to discuss an AI engineering role..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label="Send contact message"
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 bg-primary text-background font-bold rounded-xl hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary/40 transition-all disabled:opacity-70 shadow-[0_0_15px_rgba(168,255,53,0.15)] hover:shadow-[0_0_25px_rgba(168,255,53,0.3)]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
