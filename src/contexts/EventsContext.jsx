import { createContext, useContext, useState, useEffect } from 'react';

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - ersätt senare med Supabase
  const mockEvents = [
    {
      id: 'event-1',
      title: 'Juridisk grundkurs vid vattenskador',
      description: 'Lär dig grunderna i digital marknadsföring och SEO. Denna kurs ger dig en solid grund för att förstå hur digital marknadsföring fungerar och hur du kan använda det för att nå din målgrupp.',
      category: 'webinar',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      startDate: '2025-11-15',
      startTime: '10:00',
      endTime: '12:00',
      endDate: '2025-11-15',
      meetingType: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      meetingId: '123 456 789',
      meetingPassword: 'digital2025',
      location: '',
      instructorName: 'Anna Andersson',
      instructorEmail: 'anna@example.com',
      maxParticipants: 50,
      participants: [
        { id: 'p1', name: 'Erik Svensson', email: 'erik@example.com', registeredAt: '2025-10-20T10:00:00' },
        { id: 'p2', name: 'Maria Johansson', email: 'maria@example.com', registeredAt: '2025-10-21T14:30:00' }
      ],
      waitlist: [],
      isFree: true,
      price: 0,
      sendReminders: true,
      autoConfirm: true,
      allowWaitlist: true,
      createdAt: '2025-10-15T10:00:00'
    },
    {
      id: 'event-2',
      title: 'Laddstolpar i bostadsrättsföreningen',
      description: 'Grundläggande Excel-funktioner och formler för att effektivisera ditt arbete. Lär dig skapa tabeller, diagram och använd kraftfulla formler.',
      category: 'training',
      thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      startDate: '2025-11-20',
      startTime: '13:00',
      endTime: '15:00',
      endDate: '2025-11-20',
      meetingType: 'teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/123',
      meetingId: '',
      meetingPassword: '',
      location: '',
      instructorName: 'Erik Eriksson',
      instructorEmail: 'erik@example.com',
      maxParticipants: 30,
      participants: [
        { id: 'p3', name: 'Johan Larsson', email: 'johan@example.com', registeredAt: '2025-10-22T09:00:00' }
      ],
      waitlist: [],
      isFree: false,
      price: 500,
      sendReminders: true,
      autoConfirm: true,
      allowWaitlist: true,
      createdAt: '2025-10-16T14:00:00'
    },
    {
      id: 'event-3',
      title: 'Projektledning vid entreprenader',
      description: 'Praktisk workshop i modern projektledning med fokus på agila metoder. Perfekt för dig som vill lära dig mer om Scrum och Kanban.',
      category: 'workshop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      startDate: '2025-11-25',
      startTime: '09:00',
      endTime: '16:00',
      endDate: '2025-11-25',
      meetingType: 'physical',
      meetingLink: '',
      meetingId: '',
      meetingPassword: '',
      location: 'Storgatan 15, Stockholm',
      instructorName: 'Maria Svensson',
      instructorEmail: 'maria@example.com',
      maxParticipants: 20,
      participants: [
        { id: 'p4', name: 'Sara Nilsson', email: 'sara@example.com', registeredAt: '2025-10-18T11:00:00' },
        { id: 'p5', name: 'Peter Andersson', email: 'peter@example.com', registeredAt: '2025-10-19T15:20:00' },
        { id: 'p6', name: 'Lisa Berg', email: 'lisa@example.com', registeredAt: '2025-10-20T08:45:00' }
      ],
      waitlist: [],
      isFree: false,
      price: 1500,
      sendReminders: true,
      autoConfirm: false,
      allowWaitlist: true,
      createdAt: '2025-10-18T09:00:00'
    },
    {
      id: 'event-4',
      title: 'Effektiv energieffektivisering',
      description: 'Lär dig bygga moderna webbapplikationer med React. Vi går igenom komponenter, hooks, state management och routing.',
      category: 'training',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      startDate: '2025-12-01',
      startTime: '10:00',
      endTime: '17:00',
      endDate: '2025-12-05',
      meetingType: 'zoom',
      meetingLink: 'https://zoom.us/j/987654321',
      meetingId: '987 654 321',
      meetingPassword: 'react2025',
      location: '',
      instructorName: 'David Karlsson',
      instructorEmail: 'david@example.com',
      maxParticipants: 25,
      participants: [],
      waitlist: [],
      isFree: false,
      price: 3500,
      sendReminders: true,
      autoConfirm: true,
      allowWaitlist: true,
      isRecurring: true,
      recurringPattern: 'daily',
      recurringEndDate: '2025-12-05',
      createdAt: '2025-10-19T12:00:00'
    },
    {
      id: 'event-5',
      title: 'Leadership & Management',
      description: 'Utveckla dina ledarskapsförmågor och lär dig moderna ledarskapstekniker. För både nya och erfarna chefer.',
      category: 'conference',
      thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
      startDate: '2025-12-10',
      startTime: '09:00',
      endTime: '17:00',
      endDate: '2025-12-11',
      meetingType: 'physical',
      meetingLink: '',
      meetingId: '',
      meetingPassword: '',
      location: 'Grand Hotel, Stockholm',
      instructorName: 'Anna Lindberg',
      instructorEmail: 'anna.l@example.com',
      maxParticipants: 100,
      participants: [],
      waitlist: [],
      isFree: false,
      price: 5000,
      sendReminders: true,
      autoConfirm: false,
      allowWaitlist: true,
      createdAt: '2025-10-20T10:00:00'
    },
    {
      id: 'event-6',
      title: 'Data Science med Python',
      description: 'Grundkurs i data science och maskininlärning med Python. Lär dig pandas, numpy, matplotlib och scikit-learn.',
      category: 'training',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      startDate: '2025-12-15',
      startTime: '13:00',
      endTime: '16:00',
      endDate: '2025-12-15',
      meetingType: 'meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      meetingId: '',
      meetingPassword: '',
      location: '',
      instructorName: 'Michael Chen',
      instructorEmail: 'michael@example.com',
      maxParticipants: 40,
      participants: [],
      waitlist: [],
      isFree: true,
      price: 0,
      sendReminders: true,
      autoConfirm: true,
      allowWaitlist: true,
      createdAt: '2025-10-21T15:00:00'
    }
  ];

  useEffect(() => {
    // Simulera API-call
    const loadEvents = async () => {
      setLoading(true);
      
      // TODO: Ersätt med Supabase query
      // const { data, error } = await supabase
      //   .from('events')
      //   .select('*')
      //   .order('startDate', { ascending: true });
      
      // Simulera delay
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 500);
    };

    loadEvents();
  }, []);

  // Create event
  const createEvent = async (eventData) => {
    // TODO: Ersätt med Supabase insert
    // const { data, error } = await supabase
    //   .from('events')
    //   .insert([eventData])
    //   .select();
    
    const newEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  // Update event
  const updateEvent = async (eventId, updates) => {
    // TODO: Ersätt med Supabase update
    // const { data, error } = await supabase
    //   .from('events')
    //   .update(updates)
    //   .eq('id', eventId)
    //   .select();
    
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    );
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    // TODO: Ersätt med Supabase delete
    // const { error } = await supabase
    //   .from('events')
    //   .delete()
    //   .eq('id', eventId);
    
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Get event by ID
  const getEventById = (eventId) => {
    return events.find(event => event.id === eventId);
  };

  // Get event by slug
  const getEventBySlug = (slug) => {
    return events.find(event => {
      const eventSlug = event.title
        .toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return eventSlug === slug;
    });
  };

  // Get upcoming events
  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(event.startDate) >= now);
  };

  // Get past events
  const getPastEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(event.startDate) < now);
  };

  const value = {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventBySlug,
    getUpcomingEvents,
    getPastEvents
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;