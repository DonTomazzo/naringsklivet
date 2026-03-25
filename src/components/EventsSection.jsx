// src/components/EventsSection.jsx
// Hårdkodade events – uppdatera EVENTS-arrayen manuellt

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, MapPin, Clock } from 'lucide-react';
import EventBookingModal from './EventBookingModal';

// ─────────────────────────────────────────────
// ✏️  EVENTS – uppdatera här när du lägger till
//     eller tar bort seminarier
// ─────────────────────────────────────────────

export const EVENTS = [
  {
    id: '1',
    title: 'Gratis webbinarium – AI-kartan 2026',
    description: 'En timmes genomgång av vilka AI-verktyg som faktiskt gör skillnad i din arbetsdag. Öppet för alla.',
    starts_at: '2026-04-10T12:00:00+02:00',
    ends_at:   '2026-04-10T13:00:00+02:00',
    event_type: 'online',
    location_name: null,
    location_addr: null,
    zoom_url:   'https://zoom.us/j/placeholder',
    teams_url:  null,
    capacity:   200,
    spots_left: 142,
    price_early:    0,
    price_standard: 0,
    early_bird_until: null,
    is_free: true,
  },
  {
    id: '2',
    title: 'AI i praktiken – introduktionsseminarium',
    description: 'En halvdag där du lär dig använda ChatGPT, Claude och Gemini i din arbetsdag. Praktiska övningar, inga förkunskaper krävs.',
    starts_at: '2026-04-22T09:00:00+02:00',
    ends_at:   '2026-04-22T12:00:00+02:00',
    event_type: 'hybrid',
    location_name: 'Minc Innovation, Malmö',
    location_addr: 'Anckargripsgatan 3, 211 19 Malmö',
    zoom_url:   'https://zoom.us/j/placeholder2',
    teams_url:  null,
    capacity:   20,
    spots_left: 7,
    price_early:    1495,
    price_standard: 1995,
    early_bird_until: '2026-04-08T23:59:00+02:00',
    is_free: false,
  },
  {
    id: '3',
    title: 'Promptteknik för marknadsförare',
    description: 'Lär dig skriva prompts som faktiskt levererar – för annonser, sociala medier och innehållsskapande.',
    starts_at: '2026-05-06T13:00:00+02:00',
    ends_at:   '2026-05-06T16:00:00+02:00',
    event_type: 'online',
    location_name: null,
    location_addr: null,
    zoom_url:   'https://zoom.us/j/placeholder3',
    teams_url:  null,
    capacity:   30,
    spots_left: 30,
    price_early:     995,
    price_standard: 1495,
    early_bird_until: '2026-04-22T23:59:00+02:00',
    is_free: false,
  },
  {
    id: '4',
    title: 'AI för egenföretagare – heldagsworkshop',
    description: 'En intensiv dag med fokus på hur du som soloföretagare automatiserar, delegerar till AI och frigör tid.',
    starts_at: '2026-05-20T09:00:00+02:00',
    ends_at:   '2026-05-20T17:00:00+02:00',
    event_type: 'physical',
    location_name: 'Krinova Science Park, Kristianstad',
    location_addr: 'Hjalmar Petersens väg 6, 291 39 Kristianstad',
    zoom_url:  null,
    teams_url: null,
    capacity:   15,
    spots_left: 15,
    price_early:    2495,
    price_standard: 2995,
    early_bird_until: '2026-05-06T23:59:00+02:00',
    is_free: false,
  },
];

// ─────────────────────────────────────────────
// HJÄLPFUNKTIONER
// ─────────────────────────────────────────────

export const isEarlyBird = (event) => {
  if (!event.early_bird_until || !event.price_early) return false;
  return new Date() < new Date(event.early_bird_until);
};

export const currentPrice = (event) => {
  if (event.is_free) return 0;
  return isEarlyBird(event) ? event.price_early : event.price_standard;
};

export const formatPrice = (kr) => {
  if (kr === 0) return 'Gratis';
  return `${kr.toLocaleString('sv-SE')} kr`;
};

