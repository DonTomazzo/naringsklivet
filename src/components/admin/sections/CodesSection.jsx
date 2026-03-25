import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Copy, Check, Trash2, Search, Filter,
  Calendar, Users, AlertCircle, Download, Eye, EyeOff
} from 'lucide-react';
import { toast } from 'react-toastify';

function CodesSection() {
  // State
  const [codes, setCodes] = useState([
    {
      id: 'code-1',
      code: 'MASTER-DEMO123',
      type: 'master',
      teamName: 'Demo Team',
      courses: ['course-1', 'course-2', 'course-3', 'course-4'],
      used: false,
      usedBy: null,
      usedAt: null,
      createdAt: '2024-01-10T10:00:00Z',
      expiresAt: '2025-01-10T10:00:00Z'
    },
    {
      id: 'code-2',
      code: 'MASTER-ABC456',
      type: 'master',
      teamName: 'Brf Kastanjen',
      courses: ['course-1', 'course-2'],
      used: true,
      usedBy: 'Anna Lindberg',
      usedAt: '2024-01-15T14:30:00Z',
      createdAt: '2024-01-08T09:00:00Z',
      expiresAt: '2025-01-08T09:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, master, member
  const [filterStatus, setFilterStatus] = useState('all'); // all, used, unused
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  // Create code modal state
  const [newCode, setNewCode] = useState({
    type: 'master',
    teamName: '',
    courses: [],
    expiresAt: ''
  });

  // Functions
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Kod kopierad!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDeleteCode = (id) => {
    if (window.confirm('Är du säker på att du vill ta bort denna kod?')) {
      setCodes(codes.filter(c => c.id !== id));
      toast.success('Kod raderad');
    }
  };

  const handleCreateCode = () => {
    const code = `${newCode.type === 'master' ? 'MASTER' : 'MEMBER'}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const codeObj = {
      id: `code-${Date.now()}`,
      code,
      type: newCode.type,
      teamName: newCode.teamName,
      courses: newCode.courses,
      used: false,
      usedBy: null,
      usedAt: null,
      createdAt: new Date().toISOString(),
      expiresAt: newCode.expiresAt || null
    };

    setCodes([codeObj, ...codes]);
    setShowCreateModal(false);
    setNewCode({ type: 'master', teamName: '', courses: [], expiresAt: '' });
    toast.success(`Kod skapad: ${code}`);
  };

  const handleExport = () => {
    const csv = codes.map(c => 
      `${c.code},${c.type},${c.teamName},${c.used ? 'Använd' : 'Oanvänd'},${c.createdAt}`
    ).join('\n');
    
    const blob = new Blob([`Kod,Typ,Team,Status,Skapad\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `koder-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Koder exporterade!');
  };

  // Filter codes
  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.teamName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || code.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'used' && code.used) ||
                         (filterStatus === 'unused' && !code.used);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: codes.length,
    used: codes.filter(c => c.used).length,
    unused: codes.filter(c => !c.used).length,
    master: codes.filter(c => c.type === 'master').length
  };

  return (
    <div className="space-y-6">
      {/* Header med Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Totalt</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Använda</p>
              <p className="text-2xl font-bold text-green-600">{stats.used}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Oanvända</p>
              <p className="text-2xl font-bold text-orange-600">{stats.unused}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Master-koder</p>
              <p className="text-2xl font-bold text-purple-600">{stats.master}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Sök efter kod eller team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Alla typer</option>
            <option value="master">Master-koder</option>
            <option value="member">Member-koder</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Alla status</option>
            <option value="used">Använda</option>
            <option value="unused">Oanvända</option>
          </select>

          {/* Actions */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            <Download size={20} />
            <span className="hidden md:inline">Exportera</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Ny kod
          </button>
        </div>
      </div>

      {/* Codes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Kod
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Typ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Skapad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Används av
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Åtgärder
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCodes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    Inga koder hittades
                  </td>
                </tr>
              ) : (
                filteredCodes.map((code) => (
                  <motion.tr
                    key={code.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono font-bold text-slate-900">
                          {code.code}
                        </code>
                        <button
                          onClick={() => handleCopyCode(code.code)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          {copiedCode === code.code ? (
                            <Check size={16} className="text-green-600" />
                          ) : (
                            <Copy size={16} className="text-slate-400" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        code.type === 'master' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {code.type === 'master' ? 'Master' : 'Member'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {code.teamName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        code.used 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {code.used ? 'Använd' : 'Tillgänglig'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(code.createdAt).toLocaleDateString('sv-SE')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {code.usedBy || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteCode(code.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Code Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Skapa ny aktiverings kod
              </h3>

              <div className="space-y-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Typ av kod
                  </label>
                  <select
                    value={newCode.type}
                    onChange={(e) => setNewCode({ ...newCode, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="master">Master (Skapar nytt team)</option>
                    <option value="member">Member (Går med i team)</option>
                  </select>
                </div>

                {/* Team Name (only for master) */}
                {newCode.type === 'master' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Team namn
                    </label>
                    <input
                      type="text"
                      value={newCode.teamName}
                      onChange={(e) => setNewCode({ ...newCode, teamName: e.target.value })}
                      placeholder="Brf Kastanjen"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Expires At */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Utgångsdatum (valfritt)
                  </label>
                  <input
                    type="date"
                    value={newCode.expiresAt}
                    onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleCreateCode}
                  disabled={newCode.type === 'master' && !newCode.teamName}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Skapa kod
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CodesSection;