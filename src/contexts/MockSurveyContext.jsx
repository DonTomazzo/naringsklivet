import { createContext, useContext, useState, useEffect } from 'react';

const SurveyContext = createContext(null);

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within SurveyProvider');
  }
  return context;
}

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState(() => {
    const saved = localStorage.getItem('surveys');
    return saved ? JSON.parse(saved) : {
      'survey-1': {
        id: 'survey-1',
        title: 'Medarbetarenkät 2025',
        description: 'Hjälp oss förbättra arbetsplatsen',
        slug: 'medarbetar-enkat-2025',
        createdBy: 'user-admin',
        createdAt: '2025-01-10T10:00:00Z',
        updatedAt: '2025-01-10T10:00:00Z',
        isActive: true,
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            title: 'Fråga 1 av 5',
            text: 'Hur trivs du på jobbet?',
            options: ['Mycket bra', 'Bra', 'Ok', 'Dåligt'],
            required: true
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            title: 'Fråga 2 av 5',
            text: 'Vad uppskattar du mest?',
            options: ['Kollegor', 'Flexibilitet', 'Lön', 'Utvecklingsmöjligheter'],
            required: true
          },
          {
            id: 'q3',
            type: 'likert',
            title: 'Fråga 3 av 5',
            text: 'Jag känner mig motiverad av mina arbetsuppgifter',
            required: true
          },
          {
            id: 'q4',
            type: 'text-input',
            title: 'Fråga 4 av 5',
            text: 'Vad kan vi förbättra?',
            placeholder: 'Skriv ditt svar här...',
            required: false
          },
          {
            id: 'q5',
            type: 'sorting',
            title: 'Fråga 5 av 5',
            text: 'Rangordna följande i prioritetsordning:',
            items: [
              { id: 'item-1', name: 'Bättre lön' },
              { id: 'item-2', name: 'Mer flexibilitet' },
              { id: 'item-3', name: 'Karriärutveckling' },
              { id: 'item-4', name: 'Bättre arbetsmiljö' }
            ],
            required: true
          }
        ],
        settings: {
          allowAnonymous: true,
          showProgressBar: true,
          shuffleQuestions: false,
          oneResponsePerEmail: true,
          anonymityLevel: 'anonymous',
          theme: 'professional'
        }
      },
      'survey-2': {
        id: 'survey-2',
        title: 'Kundnöjdhetsenkät',
        description: 'Vi vill veta vad du tycker om våra tjänster',
        slug: 'kundnojdhet-2025',
        createdBy: 'user-admin',
        createdAt: '2025-01-12T14:00:00Z',
        updatedAt: '2025-01-12T14:00:00Z',
        isActive: true,
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            title: 'Fråga 1 av 3',
            text: 'Hur nöjd är du med vår service?',
            options: ['Mycket nöjd', 'Nöjd', 'Neutral', 'Missnöjd', 'Mycket missnöjd'],
            required: true
          },
          {
            id: 'q2',
            type: 'likert',
            title: 'Fråga 2 av 3',
            text: 'Jag skulle rekommendera er till andra',
            required: true
          },
          {
            id: 'q3',
            type: 'text-input',
            title: 'Fråga 3 av 3',
            text: 'Övriga kommentarer:',
            placeholder: 'Frivilligt...',
            required: false
          }
        ],
        settings: {
          allowAnonymous: false,
          showProgressBar: true,
          shuffleQuestions: false,
          oneResponsePerEmail: true,
          anonymityLevel: 'email_required',
          theme: 'minimalist'
        }
      }
    };
  });

  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem('survey_responses');
    return saved ? JSON.parse(saved) : {
      'response-1': {
        id: 'response-1',
        surveyId: 'survey-1',
        respondentEmail: 'anna@test.se',
        answers: {
          q1: 'Mycket bra',
          q2: ['Kollegor', 'Flexibilitet'],
          q3: '7',
          q4: 'Mer kaffe på kontoret!',
          q5: ['item-2', 'item-3', 'item-1', 'item-4']
        },
        completedAt: '2025-01-15T09:30:00Z',
        timeTakenSeconds: 142
      },
      'response-2': {
        id: 'response-2',
        surveyId: 'survey-1',
        respondentEmail: 'erik@test.se',
        answers: {
          q1: 'Bra',
          q2: ['Utvecklingsmöjligheter'],
          q3: '6',
          q4: 'Bättre onboarding process',
          q5: ['item-3', 'item-1', 'item-2', 'item-4']
        },
        completedAt: '2025-01-16T11:20:00Z',
        timeTakenSeconds: 98
      },
      'response-3': {
        id: 'response-3',
        surveyId: 'survey-2',
        respondentEmail: 'maria@customer.se',
        answers: {
          q1: 'Nöjd',
          q2: '6',
          q3: 'Snabb och professionell service!'
        },
        completedAt: '2025-01-17T15:45:00Z',
        timeTakenSeconds: 67
      }
    };
  });

  const [surveyInvites, setSurveyInvites] = useState(() => {
    const saved = localStorage.getItem('survey_invites');
    return saved ? JSON.parse(saved) : {};
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('surveys', JSON.stringify(surveys));
  }, [surveys]);

  useEffect(() => {
    localStorage.setItem('survey_responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('survey_invites', JSON.stringify(surveyInvites));
  }, [surveyInvites]);

  // Helper: Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Create survey
  const createSurvey = (surveyData) => {
    const id = `survey-${Date.now()}`;
    const slug = surveyData.slug || generateSlug(surveyData.title);
    
    const newSurvey = {
      id,
      ...surveyData,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSurveys(prev => ({ ...prev, [id]: newSurvey }));
    return { success: true, survey: newSurvey };
  };

  // Update survey
  const updateSurvey = (surveyId, updates) => {
    setSurveys(prev => ({
      ...prev,
      [surveyId]: {
        ...prev[surveyId],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }));
    return { success: true };
  };

  // Delete survey
  const deleteSurvey = (surveyId) => {
    setSurveys(prev => {
      const newSurveys = { ...prev };
      delete newSurveys[surveyId];
      return newSurveys;
    });

    // Also delete associated responses
    setResponses(prev => {
      const newResponses = { ...prev };
      Object.keys(newResponses).forEach(key => {
        if (newResponses[key].surveyId === surveyId) {
          delete newResponses[key];
        }
      });
      return newResponses;
    });

    return { success: true };
  };

  // Duplicate survey
  const duplicateSurvey = (surveyId) => {
    const original = surveys[surveyId];
    if (!original) return { success: false, error: 'Survey not found' };

    const id = `survey-${Date.now()}`;
    const title = `${original.title} (Kopia)`;
    const slug = generateSlug(title);

    const duplicate = {
      ...original,
      id,
      title,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSurveys(prev => ({ ...prev, [id]: duplicate }));
    return { success: true, survey: duplicate };
  };

  // Submit response
  const submitResponse = (surveyId, responseData) => {
    const id = `response-${Date.now()}`;
    
    const newResponse = {
      id,
      surveyId,
      ...responseData,
      completedAt: new Date().toISOString()
    };

    setResponses(prev => ({ ...prev, [id]: newResponse }));
    return { success: true, response: newResponse };
  };

  // Get survey by slug
  const getSurveyBySlug = (slug) => {
    return Object.values(surveys).find(s => s.slug === slug);
  };

  // Get responses for survey
  const getSurveyResponses = (surveyId) => {
    return Object.values(responses).filter(r => r.surveyId === surveyId);
  };

  // Get survey statistics
  const getSurveyStats = (surveyId) => {
    const surveyResponses = getSurveyResponses(surveyId);
    const totalResponses = surveyResponses.length;
    
    if (totalResponses === 0) {
      return {
        totalResponses: 0,
        avgTimeSeconds: 0,
        completionRate: 0
      };
    }

    const totalTime = surveyResponses.reduce((sum, r) => sum + (r.timeTakenSeconds || 0), 0);
    const avgTimeSeconds = Math.round(totalTime / totalResponses);

    return {
      totalResponses,
      avgTimeSeconds,
      completionRate: 100
    };
  };

  // Send survey invites
  const sendSurveyInvites = (surveyId, invites) => {
    const newInvites = { ...surveyInvites };
    
    invites.forEach(invite => {
      const inviteId = `invite-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      newInvites[inviteId] = {
        id: inviteId,
        surveyId,
        email: invite.email,
        token: invite.token,
        sentAt: invite.sentAt,
        opened: false,
        completed: false
      };
    });

    setSurveyInvites(newInvites);
    return { success: true, count: invites.length };
  };

  // Get invites for survey
  const getSurveyInvites = (surveyId) => {
    return Object.values(surveyInvites).filter(i => i.surveyId === surveyId);
  };

  // Track when invite is opened
  const trackInviteOpened = (token) => {
    setSurveyInvites(prev => {
      const newInvites = { ...prev };
      const invite = Object.values(newInvites).find(i => i.token === token);
      if (invite) {
        invite.opened = true;
        invite.openedAt = new Date().toISOString();
      }
      return newInvites;
    });
  };

  // Track when invite is completed
  const trackInviteCompleted = (token) => {
    setSurveyInvites(prev => {
      const newInvites = { ...prev };
      const invite = Object.values(newInvites).find(i => i.token === token);
      if (invite) {
        invite.completed = true;
        invite.completedAt = new Date().toISOString();
      }
      return newInvites;
    });
  };

  const value = {
    surveys,
    responses,
    surveyInvites,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    duplicateSurvey,
    submitResponse,
    getSurveyBySlug,
    getSurveyResponses,
    getSurveyStats,
    generateSlug,
    sendSurveyInvites,
    getSurveyInvites,
    trackInviteOpened,
    trackInviteCompleted
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
}