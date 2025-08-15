import React, { useState, useEffect } from 'react';
import Sidebar from '../components/consulting/Sidebar';
import {
  ExecutiveSummary,
  Methodology,
  Insights,
  DiagnosticInsights,
  ScenarioPlanning,
  ChangeManagement,
} from '../components/consulting/sections';

const ConsultingReadoutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');

  useEffect(() => {
    document.title = 'Audit Findings | OneViewLabs';
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'executive-summary':
        return <ExecutiveSummary />;
      case 'methodology':
        return <Methodology />;
      case 'insights':
        return <Insights />;
      case 'diagnostic-insights':
        return <DiagnosticInsights />;
      case 'scenario-planning':
        return <ScenarioPlanning />;
      case 'change-management':
        return <ChangeManagement />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="pt-20">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 ml-80 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultingReadoutPage;
