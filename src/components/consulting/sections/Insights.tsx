import React, { useState } from 'react';
import { BarChart3, Users, Lightbulb } from 'lucide-react';
import CurrentStateAssessment from './CurrentStateAssessment';
import InsightMap from './InsightMap';
import KeyFindings from './KeyFindings';

const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState('qualitative');

  const tabs = [
    {
      id: 'qualitative',
      title: 'Qualitative Analysis',
      icon: Users,
      description: 'Stakeholder insights and process assessment'
    },
    {
      id: 'quantitative',
      title: 'Quantitative Analysis',
      icon: BarChart3,
      description: 'Data-driven performance metrics'
    },
    {
      id: 'findings',
      title: 'Key Findings & Recommendations',
      icon: Lightbulb,
      description: 'Actionable insights and next steps'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'qualitative':
        return <CurrentStateAssessment />;
      case 'quantitative':
        return <InsightMap />;
      case 'findings':
        return <KeyFindings />;
      default:
        return <CurrentStateAssessment />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Insights: Comprehensive Analysis
        </h1>
        
        <p className="text-gray-700 mb-8">
          Our insights are organized into three interconnected areas: qualitative analysis from stakeholder interviews, 
          quantitative analysis of performance data, and key findings with actionable recommendations.
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
                  <div className="text-left">
                    <div className="font-medium">{tab.title}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
         {/* Tab Content is now rendered outside this initial container */}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Insights;
