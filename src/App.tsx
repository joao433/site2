/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Ticket as TicketIcon,
  Star,
  Map as MapIcon,
  Calendar,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { Language } from './types';
import { NAV_ITEMS, ATTRACTIONS, TICKETS, EVENTS, PRODUCTS, TRANSLATIONS } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isPaused.current) {
        const container = carouselRef.current;
        const scrollAmount = container.clientWidth * 0.8;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollPosition / width);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = TRANSLATIONS;
    for (const key of keys) {
      result = result[key];
    }
    return result[lang];
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  const LOGO_URL = "https://i.postimg.cc/VNXXzG1P/3a0e7e3b-7cac-4d37-a116-5d06aa655400.png";

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-mesh relative overflow-hidden">
      {/* Global Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-glow opacity-[0.07] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-glow opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-secondary) 0%, transparent 70%)' }}></div>
      
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt="Family Fun Town Logo" 
              className="h-16 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {item.label[lang]}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                scrolled 
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-50' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
            <a 
              href="https://pay.kiwify.com.br/Fdu7nHR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold soft-shadow transition-soft transform hover:scale-105"
            >
              {t('footer.buyTickets')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-display font-medium text-slate-800"
                >
                  {item.label[lang]}
                </a>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <button 
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 font-bold"
                >
                  <Globe size={18} />
                  {lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                </button>
                <a 
                  href="https://pay.kiwify.com.br/Fdu7nHR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 text-center"
                >
                  {t('footer.buyTickets')}
                </a>
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4 text-slate-500 text-sm">
                   <p className="flex items-center gap-3"><MapPin size={16} /> {t('info.address')}</p>
                   <p className="flex items-center gap-3"><Phone size={16} /> {t('info.phone')}</p>
                   <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('info.hours')}</div>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <iframe 
            src="https://www.youtube.com/embed/XnjVLHuzCoI?autoplay=1&mute=1&loop=1&playlist=XnjVLHuzCoI&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-60 contrast-125 saturate-150"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20 pb-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-6xl md:text-[clamp(5rem,10vw,8rem)] font-black text-white leading-[0.95] mb-8 tracking-tighter">
              {lang === 'pt' ? 'Onde a Diversão' : 'Where Fun'} <br />
              <span className="text-primary">{lang === 'pt' ? 'Nunca Para' : 'Never Stops'}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a 
                href="https://pay.kiwify.com.br/Fdu7nHR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-primary text-white font-black text-lg sm:text-xl rounded-2xl hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
              >
                {t('footer.buyTickets')}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-lg sm:text-xl rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center">
                {t('hero.cta')}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Experience Highlights Section */}
      <section className="py-20 lg:py-32 bg-slate-50/50 backdrop-blur-3xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <h4 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">{t('common.discovery')}</h4>
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                {lang === 'pt' ? 'Momentos' : 'Family Fun'} <br />
                <span className="text-primary/30">{lang === 'pt' ? 'Family Fun' : 'Moments'}</span>
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium lg:max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              {lang === 'pt' ? 'Cada visita é uma nova aventura cheia de emoção para todas as idades.' : 'Every visit is a new adventure full of excitement for all ages.'}
            </p>
          </div>
        </div>


        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6 shrink-0"
          >
             {[
               { url: "https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png", label: "Adrenaline" },
               { url: "https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png", label: "Family Connection" },
               { url: "https://i.postimg.cc/HxhPwN9P/Captura-de-tela-2026-04-27-014224.png", label: "Win Prizes" },
               { url: "https://i.postimg.cc/W4j3VWg2/Captura-de-tela-2026-04-27-014559.png", label: "Arcade Games" },
               { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800", label: "Mini Golf" }
             ].map((img, i) => (
               <div key={i} className="w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-[2.5rem] overflow-hidden relative border border-slate-100 shrink-0">
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={img.label} />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-opacity">
                     <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">{img.label}</p>
                  </div>
               </div>
             ))}
          </motion.div>
          <motion.div 
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6 shrink-0"
          >
             {[
               { url: "https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png", label: "Adrenaline" },
               { url: "https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png", label: "Family Connection" },
               { url: "https://i.postimg.cc/HxhPwN9P/Captura-de-tela-2026-04-27-014224.png", label: "Win Prizes" },
               { url: "https://i.postimg.cc/W4j3VWg2/Captura-de-tela-2026-04-27-014559.png", label: "Arcade Games" },
               { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800", label: "Mini Golf" }
             ].map((img, i) => (
               <div key={`dup-${i}`} className="w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-[2.5rem] overflow-hidden relative border border-slate-100 shrink-0">
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={img.label} />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-opacity">
                     <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">{img.label}</p>
                  </div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Attractions Slider Section */}
      <section id="attractions" className="py-32 bg-slate-900 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h4 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">{t('common.entertainment')}</h4>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              {lang === 'pt' ? 'Atrações' : 'Attractions'}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {t('sections.attractions')}
            </p>
          </div>
          <div className="relative group/slider">
            <div 
              ref={carouselRef}
              onMouseEnter={() => isPaused.current = true}
              onMouseLeave={() => isPaused.current = false}
              onTouchStart={() => isPaused.current = true}
              onTouchEnd={() => isPaused.current = false}
              className="overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory flex gap-8 px-4 -mx-4 scroll-smooth"
            >
              {ATTRACTIONS.map((attIdx, idx) => (
                <motion.div 
                  key={attIdx.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.25 }}
                  className="group cursor-pointer glass-dark rounded-[16px] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 snap-center shrink-0 w-[90%] md:w-[85%] lg:w-[48%] p-6 gap-6"
                >
                  <div className="md:w-2/5 relative overflow-hidden h-72 md:h-auto rounded-[12px]">
                    <img 
                      src={attIdx.image} 
                      alt={attIdx.name[lang]} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:w-3/5 flex flex-col justify-center relative">
                     <h3 className="text-3xl md:text-4xl font-black mb-4 text-white group-hover:text-primary transition-colors tracking-tighter leading-none">{attIdx.name[lang]}</h3>
                     <p className="text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3 italic opacity-80">{attIdx.description[lang]}</p>
                     
                     <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                               <img src={`https://i.pravatar.cc/150?u=${attIdx.id}${i}`} alt="User" className="w-full h-full object-cover" />
                             </div>
                           ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+2.4k {t('common.visitCount')}</span>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 pointer-events-auto hover:bg-primary hover:text-white transition-all transform hover:scale-110 -translate-x-4"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-800 pointer-events-auto hover:bg-primary hover:text-white transition-all transform hover:scale-110 translate-x-4"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Scroll indicators */}
            <div className="mt-12 flex justify-center gap-3">
              {ATTRACTIONS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    if (carouselRef.current) {
                      const width = carouselRef.current.clientWidth;
                      carouselRef.current.scrollTo({ left: i * width * 0.5, behavior: 'smooth' });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === i ? 'bg-primary w-12' : 'bg-white/20 hover:bg-white/40 w-4'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Stats) Section */}
      <section className="py-40 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter text-white">500K<span className="text-primary">+</span></div>
              <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.visitors')}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter text-white">100<span className="text-primary">+</span></div>
              <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.attractionsCount')}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter text-white">4.8<span className="text-primary">★</span></div>
              <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.rating')}</p>
            </motion.div>
          </div>
        </div>
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-20 lg:py-32 bg-sky-50/30 backdrop-blur-3xl overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="space-y-8 lg:space-y-10 text-center lg:text-left">
              <div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
                  {t('sections.map')}
                </h2>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {lang === 'pt' 
                    ? 'Encontre-nos facilmente em Orange City. Use a navegação por GPS para chegar ao Family Fun Town e explorar atrações próximas com facilidade.'
                    : 'Find us easily in Orange City. Use GPS navigation to reach Family Fun Town and explore nearby attractions with ease.'
                  }
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-5">
                {[
                  { icon: ChevronRight, text: 'Localização GPS' },
                  { icon: ChevronRight, text: 'Filtro de Atrações' },
                  { icon: ChevronRight, text: 'Tempo de Fila' }
                ].map((feat, i) => (
                  <motion.div 
                    key={feat.text} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 font-bold text-slate-700 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 group cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feat.icon size={12} />
                    </div>
                    <span className="text-sm">{feat.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-4">
                <a 
                  href="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 font-black uppercase tracking-widest text-xs group w-full sm:w-auto"
                >
                  Open in Google Maps
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square bg-slate-50 rounded-[3.5rem] p-4 soft-shadow border border-slate-100 group-hover:shadow-2xl transition-all duration-500 group-hover:-rotate-1"
              >
                <div className="w-full h-full rounded-[2.8rem] bg-white border-4 border-white overflow-hidden relative shadow-inner">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
              {/* Accents */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full -z-10 blur-2xl group-hover:bg-secondary/20 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 bg-slate-50/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4">{t('common.celebrations')}</h4>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
                {t('sections.events')}
              </h2>
            </div>
            <p className="text-slate-500 text-xl max-w-sm font-medium">
              {lang === 'pt' ? 'O cenário perfeito para criar memórias que duram a vida toda.' : 'The perfect setting to create memories that last a lifetime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {EVENTS.map((event) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 overflow-hidden relative">
                  <img src={event.image} alt={event.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[300px]" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>
                </div>
                <div className="p-10 md:w-1/2 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    {event.date[lang]}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors leading-none tracking-tighter">{event.name[lang]}</h3>
                  <p className="text-slate-500 mb-2 text-base leading-relaxed font-medium">{event.description[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
            <h4 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4">{t('common.packages')}</h4>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">{t('sections.tickets')}</h2>
            <p className="text-lg sm:text-xl text-slate-500 font-medium">{lang === 'pt' ? 'Escolha a experiência que melhor combina com seu grupo.' : 'Choose the experience that best suits your group.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-stretch">
            {TICKETS.map((ticket, idx) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 md:p-12 rounded-[3rem] bg-white border flex flex-col transition-all duration-500 hover:-translate-y-3 ${
                  ticket.id === 'family' 
                    ? 'border-primary ring-4 ring-primary/5 shadow-2xl z-10 lg:scale-105' 
                    : 'border-slate-100 soft-shadow hover:shadow-xl'
                }`}
              >
                {ticket.id === 'family' && (
                  <div className="self-start mb-8 px-5 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                    {t('common.mostPopular')}
                  </div>
                )}
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tighter leading-none">{ticket.type[lang]}</h3>
                <div className="flex items-start gap-1 mb-10">
                  <span className="text-slate-400 font-black text-lg mt-2">R$</span>
                  <span className="text-7xl font-black text-slate-900 tracking-tighter">{ticket.price.toFixed(2).split('.')[0]}</span>
                  <span className="text-slate-400 font-black text-lg mt-2">.{ticket.price.toFixed(2).split('.')[1]}</span>
                </div>
                <ul className="text-left space-y-5 mb-12 flex-grow">
                  {ticket.benefits[lang].map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-4 text-slate-500 font-medium">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <ChevronRight size={16} />
                      </div>
                      <span className="text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://pay.kiwify.com.br/Fdu7nHR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                    ticket.id === 'family' 
                      ? 'bg-primary text-white shadow-2xl shadow-primary/40 hover:bg-blue-500' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <TicketIcon size={18} />
                  {t('footer.buyTickets')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-slate-900 rounded-[4rem] p-12 md:p-24 overflow-hidden text-center"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none relative z-10">
              {lang === 'pt' ? 'Pronto para a' : 'Ready for'} <br />
              <span className="text-primary">{lang === 'pt' ? 'Diversão?' : 'the Fun?'}</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium relative z-10">
              {lang === 'pt' ? 'Garanta seus ingressos agora e evite filas. A aventura está a um clique de distância.' : 'Get your tickets now and skip the lines. Adventure is just one click away.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
               <a 
                 href="https://pay.kiwify.com.br/Fdu7nHR"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-12 py-6 bg-primary text-white font-black text-xl rounded-2xl hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl shadow-primary/40"
               >
                  {t('footer.buyTickets')}
               </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] select-none flex items-center justify-center">
          <h2 className="text-[25vw] font-black leading-none">FAMILY FUN</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-2 space-y-12">
              <div>
                <img 
                  src={LOGO_URL} 
                  alt="Family Fun Town Logo" 
                  className="h-16 w-auto object-contain mb-8 opacity-90 transition-opacity hover:opacity-100"
                />
                <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
                  {t('info.tagline')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">{t('common.location')}</h4>
                  <div className="text-slate-400 space-y-4">
                    <p className="flex items-start gap-4 text-sm leading-relaxed">
                      <MapPin size={20} className="text-white/20 shrink-0 mt-0.5" />
                      <span className="font-medium">{t('info.address')}</span>
                    </p>
                    <a 
                      href="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-[0.2em] group/link"
                    >
                      {t('common.getDirections')} 
                      <ArrowRight size={14} className="text-primary group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">{t('sections.contact')}</h4>
                  <div className="text-slate-400 space-y-4">
                    <p className="flex items-center gap-4 group cursor-pointer">
                      <Phone size={20} className="text-white/20 shrink-0 group-hover:text-primary transition-colors" />
                      <span className="font-black text-white text-lg tracking-tight">{t('info.phone')}</span>
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                      </div>
                      <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">{t('info.hours')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Twitter, label: 'Twitter' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={social.label}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all duration-500 group"
                  >
                    <social.Icon size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-10">{t('common.explore')}</h4>
              <ul className="space-y-5">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group font-black text-xs uppercase tracking-[0.2em]">
                      <span className="w-0 h-px bg-primary group-hover:w-4 transition-all transition-duration-500"></span>
                      {item.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-10">{t('common.information')}</h4>
              <ul className="space-y-5">
                {[
                  { pt: 'Segurança', en: 'Safety' },
                  { pt: 'Regras do Parque', en: 'Park Rules' },
                  { pt: 'Trabalhe Conosco', en: 'Careers' },
                  { pt: 'Ajuda & FAQ', en: 'Support' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group font-black text-xs uppercase tracking-[0.2em]">
                      <span className="w-0 h-px bg-white/20 group-hover:w-4 transition-all transition-duration-500"></span>
                      {link[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-8">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Family Fun Town.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{lang === 'pt' ? 'Privacidade' : 'Privacy'}</a>
                <a href="#" className="text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{lang === 'pt' ? 'Termos' : 'Terms'}</a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-700">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
               <span className="text-[9px] font-black uppercase tracking-[0.3em]">Built for adventures</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
