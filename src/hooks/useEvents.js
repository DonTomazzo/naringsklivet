// src/hooks/useEvents.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // din befintliga supabase-client

// ─── Hjälpfunktioner ──────────────────────────────────────

export const isEarlyBird = (event) => {
  if (!event.early_bird_until || !event.price_early) return false;
  return new Date() < new Date(event.early_bird_until);
};

export const currentPrice = (event) => {
  if (event.is_free) return 0;
  return isEarlyBird(event) ? event.price_early : event.price_standard;
};

export const formatPrice = (oren) => {
  if (oren === 0) return 'Gratis';
  return `${(oren / 100).toLocaleString('sv-SE')} kr`;
};

export const eventTypeLabel = (type) => ({
  online:   'Online',
  physical: 'Platsbaserat',
  hybrid:   'Hybrid',
}[type] ?? type);

export const eventTypeIcon = (type) => ({
  online:   '💻',
  physical: '📍',
  hybrid:   '🔀',
}[type] ?? '📅');

export const spotsLabel = (spots) => {
  if (spots === 0) return { text: 'Fullbokat', variant: 'full' };
  if (spots <= 3)  return { text: `${spots} platser kvar`, variant: 'low' };
  return { text: 'Ledigt', variant: 'available' };
};

// ─── Hook: hämta alla kommande events ────────────────────

export const useEvents = () => {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .eq('is_cancelled', false)
        .gte('starts_at', new Date().toISOString())
        .order('starts_at', { ascending: true });

      if (error) setError(error.message);
      else setEvents(data || []);
      setLoading(false);
    };

    fetch();
  }, []);

  return { events, loading, error };
};

// ─── Hook: hämta ett specifikt event ─────────────────────

export const useEvent = (slug) => {
  const [event,   setEvent]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) setError(error.message);
      else setEvent(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { event, loading, error };
};

// ─── Skapa registrering ───────────────────────────────────

export const createRegistration = async (eventId, formData) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{
      event_id:       eventId,
      name:           formData.name,
      email:          formData.email,
      phone:          formData.phone || null,
      organisation:   formData.organisation || null,
      payment_method: formData.paymentMethod, // stripe | invoice | free
      payment_status: formData.paymentMethod === 'free' ? 'paid' : 'pending',
      price_paid:     formData.pricePaid || 0,
    }])
    .select()
    .single();

  return { data, error };
};