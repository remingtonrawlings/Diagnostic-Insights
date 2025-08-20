import React from 'react';
import InsightMap from './InsightMap';

const Insights: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Quantitative Insights: A Data-Driven Analysis
        </h1>
        
        <p className="text-gray-700 mb-8">
          This section provides a data-driven look into the results of your current GTM strategy. By analyzing key performance indicators (KPIs) across the entire funnel, we uncover what's working, what's not, and where the biggest opportunities for growth exist.
        </p>
      </div>

      <div className="transition-all duration-300">
        <InsightMap />
      </div>
    </div>
  );
};

export default Insights;
