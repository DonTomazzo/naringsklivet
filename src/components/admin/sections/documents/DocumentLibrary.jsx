import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeam } from '../../../../contexts/MockTeamContext';
import { useDocuments } from '../../../../contexts/MockDocumentContext';
import {
  Folder, File, FileText, Video, Image, Music,
  Upload, Plus, Search, Grid, List, Trash2, Edit2,
  Eye, Download, MoreVertical, FolderPlus, Share2,
  Lock, Users, Globe
} from 'lucide-react';
import { toast } from 'react-toastify';
import DocumentViewer from './DocumentViewer';
import ShareDocumentModal from './ShareDocumentModal';

function DocumentLibrary() {
  const {
    folders,
    documents,
    getRootFolders,
    getDocumentsByFolder,
    createFolder,
    deleteFolder,
    deleteDocument,
    incrementViews,
    getVisibleDocuments,
    canUserDelete,
    canUserShare
  } = useDocuments();

  const { currentUser } = useTeam();

  const [currentFolder, setCurrentFolder] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingDocument, setSharingDocument] = useState(null);

  // Get visible documents based on user permissions
  const visibleDocuments = getVisibleDocuments(
    currentUser?.id,
    currentUser?.role,
    currentUser?.teamId
  );

  // Get current items to display
  const currentFolders = currentFolder 
    ? Object.values(folders).filter(f => f.parentId === currentFolder.id)
    : getRootFolders();

  const currentDocuments = currentFolder
    ? visibleDocuments.filter(d => d.folderId === currentFolder.id)
    : visibleDocuments.filter(d => !d.folderId);

  // Filter by search
  const filteredFolders = currentFolders.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocuments = currentDocuments.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="text-red-500" size={40} />;
      case 'video':
        return <Video className="text-blue-500" size={40} />;
      case 'image':
        return <Image className="text-green-500" size={40} />;
      case 'audio':
        return <Music className="text-purple-500" size={40} />;
      default:
        return <File className="text-gray-500" size={40} />;
    }
  };

  const getVisibilityBadge = (doc) => {
    const commonClasses = "absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-sm shadow-sm";
    
    if (doc.visibility === 'public') {
      return (
        <div className={`${commonClasses} bg-green-100`} title="Publikt - Alla kan se">
          <Globe size={14} className="text-green-700" />
        </div>
      );
    }
    if (doc.visibility === 'team') {
      return (
        <div className={`${commonClasses} bg-blue-100`} title="Team - Delad med team">
          <Users size={14} className="text-blue-700" />
        </div>
      );
    }
    return (
      <div className={`${commonClasses} bg-gray-100`} title="Privat - Endast du">
        <Lock size={14} className="text-gray-700" />
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleViewDocument = (doc) => {
    incrementViews(doc.id);
    setSelectedDocument(doc);
    setShowViewer(true);
  };

  const handleDeleteDocument = (doc, e) => {
    e.stopPropagation();
    
    // Check permissions
    if (!canUserDelete(doc.id, currentUser?.id, currentUser?.role)) {
      toast.error('Du har inte behörighet att ta bort detta dokument');
      return;
    }

    if (confirm(`Är du säker på att du vill ta bort "${doc.title}"?`)) {
      deleteDocument(doc.id);
      toast.success('Dokument borttaget');
    }
  };

  const handleShareDocument = (doc, e) => {
    e.stopPropagation();
    
    // Check permissions
    if (!canUserShare(doc.id, currentUser?.id, currentUser?.role)) {
      toast.error('Du har inte behörighet att dela detta dokument');
      return;
    }

    setSharingDocument(doc);
    setShowShareModal(true);
  };

  const handleDeleteFolder = (folder, e) => {
    e.stopPropagation();
    if (confirm(`Är du säker på att du vill ta bort mappen "${folder.name}"?`)) {
      const result = deleteFolder(folder.id);
      if (result.success) {
        toast.success('Mapp borttagen');
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Mina Dokument</h1>
              <p className="text-slate-600 mt-1">
                {currentFolder ? currentFolder.name : 'Alla filer och mappar'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNewFolderModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FolderPlus size={20} />
                Ny mapp
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Upload size={20} />
                Ladda upp
              </button>
            </div>
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök filer och mappar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-slate-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-slate-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          {currentFolder && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <button
                onClick={() => setCurrentFolder(null)}
                className="text-blue-600 hover:underline"
              >
                Hem
              </button>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900">{currentFolder.name}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {filteredFolders.length === 0 && filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-slate-600">
                {searchTerm ? 'Inga resultat hittades' : 'Denna mapp är tom'}
              </p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {/* Folders */}
                  {filteredFolders.map((folder) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                      onClick={() => setCurrentFolder(folder)}
                    >
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleDeleteFolder(folder, e)}
                          className="p-1 bg-white rounded shadow hover:bg-red-50 text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <Folder className="text-blue-500 mb-2" size={40} />
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {folder.name}
                      </div>
                    </motion.div>
                  ))}

                  {/* Documents */}
                  {filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer"
                      onClick={() => handleViewDocument(doc)}
                    >
                      {/* Visibility Badge */}
                      {getVisibilityBadge(doc)}

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        {canUserShare(doc.id, currentUser?.id, currentUser?.role) && (
                          <button
                            onClick={(e) => handleShareDocument(doc, e)}
                            className="p-1 bg-white rounded shadow hover:bg-purple-50 text-purple-600"
                            title="Dela"
                          >
                            <Share2 size={16} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(doc);
                          }}
                          className="p-1 bg-white rounded shadow hover:bg-blue-50 text-blue-600"
                          title="Visa"
                        >
                          <Eye size={16} />
                        </button>
                        {canUserDelete(doc.id, currentUser?.id, currentUser?.role) && (
                          <button
                            onClick={(e) => handleDeleteDocument(doc, e)}
                            className="p-1 bg-white rounded shadow hover:bg-red-50 text-red-600"
                            title="Ta bort"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="mb-2 mt-8">{getFileIcon(doc.fileType)}</div>
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {doc.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {formatFileSize(doc.fileSize)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Eye size={12} />
                        {doc.views} visningar
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-2">
                  {/* Folders */}
                  {filteredFolders.map((folder) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                      onClick={() => setCurrentFolder(folder)}
                    >
                      <Folder className="text-blue-500 flex-shrink-0" size={24} />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{folder.name}</div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteFolder(folder, e)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-red-600 rounded transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}

                  {/* Documents */}
                  {filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <div className="flex-shrink-0">{getFileIcon(doc.fileType)}</div>
                      
                      {/* Visibility icon inline */}
                      <div className="flex-shrink-0">
                        {doc.visibility === 'public' && <Globe size={16} className="text-green-600" />}
                        {doc.visibility === 'team' && <Users size={16} className="text-blue-600" />}
                        {doc.visibility === 'private' && <Lock size={16} className="text-gray-600" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 truncate">{doc.title}</div>
                        <div className="text-sm text-slate-500">
                          {formatFileSize(doc.fileSize)} • {doc.views} visningar
                        </div>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {canUserShare(doc.id, currentUser?.id, currentUser?.role) && (
                          <button
                            onClick={(e) => handleShareDocument(doc, e)}
                            className="p-2 hover:bg-purple-50 text-purple-600 rounded"
                            title="Dela"
                          >
                            <Share2 size={18} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(doc);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded"
                          title="Visa"
                        >
                          <Eye size={18} />
                        </button>
                        {canUserDelete(doc.id, currentUser?.id, currentUser?.role) && (
                          <button
                            onClick={(e) => handleDeleteDocument(doc, e)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded"
                            title="Ta bort"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {showViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => {
            setShowViewer(false);
            setSelectedDocument(null);
          }}
        />
      )}

      {/* Share Document Modal */}
      {showShareModal && sharingDocument && (
        <ShareDocumentModal
          document={sharingDocument}
          currentUser={currentUser}
          onClose={() => {
            setShowShareModal(false);
            setSharingDocument(null);
          }}
        />
      )}
    </div>
  );
}

export default DocumentLibrary;