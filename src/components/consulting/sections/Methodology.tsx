import React from 'react';
import { Activity, BarChart3, Wrench, TrendingUp } from 'lucide-react';

const Methodology: React.FC = () => {

  const InfoCard = ({ icon: Icon, title, description, color, children }: { icon: React.ElementType; title: string; description: string; color: string; children: React.ReactNode }) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        text: 'text-blue-500',
        header: 'text-blue-800',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-400',
        text: 'text-purple-500',
        header: 'text-purple-800',
      }
    };
    const colorClasses = colors[color as keyof typeof colors];

    return (
      <div className={`${colorClasses.bg} border-l-4 ${colorClasses.border} p-6 rounded-r-lg`}>
        <div className="flex items-start space-x-4">
          <Icon className={`${colorClasses.text} mt-1`} size={24} />
          <div className="flex-1">
            <h3 className={`text-xl font-semibold ${colorClasses.header}`}>{title}</h3>
            <p className="text-gray-700 leading-relaxed mt-2 mb-4">
              {description}
            </p>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Methodology: How to Read This Report
        </h1>
        <p className="text-gray-600 mb-8">
          Our analysis combines a qualitative, process-oriented maturity assessment with a quantitative, data-driven performance review. Together, these sections provide a holistic view of your current GTM operations and a clear path forward.
        </p>
        
        <div className="grid gap-8">
          <InfoCard
            icon={Activity}
            title="Diagnostic Insights (The 'Why')"
            description="This section evaluates your people, processes, and technology against industry best practices. We use a maturity scoring model to pinpoint specific areas of operational friction and provide detailed, actionable recommendations for improvement."
            color="blue"
          >
            <h4 className="font-medium text-gray-900 mb-2">What you'll find:</h4>
            <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
              <li>A quantitative maturity score for key operational categories.</li>
              <li>Detailed analysis of process gaps and their root causes.</li>
              <li>Specific, prioritized recommendations to address each finding.</li>
              <li>A focus on foundational issues impacting the entire GTM engine.</li>
            </ul>
          </InfoCard>

          <InfoCard
            icon={BarChart3}
            title="Performance Insights (The 'What')"
            description="This section provides a data-driven look into the results of your current GTM strategy. By analyzing key performance indicators (KPIs) across the entire funnel, we uncover what's working, what's not, and where the biggest opportunities for growth exist."
            color="purple"
          >
            <h4 className="font-medium text-gray-900 mb-2">What you'll find:</h4>
            <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
              <li>Visualizations of your sales funnel, from outreach to conversion.</li>
              <li>Analysis of system health, including critical data sync and sequence errors.</li>
              <li>A breakdown of team capacity and workload distribution.</li>
              <li>Performance benchmarks for your sequences and content collections.</li>
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