const TYPE_CONFIG = {
  online:   { label: 'Online',       icon: '💻', bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  physical: { label: 'Platsbaserat', icon: '📍', bg: 'rgba(34,197,94,0.12)',   color: '#16a34a' },
  hybrid:   { label: 'Hybrid',       icon: '🔀', bg: 'rgba(168,85,247,0.12)',  color: '#9333ea' },
};

const spotsStatus = (spots) => {
  if (spots === 0) return { text: 'Fullbokat', bg: '#f1f5f9',               color: '#94a3b8' };
  if (spots <= 4)  return { text: `${spots} kvar`, bg: 'rgba(255,84,33,0.10)', color: '#FF5421' };
  return               { text: 'Ledigt',    bg: 'rgba(34,197,94,0.10)',    color: '#16a34a' };
};

// ─────────────────────────────────────────────
// EVENT-KORT
// ─────────────────────────────────────────────

const EventCard = ({ event, index, onBook }) => {
  const isFull = event.spots_left === 0;
  const early  = isEarlyBird(event);
  const price  = currentPrice(event);
  const type   = TYPE_CONFIG[event.event_type] ?? TYPE_CONFIG.online;
  const spots  = spotsStatus(event.spots_left);
  const date   = new Date(event.starts_at);
  const day    = date.toLocaleDateString('sv-SE', { day: 'numeric' });
  const month  = date.toLocaleDateString('sv-SE', { month: 'short' });
  const time   = `${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}–${
    new Date(event.ends_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onClick={() => !isFull && onBook(event)}
      className={`flex items-stretch transition-colors
        ${isFull ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 cursor-pointer'}`}
    >
      {/* Datum */}
      <div className="flex-shrink-0 w-14 flex flex-col items-center justify-center py-4 border-r border-gray-100">
        <span className="text-xs text-gray-400 font-medium uppercase">{month}</span>
        <span className="text-2xl font-black leading-tight"
          style={{ color: isFull ? '#9ca3af' : '#FF5421' }}>
          {day}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-center gap-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: type.bg, color: type.color }}>
            {type.icon} {type.label}
          </span>
          {early && !isFull && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#d97706' }}>
              🏷 Early bird
            </span>
          )}
          {event.is_free && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>
              Gratis
            </span>
          )}
        </div>
        <p className="text-sm font-bold text-slate-800 leading-snug">{event.title}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={10} />{time}
          </span>
          {event.location_name && (
            <span className="text-xs text-slate-400 flex items-center gap-1 truncate">
              <MapPin size={10} />{event.location_name}
            </span>
          )}
        </div>
      </div>

      {/* Pris + spots */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-1.5 pr-4 py-3 min-w-[80px]">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: spots.bg, color: spots.color }}>
          {spots.text}
        </span>
        <span className="text-sm font-bold"
          style={{ color: isFull ? '#9ca3af' : '#FF5421' }}>
          {formatPrice(price)}
        </span>
        {early && event.price_standard && !isFull && (
          <span className="text-xs line-through text-gray-300">
            {formatPrice(event.price_standard)}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// FILTER
// ─────────────────────────────────────────────

const FILTERS = [
  { id: 'all',      label: 'Alla' },
  { id: 'online',   label: '💻 Online' },
  { id: 'physical', label: '📍 Platsbaserat' },
  { id: 'hybrid',   label: '🔀 Hybrid' },
];

// ─────────────────────────────────────────────
// HUVUDKOMPONENT
// ─────────────────────────────────────────────

const EventsSection = () => {
  const [filter,        setFilter]        = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const upcoming = EVENTS
    .filter(e => new Date(e.starts_at) > new Date())
    .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));

  const filtered = upcoming.filter(e =>
    filter === 'all' || e.event_type === filter
  );

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-2"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
          <CalendarCheck size={18} className="text-white" />
          <h3 className="text-white font-bold text-base">Kommande seminarier & workshops</h3>
        </div>

        {/* Filter-tabs */}
        <div className="flex gap-1.5 px-4 pt-3 pb-1 overflow-x-auto">
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              style={filter === f.id
                ? { background: '#FF5421', color: 'white' }
                : { background: '#f1f5f9', color: '#64748b' }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="divide-y divide-gray-100 mt-2">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-400">
              Inga kommande event just nu.
            </p>
          ) : (
            filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} onBook={setSelectedEvent} />
            ))
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Klicka på ett event för att anmäla dig
      </p>

      <AnimatePresence>
        {selectedEvent && (
          <EventBookingModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EventsSection;