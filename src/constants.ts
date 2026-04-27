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
    name: { pt: 'Mini Golf', en: 'Mini Golf' },
    description: { pt: '18 buracos de aventura iluminada por neon.', en: '18 holes of neon-lit adventure.' },
    image: 'https://i.postimg.cc/Nj2jqyM1/Captura-de-tela-2026-04-27-024802.png',
  },
  {
    id: '3',
    name: { pt: 'Fliperama', en: 'Arcade' },
    description: { pt: 'O destino final dos jogos com mais de 100 títulos clássicos e modernos.', en: 'The ultimate gaming destination with over 100 classic and modern titles.' },
    image: 'https://i.postimg.cc/NFzGHttZ/Captura-de-tela-2026-04-26-214443.png',
  },
  {
    id: '4',
    name: { pt: 'Rebatida', en: 'Batting Cages' },
    description: { pt: 'Bata para fora do campo.', en: 'Hit it out of the park.' },
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
      pt: ['Pacote de Aniversário & Diversão em Família', 'Estacionamento incluso', 'Ganhe prêmios e divirta-se'],
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
    image: 'https://i.postimg.cc/dtVGP9GF/Captura-de-tela-2026-04-27-030701.png',
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
    attractions: { 
      pt: 'Explore o maior complexo de entretenimento indoor da região. Tecnologia de ponta, clássicos nostálgicos e muita velocidade esperam por você.', 
      en: 'Explore the region\'s largest indoor entertainment complex. Cutting-edge technology, nostalgic classics and high speeds await you.' 
    },
    tickets: { pt: 'Pacotes', en: 'Packages' },
    map: { pt: 'Nossa Localização', en: 'Our Location' },
    events: { pt: 'Aniversários & Diversão', en: 'Birthdays & Fun' },
    shop: { pt: 'Lanches Gourmet', en: 'Gourmet Snacks' },
    contact: { pt: 'Contato', en: 'Contact' },
  },
  stats: {
    visitors: { pt: 'Visitantes anuais', en: 'Annual visitors' },
    attractionsCount: { pt: 'Atrações únicas', en: 'Unique attractions' },
    rating: { pt: 'Avaliação Média', en: 'Average Rating' },
  },
  shop: {
    badge: { pt: 'Abasteça', en: 'Fuel Up' },
  },
  common: {
    learnMore: { pt: 'Saiba Mais', en: 'Learn More' },
    explore: { pt: 'Explorar', en: 'Explore' },
    visitCount: { pt: 'visitaram', en: 'visited' },
    discovery: { pt: 'Descoberta', en: 'Discovery' },
    entertainment: { pt: 'Entretenimento Ilimitado', en: 'Unlimited Entertainment' },
    celebrations: { pt: 'Celebrações', en: 'Celebrations' },
    packages: { pt: 'Pacotes', en: 'Packages' },
    mostPopular: { pt: 'Mais Popular', en: 'Most Popular' },
    location: { pt: 'Localização', en: 'Location' },
    information: { pt: 'Informações', en: 'Information' },
    getDirections: { pt: 'Como chegar', en: 'Get directions' },
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
