import React, { useState, useEffect } from 'react';
import { Focus, Settings, FileText, ChevronDown, ChevronUp, RotateCcw, ArrowRight, AlertTriangle, ArrowDown } from 'lucide-react';

const ExecutiveSummaryContent: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    capacity: false,
    content: false,
    systems: false
  });

  const [animationStates, setAnimationStates] = useState<Record<string, number>>({
    capacity: 0,
    content: 0,
    systems: 0
  });

  const [resetKeys, setResetKeys] = useState<Record<string, number>>({
    capacity: 0,
    content: 0,
    systems: 0
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newState = { ...prev, [section]: !prev[section] };
      
      // Start animation when section is expanded
      if (!prev[section]) {
        setAnimationStates(prevStates => ({ ...prevStates, [section]: 0 }));
        startAnimation(section);
      } else {
        // Reset animation when collapsed
        setAnimationStates(prevStates => ({ ...prevStates, [section]: 0 }));
      }
      
      return newState;
    });
  };

  const startAnimation = (section: string) => {
    const maxSteps = getMaxSteps(section);
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setAnimationStates(prev => ({ ...prev, [section]: currentStep }));
      
      if (currentStep >= maxSteps) {
        clearInterval(interval);
      }
    }, 600); // Reduced from 800ms to 600ms for smoother flow
  };

  const getMaxSteps = (section: string) => {
    switch (section) {
      case 'capacity': return 5; // Total ICP, Account Segments, Top Personas, Sequence Strategy, Tasks per Day
      case 'content': return 4; // ICP Segmentation, Blueprints, OneView AI, New Sequences
      case 'systems': return 5; // CRM, Tech Stack, broken arrow, conflicts box, keywords
      default: return 0;
    }
  };

  const resetAnimation = (section: string) => {
    setAnimationStates(prev => ({ ...prev, [section]: 0 }));
    setResetKeys(prev => ({ ...prev, [section]: prev[section] + 1 }));
    setTimeout(() => startAnimation(section), 100);
  };

  const CapacityAnimation = () => {
    const currentStep = animationStates.capacity;
    
    return (
      <div className="bg-white p-8 rounded-lg border border-blue-200 min-h-[400px]">
        <div className="flex flex-col items-center space-y-6">
          {/* Total ICP Box */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6 w-80">
              <h4 className="text-lg font-bold text-blue-800 text-center mb-4">Total ICP</h4>
              
              {/* Account Segments Box */}
              <div className={`transition-all duration-700 ease-out ${currentStep >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                  <h5 className="font-semibold text-blue-700 text-center mb-3">Account Segments</h5>
                  
                  {/* Top Personas Box */}
                  <div className={`transition-all duration-700 ease-out ${currentStep >= 3 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
                    <div className="bg-white border border-blue-200 rounded-lg p-3">
                      <h6 className="font-medium text-blue-600 text-center">Top Personas</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow to Sequence Strategy */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 4 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
            <ArrowDown className="text-blue-500" size={32} />
          </div>

          {/* Sequence Strategy Box */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-green-800 text-center">Sequence Strategy</h4>
            </div>
          </div>

          {/* Arrow to Tasks per Day */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
            <ArrowDown className="text-green-500" size={32} />
          </div>

          {/* Tasks per Day Box */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-orange-800 text-center">Tasks per Day</h4>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {currentStep >= getMaxSteps('capacity') && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => resetAnimation('capacity')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RotateCcw size={16} />
              <span>Replay Animation</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const SystemsAnimation = () => {
    const currentStep = animationStates.systems;
    
    return (
      <div className="bg-white p-8 rounded-lg border border-red-200 min-h-[400px]">
        <div className="space-y-8">
          {/* CRM and Tech Stack Boxes - Full Width Layout */}
          <div className="flex items-center justify-center space-x-8">
            {/* CRM Box - Equal Size */}
            <div className={`transition-all duration-700 ease-out ${currentStep >= 1 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-8'}`}>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 w-48 h-24 flex items-center justify-center">
                <h4 className="text-lg font-bold text-red-800 text-center">CRM</h4>
              </div>
            </div>

            {/* Broken Arrow / Connection Issues */}
            <div className={`transition-all duration-700 ease-out ${currentStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="flex items-center space-x-1">
                <div className="w-6 h-0.5 bg-red-500 animate-pulse"></div>
                <AlertTriangle className="text-red-500 animate-bounce" size={20} />
                <div className="w-6 h-0.5 bg-red-500 animate-pulse"></div>
                <div className="text-red-600 font-bold text-xl animate-pulse">×</div>
                <div className="w-6 h-0.5 bg-red-500 animate-pulse"></div>
                <AlertTriangle className="text-red-500 animate-bounce" size={20} />
                <div className="w-6 h-0.5 bg-red-500 animate-pulse"></div>
              </div>
            </div>

            {/* Integrated Tech Stack Box - Equal Size */}
            <div className={`transition-all duration-700 ease-out ${currentStep >= 2 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-8'}`}>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 w-48 h-24 flex items-center justify-center">
                <h4 className="text-lg font-bold text-red-800 text-center">Integrated Tech Stack</h4>
              </div>
            </div>
          </div>

          {/* Conflicts Container */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-red-800 text-center mb-6">System Conflicts</h4>
              
              {/* Conflict Keywords */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
                  <div className="bg-white border border-red-300 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                    <span className="font-semibold text-red-700">Prospect Data</span>
                  </div>
                </div>
                <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
                  <div className="bg-white border border-red-300 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                    <span className="font-semibold text-red-700">Activity Tracking</span>
                  </div>
                </div>
                <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                  <div className="bg-white border border-red-300 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                    <span className="font-semibold text-red-700">Field Sync Issues</span>
                  </div>
                </div>
                <div className={`transition-all duration-700 ease-out ${currentStep >= 5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`} style={{ transitionDelay: '450ms' }}>
                  <div className="bg-white border border-red-300 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                    <span className="font-semibold text-red-700">Reporting Capabilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {currentStep >= getMaxSteps('systems') && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => resetAnimation('systems')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <RotateCcw size={16} />
              <span>Replay Animation</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const ContentAnimation = () => {
    const currentStep = animationStates.content;
    
    return (
      <div className="bg-white p-8 rounded-lg border border-green-200 min-h-[400px]">
        <div className="flex flex-col items-center space-y-6">
          {/* ICP Segmentation */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-purple-800 text-center">ICP Segmentation</h4>
            </div>
          </div>

          {/* Arrow */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 2 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
            <ArrowDown className="text-purple-500" size={32} />
          </div>

          {/* Blueprints */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-blue-800 text-center">Blueprints</h4>
            </div>
          </div>

          {/* Arrow */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 3 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
            <ArrowDown className="text-blue-500" size={32} />
          </div>

          {/* OneView AI */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 3 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-orange-800 text-center">OneView AI</h4>
            </div>
          </div>

          {/* Arrow */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 4 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
            <ArrowDown className="text-orange-500" size={32} />
          </div>

          {/* New Sequences and Outreach */}
          <div className={`transition-all duration-700 ease-out ${currentStep >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 w-64">
              <h4 className="text-lg font-bold text-green-800 text-center">New Sequences and Outreach</h4>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {currentStep >= getMaxSteps('content') && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => resetAnimation('content')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <RotateCcw size={16} />
              <span>Replay Animation</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  const CollapsibleSection = ({ 
    id, 
    title, 
    icon: Icon, 
    color, 
    description,
    children,
    animationComponent 
  }: {
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    description: string;
    children: React.ReactNode;
    animationComponent?: React.ReactNode;
  }) => {
    const isExpanded = expandedSections[id];
    
    return (
      <div className={`bg-${color}-50 border-l-4 border-${color}-400 p-6 rounded-r-lg`}>
        <div className="flex items-start space-x-4">
          <Icon className={`text-${color}-500 mt-1`} size={24} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xl font-semibold text-${color}-800`}>{title}</h3>
              <button
                onClick={() => toggleSection(id)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg bg-white border border-${color}-200 hover:bg-${color}-50 transition-all duration-200 hover:shadow-md`}
              >
                <span className="text-sm font-medium">View Process Flow</span>
                {isExpanded ? 
                  <ChevronUp className={`text-${color}-500 transition-transform duration-200`} size={16} /> : 
                  <ChevronDown className={`text-${color}-500 transition-transform duration-200`} size={16} />
                }
              </button>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {description}
            </p>

            {/* Static Content */}
            {children}

            {/* Animation Component */}
            {isExpanded && animationComponent && (
              <div className="mt-6 transition-all duration-500 ease-out">
                {animationComponent}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="grid gap-8">
        {/* 1. Focus the Team's Limited Capacity */}
        <CollapsibleSection
          id="capacity"
          title="1. Focus the Team's Limited Capacity"
          icon={Focus}
          color="blue"
          description="Current capacity utilization analysis reveals significant inefficiencies in resource allocation. SDRs are overwhelmed with 450+ accounts each, while other team members operate below optimal capacity levels."
          animationComponent={<CapacityAnimation />}
        >
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">Key Actions Required:</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Redistribute account loads based on capacity analysis</li>
              <li>• Implement territory optimization strategies</li>
              <li>• Establish clear capacity thresholds and monitoring</li>
              <li>• Create specialized roles for high-value prospects</li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* 2. Create New Content Aligned to Capacity Plans */}
        <CollapsibleSection
          id="content"
          title="2. Create New Content Aligned to Capacity Plans"
          icon={FileText}
          color="green"
          description="Current content strategy lacks alignment with capacity constraints and persona-specific messaging. New sequences and engagement frameworks must be built to maximize efficiency within capacity limitations."
          animationComponent={<ContentAnimation />}
        >
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">Content Strategy Priorities:</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Conduct persona workshops to refine messaging</li>
              <li>• Build capacity-optimized sequence templates</li>
              <li>• Create engagement intelligence playbooks</li>
              <li>• Develop competitive intelligence framework</li>
              <li>• Systematize and scale existing successful content</li>
            </ul>
          </div>
        </CollapsibleSection>

        {/* 3. Fix Systems Issues, Process and Reporting Gaps */}
        <CollapsibleSection
          id="systems"
          title="3. Fix Systems Issues, Process and Reporting Gaps"
          icon={Settings}
          color="red"
          description="Critical system misalignments between Salesforce, Outreach, ZoomInfo, and Gong are creating data silos and process breakdowns. Integration failures are impacting visibility and execution across the revenue team."
          animationComponent={<SystemsAnimation />}
        >
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-gray-900 mb-2">Critical Fixes Needed:</h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Resolve Salesforce-Outreach sync issues and error logs</li>
              <li>• Implement engagement panel with proper activity tracking</li>
              <li>• Fix duplicate contacts and lead/contact conflicts</li>
              <li>• Establish standardized handoff processes between teams</li>
              <li>• Create unified reporting dashboard for visibility</li>
            </ul>
          </div>
        </CollapsibleSection>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Audit Findings Structure</h3>
        <p className="text-gray-700 mb-4">
          This comprehensive audit is organized into three main sections that build upon each other to provide actionable insights:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-blue-600 mb-2">Methodology</div>
            <div className="text-sm text-gray-600">Our systematic approach to analysis and discovery</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-purple-600 mb-2">Insights</div>
            <div className="text-sm text-gray-600">Qualitative and quantitative findings with actionable recommendations</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-orange-600 mb-2">Scenario Planning</div>
            <div className="text-sm text-gray-600">Strategic planning frameworks for future optimization</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">Expected Outcomes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">25%+</div>
            <div className="text-sm text-gray-600">Capacity Efficiency Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">50%</div>
            <div className="text-sm text-gray-600">Reduction in System Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">30%+</div>
            <div className="text-sm text-gray-600">Content Performance Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryContent;