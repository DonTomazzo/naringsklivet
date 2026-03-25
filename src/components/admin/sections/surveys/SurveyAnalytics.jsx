import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '../../../../contexts/MockSurveyContext';
import {
  X, Download, Filter, Calendar, Users,
  TrendingUp, Clock, BarChart3, PieChart, List
} from 'lucide-react';
import {
  PieChart as RechartsPie, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line
} from 'recharts';

const COLORS = ['#FF5421', '#0c5370', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

function SurveyAnalytics({ survey, onClose }) {
  const { getSurveyResponses } = useSurvey();
  const [dateFilter, setDateFilter] = useState('all');

  const responses = getSurveyResponses(survey.id);

  // Filter responses by date
  const filteredResponses = useMemo(() => {
    if (dateFilter === 'all') return responses;

    const now = new Date();
    const filterDate = new Date();

    switch (dateFilter) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return responses;
    }

    return responses.filter(r => new Date(r.completedAt) >= filterDate);
  }, [responses, dateFilter]);

  // Calculate overall stats
  const stats = useMemo(() => {
    if (filteredResponses.length === 0) {
      return {
        totalResponses: 0,
        avgTime: 0,
        completionRate: 0,
        responsesByDay: []
      };
    }

    const totalTime = filteredResponses.reduce((sum, r) => sum + (r.timeTakenSeconds || 0), 0);
    const avgTime = Math.round(totalTime / filteredResponses.length);

    // Group responses by day
    const responsesByDay = {};
    filteredResponses.forEach(r => {
      const date = new Date(r.completedAt).toLocaleDateString('sv-SE');
      responsesByDay[date] = (responsesByDay[date] || 0) + 1;
    });

    const responsesByDayArray = Object.entries(responsesByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      totalResponses: filteredResponses.length,
      avgTime,
      completionRate: 100,
      responsesByDay: responsesByDayArray
    };
  }, [filteredResponses]);

  // Analyze question
  const analyzeQuestion = (question) => {
    const answers = filteredResponses.map(r => r.answers[question.id]).filter(Boolean);

    switch (question.type) {
      case 'single-choice':
      case 'multiple-choice':
        return analyzeChoiceQuestion(question, answers);
      case 'likert':
        return analyzeLikertQuestion(question, answers);
      case 'text-input':
        return analyzeTextQuestion(question, answers);
      case 'sorting':
        return analyzeSortingQuestion(question, answers);
      default:
        return null;
    }
  };

  const analyzeChoiceQuestion = (question, answers) => {
    const answerCounts = {};

    answers.forEach(answer => {
      if (Array.isArray(answer)) {
        answer.forEach(choice => {
          answerCounts[choice] = (answerCounts[choice] || 0) + 1;
        });
      } else {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
      }
    });

    const data = Object.entries(answerCounts).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / answers.length) * 100)
    }));

    return { type: 'choice', data };
  };

  const analyzeLikertQuestion = (question, answers) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

    answers.forEach(answer => {
      const value = parseInt(answer);
      if (value >= 1 && value <= 7) {
        distribution[value]++;
      }
    });

    const total = answers.length;
    const sum = answers.reduce((acc, val) => acc + parseInt(val), 0);
    const average = (sum / total).toFixed(2);

    const data = Object.entries(distribution).map(([score, count]) => ({
      score: parseInt(score),
      count,
      percentage: Math.round((count / total) * 100)
    }));

    return { type: 'likert', data, average, total };
  };

  const analyzeTextQuestion = (question, answers) => {
    const words = {};
    answers.forEach(answer => {
      const text = answer.toLowerCase();
      const wordList = text.split(/\s+/).filter(w => w.length > 3);
      wordList.forEach(word => {
        words[word] = (words[word] || 0) + 1;
      });
    });

    const topWords = Object.entries(words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    return { type: 'text', answers, topWords };
  };

  const analyzeSortingQuestion = (question, answers) => {
    const positionCounts = {};

    question.items.forEach(item => {
      positionCounts[item.id] = { name: item.name, positions: Array(question.items.length).fill(0) };
    });

    answers.forEach(answer => {
      if (Array.isArray(answer)) {
        answer.forEach((itemId, position) => {
          if (positionCounts[itemId]) {
            positionCounts[itemId].positions[position]++;
          }
        });
      }
    });

    const avgPositions = Object.entries(positionCounts).map(([id, data]) => {
      const totalPositions = data.positions.reduce((sum, count, pos) => sum + (count * pos), 0);
      const totalCount = data.positions.reduce((sum, count) => sum + count, 0);
      const avgPosition = totalCount > 0 ? totalPositions / totalCount : 0;

      return {
        id,
        name: data.name,
        avgPosition: avgPosition.toFixed(2),
        positions: data.positions
      };
    }).sort((a, b) => parseFloat(a.avgPosition) - parseFloat(b.avgPosition));

    return { type: 'sorting', data: avgPositions };
  };

  const handleExport = () => {
    const data = {
      survey: survey.title,
      responses: filteredResponses.length,
      avgTime: stats.avgTime,
      questions: survey.questions.map(q => ({
        question: q.text,
        type: q.type,
        analysis: analyzeQuestion(q)
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${survey.slug}-analytics.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{survey.title}</h2>
                <p className="text-purple-100">Analys & Statistik</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
              >
                <option value="all" className="text-slate-900">Alla svar</option>
                <option value="today" className="text-slate-900">Idag</option>
                <option value="week" className="text-slate-900">Senaste veckan</option>
                <option value="month" className="text-slate-900">Senaste månaden</option>
              </select>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur border border-white/30 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Download size={18} />
                Exportera
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredResponses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <BarChart3 className="text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Inga svar än</h3>
                <p className="text-slate-600">Det finns inga svar att analysera för denna enkät.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-blue-500" size={20} />
                      <span className="text-sm text-blue-700 font-medium">Totalt svar</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">{stats.totalResponses}</div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="text-purple-500" size={20} />
                      <span className="text-sm text-purple-700 font-medium">Snitt-tid</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">
                      {Math.floor(stats.avgTime / 60)}m {stats.avgTime % 60}s
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="text-green-500" size={20} />
                      <span className="text-sm text-green-700 font-medium">Completion</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900">{stats.completionRate}%</div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="text-orange-500" size={20} />
                      <span className="text-sm text-orange-700 font-medium">Frågor</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-900">{survey.questions.length}</div>
                  </div>
                </div>

                {/* Response Timeline */}
                {stats.responsesByDay.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Svar över tid</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={stats.responsesByDay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#FF5421" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Question Analysis */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Frågeanalys</h2>
                  
                  {survey.questions.map((question, index) => {
                    const analysis = analyzeQuestion(question);
                    if (!analysis) return null;

                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl border border-gray-200 p-6"
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-slate-900">{question.text}</h3>
                          <p className="text-sm text-slate-500">{question.type} • {filteredResponses.length} svar</p>
                        </div>

                        {analysis.type === 'choice' && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <ResponsiveContainer width="100%" height={300}>
                                <RechartsPie>
                                  <Pie
                                    data={analysis.data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {analysis.data.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </RechartsPie>
                              </ResponsiveContainer>
                            </div>
                            <div>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analysis.data}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#FF5421" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}

                        {analysis.type === 'likert' && (
                          <div>
                            <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                              <div className="text-sm text-slate-600">Genomsnittligt betyg</div>
                              <div className="text-4xl font-bold text-orange-600">{analysis.average} / 7</div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={analysis.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="score" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#0c5370" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {analysis.type === 'text' && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-2">Top 10 ord</h4>
                              <div className="flex flex-wrap gap-2">
                                {analysis.topWords.map((item, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                    style={{ fontSize: `${12 + item.count * 2}px` }}
                                  >
                                    {item.word} ({item.count})
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-2">Alla svar ({analysis.answers.length})</h4>
                              <div className="space-y-2 max-h-60 overflow-y-auto">
                                {analysis.answers.slice(0, 10).map((answer, i) => (
                                  <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-slate-700">
                                    "{answer}"
                                  </div>
                                ))}
                                {analysis.answers.length > 10 && (
                                  <div className="text-sm text-slate-500 text-center py-2">
                                    ...och {analysis.answers.length - 10} fler svar
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {analysis.type === 'sorting' && (
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-4">Genomsnittlig rangordning</h4>
                            <div className="space-y-3">
                              {analysis.data.map((item, index) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-slate-900">{item.name}</div>
                                    <div className="text-sm text-slate-500">Snitt position: {item.avgPosition}</div>
                                  </div>
                                  <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-orange-500 h-2 rounded-full"
                                      style={{ width: `${100 - (parseFloat(item.avgPosition) / analysis.data.length) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SurveyAnalytics;