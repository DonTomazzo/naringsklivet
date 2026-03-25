import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/MockAuthContext';

function ProtectedRoute({ children, requireAdmin = false, requireTeamLeader = false }) {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireTeamLeader && currentUser.role !== 'team_leader' && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;