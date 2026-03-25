import { useState } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, AlertTriangle, DollarSign, PiggyBank, Sparkles, Info } from 'lucide-react';

const FeeCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(2000);
  const [years, setYears] = useState(30);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [lowFee, setLowFee] = useState(0.2);
  const [highFee, setHighFee] = useState(1.5);
  const [showComparison, setShowComparison] = useState('growth');

  // Beräkna slutvärde med avgifter
  const calculateFutureValue = (monthlyAmount, years, annualReturn, annualFee) => {
    const monthlyRate = (annualReturn - annualFee) / 100 / 12;
    const months = years * 12;
    
    if (monthlyRate === 0) {
      return monthlyAmount * months;
    }
    
    // Future Value of Annuity formula
    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  };

  // Generera data för grafen
  const generateChartData = () => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      const lowFeeValue = calculateFutureValue(monthlyInvestment, year, expectedReturn, lowFee);
      const highFeeValue = calculateFutureValue(monthlyInvestment, year, expectedReturn, highFee);
      const invested = monthlyInvestment * 12 * year;
      
      data.push({
        year,
        lowFee: Math.round(lowFeeValue),
        highFee: Math.round(highFeeValue),
        invested: invested,
        difference: Math.round(lowFeeValue - highFeeValue)
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const finalLowFee = calculateFutureValue(monthlyInvestment, years, expectedReturn, lowFee);
  const finalHighFee = calculateFutureValue(monthlyInvestment, years, expectedReturn, highFee);
  const totalInvested = monthlyInvestment * 12 * years;
  const difference = finalLowFee - finalHighFee;
  const differencePercent = (difference / finalLowFee) * 100;
  
  // Beräkna hur många år du jobbar för fondbolaget
  const yearsWorkingForFundCompany = (difference / (monthlyInvestment * 12)).toFixed(1);

  // Formatera stora tal
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formatera kort (ex: 1.2M)
  const formatShort = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M kr`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k kr`;
    }
    return `${value.toFixed(0)} kr`;
  };

  // Data för stapeldiagram
  const barChartData = [
    {
      name: 'Dina pengar',
      lowFee: finalLowFee - totalInvested,
      highFee: finalHighFee - totalInvested,
    },
    {
      name: 'Avgifter',
      lowFee: totalInvested * (lowFee / 100) * years,
      highFee: difference + (totalInvested * (lowFee / 100) * years),
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingDown className="w-10 h-10 text-red-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Den Tysta Dräparen
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Se hur avgifter tyst äter upp din förmögenhet över tid. Skillnaden kan bli miljoner.
          </p>
        </motion.div>

        {/* Shock Value Cards - Först! */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl shadow-2xl p-8 text-white">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 mx-auto mb-3 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Du förlorar {formatShort(difference)}
              </h2>
              <p className="text-xl opacity-90">
                på {(highFee - lowFee).toFixed(1)}% högre avgift under {years} år
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-1">
                  {yearsWorkingForFundCompany}
                </div>
                <div className="text-sm opacity-90">
                  år jobbar du gratis för fondbolaget
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-1">
                  {differencePercent.toFixed(0)}%
                </div>
                <div className="text-sm opacity-90">
                  av din slutliga förmögenhet försvinner
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-1">
                  {formatShort(difference / years)}
                </div>
                <div className="text-sm opacity-90">
                  kostar dig per år i genomsnitt
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Månadssparande */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Ditt månadssparande</h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-orange-500 mb-1">
                  {formatCurrency(monthlyInvestment)}
                </div>
                <div className="text-sm text-slate-600">per månad</div>
              </div>

              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-orange"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>500 kr</span>
                <span>10 000 kr</span>
              </div>
            </div>

            {/* Tidshorisont */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Tidshorisont</h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-orange-500 mb-1">
                  {years}
                </div>
                <div className="text-sm text-slate-600">år</div>
              </div>

              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-orange"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>5 år</span>
                <span>50 år</span>
              </div>
            </div>

            {/* Förväntad avkastning */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Förväntad avkastning</h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-orange-500 mb-1">
                  {expectedReturn}%
                </div>
                <div className="text-sm text-slate-600">per år (före avgifter)</div>
              </div>

              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-orange"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>3%</span>
                <span>12%</span>
              </div>
            </div>

            {/* Avgifter att jämföra */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Jämför avgifter</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-600">Låg avgift (ex: indexfond)</span>
                    <span className="text-2xl font-bold text-green-600">{lowFee}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={lowFee}
                    onChange={(e) => setLowFee(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-green"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-red-600">Hög avgift (ex: aktivfond)</span>
                    <span className="text-2xl font-bold text-red-600">{highFee}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={highFee}
                    onChange={(e) => setHighFee(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-red"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-600">
                  <strong>Avgiftsskillnad:</strong> {(highFee - lowFee).toFixed(2)}% per år
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-900">
                  <p className="font-semibold mb-1">Typiska avgifter:</p>
                  <p>• Indexfond: 0.05-0.3%</p>
                  <p>• Aktivt förvaltad fond: 1-2.5%</p>
                  <p>• Rabatt vid IPS/KF: 0.2-0.5% lägre</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts and Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Comparison Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Låg avgift ({lowFee}%)</h3>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {formatShort(finalLowFee)}
                </div>
                <div className="text-sm opacity-90">
                  Efter {years} år
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs opacity-80">Avkastning:</div>
                  <div className="text-xl font-bold">
                    {formatShort(finalLowFee - totalInvested)}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-xl p-6 text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Hög avgift ({highFee}%)</h3>
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {formatShort(finalHighFee)}
                </div>
                <div className="text-sm opacity-90">
                  Efter {years} år
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs opacity-80">Avkastning:</div>
                  <div className="text-xl font-bold">
                    {formatShort(finalHighFee - totalInvested)}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chart Type Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowComparison('growth')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    showComparison === 'growth'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  📈 Tillväxt över tid
                </button>
                <button
                  onClick={() => setShowComparison('difference')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    showComparison === 'difference'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  💸 Förlorad vinst
                </button>
                <button
                  onClick={() => setShowComparison('breakdown')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    showComparison === 'breakdown'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🔍 Uppdelning
                </button>
              </div>
            </div>

            {/* Main Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <AnimatePresence mode="wait">
                {showComparison === 'growth' && (
                  <motion.div
                    key="growth"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-bold text-slate-800 mb-6">
                      Hur din förmögenhet växer över tid
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="lowFeeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="highFeeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'År', position: 'insideBottom', offset: -5 }}
                          stroke="#64748b"
                        />
                        <YAxis 
                          label={{ value: 'Värde (kr)', angle: -90, position: 'insideLeft' }}
                          stroke="#64748b"
                          tickFormatter={(value) => formatShort(value)}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value)}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="invested"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          fill="url(#investedGradient)"
                          name="Insatt kapital"
                        />
                        <Area
                          type="monotone"
                          dataKey="highFee"
                          stroke="#ef4444"
                          strokeWidth={3}
                          fill="url(#highFeeGradient)"
                          name={`Hög avgift (${highFee}%)`}
                        />
                        <Area
                          type="monotone"
                          dataKey="lowFee"
                          stroke="#22c55e"
                          strokeWidth={3}
                          fill="url(#lowFeeGradient)"
                          name={`Låg avgift (${lowFee}%)`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {showComparison === 'difference' && (
                  <motion.div
                    key="difference"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-bold text-slate-800 mb-6">
                      Pengar som försvinner till avgifter
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="differenceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.3}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'År', position: 'insideBottom', offset: -5 }}
                          stroke="#64748b"
                        />
                        <YAxis 
                          label={{ value: 'Förlorade pengar (kr)', angle: -90, position: 'insideLeft' }}
                          stroke="#64748b"
                          tickFormatter={(value) => formatShort(value)}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value)}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="difference"
                          stroke="#ef4444"
                          strokeWidth={3}
                          fill="url(#differenceGradient)"
                          name="Pengar du förlorar på högre avgift"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {showComparison === 'breakdown' && (
                  <motion.div
                    key="breakdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-bold text-slate-800 mb-6">
                      Vart går pengarna?
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis 
                          stroke="#64748b"
                          tickFormatter={(value) => formatShort(value)}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value)}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="lowFee" 
                          fill="#22c55e" 
                          name={`Låg avgift (${lowFee}%)`}
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar 
                          dataKey="highFee" 
                          fill="#ef4444" 
                          name={`Hög avgift (${highFee}%)`}
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Vad betyder detta för dig?
              </h3>
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  💰 Du sparar <strong>{formatCurrency(monthlyInvestment)}/månad</strong> i {years} år 
                  = <strong>{formatCurrency(totalInvested)}</strong> totalt insatt.
                </p>
                <p>
                  📊 Med {lowFee}% avgift får du tillbaka <strong className="text-green-700">{formatCurrency(finalLowFee)}</strong>
                </p>
                <p>
                  📉 Med {highFee}% avgift får du tillbaka <strong className="text-red-700">{formatCurrency(finalHighFee)}</strong>
                </p>
                <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg mt-4">
                  <p className="font-bold text-red-900 text-base">
                    🚨 Skillnaden på {(highFee - lowFee).toFixed(1)}% i avgift kostar dig {formatCurrency(difference)}!
                  </p>
                  <p className="mt-2 text-red-800">
                    Det motsvarar <strong>{yearsWorkingForFundCompany} år</strong> av ditt månadssparande 
                    som går direkt till fondbolaget istället för till din egen ficka.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-orange-200">
                  <p className="text-xs text-slate-600">
                    💡 <strong>Tips:</strong> Leta efter indexfonder eller ETF:er med avgifter under 0.5%. 
                    Över tid kan du spara hundratusentals kronor, eller till och med miljoner.
                  </p>
                </div>
              </div>
            </div>
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
        }

        .slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-green::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          border: none;
        }

        .slider-red::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-red::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default FeeCalculator;
