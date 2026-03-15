import React, { useState } from 'react';
import { FadeIn } from '../../components/FadeIn';
import { SEO } from '../../components/SEO';
import { MessageCircle, Send, Clock, Video, ChevronLeft, ChevronRight, Mail, Facebook } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    businessType: 'E-commerce',
    goals: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Append Web3Forms access key
      const payload = {
        ...formData,
        access_key: "62635904-7a91-4e78-af32-9c4c1a520268", // Public access key mapping to shinnd98@gmail.com
        subject: "New TikTok Ads Lead - " + formData.name
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to submit');
      
      setStatus('success');
      setFormData({ name: '', email: '', budget: '$5k - $10k', businessType: 'E-commerce', goals: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact TikTok Ads Agency",
    "description": "Ready to scale? Let's build your viral engine together. Book a discovery call with our TikTok Ads strategists.",
    "url": "https://your-tiktok-agency.com/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "TikTok Ads Agency",
      "telephone": "+84969532635",
      "email": "shinnd98@gmail.com",
      "areaServed": ["US", "UK"]
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us & Book Strategy Call" 
        description="Ready to scale? Let's build your viral engine together. Book a discovery call with our TikTok Ads strategists." 
        schemaData={contactSchema}
      />
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative overflow-hidden">
      {/* Background Neon Pulse Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,81,104,0.08)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(53,251,245,0.08)_0%,transparent_40%)] -z-10 pointer-events-none"></div>

      {/* Hero Section Asymmetry */}
      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <FadeIn className="space-y-8">
          <div>
            <span className="text-sm font-label text-secondary tracking-widest uppercase mb-4 block font-bold">Ready to scale?</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-on-surface">
              Let's build your <span className="text-primary">viral engine</span> together.
            </h1>
          </div>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed">
            Our team of specialists is ready to transform your TikTok presence into a high-converting sales machine. Reach out and let's discuss your growth strategy.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a className="flex items-center gap-3 px-6 py-4 bg-surface-container rounded-xl border border-[rgba(175,255,251,0.2)] hover:bg-surface-container-high transition-all group lg:min-w-[200px]" href="https://wa.me/84969532635" target="_blank" rel="noreferrer">
              <MessageCircle className="text-secondary w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">WhatsApp</span>
                <span className="font-bold text-on-surface">+84 969 532 635</span>
              </div>
            </a>
            <a className="flex items-center gap-3 px-6 py-4 bg-surface-container rounded-xl border border-[rgba(175,255,251,0.2)] hover:bg-surface-container-high transition-all group lg:min-w-[200px]" href="https://t.me/hiepnd1998" target="_blank" rel="noreferrer">
              <Send className="text-secondary w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">Telegram</span>
                <span className="font-bold text-on-surface">@hiepnd1998</span>
              </div>
            </a>
            <a className="flex items-center gap-3 px-6 py-4 bg-surface-container rounded-xl border border-[rgba(175,255,251,0.2)] hover:bg-surface-container-high transition-all group lg:min-w-[200px]" href="mailto:shinnd98@gmail.com">
              <Mail className="text-secondary w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">Email</span>
                <span className="font-bold text-on-surface text-sm">shinnd98@gmail.com</span>
              </div>
            </a>
            <a className="flex items-center gap-3 px-6 py-4 bg-surface-container rounded-xl border border-[rgba(175,255,251,0.2)] hover:bg-surface-container-high transition-all group lg:min-w-[200px]" href="https://www.facebook.com/phamtronghiep998/" target="_blank" rel="noreferrer">
              <Facebook className="text-secondary w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">Facebook</span>
                <span className="font-bold text-on-surface">Phạm Trọng Hiệp</span>
              </div>
            </a>
          </div>
        </FadeIn>

        {/* Lead Generation Form */}
        <FadeIn delay={0.2} className="glass-card p-8 md:p-10 rounded-xl border border-outline-variant/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-primary-container blur-[100px] opacity-20 -mr-16 -mt-16"></div>
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-1">Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/50 transition-all"
                  placeholder="John Doe" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-1">Email</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/50 transition-all"
                  placeholder="john@business.com" 
                  type="email"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-1">Monthly Ad Budget</label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-on-surface appearance-none transition-all cursor-pointer"
                >
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k - $50k">$10k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="$100k+">$100k+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-label text-on-surface-variant ml-1">Business Type</label>
                <select 
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-on-surface appearance-none transition-all cursor-pointer"
                >
                  <option value="E-commerce">E-commerce</option>
                  <option value="SaaS / Tech">SaaS / Tech</option>
                  <option value="Infoproducts">Infoproducts</option>
                  <option value="Local Business">Local Business</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label text-on-surface-variant ml-1">Tell us about your goals</label>
              <textarea 
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/50 resize-none transition-all"
                placeholder="How can we help you scale?" 
                rows={4}
              ></textarea>
            </div>
            <button 
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container py-5 rounded-xl font-bold font-headline text-lg hover:shadow-[0_0_30px_rgba(255,179,182,0.3)] transition-all disabled:opacity-70" 
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
            </button>
            
            {status === 'success' && (
              <div className="p-4 bg-green-500/20 text-green-300 rounded-lg text-center font-medium mt-4">
                Message sent successfully! We'll be in touch soon.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-500/20 text-red-300 rounded-lg text-center font-medium mt-4">
                Oops! Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </FadeIn>
      </div>

      {/* Bento Grid Section for Calendar & Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Calendar Integration Visual */}
        <FadeIn delay={0.3} className="md:col-span-2 glass-card rounded-xl border border-outline-variant/10 overflow-hidden flex flex-col md:flex-row">
          <div className="p-8 md:w-1/2 space-y-6">
            <h3 className="font-headline text-3xl font-bold text-on-surface leading-tight">Book a Strategy Call</h3>
            <p className="text-on-surface-variant">Pick a time that works for you and our head of strategy will walk you through our TikTok framework.</p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <Clock className="text-secondary w-6 h-6" />
                <span className="text-on-surface">30-minute discovery</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="text-secondary w-6 h-6" />
                <span className="text-on-surface">Google Meet / Zoom</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 md:w-1/2 border-l border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-on-surface">Oct 24, 2024</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              <span className="text-[10px] font-label text-outline-variant uppercase">M</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">T</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">W</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">T</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">F</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">S</span>
              <span className="text-[10px] font-label text-outline-variant uppercase">S</span>
              {/* Calendar Days Mock */}
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">29</div>
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">30</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface">1</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface">2</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface">3</div>
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">4</div>
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">5</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface ring-1 ring-primary/40 rounded-full">6</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface bg-primary text-on-primary-container rounded-full font-bold">7</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface ring-1 ring-primary/40 rounded-full">8</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface">9</div>
              <div className="h-8 flex items-center justify-center text-xs text-on-surface">10</div>
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">11</div>
              <div className="h-8 flex items-center justify-center text-xs text-outline-variant/50">12</div>
            </div>
            <div className="space-y-2 mt-6">
              <button className="w-full py-2 bg-surface-container-highest rounded-lg text-sm font-medium hover:bg-primary hover:text-on-primary-container transition-colors">09:00 AM</button>
              <button className="w-full py-2 bg-surface-container-highest rounded-lg text-sm font-medium hover:bg-primary hover:text-on-primary-container transition-colors">11:30 AM</button>
              <button className="w-full py-2 bg-surface-container-highest rounded-lg text-sm font-medium hover:bg-primary hover:text-on-primary-container transition-colors">03:00 PM</button>
            </div>
          </div>
        </FadeIn>

        {/* Stats/Trust Card */}
        <FadeIn delay={0.4} className="bg-surface-container p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-xs font-label text-secondary uppercase tracking-widest">Global Reach</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-4xl font-extrabold text-on-surface font-headline">500M+</h4>
              <p className="text-on-surface-variant">Impressions managed monthly for our top-tier agency clients.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-surface" loading="lazy" alt="Client profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo0zt3LsTME8yIyybOgslNvmGFq4nwVC34H5OjnLJB26OkQH7PXsILcds78qjg7jaHe2HebOjXZeCDHTxzZegxGWWx9OeG06EtfrgEvtDxwN5iVIFas82KVZvNHUOGEIzHJTZhraRb19Mgs8lc26ZqbPoYpq3EP5VziPpzf_78e0sR3YniAjJOngFFfPMsuoc4Z1MjoLtQPUPUY96pKW_UAngR_Vcyyqf2NwNjmpcoqLaMfajLkfZ4zuK7jKBSmYvaj1wmDqwHrsE"/>
              <img className="w-10 h-10 rounded-full border-2 border-surface" loading="lazy" alt="Client profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYCmb7xF2DPNqwFwjfKTuWk7xgtdnFOGLjDAUAjvBuTl2BPL_4r4uJV8CscmzbXCOqQWgWxBH-5GD2st7skUDAxhypeIo5kKLMnatNBoqoOPFQCKNjz_bphG3QS-CVMXPuUlhAcHXG5Q60wFUk4TabDFsqkafER9cHAaS3IAHpFIDpFSHUreGEkRZPtz7rmCdxKaBoKzXd0S5EELNxCr3b93D8-q1DdJBeHSuwrCrHzBif99hs0QCwOP1J1Qn8Vg7CZk_0TAgZS-Q"/>
              <img className="w-10 h-10 rounded-full border-2 border-surface" loading="lazy" alt="Client profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQutVFb8Q6QMcyo2X79KqzrFjL41ICGnUeM4iR_xauSFGSqGfCTbCMyLIX9TDsO0nLKcDQpv3jo4VMWf4y43uf6NnfX6UIpx5eB9ewLlUPUqVq6GbEVeGTAtcAnkK8FJMTRl_bLYQOtiJ2JBQICPd-1vX5MZSo-ruWupXphUwF2AqpAXYY0mZ-LBP3DbnMVe_mgeF33z99BW8FZ3euu6PU3HryF6AzS0zHYVZ679O3-V5n-J1TSGaqeuPw2UkPEmdOAz_wIHwqOFA"/>
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-secondary">
                +120
              </div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 font-medium">Trusted by leading brands worldwide.</p>
          </div>
        </FadeIn>
      </div>
    </main>
    </>
  );
};
