import React, { useState } from 'react';
import { Settings, Workflow, Database, DollarSign, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController
);

const KeyFindings: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tech: false,
    process: false,
    data: false,
    strategy: false,
    major1: false,
    major2: false,
    major3: false,
    major4: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [section]: !prev[section]
      };
      
      return newState;
    });
  };

  const recommendations = [
    {
      id: 'tech',
      category: 'Technology & Integration',
      icon: Settings,
      color: 'blue',
      actions: [
        'Hire a GTM Operations expert with deep tech stack background',
        'Implement the Outreach Engagement Panel in Salesforce',
        'Audit and fix the Salesforce-Outreach-ZoomInfo-Gong-NUCs integration workflow'
      ]
    },
    {
      id: 'process',
      category: 'Process Optimization',
      icon: Workflow,
      color: 'green',
      actions: [
        'Redefine and formalize all handoffs: Marketing→SDR, SDR→AE (SQL), AE→SE, and Sales→CS',
        'Shift from a "leads" to a "contacts" focused motion, potentially using LeanData',
        'Run a Persona Workshop to build new, effective sequences'
      ]
    },
    {
      id: 'data',
      category: 'Data & Enablement',
      icon: Database,
      color: 'purple',
      actions: [
        'Create an Engagement Intelligence Playbook and conduct mandatory tool training',
        'Systematize Tyler Lynch\'s content and build a competitive intelligence framework',
        'Clean up old data (past-due tasks, old sequences) and enrich missing prospect titles'
      ]
    },
    {
      id: 'strategy',
      category: 'Strategy & Finance',
      icon: DollarSign,
      color: 'orange',
      actions: [
        'Reform the SDR compensation plan and run financial projections',
        'Pay for ongoing managed services with Outreach consultants'
      ]
    }
  ];

  const majorRecommendations = [
    {
      id: 'major1',
      title: '1. Address Major System Misalignments',
      icon: AlertTriangle,
      color: 'red',
      priority: 'Critical',
      timeline: '30 days',
      details: [
        'Finalize Salesforce configurations including team finalization',
        'Ensure accounts and territory lists, including contact lists, are appropriately assigned',
        'Label contacts by persona to aid with list building',
        'Fix the lack of metrics on meetings held',
        'Implement the engagement panel with activity',
        'Establish stage gates for opportunities',
        'Resolve outreach plug-in mappings and sync issues due to error logs in Outreach',
        'Fix duplicate contacts in Salesforce that are listed as both leads and contacts'
      ]
    },
    {
      id: 'major2',
      title: '2. Implement Engagement Intelligence',
      icon: Target,
      color: 'blue',
      priority: 'High',
      timeline: '45 days',
      details: [
        'Conduct a persona workshop to refine messaging',
        'Use new blueprints to add new sequences',
        'Train the team on how to execute effectively within those sequences',
        'Implement engagement intelligence framework across all tools',
        'Create standardized playbooks for different buyer personas',
        'Establish feedback loops for continuous optimization'
      ]
    },
    {
      id: 'major3',
      title: '3. Restructure Handoff Processes',
      icon: Workflow,
      color: 'green',
      priority: 'High',
      timeline: '60 days',
      details: [
        'Ensure stability from MQL to SDR, then from SDR to AE, and from AE to customer success',
        'Establish inbound quality gates and routing',
        'Implement lead enrichment processes',
        'Fix compensation plans to align with new processes',
        'Align everyone on the SDR\'s role within the organization',
        'Remove the subjectivity of AE conversion from meeting to opportunity',
        'Achieve a better and more qualified pipeline',
        'Establish clear exit criteria across stages'
      ]
    },
    {
      id: 'major4',
      title: '4. Data Cleanup and Governance',
      icon: Database,
      color: 'purple',
      priority: 'Medium',
      timeline: '90 days',
      details: [
        'Perform data uploads into Salesforce or add Salesforce configurations for personas',
        'Delete unnecessary sequences',
        'Upload past-due tasks to remove old items',
        'Tag all bounced prospects',
        'Edit triggers in Outreach to ensure only the appropriate ones are active',
        'Align governance for rule sets, schedules, throttles, and organization settings in Outreach',
        'Fix any records with failed sequence states',
        'Implement ongoing data quality monitoring'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      purple: 'text-purple-500',
      orange: 'text-orange-500',
      red: 'text-red-500'
    };
    return colors[color as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      Critical: 'bg-red-100 text-red-800',
      High: 'bg-orange-100 text-orange-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const CollapsibleSection = ({ 
    section, 
    isExpanded, 
    onToggle, 
    icon: Icon, 
    title, 
    color, 
    children 
  }: {
    section: string;
    isExpanded: boolean;
    onToggle: () => void;
    icon: React.ElementType;
    title: string;
    color: string;
    children: React.ReactNode;
  }) => (
    <div className={`p-6 rounded-lg border ${getColorClasses(color)}`}>
      <button
        onClick={onToggle}
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
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );

  const MajorRecommendationSection = ({ 
    recommendation 
  }: {
    recommendation: typeof majorRecommendations[0];
  }) => {
    const Icon = recommendation.icon;
    const isExpanded = expandedSections[recommendation.id];
    
    return (
      <div className={`p-6 rounded-lg border ${getColorClasses(recommendation.color)}`}>
        <button
          onClick={() => toggleSection(recommendation.id)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-start space-x-4">
            <Icon className={`${getIconColor(recommendation.color)} mt-1`} size={24} />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{recommendation.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation.priority)}`}>
                  {recommendation.priority}
                </span>
                <span className="text-sm text-gray-500">({recommendation.timeline})</span>
              </div>
            </div>
          </div>
          {isExpanded ? 
            <ChevronUp className="text-gray-500" size={20} /> : 
            <ChevronDown className="text-gray-500" size={20} />
          }
        </button>
        
        {isExpanded && (
          <div className="mt-6 space-y-4">
            <div className="grid gap-3">
              {recommendation.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Recommendations: An Actionable Plan for Change
        </h1>
        
        {/* Major Recommendations Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Major Recommendations</h2>
          <p className="text-gray-700 mb-8">
            Four critical focus areas that require immediate attention to address systemic issues and enable sustainable growth.
          </p>
          
          <div className="grid gap-6">
            {majorRecommendations.map((recommendation) => (
              <MajorRecommendationSection 
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
        
        {/* Additional Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Tactical Recommendations</h2>
          <div className="grid gap-6">
            {recommendations.map((recommendation) => {
              const Icon = recommendation.icon;
              const isExpanded = expandedSections[recommendation.id];
              
              return (
                <CollapsibleSection
                  key={recommendation.id}
                  section={recommendation.id}
                  isExpanded={isExpanded}
                  onToggle={() => toggleSection(recommendation.id)}
                  icon={Icon}
                  title={recommendation.category}
                  color={recommendation.color}
                >
                  <div className="space-y-3">
                    {/* Details removed as per request */}
                  </div>
                </CollapsibleSection>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Implementation Priority Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-lg font-bold text-red-600 mb-1">Critical (30 days)</div>
              <div className="text-sm text-gray-600">System Misalignments</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-lg font-bold text-orange-600 mb-1">High (45-60 days)</div>
              <div className="text-sm text-gray-600">Intelligence & Handoffs</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-lg font-bold text-yellow-600 mb-1">Medium (90 days)</div>
              <div className="text-sm text-gray-600">Data Cleanup</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-lg font-bold text-green-600 mb-1">Ongoing</div>
              <div className="text-sm text-gray-600">Optimization & Training</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">Success Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">30-Day Milestones</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Salesforce configurations completed</li>
                <li>• System integration errors resolved</li>
                <li>• Territory and persona assignments finalized</li>
                <li>• Past due task cleanup initiated</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">90-Day Outcomes</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 30%+ improvement in email response rates</li>
                <li>• Reduced handoff time by 50%</li>
                <li>• Increased SDR productivity by 25%</li>
                <li>• 90%+ on-time task completion rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFindings;
