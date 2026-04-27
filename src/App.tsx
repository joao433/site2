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
      <section id="home" className="relative min-h-[92vh] flex items-center px-[5%] pb-[90px] mt-[68px] overflow-hidden bg-[#0a0f1e]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="Hero Background" className="w-full h-full object-cover opacity-20" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[680px]"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white px-4 py-1.5 rounded-full text-sm mb-6">
              <span className="text-yellow-400">★</span> 4.8 Avaliações • Aberto até 22h
            </div>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-display font-black leading-[0.95] text-white uppercase mb-4">
              ONDE A<br />
              DIVERSÃO<br />
              <span className="text-primary">NUNCA PARA</span>
            </h1>
            <p className="text-white/65 text-lg mb-10 leading-relaxed font-medium max-w-[460px]">
              {lang === 'pt' ? 'O destino premier para entretenimento na Flórida. Emoção garantida para toda a família.' : 'Florida\'s premier entertainment destination. Guaranteed excitement for the whole family.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#tickets" className="btn-primary">🎟 {t('footer.buyTickets')}</a>
              <a href="#attractions" className="btn-outline">{lang === 'pt' ? 'Ver Atrações' : 'View Attractions'}</a>
            </div>
          </motion.div>
        </div>

        {/* Hero Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md flex z-10 border-t border-white/10">
          <div className="flex-1 py-5 px-[5%] border-r border-white/10 text-center">
            <strong className="font-display text-4xl font-black text-primary block leading-none">500K+</strong>
            <span className="text-[10px] text-white/55 uppercase font-bold tracking-widest">{t('stats.visitors')}</span>
          </div>
          <div className="flex-1 py-5 px-[5%] border-r border-white/10 text-center">
            <strong className="font-display text-4xl font-black text-primary block leading-none">100+</strong>
            <span className="text-[10px] text-white/55 uppercase font-bold tracking-widest">{t('stats.attractionsCount')}</span>
          </div>
          <div className="flex-1 py-5 px-[5%] text-center">
            <strong className="font-display text-4xl font-black text-primary block leading-none">4.8★</strong>
            <span className="text-[10px] text-white/55 uppercase font-bold tracking-widest">Avaliação Média</span>
          </div>
        </div>
      </section>

      {/* Discovery Section (Visual Grid) */}
      <section id="discovery" className="py-20 px-[5%] bg-light-gray">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Descubra</p>
            <h2 className="section-title">Momentos Inesquecíveis</h2>
            <p className="text-slate-500 max-w-[520px] leading-relaxed mt-4">
              {lang === 'pt' ? 'Cada visita é uma nova aventura cheia de emoção para todas as idades.' : 'Every visit is a new adventure full of excitement for all ages.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[210px_210px] gap-2.5">
             <div className="md:row-span-2 rounded-xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Kart" />
             </div>
             <div className="rounded-xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Arcade" />
             </div>
             <div className="rounded-xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1535131749-0e6d0f35e1ef?w=600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Golf" />
             </div>
             <div className="rounded-xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Party" />
             </div>
             <div className="rounded-xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Fun" />
             </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Entretenimento Ilimitado</p>
            <h2 className="section-title">Atrações Principais</h2>
            <p className="text-slate-500 max-w-[520px] leading-relaxed mt-4">
              {lang === 'pt' ? 'Explore o maior complexo de entretenimento indoor da região.' : 'Explore the region\'s largest indoor entertainment complex.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ATTRACTIONS.map((att) => (
              <div key={att.id} className="card-standard group shadow-soft hover:-translate-y-1 hover:shadow-lg">
                <div className="h-[175px] relative overflow-hidden">
                  <img src={att.image} alt={att.name[lang]} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 right-2.5 bg-primary text-white text-[10px] font-bold py-1 px-2.5 rounded-full uppercase">★ 4.9</div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/55 text-yellow-400 text-xs px-2 py-0.5 rounded-full">★ 4.9</div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="text-lg font-black mb-1.5 text-neutral-dark">{att.name[lang]}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{att.description[lang]}</p>
                  <button className="btn-secondary w-fit">+ Detalhes</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 px-[5%] bg-primary text-white">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase tracking-wider">
              <div>
                <p className="font-display font-black text-6xl md:text-8xl leading-none">500K+</p>
                <span className="text-white/65 font-bold text-sm tracking-widest">{t('stats.visitors')}</span>
              </div>
              <div>
                <p className="font-display font-black text-6xl md:text-8xl leading-none">100+</p>
                <span className="text-white/65 font-bold text-sm tracking-widest">{t('stats.attractionsCount')}</span>
              </div>
              <div>
                <p className="font-display font-black text-6xl md:text-8xl leading-none">4.8★</p>
                <span className="text-white/65 font-bold text-sm tracking-widest">Avaliação Média</span>
              </div>
           </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-[5%] bg-light-gray">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 lg:hidden">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Localização</p>
            <h2 className="section-title">Nossa Casa</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="hidden lg:block mb-8">
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Localização</p>
                <h2 className="section-title">Nossa Casa</h2>
              </div>
              <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-[520px]">
                O Family Fun Town está localizado no coração de Orange City, FL. Um destino de fácil acesso para diversão garantida.
              </p>
              <div className="bg-white p-8 rounded-xl shadow-soft border-l-4 border-primary space-y-5">
                {[
                  { icon: '📍', label: 'Endereço', value: '401 S Volusia Ave, Orange City, FL 32763' },
                  { icon: '📞', label: 'Telefone', value: '(386) 775-2777' },
                  { icon: '📅', label: 'Horário', value: 'Seg–Sex: 12h–22h | Sáb–Dom: 10h–23h' }
                ].map((info, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-9 h-9 bg-primary flex items-center justify-center text-white rounded-[7px] shrink-0 text-sm">{info.icon}</div>
                    <div>
                      <p className="font-bold text-sm text-neutral-dark">{info.label}</p>
                      <span className="text-slate-500 text-sm leading-tight">{info.value}</span>
                    </div>
                  </div>
                ))}
                <a href="https://maps.google.com/?q=401+S+Volusia+Ave,+Orange+City,+FL+32763" target="_blank" rel="noreferrer" className="btn-primary w-full mt-1.5">
                   🗺 Como Chegar
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 h-[290px] shadow-sm">
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

      {/* Events Section */}
      <section id="events" className="py-20 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Celebrações</p>
            <h2 className="section-title">Aniversários & Diversão</h2>
            <p className="text-slate-500 max-w-[520px] leading-relaxed mt-4">
               {lang === 'pt' ? 'O cenário perfeito para criar memórias que duram a vida toda.' : 'The perfect setting to create memories that last a lifetime.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative h-[270px] rounded-xl overflow-hidden group bg-black">
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&auto=format&fit=crop" alt="Festas" className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-65 transition-all duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-2 uppercase tracking-wide">Festa</span>
                <h3 className="text-2xl text-white mb-1">Festas de Aniversário</h3>
                <p className="text-white/75 text-sm">O pacote premium para celebrar de forma inesquecível.</p>
              </div>
            </div>
            <div className="relative h-[270px] rounded-xl overflow-hidden group bg-black">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop" alt="Família" className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-65 transition-all duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-2 uppercase tracking-wide">Família</span>
                <h3 className="text-2xl text-white mb-1">Diversão em Família</h3>
                <p className="text-white/75 text-sm">Kart, Mini Golf e Batting para todas as idades.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packets Section */}
      <section id="packets" className="py-20 px-[5%] bg-light-gray">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 text-center">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Pacotes</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-neutral-dark uppercase leading-none">Escolha Seu Pacote</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TICKETS.map((ticket) => (
              <div key={ticket.id} className={`bg-white rounded-xl border-2 p-8 transition-all hover:-translate-y-1 hover:shadow-soft ${
                ticket.id === 'family' ? 'border-primary' : 'border-[#E5E7EB]'
              }`}>
                {ticket.id === 'family' && (
                  <div className="bg-primary text-white text-[10px] font-bold py-1 px-4 rounded-full w-fit mx-auto -mt-12 mb-8 uppercase tracking-widest">⭐ Recomendado</div>
                )}
                <h3 className="text-2xl font-black text-neutral-dark mb-4">{ticket.type[lang]}</h3>
                <div className="flex items-start gap-1 mb-6">
                  <span className="text-primary font-bold text-base mt-2">R$</span>
                  <span className="font-display text-5xl font-black text-primary leading-none">{ticket.price.toFixed(0)}</span>
                  <span className="text-slate-500 text-xs self-end mb-1.5">/pessoa</span>
                </div>
                <ul className="space-y-3 mb-8 border-t border-slate-50 pt-5">
                  {ticket.benefits[lang].map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-500 font-medium">
                      <span className="text-secondary font-bold">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`btn-buy w-full block text-center py-3 rounded-md font-bold text-sm ${
                  ticket.id === 'family' ? 'btn-red-fill' : 'btn-blue-out'
                }`}>Comprar Ingressos</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-[5%] bg-linear-to-br from-secondary to-[#0d1f3c] text-center">
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-black text-white leading-none uppercase mb-2">
          PRONTO PARA A<br /><span className="text-primary">DIVERSÃO?</span>
        </h2>
        <p className="text-white/65 text-base mx-auto mb-8 max-w-[460px] leading-relaxed">
          Garanta seus ingressos agora e evite filas. A aventura está a um clique de distância.
        </p>
        <a href="#tickets" className="btn-primary inline-flex">🎟 Comprar Ingressos</a>
      </section>

      {/* Footer */}
      <footer className="bg-footer-dark pt-14 pb-6 px-[5%] text-white/45">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-10">
            <div>
              <div className="font-display font-black text-2xl text-white mb-2 leading-none uppercase">
                FAMILY <span className="text-primary">FUN TOWN</span>
              </div>
              <p className="text-sm leading-relaxed max-w-[260px] mb-4">
                Onde a diversão encontra a família. Venha viver momentos inesquecíveis com segurança e emoção garantida.
              </p>
              <div className="flex gap-2">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center transition-all hover:bg-primary hover:border-primary hover:text-white">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:pl-10">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Links Úteis</h4>
              <ul className="text-sm space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}><a href={item.href} className="hover:text-primary transition-colors">{item.label[lang]}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Informações</h4>
              <ul className="text-sm space-y-2">
                <li>401 S Volusia Ave, Orange City, FL 32763</li>
                <li><a href="tel:3867752777" className="hover:text-primary transition-colors">(386) 775-2777</a></li>
                <li>Seg–Sex: 12h–22h | Sáb–Dom: 10h–23h</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center text-[10px] uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Family Fun Town. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
