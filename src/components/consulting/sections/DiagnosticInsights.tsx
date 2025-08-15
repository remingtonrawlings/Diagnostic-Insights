import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Target, Shield, BarChart2, Zap, TrendingUp, HelpCircle } from 'lucide-react';
import { diagnosticData, AssessmentCategory, FocusArea, RecommendedAction } from '../../../data/diagnosticData';

const valueMap = {
  'High': 3,
  'Medium': 2,
  'Low': 1
};

// --- SCORING LOGIC ---
const calculateActionMaturityScore = (action: RecommendedAction): number => {
  const priorityScore = valueMap[action.priority];
  const severityScore = valueMap[action.severity];
  const complexityScore = valueMap[action.complexity];
  const totalScore = priorityScore + severityScore + complexityScore;
  const maturityScore = 10 - totalScore;
  return Math.max(maturityScore, 1);
};

const calculateFocusAreaScore = (focusArea: FocusArea): number => {
    if (!focusArea.recommendedActions || focusArea.recommendedActions.length === 0) return 10;
    const actionScores = focusArea.recommendedActions.map(calculateActionMaturityScore);
    const average = actionScores.reduce((sum, score) => sum + score, 0) / actionScores.length;
    return parseFloat(average.toFixed(1));
};

const calculateCategoryScore = (category: AssessmentCategory): number => {
    if (!category.focusAreas || category.focusAreas.length === 0) return 10;
    const focusAreaScores = category.focusAreas.map(calculateFocusAreaScore);
    const average = focusAreaScores.reduce((sum, score) => sum + score, 0) / focusAreaScores.length;
    return parseFloat(average.toFixed(1));
};

const calculateOverallScore = (data: AssessmentCategory[]): number => {
    if (!data || data.length === 0) return 10;
    const categoryScores = data.map(calculateCategoryScore);
    const average = categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length;
    return parseFloat(average.toFixed(1));
};

