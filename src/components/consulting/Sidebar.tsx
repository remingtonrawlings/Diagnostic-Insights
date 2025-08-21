import React from 'react';
import { FileText, Lightbulb, Calendar, Settings, Activity, Map, BarChart2 } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navigationItems = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      icon: FileText,
      description: 'The What and The Why'
    },
    {
      id: 'methodology',
      title: 'Methodology',
      icon: Settings,
      description: 'Our Approach to Analysis'
    },
    {
      id: 'insights',
      title: 'Quantitative Insights',
      icon: BarChart2,
      description: 'Qual & Quant Analysis'
    },
    {
      id: 'diagnostic-insights',
      title: 'Diagnostic Insights',
      icon: Activity,
      description: 'Maturity Assessment'
    },
    {
        id: 'scenario-planning',
        title: 'Scenario Planning',
        icon: Map,
        description: 'Strategic Framework'
    },
    {
      id: 'change-management',
      title: 'Change Management',
      icon: Calendar,
      description: 'Implementation & Next Steps'
    },
  ];

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Assessment Findings</h1>
        <p className="text-sm text-gray-600 mt-1">Capacity Utilization Analysis</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      size={20} 
                      className={`mt-0.5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className={`text-xs mt-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
