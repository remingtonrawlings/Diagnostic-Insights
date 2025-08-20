import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Target, Shield, BarChart2, Zap, TrendingUp, HelpCircle, X, ClipboardList, ArrowRightCircle, Sparkles, Lightbulb, Wrench } from 'lucide-react';
import { diagnosticData, AssessmentCategory, FocusArea, RecommendedAction } from '../../../data/diagnosticData';
import KeyFindings from './KeyFindings';

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
const getMaturityColor = (score: number, type: 'bg' | 'text' | 'border' | 'gradientFrom' | 'gradientTo') => {
  if (score <= 2.9) { // Initial
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', gradientFrom: 'from-red-200', gradientTo: 'to-red-300' }[type];
  }
  if (score <= 4.9) { // Developing
    return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', gradientFrom: 'from-orange-200', gradientTo: 'to-orange-300' }[type];
  }
  if (score <= 6.9) { // Defined
    return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', gradientFrom: 'from-yellow-200', gradientTo: 'to-yellow-300' }[type];
  }
  if (score <= 8.9) { // Managed
    return { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-300', gradientFrom: 'from-lime-200', gradientTo: 'to-lime-300' }[type];
  }
  return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', gradientFrom: 'from-green-200', gradientTo: 'to-green-300' }[type]; // Optimized
};

const getMaturityStage = (score: number): { name: string; description: string, icon: React.ElementType } => {
    if (score <= 2.9) return { name: 'Initial', description: 'Processes are ad-hoc, chaotic, and reactive.', icon: AlertTriangle };
    if (score <= 4.9) return { name: 'Developing', description: 'Some processes are defined but are not consistently followed.', icon: ArrowRightCircle };
    if (score <= 6.9) return { name: 'Defined', description: 'Processes are standardized, documented, and proactive.', icon: ClipboardList };
    if (score <= 8.9) return { name: 'Managed', description: 'Performance is measured and managed quantitatively.', icon: TrendingUp };
    return { name: 'Optimized', description: 'Focused on continuous process improvement and optimization.', icon: Sparkles };
};

// --- CUSTOM HOOKS ---
const useCountUp = (end: number, duration = 1500) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = (frame / totalFrames);
            const currentCount = end * progress;
            setCount(parseFloat(currentCount.toFixed(1)));

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(end); // Ensure it ends on the exact number
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, totalFrames]);

    return count;
};


// --- SUB-COMPONENTS ---

