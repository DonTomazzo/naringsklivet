// src/components/auth/ProtectedRoute.tsx
// Ersätter den gamla MockAuthContext-varianten
// Läser session direkt från Supabase via useAuth-hooken

import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole; // 'admin' | 'teamleader' | 'teammember'
}

// Rollhierarki — admin får tillgång till allt
const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin:       3,
  teamleader:  2,
  teammember:  1,
};

const hasAccess = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

// Redirect per roll om man hamnar på fel sida
const DEFAULT_ROUTES: Record<UserRole, string> = {
  admin:      '/admin',
  teamleader: '/team',
  teammember: '/mina-sidor',
};

export default function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Vänta på att Supabase kollar sessionen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#0f1623' }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: '#FF5421' }} />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Kontrollerar behörighet...</p>
        </div>
      </div>
    );
  }

  // Inte inloggad — skicka till login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Fel roll — skicka till rätt sida för användarens roll
  if (requireRole && !hasAccess(user.role, requireRole)) {
    return <Navigate to={DEFAULT_ROUTES[user.role]} replace />;
  }

  return <>{children}</>;
}