import React from 'react';
import ExecutiveSummaryContent from '../../shared/ExecutiveSummaryContent';

const ExecutiveSummary: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Executive Summary: The What and The Why
        </h1>
      </div>
      <ExecutiveSummaryContent />
    </div>
  );
};

export default ExecutiveSummary;