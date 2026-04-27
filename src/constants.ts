import { NavItem, Attraction, Ticket, SeasonalEvent, Product, Translations } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: { pt: 'Home', en: 'Home' }, href: '#home' },
  { label: { pt: 'Atrações', en: 'Attractions' }, href: '#attractions' },
  { label: { pt: 'Ingressos', en: 'Tickets' }, href: '#tickets' },
  { label: { pt: 'Mapa', en: 'Map' }, href: '#map' },
  { label: { pt: 'Eventos', en: 'Events' }, href: '#events' },
  { label: { pt: 'Loja', en: 'Shop' }, href: '#shop' },
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: { pt: 'Go Karts', en: 'Go Karts' },
    description: { pt: 'Domine as curvas em nossa pista profissional com karts de alta performance.', en: 'Master the curves on our professional track with high-performance karts.' },
    image: 'https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png',
  },
  {
    id: '2',
    name: { pt: 'Fliperama', en: 'Arcade #1' },
    description: { pt: 'O destino final dos jogos com mais de 100 títulos clássicos e modernos.', en: 'The ultimate gaming destination with over 100 classic and modern titles.' },
    image: 'https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png',
  },
  {
    id: '3',
    name: { pt: 'Mini Golf', en: 'Mini Golf' },
    description: { pt: 'Desfute de uma partida relaxante em nosso campo de golfe.', en: 'Enjoy a relaxing game on our golf course.' },
    image: 'https://i.postimg.cc/s24VJ7y5/Captura-de-tela-2026-04-26-214710.png',
  },
  {
    id: '4',
    name: { pt: 'Batting Cages', en: 'Batting Cages' },
    description: { pt: 'Pratique seu rebatimento em nossas gaiolas de batedores.', en: 'Practice your swing in our batting cages.' },
    image: 'https://i.postimg.cc/tCnpMLpR/Captura-de-tela-2026-04-26-214900.png',
  },
];

export const TICKETS: Ticket[] = [
  {
    id: 'child',
    type: { pt: 'Infantil', en: 'Child' },
    price: 49.90,
    benefits: {
      pt: ['Acesso a todas as atrações', 'Finais de semana e feriados', 'Crianças até 3 anos grátis'],
      en: ['Access to all attractions', 'Weekends and holidays', 'Kids under 3 go free'],
    },
  },
  {
    id: 'adult',
    type: { pt: 'Adulto', en: 'Adult' },
    price: 89.90,
    benefits: {
      pt: ['Acesso a todas as atrações', 'Festa de aniversário disponível', 'WiFi gratuito'],
      en: ['Access to all attractions', 'Birthday parties available', 'Free WiFi'],
    },
  },
  {
    id: 'family',
    type: { pt: 'Família', en: 'Family' },
    price: 249.90,
    benefits: {
      pt: ['Pacote de Aniversário & Diversão em Família', 'Estacionamento incluso', 'Win prizes & have fun'],
      en: ['Birthday Parties & Family Fun Package', 'Parking included', 'Win prizes & have fun'],
    },
  },
];

export const EVENTS: SeasonalEvent[] = [
  {
    id: '1',
    name: { pt: 'Festas de Aniversário', en: 'Birthday Parties' },
    date: { pt: 'Disponível Diariamente', en: 'Available Daily' },
    description: { pt: 'O destino premier para entretenimento familiar em alta octanagem na Flórida.', en: 'The premier destination for high-octane family entertainment in Florida.' },
    image: 'https://i.postimg.cc/bNh37njZ/Captura-de-tela-2026-04-26-213038.png',
  },
  {
    id: '2',
    name: { pt: 'Diversão em Família', en: 'Family Fun' },
    date: { pt: 'Todo o ano', en: 'All year round' },
    description: { pt: 'Go Karts, Mini Golf e Batting Cages para todas as idades.', en: 'Go Karts, Mini Golf and Batting Cages for all ages.' },
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=800',
  },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: { pt: 'Gift Card $20', en: '$20 Gift Card' }, price: 20.00, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: { pt: 'Ficha de Arcade', en: 'Arcade Token Pack' }, price: 15.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: { pt: 'Troféu de Campeão', en: 'Champion Trophy' }, price: 12.00, image: 'https://images.unsplash.com/photo-1559449182-2624ca2d6594?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: { pt: 'Boné Family Fun Town', en: 'Family Fun Town Cap' }, price: 18.00, image: 'https://images.unsplash.com/photo-1517254456976-ee8682099819?auto=format&fit=crop&q=80&w=400' },
];

export const TRANSLATIONS: Translations = {
  hero: {
    title: { pt: 'Family Fun Town', en: 'Family Fun Town' },
    subtitle: { pt: 'O destino premier para entretenimento em Flórida.', en: 'The premier destination for high-octane family entertainment in Florida.' },
    cta: { pt: 'Ver Atrações', en: 'See Attractions' },
  },
  sections: {
    attractions: { pt: 'Nossas Atrações', en: 'Go Karts • Golf • Batting' },
    tickets: { pt: 'Pacotes', en: 'Packages' },
    map: { pt: 'Como Chegar', en: 'Find Us' },
    events: { pt: 'Aniversários & Diversão', en: 'Birthdays & Family Fun' },
    shop: { pt: 'Prêmios & Loja', en: 'Prizes & Shop' },
    contact: { pt: 'Contato', en: 'Contact' },
  },
  contact: {
    name: { pt: 'Nome', en: 'Name' },
    email: { pt: 'E-mail', en: 'Email' },
    message: { pt: 'Mensagem', en: 'Message' },
    send: { pt: 'Enviar', en: 'Send' },
  },
  footer: {
    buyTickets: { pt: 'Comprar Ingressos', en: 'Buy Tickets' },
  },
  info: {
    address: { pt: '401 S Volusia Ave, Orange City, FL 32763', en: '401 S Volusia Ave, Orange City, FL 32763' },
    phone: { pt: '(386) 775-3181', en: '(386) 775-3181' },
    hours: { pt: 'Aberto hoje: 10:00 AM — 11:00 PM', en: 'Open today: 10:00 AM — 11:00 PM' },
    tagline: { pt: 'O destino premier para entretenimento familiar em alta octanagem na Flórida.', en: 'The premier destination for high-octane family entertainment in Florida.' },
    badge: { pt: '#1 Arcade em Orange City', en: '#1 Arcade in Orange City' },
  },
};
