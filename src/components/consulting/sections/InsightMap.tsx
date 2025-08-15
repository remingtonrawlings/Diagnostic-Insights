import React, { useState, useEffect } from 'react';
import { Users, Search, MessageSquare, ChevronDown, ChevronUp, BarChart3, Database, Layers, Target, FileText, Gauge } from 'lucide-react';
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
  RadialLinearScale,
} from 'chart.js';
import { Bar, Doughnut, PolarArea, Line, Pie } from 'react-chartjs-2';

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
  RadialLinearScale
);

const InsightMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState('targeting');
  const [expandedFindings, setExpandedFindings] = useState<Record<number, boolean>>({});
  const [chartAnimationKey, setChartAnimationKey] = useState(0);

  const toggleFinding = (index: number) => {
    setExpandedFindings(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      setChartAnimationKey(prev => prev + 1);
    }
  };

  const tabs = [
    {
      id: 'targeting',
      title: 'Targeting Strategy',
      icon: Target,
      color: 'blue'
    },
    {
      id: 'content',
      title: 'Content Breakdown',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 'execution',
      title: 'Seller Execution',
      icon: Users,
      color: 'green'
    },
    {
      id: 'capacity',
      title: 'Capacity Insights',
      icon: Gauge,
      color: 'orange'
    }
  ];

  const findings = {
    targeting: [
      {
        title: 'Unsustainable Territory Loads',
        description: 'Extremely high account assignments are creating unsustainable workloads for individual SDRs, leading to decreased quality and effectiveness.',
        impact: 'High',
        details: 'Current SDR account loads are 3x industry benchmarks, resulting in superficial engagement and missed opportunities.'
      },
      {
        title: 'Inefficient Lead-Based Approach',
        description: 'Current lead-based routing system is causing conversion issues and creating confusion in the handoff process between marketing and sales.',
        impact: 'Medium',
        details: 'Lead routing delays average 2.3 days, with 18% of leads never being contacted due to routing failures.'
      },
      {
        title: 'Inconsistent Account Prioritization',
        description: 'Need to scale the "Brandon Baxter" enterprise methodology across the entire team to ensure consistent account prioritization and approach.',
        impact: 'High',
        details: 'Only 23% of SDRs use consistent prioritization methods, leading to misallocated effort and resources.'
      }
    ],
    content: [
      {
        title: 'Low Email Effectiveness',
        description: 'Email campaigns showing extremely low performance with high bounce rates and minimal reply rates, indicating fundamental content and targeting issues.',
        impact: 'High',
        details: 'Current email open rates at 18%, reply rates at 2.3% - significantly below industry standards of 25% and 8% respectively.'
      },
      {
        title: 'Underutilized Valuable Content',
        description: 'Tyler Lynch has created valuable content assets that are not being systematically leveraged across the organization.',
        impact: 'Medium',
        details: 'Over 45 high-quality content pieces exist but only 12% are actively used in sequences.'
      },
      {
        title: 'Missing Competitive Intelligence',
        description: 'Lack of structured competitive intelligence framework and content-to-deal-stage mapping is limiting sales effectiveness.',
        impact: 'Medium',
        details: 'No formal competitive battlecards or content mapping exists, leading to generic messaging.'
      }
    ],
    execution: [
      {
        title: 'Broken Handoff Points',
        description: 'Critical handoff points (MQL→SDR, SDR→AE, Sales→CS) are broken, causing pipeline parking lots and lost expansion opportunities.',
        impact: 'High',
        details: 'Handoff success rates: MQL→SDR (65%), SDR→AE (78%), Sales→CS (45%) - all below target thresholds.'
      },
      {
        title: 'Excessive Administrative Time',
        description: 'SDRs spending disproportionate time on database hygiene instead of core selling activities, reducing overall productivity.',
        impact: 'High',
        details: 'SDRs spend 40% of time on admin tasks vs. 35% on actual selling activities.'
      },
      {
        title: 'Inconsistent Tech Stack Adoption',
        description: 'Poor integration and adoption of existing tools (NUCs, Outreach, Gong) limiting team effectiveness and visibility.',
        impact: 'Medium',
        details: 'Tool adoption rates: Outreach (67%), Gong (45%), NUCs (23%) - creating visibility gaps.'
      }
    ],
    capacity: [
      {
        title: 'Management Churn Impact',
        description: 'High SDR management turnover has significantly impacted team performance and process stability across the organization.',
        impact: 'High',
        details: '3 SDR managers in 18 months, resulting in 23% decrease in team productivity and process consistency.'
      },
      {
        title: 'Poor Inbound MQL Quality',
        description: 'Low-quality inbound MQLs are consuming significant SDR capacity without generating meaningful pipeline contribution.',
        impact: 'Medium',
        details: 'Only 12% of inbound MQLs convert to opportunities, wasting 35% of SDR capacity on unqualified prospects.'
      },
      {
        title: 'Technology Gap Visibility Issues',
        description: 'Current technology gaps are creating blind spots that reduce team efficiency and management oversight capabilities.',
        impact: 'Medium',
        details: 'Lack of unified dashboard means 65% of activities are not visible to management.'
      }
    ]
  };

  // Chart data for different tabs
  const chartData = {
    targeting: {
      labels: ['Enterprise SDRs', 'Commercial SDRs', 'Inbound SDRs'],
      datasets: [{
        label: 'Account Load per SDR',
        data: [450, 380, 320],
        backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(34, 197, 94, 0.6)'],
        borderColor: ['rgba(239, 68, 68, 1)', 'rgba(245, 158, 11, 1)', 'rgba(34, 197, 94, 1)'],
        borderWidth: 1,
      }],
    },
    content: {
      labels: ['Email Open Rate', 'Reply Rate', 'Bounce Rate', 'Click Through Rate'],
      datasets: [{
        data: [18, 2.3, 15, 4.2],
        backgroundColor: [
          'rgba(139, 92, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      }],
    },
    execution: {
      labels: ['Selling Time', 'Admin Time', 'Training Time', 'Meetings'],
      datasets: [{
        data: [35, 40, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(245, 158, 11, 0.6)',
        ],
      }],
    },
    capacity: {
      labels: ['MQL→SDR', 'SDR→AE', 'AE→SE', 'Sales→CS'],
      datasets: [{
        label: 'Handoff Success Rate (%)',
        data: [65, 78, 82, 45],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      }],
    },
  };

  // Account Targeting Data
  const accountTargetingData = {
    regionPerformance: {
      labels: ['Americas', 'EMEA', 'APAC'],
      datasets: [
        {
          label: 'Prospects Touched',
          data: [2457, 843, 97],
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: 'With Meetings',
          data: [421, 162, 33],
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1,
        },
        {
          label: 'With Opportunities',
          data: [398, 154, 30],
          backgroundColor: 'rgba(139, 92, 246, 0.6)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1,
        }
      ]
    },
    topIndustries: {
      labels: [
        'Banking', 
        'Retail', 
        'Software',
        'Healthcare',
        'Manufacturing',
        'Education',
        'Custom Software & IT',
        'Insurance',
        'Legal Services',
        'Real Estate'
      ],
      datasets: [{
        label: 'Prospect Count',
        data: [412, 324, 287, 255, 221, 203, 196, 178, 152, 139],
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(168, 85, 247, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(239, 68, 68, 0.6)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1,
      }],
    },
    topCombinations: {
      labels: [
        'Americas - Customer - Plastic',
        'Americas - Customer - Education',
        'Americas - Customer - Banking',
        'Americas - Customer - Retail',
        'Americas - Customer - Hospitality',
        'Americas - Customer - Medical',
        'Americas - Customer - Manufacturing',
        'Americas - Customer - Law Firms',
        'Americas - Customer - Non-Profit',
        'Americas - Customer - Technology'
      ],
      datasets: [{
        label: 'Prospect Count',
        data: [123, 60, 42, 38, 34, 32, 31, 30, 29, 28],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }, {
        label: 'Meeting Rate (%)',
        data: [2.44, 3.33, 4.76, 23.68, 5.88, 0, 0, 20, 3.45, 3.57],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'y1',
      }],
    },
  };

  // Collection Summary Data
  const collectionSummaryData = {
    labels: ['Outbound', 'Expansion', 'Partner', 'Inbound', 'Follow-up', 'Re-Engage', 'Nurture'],
    datasets: [
      {
        label: 'Total Sequences',
        data: [114, 11, 6, 8, 5, 5, 3],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Avg Reply Rate (%)',
        data: [4.3, 4.5, 23.3, 23.7, 3.1, 7.0, 12.3],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'y1',
      }
    ]
  };

  // Sequence Step Dropoff Data
  const stepDropoffData = {
    labels: ['Step 0', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9', 'Step 10+'],
    datasets: [
      {
        label: 'Email Tasks',
        data: [13625, 62336, 20782, 27886, 24388, 10924, 19882, 10129, 9243, 5848, 8357],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Call Tasks',
        data: [2274, 13919, 12952, 11877, 10028, 16140, 6272, 10330, 5356, 2063, 8836],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'LinkedIn Tasks',
        data: [0, 1436, 7550, 686, 1934, 1635, 1351, 311, 726, 183, 120],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Capacity Data with recommended thresholds
  const capacityMetricsData = {
    activityThresholds: {
      labels: [
        'Daily Tasks', 
        'Daily Calls', 
        'Daily Emails', 
        'Daily LinkedIn', 
        'Skipped Tasks',
        'Touch/Prospect',
        'Days Overdue'
      ],
      datasets: [
        {
          label: 'Team Average',
          data: [106, 47, 43, 4.5, 2.2, 4.5, 10.8],
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
        {
          label: 'Recommended Threshold',
          data: [85, 40, 35, 10, 1, 8, 1],
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1,
        }
      ]
    },
    touchesPerProspect: {
      labels: [
        'Jordan McNamara',
        'Ryan Barnes',
        'Ethan Jones',
        'Jeffery Booker',
        'Stacey Malone',
        'Stephen Jones',
        'Bruce Greik',
        'Stuart Jones',
        'Reagan Koenig',
        'Justin Press'
      ],
      datasets: [{
        label: 'Average Touches Per Prospect',
        data: [9.0, 11.0, 15.0, 6.6, 5.3, 5.2, 5.1, 1.6, 0.7, 6.3],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }]
    },
    taskCompletionRate: {
      labels: [
        'Jordan McNamara',
        'Ryan Barnes',
        'Ethan Jones',
        'Jeffery Booker',
        'Stacey Malone',
        'Stephen Jones',
        'Bruce Greik',
        'Stuart Jones',
        'Reagan Koenig',
        'Justin Press'
      ],
      datasets: [{
        label: 'On-time Completion Percentage',
        data: [21.2, 59.6, 36.1, 40.6, 33.8, 36.5, 36.5, 74.0, 37.4, 16.5],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }]
    },
    pastDueStatus: {
      labels: [
        'Jeffery Booker',
        'Vince Hicklin',
        'Stephen Jones',
        'Stacey Malone',
        'Quinton Kettell',
        'Ethan Jones',
        'Ryan Barnes',
        'David OBrien',
        'Bruce Greik',
        'Octavius Calloway'
      ],
      datasets: [{
        label: 'Current Past Due Tasks',
        data: [2418, 1762, 1328, 961, 983, 687, 638, 683, 479, 484],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      }]
    }
  };

  // Execution Metrics Data
  const executionMetricsData = {
    averageDailyActivity: {
      labels: [
        'Jordan McNamara',
        'Ryan Barnes',
        'Ethan Jones',
        'Jeffery Booker',
        'Stacey Malone',
        'Stephen Jones',
        'Bruce Greik',
        'Stuart Jones',
        'Reagan Koenig',
        'Justin Press'
      ],
      datasets: [
        {
          label: 'Avg. Daily Tasks',
          data: [443.4, 423.8, 284.6, 224.8, 299.5, 395.6, 155.5, 7.4, 8.8, 39.8],
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        }
      ]
    },
    activityDistribution: {
      labels: [
        'Jordan McNamara',
        'Ryan Barnes',
        'Ethan Jones',
        'Jeffery Booker',
        'Stacey Malone',
        'Stephen Jones',
        'Bruce Greik',
        'Stuart Jones',
        'Reagan Koenig',
        'Justin Press'
      ],
      datasets: [
        {
          label: 'Calls',
          data: [255.2, 299.5, 254.7, 106.8, 0.0, 0.0, 113.4, 0.0, 0.1, 3.2],
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          stack: 'Stack 0',
        },
        {
          label: 'Emails',
          data: [148.8, 94.0, 20.6, 105.9, 279.6, 364.5, 32.8, 4.9, 4.7, 34.3],
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          stack: 'Stack 0',
        },
        {
          label: 'LinkedIn',
          data: [21.8, 20.5, 7.6, 8.6, 10.5, 15.9, 6.6, 2.1, 0.3, 1.1],
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          stack: 'Stack 0',
        },
        {
          label: 'Other',
          data: [0.1, 1.6, 0.3, 3.1, 0.0, 0.0, 13.2, 0.0, 0.1, 0.0],
          backgroundColor: 'rgba(245, 158, 11, 0.6)',
          stack: 'Stack 0',
        },
      ]
    },
    skippedTaskRate: {
      labels: [
        'Jordan McNamara',
        'Ryan Barnes',
        'Ethan Jones',
        'Jeffery Booker',
        'Stacey Malone',
        'Stephen Jones',
        'Bruce Greik',
        'Stuart Jones',
        'Reagan Koenig',
        'Justin Press'
      ],
      datasets: [
        {
          label: 'Skipped Tasks (%)',
          data: [2.7, 2.1, 2.6, 1.5, 2.8, 2.3, 1.7, 0.0, 5.7, 1.8],
          backgroundColor: 'rgba(245, 158, 11, 0.6)',
          borderColor: 'rgba(245, 158, 11, 1)',
          borderWidth: 1,
        },
        {
          label: 'Industry Benchmark',
          data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
          type: 'line',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          pointStyle: 'star',
          pointRadius: 6,
        }
      ]
    }
  };

  // Collection Analysis Data
  const collectionAnalysisData = {
    labels: ['Outbound', 'Expansion', 'Partner', 'Inbound', 'Follow-up', 'Re-Engage', 'Nurture'],
    datasets: [
      {
        label: 'Total Prospects Added',
        data: [69368, 9313, 5561, 4995, 3924, 2221, 597],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Tasks Completed',
        data: [259634, 62443, 19624, 18807, 2984, 7335, 3213],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ]
  };

  const sequencePerformanceData = {
    labels: ['Outbound', 'Expansion', 'Partner', 'Inbound', 'Follow-up', 'Re-Engage', 'Nurture'],
    datasets: [
      {
        label: 'Reply Rate (%)',
        data: [4.31, 4.48, 23.32, 23.67, 3.15, 6.96, 12.28],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Bounce Rate (%)',
        data: [3.74, 4.26, 10.23, 2.35, 8.91, 0.49, 3.24],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Opt-out Rate (%)',
        data: [1.51, 0.85, 4.37, 1.72, 1.57, 1.87, 1.92],
        backgroundColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  // Sequence Health Metrics
  const sequenceHealthData = {
    labels: ['Total Sequences', 'Sequences with Issues'],
    datasets: [{
      data: [152, 98],
      backgroundColor: [
        'rgba(16, 185, 129, 0.6)',
        'rgba(239, 68, 68, 0.6)'
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1,
    }],
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive 
        ? 'bg-blue-100 text-blue-700 border-blue-300' 
        : 'bg-white text-blue-600 border-gray-200 hover:bg-blue-50',
      purple: isActive 
        ? 'bg-purple-100 text-purple-700 border-purple-300' 
        : 'bg-white text-purple-600 border-gray-200 hover:bg-purple-50',
      green: isActive 
        ? 'bg-green-100 text-green-700 border-green-300' 
        : 'bg-white text-green-600 border-gray-200 hover:bg-green-50',
      orange: isActive 
        ? 'bg-orange-100 text-orange-700 border-orange-300' 
        : 'bg-white text-orange-600 border-gray-200 hover:bg-orange-50'
    };
    return colors[color as keyof typeof colors];
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const getChartOptionsByType = (type: string) => {
    if (type === 'targetingRegion') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            title: {
              display: true,
              text: 'Count'
            }
          }
        },
      };
    }
    if (type === 'topCombinations') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            stacked: false,
            position: 'left',
            title: {
              display: true,
              text: 'Prospect Count'
            }
          },
          y1: {
            position: 'right',
            title: {
              display: true,
              text: 'Meeting Rate (%)'
            },
            min: 0,
            max: 100,
            grid: {
              drawOnChartArea: false
            }
          }
        },
      };
    }
    if (type === 'collectionSummary') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            position: 'left',
            title: {
              display: true,
              text: 'Count'
            }
          },
          y1: {
            position: 'right',
            title: {
              display: true,
              text: 'Reply Rate (%)'
            },
            min: 0,
            max: 25,
            grid: {
              drawOnChartArea: false
            }
          }
        },
      };
    }
    if (type === 'stepDropoff') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Task Count'
            }
          }
        },
      };
    }
    if (type === 'capacityThresholds') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            title: {
              display: true,
              text: 'Value'
            }
          }
        },
      };
    }
    if (type === 'executionActivity') {
      return {
        ...chartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Daily Activities'
            }
          }
        },
      };
    }
    return chartOptions;
  };

  const renderChart = () => {
    const data = chartData[activeTab as keyof typeof chartData];
    
    switch (activeTab) {
      case 'targeting':
        return <Bar key={`chart-${chartAnimationKey}`} data={data} options={chartOptions} />;
      case 'content':
        return <Doughnut key={`chart-${chartAnimationKey}`} data={data} options={chartOptions} />;
      case 'execution':
        return <PolarArea key={`chart-${chartAnimationKey}`} data={data} options={chartOptions} />;
      case 'capacity':
        return <Bar key={`chart-${chartAnimationKey}`} data={data} options={chartOptions} />;
      default:
        return <Bar key={`chart-${chartAnimationKey}`} data={data} options={chartOptions} />;
    }
  };

  const renderAccountTargetingCharts = () => {
    if (activeTab !== 'targeting') return null;
    
    return (
      <div className="mt-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-4">Account Targeting Analysis</h3>
          <p className="text-blue-700 mb-6">
            Analysis of account targeting efforts across regions, industries and account types to identify performance patterns and optimization opportunities.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-4">Region Performance Analysis</h4>
              <div className="h-80">
                <Bar 
                  key={`region-chart-${chartAnimationKey}`}
                  data={accountTargetingData.regionPerformance} 
                  options={getChartOptionsByType('targetingRegion')} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-4">Top 10 Industries by Prospect Count</h4>
              <div className="h-80">
                <Bar 
                  key={`industries-chart-${chartAnimationKey}`}
                  data={accountTargetingData.topIndustries} 
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-4">Top 10 Account Combinations by Prospect Count</h4>
            <div className="h-80">
              <Bar 
                key={`combinations-chart-${chartAnimationKey}`}
                data={accountTargetingData.topCombinations} 
                options={getChartOptionsByType('topCombinations')} 
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">3,397</div>
              <div className="text-sm text-gray-600">Total Accounts Analyzed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-green-600">616</div>
              <div className="text-sm text-gray-600">Accounts with Meetings</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-orange-600">18.1%</div>
              <div className="text-sm text-gray-600">Overall Meeting Rate</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Key Targeting Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-blue-800 mb-2">Geographic Focus</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 72.3% of prospects are in Americas region</li>
                  <li>• EMEA accounts show higher meeting rates (19.2%)</li>
                  <li>• APAC region is significantly underutilized (only 2.9% of prospects)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-blue-800 mb-2">Industry Performance</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Banking, Retail and Software comprise 30% of all targeting</li>
                  <li>• Legal Services show highest meeting rate (21.1%)</li>
                  <li>• Insurance shows strong meeting-to-opportunity conversion (97.8%)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInboundPersonasCharts = () => {
    if (activeTab !== 'targeting') return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-4">Inbound Campaign Member Analysis</h3>
          <p className="text-blue-700 mb-6">
            Analysis of inbound marketing campaign members segmented by persona, seniority, and department targeting.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-4">Campaign Volume by Seniority Level</h4>
              <div className="h-80">
                <Bar 
                  key={`seniority-chart-${chartAnimationKey}`}
                  data={{
                    labels: ['CXO / Founder', 'Director / Head of', 'Manager', 'VP', 'Unspecified', 'Blank Title'],
                    datasets: [{
                      label: 'Campaign Members',
                      data: [7935, 12099, 20367, 6708, 28727, 1767],
                      backgroundColor: [
                        'rgba(99, 102, 241, 0.6)',
                        'rgba(168, 85, 247, 0.6)',
                        'rgba(236, 72, 153, 0.6)',
                        'rgba(245, 101, 101, 0.6)',
                        'rgba(251, 191, 36, 0.6)',
                        'rgba(156, 163, 175, 0.6)',
                      ],
                      borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(245, 101, 101, 1)',
                        'rgba(251, 191, 36, 1)',
                        'rgba(156, 163, 175, 1)',
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={chartOptions} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-4">Response Rates by Department (%)</h4>
              <div className="h-80">
                <Bar 
                  key={`response-rates-chart-${chartAnimationKey}`}
                  data={{
                    labels: ['CISO', 'Cybersecurity', 'IT', 'Infrastructure', 'InfoSec', 'Network', 'Security', 'GRC'],
                    datasets: [{
                      label: 'Response Rate (%)',
                      data: [11.2, 8.5, 9.8, 7.2, 6.8, 3.2, 12.4, 13.8],
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(168, 85, 247, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(236, 72, 153, 0.6)',
                        'rgba(239, 68, 68, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(139, 92, 246, 0.6)',
                      ],
                      borderColor: [
                        'rgba(34, 197, 94, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(139, 92, 246, 1)',
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-4">Top Departments: Total vs Responded</h4>
            <div className="h-80">
              <Bar 
                key={`top-departments-chart-${chartAnimationKey}`}
                data={{
                  labels: ['Unspecified Dept', 'Network', 'IT', 'Manager', 'Infrastructure'],
                  datasets: [{
                    label: 'Total Members',
                    data: [18457, 13722, 15862, 20367, 4463],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                  }, {
                    label: 'Responded',
                    data: [2492, 242, 1147, 1233, 245],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1,
                  }]
                }}
                options={chartOptions} 
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">77,603</div>
              <div className="text-sm text-gray-600">Total Campaign Members</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-green-600">5,359</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-orange-600">6.9%</div>
              <div className="text-sm text-gray-600">Overall Response Rate</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Key Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800">High-Volume Segments</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Unspecified Seniority: 28,727 members (37%)</li>
                  <li>• Manager Level: 20,367 members (26%)</li>
                  <li>• Network Department: 13,722 members (18%)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800">Best Response Rates</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• GRC Department: 13.8% response rate</li>
                  <li>• Security Department: 12.4% response rate</li>
                  <li>• CISO Department: 11.2% response rate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactsActivityCharts = () => {
    if (activeTab !== 'targeting') return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-4">Contacts with Activity Analysis</h3>
          <p className="text-purple-700 mb-6">
            Analysis of all contacts approached by the sales team with recorded activity in the last 6 months.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Activity Volume by Seniority Level</h4>
              <div className="h-80">
                <Bar 
                  key={`activity-seniority-chart-${chartAnimationKey}`}
                  data={{
                    labels: ['Unspecified Seniority', 'Manager', 'Director / Head of', 'CXO / Founder', 'VP', 'Blank Title'],
                    datasets: [{
                      label: 'Contacts with Activity',
                      data: [19879, 10930, 7162, 1993, 1611, 1347],
                      backgroundColor: [
                        'rgba(168, 85, 247, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(236, 72, 153, 0.6)',
                        'rgba(156, 163, 175, 0.6)',
                      ],
                      borderColor: [
                        'rgba(168, 85, 247, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(156, 163, 175, 1)',
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={chartOptions} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Engagement Rates by Department (%)</h4>
              <div className="h-80">
                <Bar 
                  key={`activity-engagement-chart-${chartAnimationKey}`}
                  data={{
                    labels: ['GRC', 'Security', 'CISO', 'Cybersecurity', 'IT', 'Infrastructure', 'InfoSec', 'Network'],
                    datasets: [{
                      label: 'Activity Engagement Rate (%)',
                      data: [65.2, 58.5, 51.8, 50.2, 57.8, 64.1, 47.3, 45.2],
                      backgroundColor: [
                        'rgba(139, 92, 246, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(34, 197, 94, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(168, 85, 247, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(236, 72, 153, 0.6)',
                        'rgba(239, 68, 68, 0.6)',
                      ],
                      borderColor: [
                        'rgba(139, 92, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(239, 68, 68, 1)',
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-purple-200">
            <h4 className="font-medium text-gray-900 mb-4">Lead vs Contact Distribution</h4>
            <div className="h-80 flex justify-center">
              <Doughnut 
                key={`lead-contact-chart-${chartAnimationKey}`}
                data={{
                  labels: ['Leads', 'Contacts'],
                  datasets: [{
                    data: [72836, 4767],
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.6)',
                      'rgba(16, 185, 129, 0.6)',
                    ],
                    borderColor: [
                      'rgba(59, 130, 246, 1)',
                      'rgba(16, 185, 129, 1)',
                    ],
                    borderWidth: 2,
                  }]
                }}
                options={chartOptions} 
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">77,603</div>
              <div className="text-sm text-gray-600">Total Contacts</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-green-600">42,922</div>
              <div className="text-sm text-gray-600">With Activity</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-orange-600">55.3%</div>
              <div className="text-sm text-gray-600">Activity Rate</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-blue-600">5,359</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Activity Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-purple-800">Highest Activity Segments</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Unspecified Seniority: 19,879 active contacts (46%)</li>
                  <li>• Manager Level: 10,930 active contacts (25%)</li>
                  <li>• Director/Head Level: 7,162 active contacts (17%)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-purple-800">Best Engagement Rates</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• GRC Department: 65.2% engagement rate</li>
                  <li>• Infrastructure: 64.1% engagement rate</li>
                  <li>• Security Department: 58.5% engagement rate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
            <h5 className="font-medium text-purple-800 mb-2">Key Observations:</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 94% of active prospects are leads vs. 6% contacts - indicates strong top-of-funnel focus</li>
              <li>• Activity engagement rates vary significantly by department (45-65% range)</li>
              <li>• Unspecified seniority represents largest opportunity for better segmentation</li>
              <li>• GRC and Infrastructure departments show highest engagement despite smaller volumes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderContentBreakdownCharts = () => {
    if (activeTab !== 'content') return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-4">Sequence Collection Analysis</h3>
          <p className="text-purple-700 mb-6">
            Analysis of collection performance and sequence characteristics across the system.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Collection Summary</h4>
              <div className="h-80">
                <Bar 
                  key={`collection-chart-${chartAnimationKey}`}
                  data={collectionSummaryData} 
                  options={getChartOptionsByType('collectionSummary')} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Sequence Performance by Collection</h4>
              <div className="h-80">
                <Bar 
                  key={`performance-chart-${chartAnimationKey}`}
                  data={sequencePerformanceData}
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Collection Activity Breakdown</h4>
              <div className="h-80">
                <Bar 
                  key={`collection-activity-${chartAnimationKey}`}
                  data={collectionAnalysisData}
                  options={chartOptions} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-4">Sequence Health Analysis</h4>
              <div className="h-80 flex items-center justify-center">
                <Pie 
                  key={`health-chart-${chartAnimationKey}`}
                  data={sequenceHealthData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return context.label + ': ' + context.formattedValue + ' (' + 
                              Math.round((parseInt(context.raw as string) / 152) * 100) + '%)';
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-purple-200">
            <h4 className="font-medium text-gray-900 mb-4">Step Type Dropoff by Sequence Step</h4>
            <div className="h-80">
              <Bar 
                key={`dropoff-chart-${chartAnimationKey}`}
                data={stepDropoffData}
                options={getChartOptionsByType('stepDropoff')} 
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">152</div>
              <div className="text-sm text-gray-600">Total Sequences</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-red-600">63%</div>
              <div className="text-sm text-gray-600">With Reply Rate &lt; 10%</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-orange-600">48%</div>
              <div className="text-sm text-gray-600">With Step Count Issues</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Collection Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-purple-800">Performance Leaders</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Partner collections: 23.3% average reply rate</li>
                  <li>• Inbound collections: 23.7% average reply rate</li>
                  <li>• Nurture collections: 12.3% average reply rate</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-purple-800">Sequence Issues</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 37% of sequences have optimal step count (10-15 steps)</li>
                  <li>• 45% of sequences lack sufficient call steps</li>
                  <li>• 22% of sequences have overdue task problems</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
            <h5 className="font-medium text-purple-800 mb-2">Key Observations:</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Step participation drops significantly after step 5 across all activity types</li>
              <li>• Email is dominant channel (63% of all activities)</li>
              <li>• LinkedIn usage spikes in steps 1-2 then declines rapidly</li>
              <li>• Outbound collections have 76% of all sequences but only 4.3% average reply rate</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderCapacityInsightsCharts = () => {
    if (activeTab !== 'capacity') return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="font-semibold text-orange-800 mb-4">Rep Capacity Analysis</h3>
          <p className="text-orange-700 mb-6">
            Detailed analysis of SDR capacity utilization, workload distribution, and performance metrics.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-4">Activity Thresholds vs Recommendations</h4>
              <div className="h-80">
                <Bar 
                  key={`activity-thresholds-${chartAnimationKey}`}
                  data={capacityMetricsData.activityThresholds}
                  options={getChartOptionsByType('capacityThresholds')}
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-4">Average Touches Per Prospect</h4>
              <div className="h-80">
                <Bar 
                  key={`touches-per-prospect-${chartAnimationKey}`}
                  data={capacityMetricsData.touchesPerProspect}
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-4">On-Time Task Completion Rate (%)</h4>
              <div className="h-80">
                <Bar 
                  key={`completion-rate-${chartAnimationKey}`}
                  data={capacityMetricsData.taskCompletionRate}
                  options={chartOptions} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-4">Top 10 Reps by Past Due Tasks</h4>
              <div className="h-80">
                <Bar 
                  key={`past-due-${chartAnimationKey}`}
                  data={capacityMetricsData.pastDueStatus}
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-600">10,890</div>
              <div className="text-sm text-gray-600">Total Past Due Tasks</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-orange-200 text-center">
              <div className="text-2xl font-bold text-red-600">43%</div>
              <div className="text-sm text-gray-600">Average On-time Completion</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-orange-200 text-center">
              <div className="text-2xl font-bold text-blue-600">6.5</div>
              <div className="text-sm text-gray-600">Avg. Touches Per Prospect</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Capacity Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-orange-800">Workload Patterns</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Top 3 reps manage 61% of all prospects</li>
                  <li>• Significant activity volume disparity between reps</li>
                  <li>• Email-heavy workload for most reps (40-90% of all tasks)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-orange-800">Task Management Issues</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Team averages 22.2% above recommended daily tasks</li>
                  <li>• On-time completion rates vary from 16% to 74%</li>
                  <li>• Top 5 reps account for 68% of all past due tasks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderExecutionMetricsCharts = () => {
    if (activeTab !== 'execution') return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-4">Seller Execution Analysis</h3>
          <p className="text-green-700 mb-6">
            Detailed breakdown of sales rep activity distribution, execution patterns and performance metrics.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-gray-900 mb-4">Average Daily Activity by Rep</h4>
              <div className="h-80">
                <Bar 
                  key={`daily-activity-${chartAnimationKey}`}
                  data={executionMetricsData.averageDailyActivity}
                  options={chartOptions} 
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-gray-900 mb-4">Activity Distribution by Rep</h4>
              <div className="h-80">
                <Bar 
                  key={`activity-distribution-${chartAnimationKey}`}
                  data={executionMetricsData.activityDistribution}
                  options={getChartOptionsByType('executionActivity')} 
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h4 className="font-medium text-gray-900 mb-4">Skipped Task Rate vs Benchmark</h4>
            <div className="h-80">
              <Bar 
                key={`skipped-tasks-${chartAnimationKey}`}
                data={executionMetricsData.skippedTaskRate}
                options={chartOptions} 
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">374,653</div>
              <div className="text-sm text-gray-600">Total Tasks Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="text-2xl font-bold text-blue-600">192,530</div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="text-2xl font-bold text-orange-600">123,066</div>
              <div className="text-sm text-gray-600">Calls Attempted</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="text-2xl font-bold text-purple-600">16,175</div>
              <div className="text-sm text-gray-600">LinkedIn Tasks</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Execution Insights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-green-800">Activity Patterns</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Wide variation in activity levels (7.4 to 443.4 tasks/day)</li>
                  <li>• Top 6 reps generate 89% of all activity</li>
                  <li>• Significant channel bias by rep (some call-heavy, others email-heavy)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-green-800">Execution Recommendations</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Normalize activity expectations across team (85 tasks/day)</li>
                  <li>• Balance channel mix to 45% calls, 40% emails, 15% social</li>
                  <li>• Implement 8 touches per prospect optimal benchmark</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
            <h5 className="font-medium text-green-800 mb-2">Key Observations:</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Skipped task rates average 2.2× the recommended benchmark</li>
              <li>• 36% of reps are working below capacity (under 40 tasks/day)</li>
              <li>• 45% of reps have sub-optimal channel mix (over 70% in one channel)</li>
              <li>• Top 3 performers have balanced activity across all channels</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderFindingsByTab = () => {
    const currentFindings = findings[activeTab as keyof typeof findings];
    
    return (
      <div className="space-y-4">
        {currentFindings.map((finding, index) => {
          const isExpanded = expandedFindings[index];
          
          return (
            <div 
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFinding(index)}
                className="w-full p-6 text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{finding.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{finding.description}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getImpactColor(finding.impact)}`}>
                        {finding.impact} Impact
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {isExpanded ? 
                      <ChevronUp className="text-gray-400" size={20} /> : 
                      <ChevronDown className="text-gray-400" size={20} />
                    }
                  </div>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 bg-white">
                  <div className="pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Detailed Analysis:</h4>
                    <p className="text-gray-700 leading-relaxed">{finding.details}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Quantitative Analysis: Connecting the Dots
        </h1>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    getColorClasses(tab.color, isActive)
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Targeting Charts - Only show for targeting tab */}
        {renderAccountTargetingCharts()}

        {/* Inbound Personas Charts - Only show for targeting tab */}
        {renderInboundPersonasCharts()}

        {/* Contacts with Activity Charts - Only show for targeting tab */}
        {renderContactsActivityCharts()}
        
        {/* Content Breakdown Charts - Only show for content tab */}
        {renderContentBreakdownCharts()}
        
        {/* Capacity Insights Charts - Only for capacity tab */}
        {renderCapacityInsightsCharts()}
        
        {/* Seller Execution Charts - Only for execution tab */}
        {renderExecutionMetricsCharts()}

        {renderFindingsByTab()}

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Key Insight</h3>
          <p className="text-blue-700">
            These findings reveal systemic challenges that require coordinated solutions across technology, 
            process, and people. Addressing them in isolation will limit the overall impact of improvements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightMap;