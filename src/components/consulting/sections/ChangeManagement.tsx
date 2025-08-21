import React from 'react';
import { Users, Calendar, Play, Building, ArrowRight, CheckCircle, TrendingUp, Shield, Wrench, Zap } from 'lucide-react';

type Color = 'blue' | 'green' | 'purple' | 'orange' | 'red';

const ChangeManagement: React.FC = () => {
  const implementationPhases = [
    {
      icon: Shield,
      title: 'Phase 1: Stabilize & Triage (First 30 Days)',
      description: 'Focus on stopping the bleeding by addressing the most critical technical blockers and organizational fatigue.',
      color: 'red',
      items: [
        'Launch "Code Red" investigation into email deliverability.',
        'Begin full assessment of the Outreach-Salesforce sync to identify root causes of data errors.',
        'Initiate vendor evaluation to replace ineffective data enrichment tools (LeadIQ).',
        'Announce a 60-day freeze on non-essential GTM initiatives to combat change fatigue and signal stability.'
      ]
    },
    {
      icon: Wrench,
      title: 'Phase 2: Build the Foundation (Days 30-90)',
      description: 'Create the new "operating system" by defining core processes, cleaning data, and aligning incentives.',
      color: 'orange',
      items: [
        'Launch the Sales & SDR Playbook initiative as a top cross-functional priority.',
        'Redefine the SDR-to-AE handoff with objective, controllable qualification criteria.',
        'Design and gain approval for a new SDR compensation plan focused on meetings, not pipeline.',
        'Implement a formal capacity model and begin redesigning sequences to match rep workload.',
        'Start a formal data hygiene project to address the 6,500+ duplicate record errors.'
      ]
    },
    {
      icon: Zap,
      title: 'Phase 3: Accelerate & Optimize (Days 90-180)',
      description: 'Roll out new systems and processes to the team and begin scaling the revitalized GTM engine.',
      color: 'green',
      items: [
        'Roll out new Playbooks with comprehensive, role-based training.',
        'Implement the new SDR compensation plan.',
        'Deploy new manager dashboards focused on coaching for activity, overdue tasks, and sequence completion.',
        'Introduce AI use cases for messaging personalization and pre-call research.'
      ]
    }
  ];

  const nextSteps = [
    {
      title: 'Finalize Project Plan & Secure Resources',
      description: 'Approve the phased implementation plan and allocate budget for necessary tools and personnel (e.g., GTM Ops).',
      timeline: 'Next 7 Days',
      color: 'blue'
    },
    {
      title: 'Executive Communication',
      description: 'Draft and deliver a company-wide communication announcing the stability period and commitment to the new GTM structure.',
      timeline: 'Next 14 Days',
      color: 'purple'
    },
    {
      title: 'Launch Technical Triage Teams',
      description: 'Form small, dedicated teams to begin the email deliverability and SFDC-Outreach sync investigations.',
      timeline: 'Next 14 Days',
      color: 'red'
    },
    {
      title: 'Schedule Playbook & Comp Plan Workshops',
      description: 'Book cross-functional workshops to kick off the design of the new sales playbook and SDR compensation model.',
      timeline: 'Next 30 Days',
      color: 'green'
    }
  ];

  const getColorClasses = (color: Color): string => ({
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200'
  } as const)[color];

  const getIconColor = (color: Color): string => ({
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    red: 'text-red-500'
  } as const)[color];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Change Management: An Actionable Path Forward
        </h1>
        
        <p className="text-gray-700 mb-8">
          This data-driven change management plan provides a phased, realistic roadmap for transforming your revenue operations. It prioritizes foundational fixes and addresses organizational health to ensure changes are successful and sustainable.
        </p>

        {/* Implementation Plan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Phased Implementation Roadmap</h2>
          <div className="relative border-l-2 border-gray-200 pl-8 space-y-12">
            {implementationPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="relative">
                   <div className={`absolute -left-[42px] top-1.5 w-8 h-8 rounded-full ${getColorClasses(phase.color as Color)} flex items-center justify-center`}>
                    <Icon className={`${getIconColor(phase.color as Color)}`} size={20} />
                  </div>
                  <h3 className={`text-xl font-semibold ${getIconColor(phase.color as Color)}`}>{phase.title}</h3>
                  <p className="text-gray-600 mt-1 mb-4">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Immediate Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => {
              return (
                <div key={index} className={`p-6 rounded-lg border ${getColorClasses(step.color as Color)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <span className="text-sm font-medium px-2 py-1 bg-white rounded-full border border-gray-200">{step.timeline}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical Success Factors */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Critical Success Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start space-x-3">
              <ArrowRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
              <p className="text-gray-700"><span className="font-semibold">Executive Sponsorship:</span> Consistent, visible support and resource commitment from leadership.</p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
              <p className="text-gray-700"><span className="font-semibold">Clear Communication:</span> Proactively address change fatigue by explaining the 'why' behind each phase.</p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
              <p className="text-gray-700"><span className="font-semibold">Manager Enablement:</span> Equip front-line managers to lead the change and coach to the new processes.</p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="text-blue-500 mt-1 flex-shrink-0" size={16} />
              <p className="text-gray-700"><span className="font-semibold">Data-Driven Decisions:</span> Use the new reporting to measure progress and make course corrections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagement;
