import { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext(null);

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within TeamProvider');
  }
  return context;
}

export function TeamProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
  const saved = localStorage.getItem('users');
  return saved ? JSON.parse(saved) : {
    // ⭐ Admin användare
    'user-admin': {
      id: 'user-admin',
      name: 'Admin',
      email: 'admin@styrelsekorkortet.se',
      phone: '0700000000',
      password: 'admin123',
      role: 'admin',
      teamId: null
    },
    'user-1': {
      id: 'user-1',
      name: 'Anna Lindberg',
      email: 'anna@test.se',
      phone: '0701234567',
      password: 'test123',
      role: 'team_leader',
      teamId: 'TEAM-001'
    },
    'user-2': {
      id: 'user-2',
      name: 'Erik Svensson',
      email: 'erik@test.se',
      phone: '0709876543',
      password: 'test123',
      role: 'team_member',
      teamId: 'TEAM-001'
    }
  };
});

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : {
      'TEAM-001': {
        id: 'TEAM-001',
        name: 'Brf Kastanjen',
        teamLeaderId: 'user-1',
        memberIds: ['user-1', 'user-2'],
        coursesIncluded: ['course-1', 'course-2', 'course-3', 'course-4'],
        createdCodes: [
          { code: 'MEMBER-ABC123', usedBy: null, createdAt: '2024-01-14', used: false }
        ]
      }
    };
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : {
      'user-1': [
        { id: 'course-1', title: 'Diskriminering', progress: 100, completedAt: '2024-01-15' },
        { id: 'course-2', title: 'Föreningens intressenter', progress: 75, completedAt: null },
        { id: 'course-3', title: 'Likhetsprincipen', progress: 50, completedAt: null },
        { id: 'course-4', title: 'Arbetsgivaransvar', progress: 0, completedAt: null },
      ],
      'user-2': [
        { id: 'course-1', title: 'Diskriminering', progress: 60, completedAt: null },
        { id: 'course-2', title: 'Föreningens intressenter', progress: 30, completedAt: null },
        { id: 'course-3', title: 'Likhetsprincipen', progress: 20, completedAt: null },
        { id: 'course-4', title: 'Arbetsgivaransvar', progress: 0, completedAt: null },
      ]
    };
  });

  const [validMasterCodes] = useState({
    'MASTER-DEMO123': { 
      teamName: 'Demo Team', 
      coursesIncluded: ['course-1', 'course-2', 'course-3', 'course-4'],
      used: false
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const registerWithTeamCode = (code, userData) => {
    const { name, email, phone, password } = userData;

    if (!name || !email || !phone || !password) {
      return { success: false, error: 'Alla fält måste fyllas i' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Lösenordet måste vara minst 6 tecken' };
    }

    const emailExists = Object.values(users).some(u => u.email === email);
    if (emailExists) {
      return { success: false, error: 'E-postadressen är redan registrerad' };
    }

    if (validMasterCodes[code] && !validMasterCodes[code].used) {
      const newTeamId = `TEAM-${Date.now()}`;
      const newUserId = `user-${Date.now()}`;
      
      const newUser = {
        id: newUserId,
        name,
        email,
        phone,
        password,
        role: 'team_leader',
        teamId: newTeamId
      };

      const newTeam = {
        id: newTeamId,
        name: validMasterCodes[code].teamName,
        teamLeaderId: newUserId,
        memberIds: [newUserId],
        coursesIncluded: validMasterCodes[code].coursesIncluded,
        createdCodes: []
      };

      const newCourses = validMasterCodes[code].coursesIncluded.map(courseId => ({
        id: courseId,
        title: `Course ${courseId}`,
        progress: 0,
        completedAt: null
      }));

      setUsers(prev => ({ ...prev, [newUserId]: newUser }));
      setTeams(prev => ({ ...prev, [newTeamId]: newTeam }));
      setCourses(prev => ({ ...prev, [newUserId]: newCourses }));
      setCurrentUser(newUser);

      validMasterCodes[code].used = true;

      return { success: true, user: newUser, team: newTeam };
    }

    for (const teamId in teams) {
      const team = teams[teamId];
      const codeMatch = team.createdCodes.find(c => c.code === code && !c.used);
      
      if (codeMatch) {
        const newUserId = `user-${Date.now()}`;
        
        const newUser = {
          id: newUserId,
          name,
          email,
          phone,
          password,
          role: 'team_member',
          teamId: teamId
        };

        const newCourses = team.coursesIncluded.map(courseId => ({
          id: courseId,
          title: `Course ${courseId}`,
          progress: 0,
          completedAt: null
        }));

        const updatedTeam = {
          ...team,
          memberIds: [...team.memberIds, newUserId],
          createdCodes: team.createdCodes.map(c => 
            c.code === code ? { ...c, used: true, usedBy: newUserId, usedAt: new Date().toISOString() } : c
          )
        };

        setUsers(prev => ({ ...prev, [newUserId]: newUser }));
        setTeams(prev => ({ ...prev, [teamId]: updatedTeam }));
        setCourses(prev => ({ ...prev, [newUserId]: newCourses }));
        setCurrentUser(newUser);

        return { success: true, user: newUser, team: updatedTeam };
      }
    }

    return { success: false, error: 'Ogiltig eller redan använd kod' };
  };

  const login = (email, password) => {
    const user = Object.values(users).find(
      u => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Felaktig e-post eller lösenord' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const generateMemberCode = (teamId) => {
    const code = `MEMBER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newCode = {
      code,
      used: false,
      usedBy: null,
      createdAt: new Date().toISOString()
    };

    setTeams(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        createdCodes: [...(prev[teamId].createdCodes || []), newCode]
      }
    }));

    return code;
  };

  const getCurrentTeam = () => {
    if (!currentUser) return null;
    return teams[currentUser.teamId] || null;
  };

  const getTeamMembersWithProgress = (teamId) => {
    const team = teams[teamId];
    if (!team) return [];

    return team.memberIds.map(userId => {
      const user = users[userId];
      const userCourses = courses[userId] || [];
      return {
        ...user,
        courses: userCourses
      };
    });
  };

  const getCurrentUserCourses = () => {
    if (!currentUser) return [];
    return courses[currentUser.id] || [];
  };

  const value = {
    currentUser,
    users,
    teams,
    courses,
    registerWithTeamCode,
    login,
    logout,
    generateMemberCode,
    getCurrentTeam,
    getTeamMembersWithProgress,
    getCurrentUserCourses,
    isTeamLeader: currentUser?.role === 'team_leader',
    isLoggedIn: !!currentUser
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}