import { createContext, useContext, useState, useEffect } from 'react';

const DocumentContext = createContext(null);

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
}

export function DocumentProvider({ children }) {
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('document_folders');
    return saved ? JSON.parse(saved) : {
      'folder-1': {
        id: 'folder-1',
        name: 'Kursmaterial',
        parentId: null,
        createdBy: 'user-admin',
        createdAt: '2025-01-10T10:00:00Z'
      },
      'folder-2': {
        id: 'folder-2',
        name: 'Certifikat',
        parentId: null,
        createdBy: 'user-admin',
        createdAt: '2025-01-10T10:00:00Z'
      },
      'folder-3': {
        id: 'folder-3',
        name: 'Mallar',
        parentId: null,
        createdBy: 'user-admin',
        createdAt: '2025-01-10T10:00:00Z'
      }
    };
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('documents');
    return saved ? JSON.parse(saved) : {
      'doc-1': {
        id: 'doc-1',
        title: 'Brandskydd Grundkurs.pdf',
        description: 'Komplett guide till brandskydd',
        filePath: '/sample-docs/brandskydd.pdf',
        fileType: 'pdf',
        fileSize: 2048576, // 2MB
        thumbnailUrl: null,
        folderId: 'folder-1',
        uploadedBy: 'user-admin',
        createdAt: '2025-01-10T10:00:00Z',
        views: 45,
        
        // ⭐ Permission fields
        visibility: 'public',
        sharedWithTeams: [],
        sharedWithUsers: [],
        ownerId: 'user-admin',
        permissions: {
          canEdit: ['user-admin'],
          canDelete: ['user-admin'],
          canShare: ['user-admin']
        }
      },
      'doc-2': {
        id: 'doc-2',
        title: 'Instruktionsvideo.mp4',
        description: 'Hur man använder brandsläckare',
        filePath: '/sample-docs/video.mp4',
        fileType: 'video',
        fileSize: 15728640, // 15MB
        thumbnailUrl: null,
        folderId: 'folder-1',
        uploadedBy: 'user-admin',
        createdAt: '2025-01-11T10:00:00Z',
        views: 32,
        
        visibility: 'team',
        sharedWithTeams: ['team-1'],
        sharedWithUsers: [],
        ownerId: 'user-admin',
        permissions: {
          canEdit: ['user-admin', 'user-teamleader1'],
          canDelete: ['user-admin'],
          canShare: ['user-admin', 'user-teamleader1']
        }
      },
      'doc-3': {
        id: 'doc-3',
        title: 'Diplom Mall.pdf',
        description: 'Mall för certifikat',
        filePath: '/sample-docs/diplom.pdf',
        fileType: 'pdf',
        fileSize: 512000,
        thumbnailUrl: null,
        folderId: 'folder-3',
        uploadedBy: 'user-admin',
        createdAt: '2025-01-12T10:00:00Z',
        views: 12,
        
        visibility: 'private',
        sharedWithTeams: [],
        sharedWithUsers: [],
        ownerId: 'user-admin',
        permissions: {
          canEdit: ['user-admin'],
          canDelete: ['user-admin'],
          canShare: ['user-admin']
        }
      },
      'doc-4': {
        id: 'doc-4',
        title: 'Team A Utbildningsplan.pdf',
        description: 'Specifik utbildningsplan för Team A',
        filePath: '/sample-docs/team-a-plan.pdf',
        fileType: 'pdf',
        fileSize: 1024000,
        thumbnailUrl: null,
        folderId: 'folder-1',
        uploadedBy: 'user-teamleader1',
        createdAt: '2025-01-13T10:00:00Z',
        views: 18,
        
        visibility: 'team',
        sharedWithTeams: ['team-1'],
        sharedWithUsers: [],
        ownerId: 'user-teamleader1',
        permissions: {
          canEdit: ['user-teamleader1'],
          canDelete: ['user-teamleader1'],
          canShare: ['user-teamleader1']
        }
      },
      'doc-5': {
        id: 'doc-5',
        title: 'Säkerhetsrutiner 2025.pdf',
        description: 'Nya säkerhetsrutiner för alla',
        filePath: '/sample-docs/security-2025.pdf',
        fileType: 'pdf',
        fileSize: 3145728, // 3MB
        thumbnailUrl: null,
        folderId: 'folder-1',
        uploadedBy: 'user-admin',
        createdAt: '2025-01-14T10:00:00Z',
        views: 67,
        
        visibility: 'public',
        sharedWithTeams: [],
        sharedWithUsers: [],
        ownerId: 'user-admin',
        permissions: {
          canEdit: ['user-admin'],
          canDelete: ['user-admin'],
          canShare: ['user-admin']
        }
      }
    };
  });

  const [annotations, setAnnotations] = useState(() => {
    const saved = localStorage.getItem('document_annotations');
    return saved ? JSON.parse(saved) : {};
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('document_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('document_annotations', JSON.stringify(annotations));
  }, [annotations]);

  // ⭐ NEW: Get documents user can see
  const getVisibleDocuments = (userId, userRole, userTeamId) => {
    return Object.values(documents).filter(doc => {
      // Owner can always see
      if (doc.ownerId === userId) return true;

      // Admin can see all
      if (userRole === 'admin') return true;

      // Public documents visible to all
      if (doc.visibility === 'public') return true;

      // Team documents visible to team members
      if (doc.visibility === 'team' && doc.sharedWithTeams.includes(userTeamId)) {
        return true;
      }

      // Specifically shared with user
      if (doc.sharedWithUsers.includes(userId)) return true;

      return false;
    });
  };

  // ⭐ NEW: Share document
  const shareDocument = (documentId, visibility, teams = [], users = []) => {
    setDocuments(prev => ({
      ...prev,
      [documentId]: {
        ...prev[documentId],
        visibility,
        sharedWithTeams: teams,
        sharedWithUsers: users
      }
    }));
    return { success: true };
  };

  // ⭐ NEW: Check if user can edit
  const canUserEdit = (documentId, userId, userRole) => {
    const doc = documents[documentId];
    if (!doc) return false;
    
    if (userRole === 'admin') return true;
    if (doc.ownerId === userId) return true;
    if (doc.permissions.canEdit.includes(userId)) return true;
    
    return false;
  };

  // ⭐ NEW: Check if user can delete
  const canUserDelete = (documentId, userId, userRole) => {
    const doc = documents[documentId];
    if (!doc) return false;
    
    if (userRole === 'admin') return true;
    if (doc.ownerId === userId) return true;
    if (doc.permissions.canDelete.includes(userId)) return true;
    
    return false;
  };

  // ⭐ NEW: Check if user can share
  const canUserShare = (documentId, userId, userRole) => {
    const doc = documents[documentId];
    if (!doc) return false;
    
    if (userRole === 'admin') return true;
    if (doc.ownerId === userId) return true;
    if (doc.permissions.canShare.includes(userId)) return true;
    
    return false;
  };

  // Folder operations
  const createFolder = (folderData) => {
    const id = `folder-${Date.now()}`;
    const newFolder = {
      id,
      ...folderData,
      createdAt: new Date().toISOString()
    };
    setFolders(prev => ({ ...prev, [id]: newFolder }));
    return { success: true, folder: newFolder };
  };

  const updateFolder = (folderId, updates) => {
    setFolders(prev => ({
      ...prev,
      [folderId]: { ...prev[folderId], ...updates }
    }));
    return { success: true };
  };

  const deleteFolder = (folderId) => {
    // Check if folder has documents
    const folderDocs = Object.values(documents).filter(d => d.folderId === folderId);
    if (folderDocs.length > 0) {
      return { success: false, error: 'Folder contains documents' };
    }

    setFolders(prev => {
      const newFolders = { ...prev };
      delete newFolders[folderId];
      return newFolders;
    });
    return { success: true };
  };

  // Document operations
  const uploadDocument = (documentData) => {
    const id = `doc-${Date.now()}`;
    const newDocument = {
      id,
      ...documentData,
      createdAt: new Date().toISOString(),
      views: 0,
      // Default permission settings
      visibility: documentData.visibility || 'private',
      sharedWithTeams: documentData.sharedWithTeams || [],
      sharedWithUsers: documentData.sharedWithUsers || [],
      ownerId: documentData.ownerId || documentData.uploadedBy,
      permissions: documentData.permissions || {
        canEdit: [documentData.uploadedBy],
        canDelete: [documentData.uploadedBy],
        canShare: [documentData.uploadedBy]
      }
    };
    setDocuments(prev => ({ ...prev, [id]: newDocument }));
    return { success: true, document: newDocument };
  };

  const updateDocument = (documentId, updates) => {
    setDocuments(prev => ({
      ...prev,
      [documentId]: { ...prev[documentId], ...updates }
    }));
    return { success: true };
  };

  const deleteDocument = (documentId) => {
    setDocuments(prev => {
      const newDocuments = { ...prev };
      delete newDocuments[documentId];
      return newDocuments;
    });

    // Delete associated annotations
    setAnnotations(prev => {
      const newAnnotations = { ...prev };
      Object.keys(newAnnotations).forEach(key => {
        if (newAnnotations[key].documentId === documentId) {
          delete newAnnotations[key];
        }
      });
      return newAnnotations;
    });

    return { success: true };
  };

  const incrementViews = (documentId) => {
    setDocuments(prev => ({
      ...prev,
      [documentId]: {
        ...prev[documentId],
        views: (prev[documentId].views || 0) + 1
      }
    }));
  };

  // Annotation operations
  const addAnnotation = (annotationData) => {
    const id = `annotation-${Date.now()}`;
    const newAnnotation = {
      id,
      ...annotationData,
      createdAt: new Date().toISOString()
    };
    setAnnotations(prev => ({ ...prev, [id]: newAnnotation }));
    return { success: true, annotation: newAnnotation };
  };

  const deleteAnnotation = (annotationId) => {
    setAnnotations(prev => {
      const newAnnotations = { ...prev };
      delete newAnnotations[annotationId];
      return newAnnotations;
    });
    return { success: true };
  };

  const getDocumentAnnotations = (documentId) => {
    return Object.values(annotations).filter(a => a.documentId === documentId);
  };

  // Get documents by folder
  const getDocumentsByFolder = (folderId) => {
    return Object.values(documents).filter(d => d.folderId === folderId);
  };

  // Get root folders
  const getRootFolders = () => {
    return Object.values(folders).filter(f => !f.parentId);
  };

  const value = {
    folders,
    documents,
    annotations,
    
    // Folder operations
    createFolder,
    updateFolder,
    deleteFolder,
    getRootFolders,
    
    // Document operations
    uploadDocument,
    updateDocument,
    deleteDocument,
    incrementViews,
    getDocumentsByFolder,
    
    // ⭐ NEW: Permission operations
    getVisibleDocuments,
    shareDocument,
    canUserEdit,
    canUserDelete,
    canUserShare,
    
    // Annotation operations
    addAnnotation,
    deleteAnnotation,
    getDocumentAnnotations
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}