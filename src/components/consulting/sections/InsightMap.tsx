import React, { useState } from 'react';
import { Users, BarChart3, HeartPulse, SlidersHorizontal, FileText, ChevronDown, ChevronUp } from 'lucide-react';
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
  LineController,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  LineController
);

const InsightMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState('funnel');
  const [expandedFindings, setExpandedFindings] = useState<Record<string, boolean>>({});
  const [chartAnimationKey, setChartAnimationKey] = useState(0);

  const toggleFinding = (id: string) => {
    setExpandedFindings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      setChartAnimationKey(prev => prev + 1);
    }
  };
  
  const tabs = [
    { id: 'funnel', title: 'Funnel Analysis', icon: BarChart3, color: 'blue' },
    { id: 'health', title: 'System & Data Health', icon: HeartPulse, color: 'red' },
    { id: 'capacity', title: 'Team Capacity', icon: Users, color: 'orange' },
    { id: 'sequences', title: 'Sequence Performance', icon: SlidersHorizontal, color: 'green' }
  ];

  // --- NEW DATA SETS ---
  const leadsVsContactsData = {
    labels: ['Other', 'Director', 'Manager', 'CXO / Founder', 'VP', 'Blank Title'],
    datasets: [
      {
        label: 'Leads',
        data: [9073, 2601, 2582, 1481, 669, 289],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Contacts',
        data: [5936, 5299, 3580, 1557, 1840, 630],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      },
    ],
  };

  const funnelMetricsData = {
    labels: ['Other', 'Director', 'Manager', 'CXO / Founder', 'VP', 'Blank Title'],
    datasets: [
      {
        label: 'Contacts Touched',
        data: [15009, 7900, 6162, 3038, 2509, 919],
        backgroundColor: 'rgba(156, 163, 175, 0.6)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
        yAxisID: 'y',
        order: 2
      },
      {
        label: 'Reply %',
        data: [3.78, 7.56, 7.25, 5.66, 6.34, 4.68],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        type: 'line',
        yAxisID: 'y1',
        tension: 0.3,
        fill: true,
        order: 1
      },
      {
        label: 'Meeting %',
        data: [1.43, 2.25, 2.63, 1.12, 1.67, 0.22],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        type: 'line',
        yAxisID: 'y1',
        tension: 0.3,
        fill: true,
        order: 0
      },
    ],
  };

  const sequenceStatesData = {
    labels: ['Deliverability Error', 'Template Syntax Error', 'Mailbox Issue', 'Sequence Error', 'Outreach Error', 'Prospect Error'],
    datasets: [{
      label: 'Error Count',
      data: [1512, 832, 352, 328, 272, 32],
      backgroundColor: [
        'rgba(239, 68, 68, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(236, 72, 153, 0.6)',
        'rgba(139, 92, 246, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(156, 163, 175, 0.6)'
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)', 'rgba(245, 158, 11, 1)', 'rgba(236, 72, 153, 1)',
        'rgba(139, 92, 246, 1)', 'rgba(168, 85, 247, 1)', 'rgba(156, 163, 175, 1)'
      ],
      borderWidth: 1
    }]
  };
  
  const errorLogsData = {
    labels: ['Duplicates', 'Field Validation', 'Misc', 'Inactive Owner', 'Outreach Tech', 'Deleted/Merged', 'Salesforce Sync'],
    datasets: [{
      label: 'Error Log Count',
      data: [6535, 1785, 1306, 157, 101, 104, 4],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1
    }]
  };

  const capacityData = {
    owners: ['Milla Nordwall', 'Michele Fiorentino', 'Steve Belin', 'Ashley Melhem', 'Marie Wollstadt', 'Patrick Blommel', 'Donna Saggione', 'Taylor Smart'],
    pastDueTasks: [256, 0, 0, 88, 606, 199, 505, 8],
    onTimeCompletion: [68.3, 62.1, 42.6, 30, 30.9, 31.6, 28, 23],
    avgTouches: [2, 3.2, 4.5, 4.3, 2.7, 5.8, 2.4, 1.9],
    avgDailyTasks: [60.1, 55, 38.6, 44, 37.2, 36.5, 30.1, 16.3]
  };

  const collectionsData = {
    labels: ['Outbound', 'Event', 'Inbound (High Priority)', 'Inbound', 'Other', 'Partner', 'Nurture', 'Re-Engage'],
    datasets: [
      {
        label: 'Total Prospects Added',
        data: [27565, 9633, 2400, 1766, 914, 569, 303, 17],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        yAxisID: 'y',
      },
      {
        label: 'Avg Reply Rate (%)',
        data: [2.8, 2.86, 52.58, 11.88, 2.6, 0.7, 0.85, 3.85],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        type: 'line',
        yAxisID: 'y1',
        tension: 0.2,
      },
    ]
  };
  
  // --- CHART OPTIONS ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeInOutQuart' as const },
    plugins: { legend: { position: 'top' as const } }
  };
  
  const stackedBarOptions = { ...chartOptions, scales: { x: { stacked: true }, y: { stacked: true } } };
  
  const multiAxisOptions = (y1Label: string, y2Label: string) => ({
    ...chartOptions,
    scales: {
      y: { type: 'linear' as const, display: true, position: 'left' as const, title: { display: true, text: y1Label } },
      y1: { type: 'linear' as const, display: true, position: 'right' as const, title: { display: true, text: y2Label }, grid: { drawOnChartArea: false } },
    }
  });

  // --- UI & STYLING ---
  const getColorClasses = (color: string, isActive: boolean) => ({
    blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-blue-600 border-gray-200 hover:bg-blue-50',
    red: isActive ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-red-600 border-gray-200 hover:bg-red-50',
    orange: isActive ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-white text-orange-600 border-gray-200 hover:bg-orange-50',
    green: isActive ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-green-600 border-gray-200 hover:bg-green-50'
  })[color as keyof ReturnType<typeof getColorClasses>];
  
  const FindingCard: React.FC<{id: string, title: string, children: React.ReactNode}> = ({id, title, children}) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => toggleFinding(id)} className="w-full p-4 text-left hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expandedFindings[id] ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {expandedFindings[id] && (
        <div className="px-4 pb-4 border-t border-gray-200 bg-white">
          <div className="pt-4 text-gray-700 leading-relaxed space-y-2">{children}</div>
        </div>
      )}
    </div>
  );

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch(activeTab) {
      case 'funnel': return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Leads vs. Contacts by Seniority</h4>
              <div className="h-96"><Bar key={`chart1-${chartAnimationKey}`} data={leadsVsContactsData} options={stackedBarOptions} /></div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Funnel Conversion by Seniority</h4>
              <div className="h-96"><Bar key={`chart2-${chartAnimationKey}`} data={funnelMetricsData} options={multiAxisOptions('Contacts Touched', 'Conversion %')} /></div>
            </div>
          </div>
          <FindingCard id="funnel-findings" title="Key Funnel Insights">
            <p>• The majority of outreach volume targets 'Other' and 'Director' seniority levels, with over 30,000 contacts touched combined.</p>
            <p>• Directors and Managers show the highest reply rates (over 7%), significantly outperforming other segments.</p>
            <p>• Despite high touch volume, prospects with 'Blank Title' have the lowest meeting conversion rate (0.22%), suggesting poor data quality or targeting for this segment.</p>
            <p>• While C-level has a lower reply rate, it is still a significant volume and warrants dedicated, high-touch sequences.</p>
          </FindingCard>
        </div>
      );
      case 'health': return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Top Sequence Errors</h4>
              <div className="h-96"><Pie key={`chart3-${chartAnimationKey}`} data={sequenceStatesData} options={chartOptions} /></div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Salesforce Sync Error Logs</h4>
              <div className="h-96"><Bar key={`chart4-${chartAnimationKey}`} data={errorLogsData} options={{...chartOptions, indexAxis: 'y' as const}} /></div>
            </div>
          </div>
          <FindingCard id="health-findings" title="Key System & Data Health Insights">
            <p>• <strong>Critical Finding:</strong> Over 6,500 sync errors are caused by Duplicates, which is the single largest technical issue impacting data integrity and system performance.</p>
            <p>• Deliverability and Template Syntax errors account for the vast majority of sequence failures, indicating both technical email setup issues and a need for better sequence QA.</p>
            <p>• Field Validation errors are the second most common sync issue, pointing to misaligned field configurations between Salesforce and Outreach.</p>
          </FindingCard>
        </div>
      );
      case 'capacity': return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Current Past Due Tasks by Rep</h4>
              <div className="h-96"><Bar key={`chart5-${chartAnimationKey}`} data={{labels: capacityData.owners, datasets:[{label: 'Past Due Tasks', data: capacityData.pastDueTasks, backgroundColor: 'rgba(239, 68, 68, 0.6)'}]}} options={{...chartOptions, indexAxis: 'y' as const}} /></div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">On-Time Task Completion by Rep (%)</h4>
              <div className="h-96"><Bar key={`chart6-${chartAnimationKey}`} data={{labels: capacityData.owners, datasets:[{label: 'On-Time Completion %', data: capacityData.onTimeCompletion, backgroundColor: 'rgba(16, 185, 129, 0.6)'}]}} options={{...chartOptions, indexAxis: 'y' as const}} /></div>
            </div>
          </div>
          <FindingCard id="capacity-findings" title="Key Team Capacity Insights">
            <p>• There is a significant disparity in workload and performance. Marie Wollstadt and Donna Saggione have over 500 past-due tasks each, indicating severe capacity overload.</p>
            <p>• Milla Nordwall and Michele Fiorentino demonstrate high performance with high on-time completion rates (over 60%) and manageable past-due tasks, suggesting effective workload management.</p>
            <p>• Reps with lower on-time completion rates (below 40%) consistently have higher numbers of past-due tasks, confirming a direct link between being overwhelmed and falling behind.</p>
          </FindingCard>
        </div>
      );
      case 'sequences': return (
         <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Sequence Collection Performance</h4>
            <div className="h-[500px]"><Bar key={`chart7-${chartAnimationKey}`} data={collectionsData} options={multiAxisOptions('Prospects Added', 'Avg Reply Rate (%)')} /></div>
          </div>
          <FindingCard id="sequence-findings" title="Key Sequence Performance Insights">
            <p>• <strong>Critical Finding:</strong> 'Inbound (High Priority)' sequences are extraordinarily effective, with a reply rate over 50%, yet they are used on a relatively small number of prospects (2,400).</p>
            <p>• 'Outbound' and 'Event' collections account for the vast majority of outreach volume but have very low reply rates (under 3%), indicating a major inefficiency in the primary GTM motion.</p>
            <p>• 'Inbound' (standard priority) also performs very well with a nearly 12% reply rate, reinforcing that inbound motions are a major strength to be scaled.</p>
          </FindingCard>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Performance Insights: A Data-Driven Analysis
        </h1>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    getColorClasses(tab.color, activeTab === tab.id)
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default InsightMap;
