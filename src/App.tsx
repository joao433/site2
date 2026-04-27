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
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white border-b border-slate-100 py-4`}
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
                className="text-sm font-bold text-neutral-dark transition-colors hover:text-primary"
              >
                {item.label[lang]}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 text-neutral-dark hover:bg-slate-50 transition-all"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
            <a 
              href="https://pay.kiwify.com.br/Fdu7nHR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all transform hover:scale-105"
            >
              {t('footer.buyTickets')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 rounded-lg text-neutral-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Secondary Pill Nav (Categories) */}
        <div className="max-w-7xl mx-auto px-6 mt-4 hidden lg:block overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={`pill-${idx}`}
                href={item.href}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  idx === 0 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {item.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
              <img src={LOGO_URL} alt="Logo" className="h-10 w-auto object-contain" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl text-neutral-dark hover:bg-slate-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-12 flex flex-col gap-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-neutral-dark tracking-tighter hover:text-primary transition-colors flex items-center justify-between group"
                >
                  {item.label[lang]}
                  <ArrowRight size={24} className="text-slate-200 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 space-y-4">
              <a 
                href="https://pay.kiwify.com.br/Fdu7nHR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
              >
                <TicketIcon size={24} />
                {t('footer.buyTickets')}
              </a>
              <button 
                onClick={toggleLang}
                className="w-full py-4 border border-slate-200 rounded-2xl font-black text-sm uppercase tracking-widest text-neutral-dark flex items-center justify-center gap-2"
              >
                <Globe size={18} />
                {lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.youtube.com/embed/XnjVLHuzCoI?autoplay=1&mute=1&loop=1&playlist=XnjVLHuzCoI&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-80 contrast-110 saturate-125"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-neutral-dark/40 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              {lang === 'pt' ? 'Diversão' : 'Fun'} <br />
              <span className="text-primary italic">{lang === 'pt' ? 'Para Toda Família' : 'For All Family'}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-10 leading-relaxed font-bold drop-shadow-md max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-12">
              <a 
                href="https://pay.kiwify.com.br/Fdu7nHR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-lg rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3"
              >
                {t('footer.buyTickets')}
                <ChevronRight size={20} />
              </a>
              <button className="w-full sm:w-auto px-10 py-5 bg-white backdrop-blur-xl border-2 border-white text-neutral-dark font-black text-lg rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center">
                {t('hero.cta')}
              </button>
            </div>

            {/* Rating Badge */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="text-white font-black text-lg tracking-tight">4.8</span>
                </div>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{lang === 'pt' ? 'Avaliações Positivas' : 'Positive Reviews'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Highlights Section */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
            <div className="max-w-2xl">
              <h4 className="section-title">{t('common.discovery')}</h4>
              <h2 className="text-5xl md:text-8xl font-black text-neutral-dark tracking-tighter leading-none mb-6">
                {lang === 'pt' ? 'Momentos' : 'Family Fun'} <br />
                <span className="text-primary">{lang === 'pt' ? 'Inesquecíveis' : 'Moments'}</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium lg:max-w-sm">
              {lang === 'pt' ? 'Cada visita é uma nova aventura cheia de emoção para todas as idades.' : 'Every visit is a new adventure full of excitement for all ages.'}
            </p>
          </div>
        </div>

        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6 shrink-0"
          >
             {[
               { url: "https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png", label: "Adrenaline" },
               { url: "https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png", label: "Family Connection" },
               { url: "https://i.postimg.cc/HxhPwN9P/Captura-de-tela-2026-04-27-014224.png", label: "Win Prizes" },
               { url: "https://i.postimg.cc/W4j3VWg2/Captura-de-tela-2026-04-27-014559.png", label: "Arcade Games" },
               { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800", label: "Mini Golf" }
             ].map((img, i) => (
               <div key={i} className="w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-3xl overflow-hidden relative border border-slate-100 shrink-0 shadow-lg transition-all duration-500">
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={img.label} />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/80 via-transparent to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-opacity">
                     <p className="text-white font-black uppercase tracking-[0.2em] text-xs">{img.label}</p>
                  </div>
               </div>
             ))}
          </motion.div>
          <motion.div 
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 pr-6 shrink-0"
          >
             {[
               { url: "https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png", label: "Adrenaline" },
               { url: "https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png", label: "Family Connection" },
               { url: "https://i.postimg.cc/HxhPwN9P/Captura-de-tela-2026-04-27-014224.png", label: "Win Prizes" },
               { url: "https://i.postimg.cc/W4j3VWg2/Captura-de-tela-2026-04-27-014559.png", label: "Arcade Games" },
               { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800", label: "Mini Golf" }
             ].map((img, i) => (
               <div key={`dup-${i}`} className="w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-3xl overflow-hidden relative border border-slate-100 shrink-0 shadow-lg transition-all duration-500">
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={img.label} />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/80 via-transparent to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-opacity">
                     <p className="text-white font-black uppercase tracking-[0.2em] text-xs">{img.label}</p>
                  </div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Attractions Slider Section */}
      <section id="attractions" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center lg:text-left">
            <h4 className="section-title">{t('common.entertainment')}</h4>
            <h2 className="text-5xl md:text-8xl font-black text-neutral-dark mb-8 tracking-tighter leading-none">
              {lang === 'pt' ? 'Atrações' : 'Attractions'}
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed font-bold max-w-3xl">
              {t('sections.attractions')}
            </p>
          </div>
          
          <div className="relative group/slider">
            <div 
              ref={carouselRef}
              className="overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory flex gap-8 px-4 -mx-4 scroll-smooth"
            >
              {ATTRACTIONS.map((attIdx, idx) => (
                <motion.div 
                  key={attIdx.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-standard snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[31%] flex flex-col group/card bg-white"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={attIdx.image} 
                      alt={attIdx.name[lang]} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    />
                    <div className="absolute top-4 right-4 py-1.5 px-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                       R$ {attIdx.id === 'golf' ? '25.00' : '45.00'}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                     <h3 className="text-2xl font-black mb-3 text-neutral-dark group-hover/card:text-primary transition-colors">{attIdx.name[lang]}</h3>
                     <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2">{attIdx.description[lang]}</p>
                     
                     <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 text-primary">
                           <Star size={16} fill="currentColor" />
                           <span className="font-black text-sm">4.9</span>
                        </div>
                        <button className="btn-blue py-2.5 px-5 text-sm uppercase tracking-widest font-black">
                           + Detalhes
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Stats) Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter">500K<span className="text-white/40">+</span></div>
              <p className="text-lg text-white/70 font-bold uppercase tracking-[0.2em]">{t('stats.visitors')}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter">100<span className="text-white/40">+</span></div>
              <p className="text-lg text-white/70 font-bold uppercase tracking-[0.2em]">{t('stats.attractionsCount')}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="text-7xl md:text-8xl font-black tracking-tighter">4.8<span className="text-white/40">★</span></div>
              <p className="text-lg text-white/70 font-bold uppercase tracking-[0.2em]">{t('stats.rating')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Location Refactored) */}
      <section id="map" className="py-20 lg:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <div>
                <h4 className="section-title uppercase">{t('common.location')}</h4>
                <h2 className="text-5xl md:text-8xl font-black text-neutral-dark mb-6 tracking-tighter leading-none">
                  {t('sections.map')}
                </h2>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
                  {lang === 'pt' 
                    ? 'O Family Fun Town está localizado no coração de Orange City, FL. Um destino de fácil acesso para diversão garantida.'
                    : 'Family Fun Town is located in the heart of Orange City, FL. An easy-to-reach destination for guaranteed fun.'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-neutral-dark font-bold">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-black">Endereço</p>
                      <p className="text-lg">401 S Volusia Ave, Orange City, FL 32763</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-neutral-dark font-bold">
                   <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                      <Phone size={24} />
                   </div>
                   <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-black">Telefone</p>
                      <p className="text-lg">+1 (386) 775-7777</p>
                   </div>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {lang === 'pt' ? 'Como Chegar' : 'Get Directions'}
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-light-gray p-8 rounded-[3rem] border border-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <img src={LOGO_URL} alt="FFT" className="h-10 opacity-40" />
                       <div className="flex items-center gap-1 text-primary">
                          <Star size={16} fill="currentColor" />
                          <span className="font-black">4.8</span>
                       </div>
                    </div>
                    <div className="aspect-video rounded-2xl bg-white border border-slate-200 overflow-hidden relative">
                       <img 
                          src="https://images.unsplash.com/photo-1443653133333-89bd298782a1?auto=format&fit=crop&q=80&w=800" 
                          className="w-full h-full object-cover" 
                          alt="map preview" 
                       />
                       <div className="absolute inset-0 bg-neutral-dark/20" />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t('info.hours')}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 lg:py-32 bg-light-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
            <div className="max-w-2xl">
              <h4 className="section-title">{t('common.celebrations')}</h4>
              <h2 className="text-5xl md:text-8xl font-black text-neutral-dark tracking-tighter leading-none mb-6">
                {t('sections.events')}
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium lg:max-w-sm">
              {lang === 'pt' ? 'O cenário perfeito para criar memórias que duram a vida toda.' : 'The perfect setting to create memories that last a lifetime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {EVENTS.map((event) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-standard group flex flex-col md:flex-row bg-white"
              >
                <div className="md:w-1/2 overflow-hidden relative">
                  <img src={event.image} alt={event.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 min-h-[300px]" />
                  <div className="absolute top-4 left-4 py-1 px-4 bg-secondary text-white font-black text-[10px] uppercase tracking-widest rounded-lg">
                    {event.date[lang]}
                  </div>
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-3xl font-black text-neutral-dark mb-4 group-hover:text-primary transition-colors leading-none tracking-tighter">{event.name[lang]}</h3>
                  <p className="text-slate-500 mb-6 text-base leading-relaxed font-medium">{event.description[lang]}</p>
                  <button className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform">
                     {lang === 'pt' ? 'Saber Mais' : 'Learn More'}
                     <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h4 className="section-title mx-auto w-fit">{t('common.packages')}</h4>
            <h2 className="text-5xl md:text-8xl font-black text-neutral-dark mb-8 tracking-tighter leading-none">{t('sections.tickets')}</h2>
            <p className="text-xl text-slate-500 font-bold">{lang === 'pt' ? 'Escolha a experiência que melhor combina com seu grupo.' : 'Choose the experience that best suits your group.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {TICKETS.map((ticket, idx) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 rounded-3xl bg-white flex flex-col transition-all duration-500 border ${
                  ticket.id === 'family' 
                    ? 'border-primary border-4 shadow-2xl scale-105 z-10' 
                    : 'border-slate-100 shadow-xl hover:shadow-2xl'
                }`}
              >
                {ticket.id === 'family' && (
                  <div className="self-start mb-6 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                    {t('common.mostPopular')}
                  </div>
                )}
                <h3 className="text-3xl font-black mb-4 text-neutral-dark tracking-tighter">{ticket.type[lang]}</h3>
                <div className="flex items-start gap-1 mb-8">
                  <span className="text-slate-400 font-black text-lg mt-2">R$</span>
                  <span className="text-7xl font-black text-neutral-dark tracking-tighter">{ticket.price.toFixed(2).split('.')[0]}</span>
                  <div className="mt-2">
                     <p className="text-slate-400 font-black text-lg">.{ticket.price.toFixed(2).split('.')[1]}</p>
                  </div>
                </div>
                <ul className="text-left space-y-4 mb-10 flex-grow">
                  {ticket.benefits[lang].map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-slate-500 font-bold">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                        <ChevronRight size={14} />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://pay.kiwify.com.br/Fdu7nHR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary w-full py-5 rounded-2xl ${
                    ticket.id !== 'family' && 'bg-secondary'
                  }`}
                >
                  <TicketIcon size={20} />
                  {t('footer.buyTickets')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-light-gray px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-primary rounded-[3rem] p-12 md:p-20 overflow-hidden text-center text-white"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                {lang === 'pt' ? 'Pronto para a Diversão?' : 'Ready for the Fun?'}
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-bold">
                {lang === 'pt' ? 'Garanta seus ingressos agora e evite filas. A aventura está a um clique de distância.' : 'Get your tickets now and skip the lines. Adventure is just one click away.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <a 
                   href="https://pay.kiwify.com.br/Fdu7nHR"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-12 py-5 bg-white text-primary font-black text-xl rounded-2xl hover:bg-neutral-dark hover:text-white transition-all shadow-xl shadow-neutral-dark/10"
                 >
                    {t('footer.buyTickets')}
                 </a>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer-dark text-white pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <img src={LOGO_URL} alt="Logo" className="h-16 w-auto object-contain brightness-0 invert" />
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-bold opacity-70">
                {t('info.tagline')}
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-primary transition-all group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8">{t('common.explore')}</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-primary transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></div>
                      {item.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8">{t('common.information')}</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                {[{ pt: 'Segurança', en: 'Safety' }, { pt: 'Regras', en: 'Rules' }, { pt: 'Contato', en: 'Contact' }].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></div>
                      {link[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Family Fun Town. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
               <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Built for adventures</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
