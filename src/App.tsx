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
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
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
            <button className="bg-primary hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold soft-shadow transition-soft transform hover:scale-105">
              {t('footer.buyTickets')}
            </button>
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
                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20">
                  {t('footer.buyTickets')}
                </button>
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
      <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545153290-77983630f9cc?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light border border-primary/30 backdrop-blur-sm mb-6">
              <Star size={16} className="text-secondary fill-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">{t('info.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/80 mb-6 leading-relaxed font-light">
              {t('info.tagline')}
            </p>
            <div className="flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-[0.2em] text-white/60 bg-white/5 w-fit px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               {t('info.hours')}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                {t('footer.buyTickets')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold transition-all border border-white/20 flex items-center justify-center">
                {t('hero.cta')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-2xl"></div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl text-slate-900 mb-4">{t('sections.attractions')}</h2>
              <p className="text-slate-500 text-lg">Win prizes & have fun with your family. Go Karts, Mini Golf, and Batting Cages await you today!</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 group">
              Ver tudo <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden soft-shadow flex flex-col sm:flex-row transition-all hover:shadow-2xl hover:-translate-y-1 snap-center shrink-0 w-[90%] md:w-[85%] lg:w-[45%]"
                >
                  <div className="sm:w-2/5 relative overflow-hidden h-64 sm:h-auto">
                    <img 
                      src={attIdx.image} 
                      alt={attIdx.name[lang]} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                         Saber mais <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                     <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">{attIdx.name[lang]}</h3>
                     <p className="text-slate-500 line-clamp-3 leading-relaxed mb-4">{attIdx.description[lang]}</p>
                     <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver detalhes <ChevronRight size={16} />
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
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {ATTRACTIONS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    if (carouselRef.current) {
                      const width = carouselRef.current.clientWidth;
                      carouselRef.current.scrollTo({ left: i * width * 0.5, behavior: 'smooth' });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'bg-primary w-6' : 'bg-slate-200 hover:bg-slate-300'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8"
                >
                  <MapIcon size={28} />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  {t('sections.map')}
                </h2>
                <p className="text-slate-500 text-xl leading-relaxed max-w-lg">
                  {lang === 'pt' 
                    ? 'Encontre-nos facilmente em Orange City. Use a navegação por GPS para chegar ao Family Fun Town e explorar atrações próximas com facilidade.'
                    : 'Find us easily in Orange City. Use GPS navigation to reach Family Fun Town and explore nearby attractions with ease.'
                  }
                </p>
              </div>

              <div className="space-y-5">
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
                    className="flex items-center gap-4 font-bold text-slate-700 group cursor-default"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feat.icon size={14} />
                    </div>
                    {feat.text}
                  </motion.div>
                ))}
              </div>
              
              <div className="p-8 rounded-[2rem] bg-[#F5F7FA] border border-slate-100 shadow-sm space-y-4 text-slate-600 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="flex items-start gap-4 relative z-10">
                  <span className="text-primary mt-1"><MapPin size={18} /></span>
                  <span className="font-medium">{t('info.address')}</span>
                </p>
                <p className="flex items-start gap-4 relative z-10">
                  <span className="text-primary mt-1"><Phone size={18} /></span>
                  <span className="font-medium">{t('info.phone')}</span>
                </p>
                <div className="flex items-start gap-4 relative z-10">
                  <span className="text-green-500 mt-1"><span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span></span></span>
                  <span className="font-medium">{t('info.hours')}</span>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 font-black uppercase tracking-widest text-xs group"
              >
                Open in Google Maps
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
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
      <section id="events" className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-slate-900 mb-4">{t('sections.events')}</h2>
            <p className="text-slate-500 text-lg">The perfect spot for birthdays & family fun. Book your celebration today!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EVENTS.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white soft-shadow flex flex-col md:flex-row">
                <div className="md:w-1/2 overflow-hidden">
                  <img src={event.image} alt={event.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[250px]" />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
                    <Calendar size={14} />
                    {event.date[lang]}
                  </div>
                  <h3 className="text-2xl mb-4 group-hover:text-primary transition-colors">{event.name[lang]}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">{event.description[lang]}</p>
                  <button className="text-slate-900 font-bold border-b-2 border-primary w-fit pb-1 hover:text-primary transition-colors">
                    Saber mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl md:text-5xl text-slate-900">{t('sections.shop')}</h2>
            <button className="hidden md:flex items-center gap-2 font-bold text-slate-600 hover:text-primary py-2 px-4 rounded-full border border-slate-100">
               Ir para Loja Online <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square rounded-3xl bg-neutral-bg mb-4 overflow-hidden relative">
                   <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <ShoppingBag size={20} />
                   </button>
                </div>
                <h4 className="text-slate-900 font-bold">{product.name[lang]}</h4>
                <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-24 bg-neutral-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl text-slate-900 mb-4">{t('sections.tickets')}</h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto">Escolha o plano ideal e garanta sua entrada no mundo da diversão.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TICKETS.map((ticket, idx) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-soft hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                  ticket.id === 'family' ? 'border-primary ring-4 ring-primary/5' : ''
                }`}
              >
                {ticket.id === 'family' && (
                  <div className="self-center mb-6 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                    Melhor Valor
                  </div>
                )}
                <h3 className="text-2xl mb-2 text-slate-900">{ticket.type[lang]}</h3>
                <div className="flex items-end justify-center gap-1 mb-8">
                  <span className="text-slate-400 font-medium mb-2">R$</span>
                  <span className="text-5xl font-bold text-slate-900">{ticket.price.toFixed(2).split('.')[0]}</span>
                  <span className="text-slate-400 font-medium mb-2">,{ticket.price.toFixed(2).split('.')[1]}</span>
                </div>
                <ul className="text-left space-y-4 mb-10 flex-grow">
                  {ticket.benefits[lang].map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-slate-500">
                      <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <ChevronRight size={14} />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  ticket.id === 'family' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-500' 
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                }`}>
                  <TicketIcon size={20} />
                  {t('footer.buyTickets')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <img 
                  src={LOGO_URL} 
                  alt="Family Fun Town Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                {t('info.tagline')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary">{lang === 'pt' ? 'Localização' : 'Location'}</h4>
                  <div className="text-slate-400 text-sm space-y-3">
                    <p className="flex items-start gap-3">
                      <MapPin size={18} className="text-white/40 shrink-0 mt-0.5" />
                      <span>{t('info.address')}</span>
                    </p>
                    <a 
                      href="https://www.google.com/maps?q=401+S+Volusia+Ave,+Orange+City,+FL+32763"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-white font-bold hover:text-primary transition-colors"
                    >
                      {lang === 'pt' ? 'Como chegar' : 'Get directions'} <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary">{lang === 'pt' ? 'Atendimento' : 'Contact'}</h4>
                  <div className="text-slate-400 text-sm space-y-3">
                    <p className="flex items-center gap-3">
                      <Phone size={18} className="text-white/40 shrink-0" />
                      <span className="font-bold text-white">{t('info.phone')}</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-slate-300 font-medium">{t('info.hours')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Links Rápidos</h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className="text-slate-400 hover:text-primary transition-colors font-medium">{item.label[lang]}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Informações</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-primary transition-colors font-medium">Segurança</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition-colors font-medium">Regras do Parque</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition-colors font-medium">Trabalhe Conosco</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition-colors font-medium">Ajuda & FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              &copy; 2024 Family Fun Town Amusement Park. Todos os direitos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-500 text-xs hover:text-white">Privacidade</a>
              <a href="#" className="text-slate-500 text-xs hover:text-white">Termos de Uso</a>
              <a href="#" className="text-slate-500 text-xs hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buy Button (Mobile Only) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-2xl shadow-primary/40 flex items-center justify-center gap-2">
          <TicketIcon size={20} />
          {t('footer.buyTickets')}
        </button>
      </div>
    </div>
  );
}
