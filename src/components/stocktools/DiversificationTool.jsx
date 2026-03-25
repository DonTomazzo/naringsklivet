import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, AlertCircle, PieChart, Globe, Building2 } from 'lucide-react';

// Realistiska korrelationsdata baserade på historiska marknadsdata
const MARKET_PROFILES = {
  'single-market-single-sector': {
    name: 'Samma marknad & bransch',
    correlation: 0.85,
    description: 'T.ex. endast svenska bankaktier',
    icon: '🏦',
    color: '#ef4444'
  },
  'single-market-multi-sector': {
    name: 'Samma marknad, olika branscher',
    correlation: 0.65,
    description: 'T.ex. svenska aktier (bank, tech, industri)',
    icon: '🇸🇪',
    color: '#f97316'
  },
  'nordic-markets': {
    name: 'Nordiska marknader',
    correlation: 0.55,
    description: 'Sverige, Norge, Danmark, Finland',
    icon: '⚔️',
    color: '#eab308'
  },
  'developed-markets': {
    name: 'Utvecklade marknader',
    correlation: 0.45,
    description: 'USA, Europa, Japan, Australien',
    icon: '🌍',
    color: '#84cc16'
  },
  'global-diversified': {
    name: 'Global diversifiering',
    correlation: 0.35,
    description: 'Utvecklade + tillväxtmarknader',
    icon: '🌐',
    color: '#22c55e'
  },
  'multi-asset-global': {
    name: 'Multi-asset global',
    correlation: 0.20,
    description: 'Aktier, obligationer, råvaror, fastigheter',
    icon: '💎',
    color: '#10b981'
  }
};

