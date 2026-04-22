// src/pages/AuthCallback.tsx
// Hanterar redirect från Supabase magic link
// Route: /auth/callback

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { UserRole } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const O = '#FF5421';

const ROLE_ROUTES: Record<UserRole, string> = {
  admin:      '/admin',
  teamleader: '/team',
  teammember: '/mina-sidor',
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
        const role = (session.user.user_metadata?.role as UserRole) ?? 'teammember';
        navigate(ROLE_ROUTES[role], { replace: true });
      }
    });

    // Fallback — session finns redan
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const role = (session.user.user_metadata?.role as UserRole) ?? 'teammember';
        navigate(ROLE_ROUTES[role], { replace: true });
      }
    });

    const timeout = setTimeout(() => {
      setError('Länken verkar ha gått ut. Försök logga in igen.');
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #171f32 0%, #0f1623 100%)' }}>
      <div className="text-center">
        {error ? (
          <>
            <p className="text-white mb-4">{error}</p>
            <button onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: `linear-gradient(135deg, ${O}, #E04619)` }}>
              Tillbaka till inloggning
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: O }} />
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Loggar in...
            </p>
          </>
        )}
      </div>
    </div>
  );
}