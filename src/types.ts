export type Language = 'pt' | 'en';

export interface NavItem {
  label: Record<Language, string>;
  href: string;
}

export interface Attraction {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
}

export interface Ticket {
  id: string;
  type: Record<Language, string>;
  price: number;
  benefits: Record<Language, string[]>;
}

export interface SeasonalEvent {
  id: string;
  name: Record<Language, string>;
  date: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  price: number;
  image: string;
}

export interface Translations {
  hero: {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    cta: Record<Language, string>;
  };
  sections: {
    attractions: Record<Language, string>;
    tickets: Record<Language, string>;
    map: Record<Language, string>;
    events: Record<Language, string>;
    shop: Record<Language, string>;
    contact: Record<Language, string>;
  };
  contact: {
    name: Record<Language, string>;
    email: Record<Language, string>;
    message: Record<Language, string>;
    send: Record<Language, string>;
  };
  footer: {
    buyTickets: Record<Language, string>;
  };
  info: {
    address: Record<Language, string>;
    phone: Record<Language, string>;
    hours: Record<Language, string>;
    tagline: Record<Language, string>;
    badge: Record<Language, string>;
  };
}