const DiversificationRiskToolV2 = () => {
  const [numberOfStocks, setNumberOfStocks] = useState(10);
  const [selectedProfile, setSelectedProfile] = useState('developed-markets');
  const [showComparison, setShowComparison] = useState(false);

  const currentProfile = MARKET_PROFILES[selectedProfile];
  const correlationLevel = currentProfile.correlation;
  const individualStockRisk = 25; // Genomsnittlig aktievolatilitet

  // Beräkna portföljrisk med realistisk modell
  const calculatePortfolioRisk = (n, correlation, stockRisk) => {
    // Modern Portfolio Theory formula
    // σp = √[(1/n)σ² + ((n-1)/n)ρσ²]
    const variance = stockRisk * stockRisk;
    const portfolioVariance = (1/n) * variance + ((n-1)/n) * correlation * variance;
    return Math.sqrt(portfolioVariance);
  };

  // Generera data för huvudgrafen
  const generateChartData = () => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      const portfolioRisk = calculatePortfolioRisk(i, correlationLevel, individualStockRisk);
      const systematicRisk = Math.sqrt(correlationLevel * individualStockRisk * individualStockRisk);
      
      data.push({
        stocks: i,
        totalRisk: portfolioRisk,
        systematicRisk: systematicRisk,
        unsystematicRisk: Math.max(0, portfolioRisk - systematicRisk)
      });
    }
    return data;
  };

  // Generera jämförelsedata för olika profiler
  const generateComparisonData = () => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      const dataPoint = { stocks: i };
      
      Object.keys(MARKET_PROFILES).forEach(profileKey => {
        const profile = MARKET_PROFILES[profileKey];
        const risk = calculatePortfolioRisk(i, profile.correlation, individualStockRisk);
        dataPoint[profileKey] = risk;
      });
      
      data.push(dataPoint);
    }
    return data;
  };

  const chartData = showComparison ? generateComparisonData() : generateChartData();
  const currentRisk = calculatePortfolioRisk(numberOfStocks, correlationLevel, individualStockRisk);
  const systematicRisk = Math.sqrt(correlationLevel * individualStockRisk * individualStockRisk);
  const unsystematicRisk = Math.max(0, currentRisk - systematicRisk);
  const riskReduction = ((individualStockRisk - currentRisk) / individualStockRisk * 100);

  // Beräkna "sweet spot" - antal aktier för 90% av maximal diversifiering
  const calculateSweetSpot = () => {
    const maxReduction = individualStockRisk - systematicRisk;
    const targetReduction = maxReduction * 0.9;
    
    for (let i = 1; i <= 50; i++) {
      const risk = calculatePortfolioRisk(i, correlationLevel, individualStockRisk);
      const reduction = individualStockRisk - risk;
      if (reduction >= targetReduction) return i;
    }
    return 20;
  };

  const sweetSpot = calculateSweetSpot();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PieChart className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Diversifieringsverktyg
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600">
            Se hur marknad och branschval påverkar din portföljrisk
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Controls Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Antal innehav */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Antal innehav</h2>
              
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  {numberOfStocks}
                </div>
                <div className="text-sm text-slate-600">
                  {numberOfStocks === 1 ? 'aktie' : 'aktier'} i portföljen
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={numberOfStocks}
                onChange={(e) => setNumberOfStocks(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-orange"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>1</span>
                <span className="text-orange-600 font-semibold">
                  ⭐ {sweetSpot}
                </span>
                <span>50</span>
              </div>
              <div className="text-xs text-center text-slate-500 mt-2">
                ⭐ = Sweet spot för denna profil
              </div>
            </div>

            {/* Marknads/Branschprofil */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Diversifieringsprofil</h2>
              
              <div className="space-y-2">
                {Object.entries(MARKET_PROFILES).map(([key, profile]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProfile(key)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedProfile === key
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{profile.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 text-sm mb-1">
                          {profile.name}
                        </div>
                        <div className="text-xs text-slate-600 leading-tight">
                          {profile.description}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="text-xs font-medium text-slate-500">
                            Korrelation:
                          </div>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${profile.correlation * 100}%`,
                                backgroundColor: profile.color
                              }}
                            />
                          </div>
                          <div className="text-xs font-bold" style={{ color: profile.color }}>
                            {(profile.correlation * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Jämförelseknapp */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowComparison(!showComparison)}
              className={`w-full p-4 rounded-xl font-semibold transition-all ${
                showComparison
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200'
              }`}
            >
              {showComparison ? '📊 Visa vald profil' : '🔄 Jämför alla profiler'}
            </motion.button>
          </motion.div>

          {/* Chart and Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Cards */}
            {!showComparison && (
              <div className="grid sm:grid-cols-3 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Total Risk</span>
                    <TrendingDown className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">
                    {currentRisk.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Portföljvolatilitet
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Systematisk Risk</span>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">
                    {systematicRisk.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Marknadsrisk (ej diversifierbar)
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Riskreduktion</span>
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">
                    {riskReduction.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Jämfört med 1 aktie
                  </div>
                </motion.div>
              </div>
            )}

            {/* Main Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">
                {showComparison 
                  ? '🔄 Jämförelse: Olika diversifieringsprofiler'
                  : `${currentProfile.icon} ${currentProfile.name}`
                }
              </h3>
              
              <ResponsiveContainer width="100%" height={400}>
                {showComparison ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="stocks" 
                      label={{ value: 'Antal aktier', position: 'insideBottom', offset: -5 }}
                      stroke="#64748b"
                    />
                    <YAxis 
                      label={{ value: 'Risk (%)', angle: -90, position: 'insideLeft' }}
                      stroke="#64748b"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value) => `${value.toFixed(2)}%`}
                    />
                    <Legend />
                    {Object.entries(MARKET_PROFILES).map(([key, profile]) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={profile.color}
                        strokeWidth={selectedProfile === key ? 3 : 2}
                        dot={false}
                        name={profile.name}
                        opacity={selectedProfile === key ? 1 : 0.4}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="totalRiskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5421" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF5421" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="systematicRiskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="stocks" 
                      label={{ value: 'Antal aktier i portföljen', position: 'insideBottom', offset: -5 }}
                      stroke="#64748b"
                    />
                    <YAxis 
                      label={{ value: 'Risk (volatilitet %)', angle: -90, position: 'insideLeft' }}
                      stroke="#64748b"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value) => `${value.toFixed(2)}%`}
                    />
                    <ReferenceLine 
                      x={numberOfStocks} 
                      stroke="#FF5421" 
                      strokeDasharray="3 3"
                      strokeWidth={2}
                      label={{ value: 'Du är här', position: 'top', fill: '#FF5421', fontWeight: 'bold' }}
                    />
                    <ReferenceLine 
                      x={sweetSpot} 
                      stroke="#eab308" 
                      strokeDasharray="5 5"
                      strokeWidth={1}
                      label={{ value: '⭐ Sweet spot', position: 'top', fill: '#eab308' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="systematicRisk"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fill="url(#systematicRiskGradient)"
                      name="Systematisk risk"
                    />
                    <Area
                      type="monotone"
                      dataKey="totalRisk"
                      stroke="#FF5421"
                      strokeWidth={3}
                      fill="url(#totalRiskGradient)"
                      name="Total risk"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Insights */}
            {!showComparison && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  💡 Analys för din portfölj
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  {numberOfStocks === 1 && (
                    <p className="font-medium text-orange-700">
                      ⚠️ Med endast 1 aktie är du helt exponerad mot bolagsspecifik risk ({individualStockRisk}% volatilitet).
                      Redan med {sweetSpot} aktier i {currentProfile.name.toLowerCase()} skulle du reducera risken till {calculatePortfolioRisk(sweetSpot, correlationLevel, individualStockRisk).toFixed(1)}%.
                    </p>
                  )}
                  
                  {numberOfStocks > 1 && numberOfStocks < sweetSpot && (
                    <>
                      <p>
                        📊 <strong>Nuvarande risk:</strong> {currentRisk.toFixed(1)}% (reducerat med {riskReduction.toFixed(0)}% från att ha endast 1 aktie)
                      </p>
                      <p>
                        🎯 <strong>Rekommendation:</strong> Öka till {sweetSpot} aktier för att nå "sweet spot" där du fångar 90% av diversifieringsfördelarna.
                        Det skulle ge dig en risk på {calculatePortfolioRisk(sweetSpot, correlationLevel, individualStockRisk).toFixed(1)}%.
                      </p>
                    </>
                  )}

                  {numberOfStocks >= sweetSpot && numberOfStocks < 30 && (
                    <>
                      <p>
                        ✅ <strong>Bra diversifiering!</strong> Du har nått eller passerat sweet spot ({sweetSpot} aktier) för denna profil.
                      </p>
                      <p>
                        📈 Din portfölj har {currentRisk.toFixed(1)}% total risk, varav {systematicRisk.toFixed(1)}% är marknadsrisk som inte kan diversifieras bort.
                      </p>
                    </>
                  )}

                  {numberOfStocks >= 30 && (
                    <>
                      <p>
                        🎯 <strong>Utmärkt diversifiering!</strong> Ytterligare innehav ger minimal ytterligare riskreduktion.
                      </p>
                      <p>
                        Du ligger nu mycket nära den teoretiska miniminivån för systematisk risk ({systematicRisk.toFixed(1)}%).
                      </p>
                    </>
                  )}

                  <div className="pt-3 mt-3 border-t border-orange-200">
                    <p className="text-xs text-slate-600">
                      <strong>Förklaring:</strong> Med profilen "{currentProfile.name}" har dina innehav en genomsnittlig korrelation på {(correlationLevel * 100).toFixed(0)}%.
                      {correlationLevel > 0.7 && ' Hög korrelation innebär att diversifieringseffekten blir begränsad.'}
                      {correlationLevel < 0.4 && ' Låg korrelation ger kraftfull diversifieringseffekt.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Insights */}
            {showComparison && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  🔍 Jämförelse av diversifieringsstrategier
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <p>
                    Grafen visar hur olika diversifieringsstrategier påverkar risken med {numberOfStocks} innehav:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {Object.entries(MARKET_PROFILES).map(([key, profile]) => {
                      const risk = calculatePortfolioRisk(numberOfStocks, profile.correlation, individualStockRisk);
                      return (
                        <div 
                          key={key}
                          className={`p-3 rounded-lg border-2 ${
                            selectedProfile === key 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span>{profile.icon}</span>
                            <span className="font-semibold text-xs">{profile.name}</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: profile.color }}>
                            {risk.toFixed(1)}%
                          </div>
                          <div className="text-xs text-slate-500">
                            risk med {numberOfStocks} aktier
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="pt-3 mt-3 border-t border-blue-200 text-xs text-slate-600">
                    💡 <strong>Insikt:</strong> Profilen du väljer har större påverkan på risk än antalet innehav när du väl har 15-20 aktier.
                    Att sprida sig över marknader och tillgångsslag ger bättre diversifiering än bara fler aktier inom samma marknad.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FF5421;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: all 0.2s;
        }
        
        .slider-orange::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FF5421;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          transition: all 0.2s;
        }

        .slider-orange::-webkit-slider-thumb:hover {
          background: #E64A1E;
          transform: scale(1.15);
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        }

        .slider-orange::-moz-range-thumb:hover {
          background: #E64A1E;
          transform: scale(1.15);
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};

export default DiversificationRiskToolV2;