// --- STYLING & UI HELPERS ---
const getMaturityColor = (score: number, type: 'bg' | 'text' | 'border' | 'full') => {
  if (score <= 2.9) { // Initial
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', full: 'bg-red-500' }[type];
  }
  if (score <= 4.9) { // Developing
    return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', full: 'bg-orange-500' }[type];
  }
  if (score <= 6.9) { // Defined
    return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', full: 'bg-yellow-500' }[type];
  }
  if (score <= 8.9) { // Managed
    return { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-300', full: 'bg-lime-500' }[type];
  }
  return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', full: 'bg-green-500' }[type]; // Optimized
};

const getMaturityStage = (score: number): { name: string; description: string } => {
    if (score <= 2.9) return { name: 'Initial', description: 'Processes are ad-hoc, chaotic, and reactive.' };
    if (score <= 4.9) return { name: 'Developing', description: 'Some processes are defined but are not consistently followed.' };
    if (score <= 6.9) return { name: 'Defined', description: 'Processes are standardized, documented, and proactive.' };
    if (score <= 8.9) return { name: 'Managed', description: 'Performance is measured and managed quantitatively.' };
    return { name: 'Optimized', description: 'Focused on continuous process improvement and optimization.' };
};

// --- SUB-COMPONENTS ---
const MaturityScoreIndicator: React.FC<{ score: number; size?: 'small' | 'large' }> = ({ score, size = 'large' }) => (
  <div className={`flex items-center justify-center rounded-full ${getMaturityColor(score, 'bg')} ${size === 'large' ? 'w-20 h-20' : 'w-16 h-16'}`}>
    <div className="text-center">
      <div className={`font-bold ${getMaturityColor(score, 'text')} ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
        {score.toFixed(1)}
        <span className="text-sm">/10</span>
      </div>
      <div className={`text-xs font-medium ${getMaturityColor(score, 'text')}`}>Maturity</div>
    </div>
  </div>
);

const RecommendedActionCard: React.FC<{ action: RecommendedAction }> = ({ action }) => {
  const score = calculateActionMaturityScore(action);
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-6">
      <div className="flex-shrink-0">
        <MaturityScoreIndicator score={score} />
      </div>
      <div className="flex-1">
        <h5 className="font-semibold text-gray-900 mb-2">{action.title}</h5>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">Priority: {action.priority}</span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">Severity: {action.severity}</span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">Complexity: {action.complexity}</span>
        </div>
      </div>
    </div>
  );
};

const FocusAreaCard: React.FC<{ area: FocusArea }> = ({ area }) => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{area.title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <h5 className="font-medium text-gray-700 mb-2 flex items-center"><Target size={16} className="mr-2 text-blue-500" /> Benchmarks</h5>
                <ul className="space-y-2">
                    {area.benchmarks.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600"><Shield size={14} className="mr-2 mt-0.5 text-blue-400 flex-shrink-0" /><span>{item}</span></li>
                    ))}
                </ul>
            </div>
            <div>
                <h5 className="font-medium text-gray-700 mb-2 flex items-center"><AlertTriangle size={16} className="mr-2 text-orange-500" /> Key Insights</h5>
                <ul className="space-y-2">
                    {area.insights.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600"><Zap size={14} className="mr-2 mt-0.5 text-orange-400 flex-shrink-0" /><span>{item}</span></li>
                    ))}
                </ul>
            </div>
        </div>
        <div>
            <h5 className="font-medium text-gray-700 mb-3 flex items-center"><CheckCircle size={16} className="mr-2 text-green-500" /> Recommended Actions</h5>
            <div className="space-y-4">
                {area.recommendedActions.map(action => <RecommendedActionCard key={action.id} action={action} />)}
            </div>
        </div>
    </div>
);

const MaturityMatrix: React.FC<{ score: number }> = ({ score }) => {
    const stages = [
        { name: 'Initial', threshold: 2.9 },
        { name: 'Developing', threshold: 4.9 },
        { name: 'Defined', threshold: 6.9 },
        { name: 'Managed', threshold: 8.9 },
        { name: 'Optimized', threshold: 10 },
    ];
    const { name: currentStage, description } = getMaturityStage(score);
    const scorePercentage = (score / 10) * 100;

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pipeline Creation Maturity Matrix</h3>
            <p className="text-sm text-gray-600 mb-6">This matrix shows your current operational maturity based on our diagnostic assessment.</p>
            <div className="relative w-full h-8 bg-gray-200 rounded-full flex overflow-hidden">
                <div className="w-[20%] bg-red-200"></div>
                <div className="w-[20%] bg-orange-200"></div>
                <div className="w-[20%] bg-yellow-200"></div>
                <div className="w-[20%] bg-lime-200"></div>
                <div className="w-[20%] bg-green-200"></div>
                <div className="absolute top-0 h-full flex items-center" style={{ left: `calc(${scorePercentage}% - 12px)` }}>
                    <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center">
                      <TrendingUp size={12} className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                {stages.map(stage => <span key={stage.name}>{stage.name}</span>)}
            </div>
             <div className={`mt-6 p-4 rounded-lg ${getMaturityColor(score, 'bg')} border ${getMaturityColor(score, 'border')}`}>
                <h4 className={`font-bold ${getMaturityColor(score, 'text')}`}>Current Stage: {currentStage}</h4>
                <p className={`text-sm mt-1 ${getMaturityColor(score, 'text')}`}>{description}</p>
            </div>
        </div>
    );
};

const DiagnosticOverview: React.FC<{ scores: { overall: number; categories: { name: string; score: number; focusAreas: { name: string; score: number }[] }[] } }> = ({ scores }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary: Maturity Scores</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Pipeline Maturity Score</h3>
                    <MaturityScoreIndicator score={scores.overall} size="large" />
                </div>
                <MaturityMatrix score={scores.overall} />
            </div>
            <div className="mt-6">
                 <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-800">Detailed Score Breakdown</h3>
                    {isExpanded ? <ChevronUp className="text-gray-500"/> : <ChevronDown className="text-gray-500"/>}
                 </button>
                 {isExpanded && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg p-4">
                        {scores.categories.map(cat => (
                            <div key={cat.name} className="mb-4 last:mb-0">
                                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-t-md">
                                    <h4 className="font-bold text-gray-700">{cat.name}</h4>
                                    <span className={`font-bold px-2 py-0.5 rounded-full text-sm ${getMaturityColor(cat.score, 'bg')} ${getMaturityColor(cat.score, 'text')}`}>{cat.score.toFixed(1)}</span>
                                </div>
                                <div className="border border-t-0 border-gray-200 rounded-b-md p-2">
                                  {cat.focusAreas.map(fa => (
                                    <div key={fa.name} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded">
                                      <p className="text-sm text-gray-600">{fa.name}</p>
                                      <span className={`font-medium text-xs px-2 py-0.5 rounded-full ${getMaturityColor(fa.score, 'bg')} ${getMaturityColor(fa.score, 'text')}`}>{fa.score.toFixed(1)}</span>
                                    </div>
                                  ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const DiagnosticInsights: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const scores = useMemo(() => {
      const overall = calculateOverallScore(diagnosticData);
      const categories = diagnosticData.map(category => ({
          name: category.category,
          score: calculateCategoryScore(category),
          focusAreas: category.focusAreas.map(fa => ({
              name: fa.title,
              score: calculateFocusAreaScore(fa)
          }))
      }));
      return { overall, categories };
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Diagnostic Insights: Maturity Assessment
        </h1>
        <p className="text-gray-600 mb-8">
          An executive overview and detailed breakdown of findings across key operational categories, with maturity scores to highlight critical areas for improvement.
        </p>

        <DiagnosticOverview scores={scores} />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">Detailed Diagnostic Findings</h2>
        <div className="space-y-4">
          {diagnosticData.map((category: AssessmentCategory) => {
            const isExpanded = openCategory === category.category;
            return (
              <div key={category.category} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className={`w-full p-6 text-left transition-colors duration-200 ${isExpanded ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BarChart2 className="text-blue-500" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`font-bold px-3 py-1 rounded-full text-sm ${getMaturityColor(calculateCategoryScore(category), 'bg')} ${getMaturityColor(calculateCategoryScore(category), 'text')}`}>
                        Score: {calculateCategoryScore(category).toFixed(1)}
                      </span>
                      {isExpanded ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                    </div>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <div className="space-y-6">
                      {category.focusAreas.map(area => <FocusAreaCard key={area.title} area={area} />)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticInsights;
