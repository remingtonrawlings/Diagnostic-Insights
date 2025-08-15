import React, { useState } from 'react';
import { GitBranch, Target, FileText, Users, Gauge, Lightbulb, Wrench, MapPin, AlertTriangle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const Methodology: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    process: false,
    targeting: false,
    sequence: false,
    execution: false,
    capacity: false,
    learnings: false,
    actions: false,
    plans: false,
    diagnostics: false,
    transformation: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const CollapsibleSection = ({ 
    id, 
    title, 
    icon: Icon, 
    color, 
    children 
  }: {
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections[id];
    
    const getColorClasses = (color: string) => {
      const colors = {
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200',
        purple: 'bg-purple-50 border-purple-200',
        orange: 'bg-orange-50 border-orange-200',
        red: 'bg-red-50 border-red-200',
        gray: 'bg-gray-50 border-gray-200'
      };
      return colors[color as keyof typeof colors];
    };

    const getIconColor = (color: string) => {
      const colors = {
        blue: 'text-blue-500',
        green: 'text-green-500',
        purple: 'text-purple-500',
        orange: 'text-orange-500',
        red: 'text-red-500',
        gray: 'text-gray-500'
      };
      return colors[color as keyof typeof colors];
    };
    
    return (
      <div className={`p-6 rounded-lg border ${getColorClasses(color)}`}>
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <Icon className={`${getIconColor(color)}`} size={24} />
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          {isExpanded ? 
            <ChevronUp className="text-gray-500" size={20} /> : 
            <ChevronDown className="text-gray-500" size={20} />
          }
        </button>
        
        {isExpanded && (
          <div className="mt-6 space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const MetricCard = ({ title, questions }: { title: string; questions: string[] }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">{question}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const FindingCard = ({ title, description, items }: { title: string; description: string; items: string[] }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Methodology: Our Approach to Analysis
        </h1>
        
        <div className="grid gap-8">
          {/* Process Section */}
          <CollapsibleSection
            id="process"
            title="Process Overview"
            icon={GitBranch}
            color="blue"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Context Map</h4>
                <p className="text-gray-700 mb-4">
                  Comprehensive mapping of current state processes, stakeholder interactions, and system touchpoints to understand the full operational landscape.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Stakeholder interview framework</li>
                  <li>• Process flow documentation</li>
                  <li>• Technology stack assessment</li>
                  <li>• Integration point analysis</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Unified Data Set</h4>
                <p className="text-gray-700 mb-4">
                  Consolidated performance metrics from multiple systems to create a single source of truth for analysis and decision-making.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• CRM data normalization</li>
                  <li>• Engagement platform metrics</li>
                  <li>• Communication tool analytics</li>
                  <li>• Performance trend analysis</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* Metrics Tracking Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Metrics Framework</h2>
            <p className="text-gray-700 mb-6">
              Our analysis focused on four key dimensions of sales performance, each addressing critical questions about current state and optimization opportunities.
            </p>
            
            <div className="grid gap-6">
              <CollapsibleSection
                id="targeting"
                title="Targeting Strategy"
                icon={Target}
                color="green"
              >
                <MetricCard
                  title="Strategic Questions"
                  questions={[
                    "Who are we targeting?",
                    "How is it going?",
                    "What should change?"
                  ]}
                />
              </CollapsibleSection>

              <CollapsibleSection
                id="sequence"
                title="Sequence Optimization"
                icon={FileText}
                color="purple"
              >
                <MetricCard
                  title="Content Strategy Questions"
                  questions={[
                    "What content strategy are we using?",
                    "How is it going?",
                    "What should change?"
                  ]}
                />
              </CollapsibleSection>

              <CollapsibleSection
                id="execution"
                title="Seller Execution"
                icon={Users}
                color="orange"
              >
                <MetricCard
                  title="Execution Analysis Questions"
                  questions={[
                    "Where is seller behavior impacting conversion?",
                    "How do we guide them to better execution?"
                  ]}
                />
              </CollapsibleSection>

              <CollapsibleSection
                id="capacity"
                title="Capacity Insights"
                icon={Gauge}
                color="red"
              >
                <MetricCard
                  title="Capacity Assessment Questions"
                  questions={[
                    "What is our available capacity based on historical data?",
                    "How do we utilize that capacity going forward?"
                  ]}
                />
              </CollapsibleSection>
            </div>
          </div>

          {/* Findings Section */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Findings Framework</h2>
            <p className="text-gray-700 mb-6">
              Our findings are organized into three distinct categories to provide clear pathways from discovery to implementation.
            </p>
            
            <div className="grid gap-6">
              <CollapsibleSection
                id="learnings"
                title="Learnings"
                icon={Lightbulb}
                color="blue"
              >
                <FindingCard
                  title="Audit Discoveries"
                  description="Key insights and discoveries gained during the comprehensive audit process"
                  items={[
                    "Process inefficiencies and bottlenecks identified",
                    "Technology integration gaps discovered",
                    "Performance patterns and trends analyzed",
                    "Stakeholder feedback themes consolidated"
                  ]}
                />
              </CollapsibleSection>

              <CollapsibleSection
                id="actions"
                title="Actions"
                icon={Wrench}
                color="orange"
              >
                <FindingCard
                  title="Recommended Changes"
                  description="Specific, actionable recommendations based on audit findings"
                  items={[
                    "Technology stack optimization priorities",
                    "Process redesign requirements",
                    "Training and enablement needs",
                    "Resource allocation adjustments"
                  ]}
                />
              </CollapsibleSection>

              <CollapsibleSection
                id="plans"
                title="Plans"
                icon={MapPin}
                color="green"
              >
                <FindingCard
                  title="Implementation Guidance"
                  description="Detailed instructions and support for executing recommended changes"
                  items={[
                    "Step-by-step implementation roadmaps",
                    "Change management strategies",
                    "Success measurement frameworks",
                    "Ongoing support recommendations"
                  ]}
                />
              </CollapsibleSection>
            </div>
          </div>

          {/* Diagnostics Section */}
          <CollapsibleSection
            id="diagnostics"
            title="Diagnostics"
            icon={AlertTriangle}
            color="red"
          >
            <div className="bg-white p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-4">
                What are the complicating factors involved in these findings?
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Organizational Factors</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Management turnover impact</li>
                      <li>• Team structure complexities</li>
                      <li>• Cultural resistance to change</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Technical Factors</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Legacy system constraints</li>
                      <li>• Integration dependencies</li>
                      <li>• Data quality issues</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Market Factors</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Competitive pressures</li>
                      <li>• Economic conditions</li>
                      <li>• Industry changes</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Resource Factors</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Budget constraints</li>
                      <li>• Time limitations</li>
                      <li>• Skill gaps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Critical Transformation Principles */}
          <CollapsibleSection
            id="transformation"
            title="Critical Transformation Principles"
            icon={BookOpen}
            color="purple"
          >
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">How should we train the team?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Role-specific skill development programs</li>
                  <li>• Technology adoption workshops</li>
                  <li>• Process certification requirements</li>
                  <li>• Ongoing coaching and mentorship</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">What processes should we follow?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Standardized handoff procedures</li>
                  <li>• Quality assurance checkpoints</li>
                  <li>• Performance monitoring protocols</li>
                  <li>• Continuous improvement cycles</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">How do systems need to be restructured?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Integration architecture optimization</li>
                  <li>• Data flow standardization</li>
                  <li>• Automation implementation</li>
                  <li>• Reporting dashboard consolidation</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">What resources should we use?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Expert consulting partnerships</li>
                  <li>• Technology platform investments</li>
                  <li>• Internal capability development</li>
                  <li>• Change management support</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default Methodology;