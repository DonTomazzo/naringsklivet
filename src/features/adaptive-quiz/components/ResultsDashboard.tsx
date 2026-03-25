import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { AdaptiveEngine } from '../services/adaptiveEngine';

export const ResultsDashboard: React.FC = () => {
  const { activeSession, currentQuiz, resetQuiz } = useQuiz();

  if (!activeSession || !currentQuiz || activeSession.status !== 'completed') {
    return null;
  }

  const summary = AdaptiveEngine.generateSessionSummary(
    activeSession.rounds,
    currentQuiz.questions
  );

  const getRoundEmoji = (roundNumber: number) => {
    switch (roundNumber) {
      case 1: return '1️⃣';
      case 2: return '2️⃣';
      case 3: return '3️⃣';
      default: return '🔢';
    }
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 80) return '⭐';
    if (score >= 70) return '✨';
    if (score >= 60) return '💫';
    return '🎯';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 20) return 'text-green-600';
    if (improvement > 0) return 'text-blue-600';
    if (improvement === 0) return 'text-gray-600';
    return 'text-orange-600';
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3">
            🎊 Grattis! 🎊
          </h1>
          <p className="text-2xl font-medium mb-2">
            Du har slutfört alla 3 omgångar!
          </p>
          <p className="text-lg opacity-90">
            {currentQuiz.title}
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
        <div className="text-center space-y-4">
          <div className="text-6xl">{getScoreEmoji(summary.finalScore)}</div>
          <div>
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {summary.finalScore}%
            </div>
            <p className="text-xl text-gray-700">Slutresultat</p>
          </div>

          {summary.improvement !== 0 && (
            <div className={`text-lg font-semibold ${getImprovementColor(summary.improvement)}`}>
              {summary.improvement > 0 ? '📈' : '📊'} {summary.improvement > 0 ? '+' : ''}{summary.improvement}% förbättring
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-2">{summary.recommendation.message}</p>
            <p className="text-lg font-medium text-purple-600">
              {summary.recommendation.encouragement}
            </p>
          </div>
        </div>
      </div>

      {/* Round-by-Round Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📊 Omgång för omgång
        </h2>

        <div className="space-y-4">
          {activeSession.rounds.map((round, index) => (
            <div
              key={round.roundNumber}
              className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRoundEmoji(round.roundNumber)}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Omgång {round.roundNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {round.attempts.length} frågor besvarade
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    {round.score}%
                  </div>
                </div>
              </div>

              {/* Progress visualization */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${round.score}%` }}
                />
              </div>

              <div className="flex gap-4 text-sm text-gray-700">
                <span>
                  ✅ {round.attempts.filter(a => a.correct).length} rätt
                </span>
                <span>
                  ❌ {round.attempts.filter(a => !a.correct).length} fel
                </span>
                {round.weakAreas.length > 0 && (
                  <span>
                    📌 Svaga områden: {round.weakAreas.slice(0, 2).join(', ')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Score Chart */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-4">Utvecklingskurva</h4>
          <div className="flex items-end justify-between gap-2 h-40">
            {summary.roundScores.map((score, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${score}%` }}
                />
                <div className="text-center">
                  <div className="font-bold text-gray-900">{score}%</div>
                  <div className="text-xs text-gray-600">Omg {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Areas Analysis */}
      {summary.weakAreas.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🎯 Områden att öva mer på
          </h2>
          <div className="space-y-3">
            {summary.weakAreas.slice(0, 5).map((area, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <span className="text-lg font-bold text-orange-600">
                  {index + 1}
                </span>
                <span className="text-gray-900 font-medium">{area}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            💡 Tips: Prata med din lärare om dessa områden för extra hjälp!
          </p>
        </div>
      )}

      {/* Time Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">⏱️ Tidsanalys</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(summary.timeAnalysis.average)}s
            </div>
            <div className="text-sm text-gray-600 mt-1">Genomsnitt/fråga</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(summary.timeAnalysis.fastest)}s
            </div>
            <div className="text-sm text-gray-600 mt-1">Snabbaste svar</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600">
              {Math.round(summary.timeAnalysis.slowest)}s
            </div>
            <div className="text-sm text-gray-600 mt-1">Långsammaste svar</div>
          </div>
        </div>
      </div>

      {/* Share Results (Future Feature) */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          📤 Dela ditt resultat
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Resultatet kommer automatiskt delas med dina föräldrar/lärare (kommer snart!)
        </p>
        <div className="flex gap-3">
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            📧 Skicka via email
          </button>
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            💾 Exportera PDF
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetQuiz}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
        >
          🏠 Tillbaka till start
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
        >
          🖨️ Skriv ut
        </button>
      </div>
    </div>
  );
};
