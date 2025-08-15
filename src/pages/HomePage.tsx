import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExecutiveSummaryContent from '../components/shared/ExecutiveSummaryContent';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Capacity Utilization Audit by OneView | OneViewLabs';
  }, []);

  const auditSections = [
    {
      title: 'Methodology',
      description: 'Our Approach to Analysis',
      href: '/audit-findings#methodology',
      color: 'blue'
    },
    {
      title: 'Insights',
      description: 'Qualitative & Quantitative Analysis',
      href: '/audit-findings#insights',
      color: 'purple'
    },
    {
      title: 'Scenario Planning',
      description: 'Strategic Planning Framework',
      href: '/audit-findings#scenario-planning',
      color: 'green'
    },
    {
      title: 'Change Management',
      description: 'Implementation & Next Steps',
      href: '/audit-findings#change-management',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-blue-600">Capacity Utilization Audit</span>
            <span className="text-black"> by </span>
            <span className="text-orange-500">OneView</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Executive Summary of Findings
          </h2>
          
          {/* Presenter Information */}
          <div className="mb-6 space-y-2">
            <p className="text-lg text-gray-600">
              <span className="font-medium">Presented by:</span> Dave Breshears, Remington Rawlings and Jacob Turner
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-medium">Presented to:</span> Portnox Team
            </p>
          </div>
          
          {/* Logo positioned under presenter information */}
          <div className="flex justify-center mb-12">
            <img 
              src="https://i0.wp.com/version-2.com/wp-content/uploads/2021/02/box-logo-21.png?ssl=1" 
              alt="Portnox Logo" 
              className="max-w-xs h-auto"
            />
          </div>
        </div>

        {/* Executive Summary Content */}
        <div className="max-w-7xl mx-auto space-y-8">
          <ExecutiveSummaryContent />

          {/* Navigation to Audit Sections */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore Audit Findings</h3>
            <p className="text-gray-700 mb-6">
              Our comprehensive analysis is structured across three main sections: Methodology, Insights, and Scenario Planning, 
              providing a complete framework for understanding and implementing improvements.
            </p>
            
            <div className="grid gap-4">
              {auditSections.map((section, index) => (
                <Link
                  key={index}
                  to={section.href}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${getColorClasses(section.color)}`}
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  </div>
                  <ArrowRight className="text-gray-400" size={20} />
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link
                to="/audit-findings"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <span>View Complete Audit Findings</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;