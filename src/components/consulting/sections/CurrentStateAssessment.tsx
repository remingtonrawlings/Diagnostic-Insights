import React, { useState, useEffect } from 'react';
import { Users, Search, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const CurrentStateAssessment: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    stakeholder: false,
    analysis: false,
    interviews: false
  });

  const [animationKeys, setAnimationKeys] = useState<Record<string, number>>({
    stakeholder: 0,
    analysis: 0,
    interviews: 0
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [section]: !prev[section]
      };
      
      // Only increment animation key when expanding (not collapsing)
      if (!prev[section]) {
        setAnimationKeys(prevKeys => ({
          ...prevKeys,
          [section]: prevKeys[section] + 1
        }));
      }
      
      return newState;
    });
  };

  const teamPerformanceData = {
    labels: ['Enterprise AEs', 'Commercial AEs', 'SDRs', 'Solution Engineers'],
    datasets: [
      {
        label: 'Current Capacity Utilization (%)',
        data: [85, 78, 92, 68],
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 101, 101, 0.6)',
          'rgba(139, 92, 246, 0.6)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const issueBreakdownData = {
    labels: ['Process Issues', 'Technology Gaps', 'Capacity Constraints', 'Training Needs'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const sentimentData = {
    labels: ['Process Frustration', 'Technology Challenges', 'Capacity Overload', 'Training Gaps', 'Communication Issues'],
    datasets: [
      {
        label: 'Frequency Mentioned',
        data: [28, 24, 32, 18, 22],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(220, 38, 127, 0.6)',
          'rgba(168, 85, 247, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(220, 38, 127, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const getChartOptions = (animated: boolean = true) => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: animated ? {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    } : false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  });

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
    
    return (
      <div className={`bg-${color}-50 p-6 rounded-lg border border-${color}-200`}>
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-start space-x-3">
            <Icon className={`text-${color}-500 mt-1`} size={24} />
            <h3 className={`text-xl font-semibold text-${color}-800`}>{title}</h3>
          </div>
          {isExpanded ? 
            <ChevronUp className={`text-${color}-500`} size={20} /> : 
            <ChevronDown className={`text-${color}-500`} size={20} />
          }
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Qualitative Analysis: Where We Are Today
        </h1>
        
        <div className="grid gap-6">
          <CollapsibleSection
            id="stakeholder"
            title="Stakeholder Interviews"
            icon={Users}
            color="blue"
          >
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Met with:</h4>
              <p className="text-gray-700">
                Enterprise AEs, Commercial AEs, SDRs, Solution Engineer, Former SDR
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Themes:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Inconsistent processes across teams leading to inefficiencies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Technology gaps creating visibility and execution challenges</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Capacity constraints limiting growth potential</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-4">Current Team Capacity Utilization</h4>
              <div className="h-80">
                <Bar 
                  key={`stakeholder-chart-${animationKeys.stakeholder}`}
                  data={teamPerformanceData} 
                  options={getChartOptions(true)} 
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="analysis"
            title="Analysis Framework"
            icon={Search}
            color="purple"
          >
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Utilized role-specific focus areas and change profile analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Conducted sentiment analysis across all stakeholder interviews</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Applied quote analysis format for comprehensive insight capture</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Incorporated specific analysis based on Jacob Turner's file regarding Portnox handling</span>
              </li>
            </ul>

            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Primary Issue Categories (%)</h4>
              <div className="h-80 flex justify-center">
                <Doughnut 
                  key={`analysis-chart-${animationKeys.analysis}`}
                  data={issueBreakdownData} 
                  options={getChartOptions(true)} 
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            id="interviews"
            title="Interview Findings"
            icon={MessageSquare}
            color="red"
          >
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common Pain Points Identified:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">Process Frustrations</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Unclear handoff procedures between teams</li>
                      <li>• Inconsistent lead qualification standards</li>
                      <li>• Manual processes that should be automated</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">Technology Challenges</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Poor system integration causing data silos</li>
                      <li>• Lack of visibility into prospect engagement</li>
                      <li>• Tools not being used to full potential</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">Capacity Issues</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• SDRs overwhelmed with account loads</li>
                      <li>• Insufficient time for quality prospecting</li>
                      <li>• Burnout leading to team turnover</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">Training Gaps</h5>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Inconsistent onboarding processes</li>
                      <li>• Lack of ongoing skill development</li>
                      <li>• No standardized playbooks or methodologies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Direct Quotes from Interviews:</h4>
              <div className="space-y-3 mb-6">
                <blockquote className="bg-white p-4 border-l-4 border-red-500 italic text-gray-700">
                  "We're drowning in accounts. I have 450 accounts to manage, and there's no way I can give them all the attention they deserve."
                  <cite className="block text-sm text-gray-500 mt-2">- Commercial SDR</cite>
                </blockquote>
                <blockquote className="bg-white p-4 border-l-4 border-red-500 italic text-gray-700">
                  "The handoff process is broken. We lose deals because there's no clear process for moving prospects from marketing to sales."
                  <cite className="block text-sm text-gray-500 mt-2">- Enterprise AE</cite>
                </blockquote>
                <blockquote className="bg-white p-4 border-l-4 border-red-500 italic text-gray-700">
                  "Our tools don't talk to each other. I'm constantly switching between systems and manually updating information."
                  <cite className="block text-sm text-gray-500 mt-2">- Solution Engineer</cite>
                </blockquote>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-red-200">
              <h4 className="font-medium text-gray-900 mb-4">Interview Sentiment Analysis</h4>
              <div className="h-80">
                <Bar 
                  key={`interviews-chart-${animationKeys.interviews}`}
                  data={sentimentData} 
                  options={getChartOptions(true)} 
                />
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default CurrentStateAssessment;