import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, BookOpen, Plus, Trash2, Check, Search, Calendar
} from 'lucide-react';

function TeamCoursesModal({ team, onClose, onSave }) {
  // Available courses (skulle komma från context/API)
  const allCourses = [
    { id: 'course-1', title: 'Diskriminering', category: 'Compliance', duration: '45 min' },
    { id: 'course-2', title: 'Föreningens intressenter', category: 'Organisation', duration: '30 min' },
    { id: 'course-3', title: 'Arbetsmiljö', category: 'Säkerhet', duration: '60 min' },
    { id: 'course-4', title: 'GDPR Grundkurs', category: 'Compliance', duration: '90 min' },
    { id: 'course-5', title: 'Ledarskap', category: 'Personal', duration: '120 min' },
    { id: 'course-6', title: 'Konflikhantering', category: 'Personal', duration: '45 min' },
    { id: 'course-7', title: 'Brandskydd', category: 'Säkerhet', duration: '30 min' },
    { id: 'course-8', title: 'Första hjälpen', category: 'Säkerhet', duration: '45 min' }
  ];

  const [assignedCourses, setAssignedCourses] = useState(
    team.assignedCourses || []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [saving, setSaving] = useState(false);

  const categories = ['all', ...new Set(allCourses.map(c => c.category))];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCourse = (courseId) => {
    setAssignedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(team.id, assignedCourses);
      setSaving(false);
    }, 1000);
  };

  const assignedCoursesData = allCourses.filter(c => assignedCourses.includes(c.id));
  const availableCoursesData = allCourses.filter(c => !assignedCourses.includes(c.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Hantera kurser</h2>
                <p className="text-orange-100 mt-1">För teamet: {team.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                <span className="font-semibold">{assignedCourses.length}</span> tilldelade kurser
              </div>
              <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                <span className="font-semibold">{availableCoursesData.length}</span> tillgängliga
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök kurser..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Alla' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Content - Two Columns */}
          <div className="grid grid-cols-2 divide-x divide-gray-200 overflow-hidden">
            {/* Available Courses */}
            <div className="overflow-y-auto max-h-[50vh]">
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Plus size={18} />
                  Tillgängliga kurser ({filteredCourses.filter(c => !assignedCourses.includes(c.id)).length})
                </h3>
                <div className="space-y-2">
                  {filteredCourses
                    .filter(course => !assignedCourses.includes(course.id))
                    .map(course => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer group"
                        onClick={() => toggleCourse(course.id)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 group-hover:text-orange-700">
                              {course.title}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span className="px-2 py-0.5 bg-gray-100 rounded">
                                {course.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {course.duration}
                              </span>
                            </div>
                          </div>
                          <button
                            className="p-1.5 rounded-lg bg-orange-100 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Lägg till kurs"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {filteredCourses.filter(c => !assignedCourses.includes(c.id)).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <BookOpen className="mx-auto mb-2 text-slate-300" size={32} />
                      <p className="text-sm">Inga tillgängliga kurser</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Assigned Courses */}
            <div className="overflow-y-auto max-h-[50vh] bg-gray-50">
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Tilldelade kurser ({assignedCoursesData.length})
                </h3>
                <div className="space-y-2">
                  {assignedCoursesData.map(course => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-white border-2 border-green-200 rounded-lg hover:border-red-300 transition-all cursor-pointer group"
                      onClick={() => toggleCourse(course.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 flex items-center gap-2">
                            <Check size={14} className="text-green-600" />
                            {course.title}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span className="px-2 py-0.5 bg-gray-100 rounded">
                              {course.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        <button
                          className="p-1.5 rounded-lg bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Ta bort kurs"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {assignedCoursesData.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <BookOpen className="mx-auto mb-2 text-slate-300" size={32} />
                      <p className="text-sm">Inga kurser tilldelade</p>
                      <p className="text-xs mt-1">Klicka på en kurs till vänster för att lägga till</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
            <div className="text-sm text-slate-600">
              {assignedCourses.length !== (team.assignedCourses?.length || 0) && (
                <span className="text-orange-600 font-medium">
                  Osparade ändringar
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={saving}
                className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors font-medium"
              >
                Avbryt
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sparar...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Spara ändringar
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TeamCoursesModal;