const MaturityScoreIndicator: React.FC<{ score: number; animated?: boolean; size?: 'small' | 'large' }> = ({ score, animated = false, size = 'large' }) => {
    const displayedScore = animated ? useCountUp(score) : score;
    return (
        <div className={`flex items-center justify-center rounded-full ${getMaturityColor(score, 'bg')} ${size === 'large' ? 'w-24 h-24' : 'w-16 h-16'}`}>
            <div className="text-center">
                <div className={`font-bold ${getMaturityColor(score, 'text')} ${size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                    {displayedScore.toFixed(1)}
                    <span className="text-sm">/10</span>
                </div>
                <div className={`text-xs font-medium ${getMaturityColor(score, 'text')}`}>Maturity</div>
            </div>
        </div>
    );
};

const MaturityMatrix: React.FC<{ score: number }> = ({ score }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100); // Slight delay to ensure mount
        return () => clearTimeout(timer);
    }, []);

    const stages = [
        { name: 'Initial', description: 'Processes are ad-hoc and reactive.', color: 'red', icon: AlertTriangle },
        { name: 'Developing', description: 'Processes are defined but inconsistent.', color: 'orange', icon: ArrowRightCircle },
        { name: 'Defined', description: 'Processes are standardized and documented.', color: 'yellow', icon: ClipboardList },
        { name: 'Managed', description: 'Performance is quantitatively measured.', color: 'lime', icon: TrendingUp },
        { name: 'Optimized', description: 'Focused on continuous improvement.', color: 'green', icon: Sparkles },
    ];
    const { name: currentStage, description, icon: StageIcon } = getMaturityStage(score);
    const scorePercentage = (score / 10) * 100;

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pipeline Creation Maturity Matrix</h3>
            <p className="text-sm text-gray-600 mb-8">This matrix shows your current operational maturity based on our diagnostic assessment.</p>
            <div className="relative w-full h-8 bg-gray-200 rounded-full flex overflow-hidden">
                {stages.map((stage, index) => (
                    <div key={stage.name} className="group h-full w-[20%] relative">
                        <div className={`h-full bg-gradient-to-b ${getMaturityColor(index * 2 + 1, 'gradientFrom')} ${getMaturityColor(index * 2 + 1, 'gradientTo')} transition-transform duration-1000 ease-out`}
                             style={{ transform: isAnimated ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transitionDelay: `${index * 100}ms` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <stage.icon className={`w-5 h-5 text-white opacity-70`} />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:-bottom-12 transition-all duration-300 pointer-events-none z-10">
                            <strong className={`text-${stage.color}-400`}>{stage.name}:</strong> {stage.description}
                        </div>
                    </div>
                ))}
                <div className="absolute top-0 h-full flex items-center transition-all duration-1000 ease-out"
                     style={{ left: `calc(${isAnimated ? scorePercentage : 0}% - 14px)`, transitionDelay: '700ms' }}>
                    <div className="w-7 h-7 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                      <TrendingUp size={12} className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                {stages.map(stage => <span key={stage.name}>{stage.name}</span>)}
            </div>
             <div className={`mt-8 p-4 rounded-lg flex items-start space-x-3 ${getMaturityColor(score, 'bg')} border ${getMaturityColor(score, 'border')}`}>
                <StageIcon className={`w-6 h-6 ${getMaturityColor(score, 'text')} flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className={`font-bold ${getMaturityColor(score, 'text')}`}>Current Stage: {currentStage}</h4>
                  <p className={`text-sm mt-1 ${getMaturityColor(score, 'text')}`}>{description}</p>
                </div>
            </div>
        </div>
    );
};

const ScoringMethodologyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Scoring Methodology</h2>
                <div className="space-y-4 text-gray-700">
                    <p>The overall score is an average derived from a bottom-up analysis of all recommended actions, providing a quantitative measure of operational maturity.</p>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">1. Action Score (1-10 Scale)</h3>
                        <p className="mt-1">Each action is scored based on its attributes, where High=3, Medium=2, and Low=1.</p>
                        <code className="block bg-gray-200 text-gray-800 p-2 rounded-md my-2 text-sm">Maturity Score = 10 - (Priority + Severity + Complexity)</code>
                        <p className="text-sm italic">A high-priority, high-severity action results in a very low maturity score, indicating a critical area for improvement.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">2. Focus Area Score</h3>
                        <p className="mt-1">This is the <span className="font-semibold">average</span> of all Action Scores within that Focus Area.</p>
                    </div>
                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">3. Category Score</h3>
                        <p className="mt-1">This is the <span className="font-semibold">average</span> of all Focus Area Scores within that Category.</p>
                    </div>
                     <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">4. Overall Score</h3>
                        <p className="mt-1">This is the final <span className="font-semibold">average</span> of all Category Scores.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DiagnosticOverview: React.FC<{ 
    scores: { overall: number; categories: { name: string; score: number; focusAreas: { name: string; score: number }[] }[] },
    onCategoryClick: (categoryName: string) => void
}> = ({ scores, onCategoryClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Executive Summary: Maturity Scores</h2>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    <HelpCircle size={16} />
                    <span>How is this calculated?</span>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Pipeline Maturity Score</h3>
                    <MaturityScoreIndicator score={scores.overall} animated={true} size="large" />
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
                                    {/* Score hidden as per request */}
                                    {/* <span className={`font-bold px-2 py-0.5 rounded-full text-sm ${getMaturityColor(cat.score, 'bg')} ${getMaturityColor(cat.score, 'text')}`}>{cat.score.toFixed(1)}</span> */}
                                </div>
                                <div className="border border-t-0 border-gray-200 rounded-b-md p-2">
                                  {cat.focusAreas.map(fa => (
                                    <button key={fa.name} onClick={() => onCategoryClick(cat.name)} className="w-full flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded transition-colors text-left">
                                      <p className="text-sm text-gray-600">{fa.name}</p>
                                      {/* Score hidden as per request */}
                                      {/* <span className={`font-medium text-xs px-2 py-0.5 rounded-full ${getMaturityColor(fa.score, 'bg')} ${getMaturityColor(fa.score, 'text')}`}>{fa.score.toFixed(1)}</span> */}
                                    </button>
                                  ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
            <ScoringMethodologyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const ActionDetailChip: React.FC<{ label: string; value: 'High' | 'Medium' | 'Low' }> = ({ label, value }) => {
  const colors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-green-100 text-green-700'
  };
  return (
    <div>
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`ml-1.5 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${colors[value]}`}>{value}</span>
    </div>
  )
};

const FocusAreaCard: React.FC<{ area: FocusArea }> = ({ area }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const score = calculateFocusAreaScore(area);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center">
        <h4 className="font-semibold text-gray-800">{area.title}</h4>
        <div className="flex items-center space-x-3">
          {/* Score hidden as per request */}
          {/* <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${getMaturityColor(score, 'bg')} ${getMaturityColor(score, 'text')}`}>{score.toFixed(1)}</span> */}
          {isExpanded ? <ChevronUp className="text-gray-500"/> : <ChevronDown className="text-gray-500"/>}
        </div>
      </button>
      {isExpanded && (
        <div className="p-4 space-y-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2 flex items-center"><Target size={16} className="mr-2 text-blue-500"/> Benchmarks</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
              {area.benchmarks.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2 flex items-center"><Lightbulb size={16} className="mr-2 text-yellow-500"/> Insights</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
              {area.insights.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          {area.recommendedActions.length > 0 && (
            <div>
              <h5 className="font-semibold text-gray-700 mb-3 flex items-center"><Wrench size={16} className="mr-2 text-green-500"/> Recommended Actions</h5>
              <div className="space-y-3">
                {area.recommendedActions.map(action => (
                  <div key={action.id} className="bg-white p-3 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-800 mb-2">{action.title}</p>
                    <div className="flex items-center space-x-4">
                      <ActionDetailChip label="Priority" value={action.priority} />
                      <ActionDetailChip label="Severity" value={action.severity} />
                      <ActionDetailChip label="Complexity" value={action.complexity} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// --- MAIN COMPONENT ---
const DiagnosticInsights: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('assessment');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const handleCategoryClick = (categoryName: string) => {
    setOpenCategory(categoryName);
    setTimeout(() => {
        categoryRefs.current[categoryName]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100); // Delay to allow accordion to open
  };

  const tabs = [
    {
      id: 'assessment',
      title: 'Maturity Assessment',
      icon: TrendingUp,
    },
    {
      id: 'findings',
      title: 'Key Findings & Recommendations',
      icon: Lightbulb,
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Diagnostic Insights
        </h1>
        <p className="text-gray-600 mb-8">
          An executive overview and detailed breakdown of findings, maturity scores, and actionable recommendations.
        </p>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      
      {activeTab === 'assessment' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <DiagnosticOverview scores={scores} onCategoryClick={handleCategoryClick} />
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">Detailed Diagnostic Findings</h2>
          <div className="space-y-4">
            {diagnosticData.map((category: AssessmentCategory) => {
              const isExpanded = openCategory === category.category;
              return (
                <div key={category.category} ref={el => (categoryRefs.current[category.category] = el)}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                      onClick={() => setOpenCategory(isExpanded ? null : category.category)}
                      className={`w-full p-6 text-left transition-colors duration-200 ${isExpanded ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
                      >
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                          <BarChart2 className="text-blue-500" size={24} />
                          <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                          </div>
                          <div className="flex items-center space-x-4">
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'findings' && (
        <KeyFindings />
      )}
    </div>
  );
};

export default DiagnosticInsights;
