import React from 'react';
import { Map, TrendingUp, Target, AlertTriangle } from 'lucide-react';

const ScenarioPlanning: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Scenario Planning: Strategic Framework
        </h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Map className="text-blue-500" size={24} />
            <h3 className="text-xl font-semibold text-blue-800">
              Strategic Planning Framework Coming Soon
            </h3>
          </div>
          <p className="text-gray-700">
            This section will contain comprehensive scenario planning models and strategic frameworks 
            for optimizing capacity utilization and system performance across different growth scenarios.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="text-green-500" size={20} />
              <h4 className="font-semibold text-gray-900">Growth Scenarios</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Analysis of different growth trajectories and their impact on capacity requirements and system demands.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="text-blue-500" size={20} />
              <h4 className="font-semibold text-gray-900">Optimization Models</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Resource allocation models and capacity optimization frameworks for different operational scenarios.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-orange-500" size={20} />
              <h4 className="font-semibold text-gray-900">Risk Assessment</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Comprehensive risk analysis and mitigation strategies for various implementation scenarios.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg">
            <Map size={18} />
            <span>Content pending - detailed scenarios in development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPlanning;