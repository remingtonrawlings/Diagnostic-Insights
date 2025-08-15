import React from 'react';
import { Users, Calendar, Play, Headphones, Building, ArrowRight, CheckCircle, DollarSign } from 'lucide-react';

const ChangeManagement: React.FC = () => {
  const implementationPhases = [
    {
      icon: Play,
      title: 'Phase 1: Foundation (Month 1)',
      description: 'Critical system fixes and process standardization',
      timeline: '30 days',
      color: 'red',
      items: [
        'Integration audit and system cleanup',
        'GTM Operations specialist hire',
        'Salesforce configuration completion',
        'Critical handoff process redefinition'
      ]
    },
    {
      icon: Building,
      title: 'Phase 2: Process Rollout (Month 2)',
      description: 'New processes and content strategy implementation',
      timeline: '60 days',
      color: 'orange',
      items: [
        'Persona workshop execution',
        'Sequence optimization and deployment',
        'Tool training and adoption',
        'Performance monitoring setup'
      ]
    },
    {
      icon: Users,
      title: 'Phase 3: Optimization (Month 3)',
      description: 'Fine-tuning and continuous improvement',
      timeline: '90 days',
      color: 'green',
      items: [
        'Performance analysis and adjustments',
        'Advanced feature implementation',
        'Team coaching and development',
        'Success metric evaluation'
      ]
    }
  ];

  const champions = [
    {
      name: 'Tyler Lynch',
      role: 'Content & Enablement Lead',
      responsibility: 'Content strategy and team enablement'
    },
    {
      name: 'Brandon Baxter',
      role: 'Enterprise Methodology Expert',
      responsibility: 'Process design and optimization'
    },
    {
      name: 'Jordan McNamara',
      role: 'Process Integration Specialist',
      responsibility: 'System integration and workflow management'
    }
  ];

  const nextSteps = [
    {
      icon: Play,
      title: 'Launch Phase 2 Monitoring',
      description: '3-month monitoring and optimization period',
      timeline: 'Immediate',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Weekly Manager Coaching',
      description: 'Weekly manager coaching sessions (2 hours/week)',
      timeline: 'Ongoing',
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Monthly Leadership Reviews',
      description: 'Monthly leadership strategic guidance meetings',
      timeline: 'Monthly',
      color: 'purple'
    },
    {
      icon: DollarSign,
      title: 'Budget Finalization',
      description: 'Finalize budget for GTM Ops hire and consulting services',
      timeline: '2 weeks',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      purple: 'text-purple-500',
      orange: 'text-orange-500',
      red: 'text-red-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Change Management: Implementation & Next Steps
        </h1>
        
        <p className="text-gray-700 mb-8">
          Comprehensive change management strategy combining implementation planning with immediate next steps 
          to ensure successful transformation of your revenue operations.
        </p>

        {/* Implementation Plan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Roadmap</h2>
          
          <div className="grid gap-8">
            {implementationPhases.map((phase, index) => {
              const Icon = phase.icon;
              
              return (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border ${getColorClasses(phase.color)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className={`${getIconColor(phase.color)}`} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {phase.title}
                        </h3>
                        <span className="text-sm font-medium px-3 py-1 bg-white rounded-full border border-gray-200">
                          {phase.timeline}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {phase.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-2">
                            <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Change Management Champions */}
        <div className="mb-12">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="text-green-500" size={24} />
              <h3 className="text-xl font-semibold text-green-800">Change Management Champions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {champions.map((champion, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-1">{champion.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{champion.role}</p>
                  <p className="text-xs text-gray-500">{champion.responsibility}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consulting & Services */}
        <div className="mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3 mb-6">
              <Headphones className="text-blue-500" size={24} />
              <h3 className="text-xl font-semibold text-blue-800">Consulting & Services Strategy</h3>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Outreach Managed Services</h4>
                <p className="text-gray-700 text-sm">
                  Engage Outreach Managed Services for ongoing support, optimization, and best practice implementation 
                  to ensure continuous improvement and expert guidance.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Salesforce Consulting Partnership</h4>
                <p className="text-gray-700 text-sm">
                  Leverage Salesforce Consulting expertise for automation setup, routing implementation, 
                  and integration optimization to maximize platform effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Immediate Next Steps (Next 60 Days)</h2>
          
          <div className="grid gap-6">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border ${getColorClasses(step.color)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className={`${getIconColor(step.color)}`} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <span className="text-sm font-medium px-2 py-1 bg-white rounded-full border border-gray-200">
                          {step.timeline}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Building className="text-gray-500" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Success Metrics & KPIs</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Short-term Success Indicators (30 days)</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">System integration completion (100%)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">Process documentation finalized</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">Initial training sessions completed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">GTM Operations specialist onboarded</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Long-term Performance Goals (90 days)</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">30%+ improvement in email response rates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">50% reduction in handoff time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">25% increase in SDR productivity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-sm">90%+ system health score achievement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ready to Proceed */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Implementation Readiness</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            All foundational analysis is complete. The team is aligned on priorities and ready to execute 
            the recommended changes. Success depends on consistent execution, ongoing monitoring, and commitment to the change process.
          </p>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Critical Success Factors:</h4>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                <span className="text-sm">Executive sponsorship and resource commitment</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                <span className="text-sm">Regular progress reviews and course corrections</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                <span className="text-sm">Clear communication across all stakeholder groups</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                <span className="text-sm">Phased implementation to minimize disruption</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
              <Play size={18} />
              <span>Ready to Launch Implementation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagement;