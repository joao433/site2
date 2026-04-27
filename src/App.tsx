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
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter,
  Ticket as TicketIcon,
  Star,
  ArrowRight
} from 'lucide-react';
import { Language } from './types';
import { NAV_ITEMS, ATTRACTIONS, TICKETS, EVENTS, TRANSLATIONS } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

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
  const HERO_BG = "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1600&auto=format&fit=crop";

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'
        } border-b-2 border-primary`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-none font-display font-black text-secondary">
              <span className="text-lg">FAMILY</span>
              <span className="text-primary text-xl">FUN TOWN</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-sm font-bold text-neutral-dark transition-colors hover:text-primary uppercase tracking-wide"
              >
                {item.label[lang]}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black border border-slate-200 text-neutral-dark hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              <Globe size={14} />
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <a 
              href="https://pay.kiwify.com.br/Fdu7nHR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md text-sm font-bold shadow-md shadow-primary/20 transition-all uppercase tracking-wide"
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
      </header>

      {/* Section Nav (Sticky below main nav) */}
      <div className="fixed top-[68px] left-0 right-0 z-40 bg-white border-b border-slate-100 lg:block hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={`pill-${idx}`}
                href={item.href}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  idx === 0 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-slate-500 hover:text-primary'
                }`}
              >
                {item.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
               <div className="flex flex-col leading-none font-display font-black text-secondary">
                <span className="text-lg">FAMILY</span>
                <span className="text-primary text-xl">FUN TOWN</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-neutral-dark uppercase">{item.label[lang]}</a>
              ))}
              <a href="https://pay.kiwify.com.br/Fdu7nHR" className="btn-primary w-full mt-4">{t('footer.buyTickets')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="Hero Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-xs font-bold mb-8">
              <span className="text-yellow-400">★</span> 4.8 Avaliações • Aberto até 22h
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-6">
              ONDE A <br />
              DIVERSÃO <br />
              <span className="text-primary">NUNCA PARA</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-bold max-w-xl">
              {lang === 'pt' ? 'O destino premier para entretenimento na Flórida. Emoção garantida para toda a família.' : 'Florida\'s premier entertainment destination. Guaranteed excitement for the whole family.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#tickets" className="btn-primary text-lg px-12">🎟 {t('footer.buyTickets')}</a>
              <a href="#attractions" className="btn-outline text-lg px-12">{lang === 'pt' ? 'Ver Atrações' : 'View Attractions'}</a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-6 right-6 lg:left-12 lg:right-12 z-10 hidden md:flex justify-between items-end">
           <div className="flex gap-12">
              <div className="text-white">
                <p className="text-primary font-display font-black text-4xl leading-none">500K+</p>
                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">{t('stats.visitors')}</p>
              </div>
              <div className="text-white">
                <p className="text-primary font-display font-black text-4xl leading-none">100+</p>
                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">{t('stats.attractionsCount')}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Discovery Section (Visual Grid) */}
      <section id="discovery" className="py-20 lg:py-32 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Descubra</p>
            <h2 className="section-title">Momentos Inesquecíveis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
             <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group">
                <img src="https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Moment" />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <p className="text-white font-black text-xl uppercase tracking-widest">Kart Extreme</p>
                </div>
             </div>
             <div className="rounded-2xl overflow-hidden relative group">
                <img src="https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Moment" />
             </div>
             <div className="rounded-2xl overflow-hidden relative group">
                <img src="https://i.postimg.cc/HxhPwN9P/Captura-de-tela-2026-04-27-014224.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Moment" />
             </div>
             <div className="rounded-2xl overflow-hidden relative group md:col-span-2">
                <img src="https://i.postimg.cc/W4j3VWg2/Captura-de-tela-2026-04-27-014559.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Moment" />
             </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Entretenimento Ilimitado</p>
            <h2 className="section-title">Atrações Principais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ATTRACTIONS.map((att) => (
              <div key={att.id} className="card-standard group flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <img src={att.image} alt={att.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-widest">★ 4.9</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black mb-3 text-neutral-dark">{att.name[lang]}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">{att.description[lang]}</p>
                  <button className="btn-blue w-full">+ Detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <p className="font-display font-black text-7xl md:text-8xl">500K+</p>
                <p className="text-white/60 font-black uppercase tracking-widest text-sm">{t('stats.visitors')}</p>
              </div>
              <div>
                <p className="font-display font-black text-7xl md:text-8xl">100+</p>
                <p className="text-white/60 font-black uppercase tracking-widest text-sm">{t('stats.attractionsCount')}</p>
              </div>
              <div>
                <p className="font-display font-black text-7xl md:text-8xl">4.8★</p>
                <p className="text-white/60 font-black uppercase tracking-widest text-sm">Feedback Médio</p>
              </div>
           </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 lg:py-32 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Localização</p>
              <h2 className="section-title mb-8">Nossa Casa</h2>
              <p className="text-slate-500 text-lg font-medium mb-12">
                O Family Fun Town está localizado no coração de Orange City, FL. Um destino de fácil acesso para diversão garantida.
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-soft border-l-[6px] border-primary space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center text-white rounded-lg shrink-0">📍</div>
                  <div>
                    <p className="font-black text-neutral-dark">Endereço</p>
                    <p className="text-slate-500">401 S Volusia Ave, Orange City, FL 32763</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center text-white rounded-lg shrink-0">📞</div>
                  <div>
                    <p className="font-black text-neutral-dark">Telefone</p>
                    <p className="text-slate-500">(386) 775-2777</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center text-white rounded-lg shrink-0">🕐</div>
                  <div>
                    <p className="font-black text-neutral-dark">Horário</p>
                    <p className="text-slate-500">Seg–Sex: 12h às 22h | Sáb–Dom: 10h às 23h</p>
                  </div>
                </div>
                <a href="#" className="btn-primary w-full mt-4 flex items-center gap-2">
                   🗺 Como Chegar
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px]">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.34!2d-81.2989!3d28.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7b1a1a1a1a1a1%3A0x1!2s401+S+Volusia+Ave%2C+Orange+City%2C+FL+32763!5e0!3m2!1spt-BR!2sbr!4v1"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Pacotes</p>
            <h2 className="section-title mx-auto w-fit">Escolha Seu Pacote</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TICKETS.map((ticket, idx) => (
              <div key={ticket.id} className={`p-10 rounded-2xl relative border-2 transition-all duration-300 hover:scale-105 ${
                ticket.id === 'family' ? 'border-primary shadow-2xl' : 'border-slate-100 shadow-soft'
              }`}>
                {ticket.id === 'family' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest">⭐ Recomendado</div>
                )}
                <h3 className="text-2xl font-black mb-6 text-neutral-dark uppercase">{ticket.type[lang]}</h3>
                <div className="flex items-start gap-1 mb-8">
                  <span className="text-primary font-black text-lg mt-2">R$</span>
                  <span className="text-6xl font-black text-primary font-display">{ticket.price.toFixed(0)}</span>
                  <span className="text-slate-400 font-bold text-sm mt-8">/pessoa</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {ticket.benefits[lang].map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-slate-500 text-sm font-bold border-b border-slate-50 pb-3">
                       <span className="text-secondary">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`btn-primary w-full ${ticket.id !== 'family' && 'bg-secondary'}`}>Comprar Ingressos</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-secondary text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black mb-6">PRONTO PARA A <span className="text-primary">DIVERSÃO?</span></h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto font-bold uppercase tracking-wide">Garanta seus ingressos agora e evite filas. A aventura está a um clique de distância.</p>
          <a href="#tickets" className="btn-primary text-xl px-16 py-6 inline-flex">🎟 Comprar Ingressos</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2">
               <div className="flex flex-col leading-none font-display font-black mb-8">
                <span className="text-2xl">FAMILY</span>
                <span className="text-primary text-3xl">FUN TOWN</span>
              </div>
              <p className="text-white/50 max-w-sm mb-8 font-bold leading-relaxed">
                O destino favorito para diversão em família. Entretenimento de alta qualidade com segurança e emoção garantida.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8">Links Úteis</h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}><a href={item.href} className="text-white/50 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">{item.label[lang]}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8">Informações</h4>
              <ul className="space-y-4">
                <li className="text-white/50 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><MapPin size={14} /> Orange City, FL</li>
                <li className="text-white/50 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><Phone size={14} /> (386) 775-2777</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-white/30 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Family Fun Town. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
