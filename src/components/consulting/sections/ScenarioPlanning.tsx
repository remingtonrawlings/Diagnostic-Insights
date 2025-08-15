import React from 'react';
import { Map, ArrowRight, CornerRightDown, Zap, Repeat, HeartHandshake, CalendarClock } from 'lucide-react';

const ScenarioPlanning: React.FC = () => {

  const workflows = [
    { category: 'Inbound', priority: 1, name: 'IB - High Priority (P1)', icon: Zap, color: 'red' },
    { category: 'Inbound', priority: 1, name: 'IB - Medium Priority (P2)', icon: Zap, color: 'red' },
    { category: 'Inbound', priority: 1, name: 'IB - Low Priority (P3/P4)', icon: Zap, color: 'red' },
    { category: 'Inbound', priority: 1, name: 'IB - P1 Follow-up', icon: Zap, color: 'red' },
    { category: 'Inbound', priority: 1, name: 'IB - P2 Follow-up', icon: Zap, color: 'red' },
    { category: 'Inbound', priority: 1, name: 'IB - P3/P4 Follow-up', icon: Zap, color: 'red' },
    { category: 'Outbound', priority: 2, name: 'OB - High Priority', icon: ArrowRight, color: 'blue' },
    { category: 'Outbound', priority: 2, name: 'OB - Medium Priority', icon: ArrowRight, color: 'blue' },
    { category: 'Outbound', priority: 2, name: 'OB - Low Priority', icon: ArrowRight, color: 'blue' },
    { category: 'Outbound', priority: 2, name: 'OB - Referral', icon: ArrowRight, color: 'blue' },
    { category: 'Follow-up', priority: 3, name: 'Follow-up - Chasing Meetings', icon: CornerRightDown, color: 'orange' },
    { category: 'Follow-up', priority: 3, name: 'Follow-up - Upcoming Meeting', icon: CornerRightDown, color: 'orange' },
    { category: 'Follow-up', priority: 3, name: 'Follow-up - Rescheduling Meeting', icon: CornerRightDown, color: 'orange' },
    { category: 'Event', priority: 4, name: 'Event - Attendee Follow-up', icon: CalendarClock, color: 'purple' },
    { category: 'Event', priority: 4, name: 'Event - No Show Follow-up', icon: CalendarClock, color: 'purple' },
    { category: 'Event', priority: 4, name: 'Event Invite - High Priority', icon: CalendarClock, color: 'purple' },
    { category: 'Event', priority: 4, name: 'Event Invite - Low Priority', icon: CalendarClock, color: 'purple' },
    { category: 'Re-Engage', priority: 5, name: 'Re-Engage - 30 Days', icon: Repeat, color: 'yellow' },
    { category: 'Re-Engage', priority: 5, name: 'Re-Engage - 60 Days', icon: Repeat, color: 'yellow' },
    { category: 'Nurture', priority: 6, name: 'Nurture - Manual', icon: HeartHandshake, color: 'green' },
    { category: 'Nurture', priority: 6, name: 'Nurture - High Priority (Not Interested)', icon: HeartHandshake, color: 'green' },
    { category: 'Nurture', priority: 6, name: 'Nurture - Low Priority (Not Interested)', icon: HeartHandshake, color: 'green' },
    { category: 'Nurture', priority: 6, name: 'Nurture - High Priority (No Reply)', icon: HeartHandshake, color: 'green' },
    { category: 'Nurture', priority: 6, name: 'Nurture - Low Priority (No Reply)', icon: HeartHandshake, color: 'green' },
  ];

  const groupedWorkflows = workflows.reduce((acc, wf) => {
    if (!acc[wf.category]) {
      acc[wf.category] = {
        icon: wf.icon,
        color: wf.color,
        items: []
      };
    }
    acc[wf.category].items.push(wf);
    return acc;
  }, {} as Record<string, { icon: React.ElementType; color: string; items: typeof workflows }>);

  const getColorClasses = (color: string) => ({
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-500', header: 'text-red-800' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-500', header: 'text-blue-800' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-500', header: 'text-orange-800' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-500', header: 'text-purple-800' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-500', header: 'text-yellow-800' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-500', header: 'text-green-800' },
  })[color as keyof ReturnType<typeof getColorClasses>];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Scenario Planning: Sequence Workflow Blueprints
        </h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Map className="text-blue-500" size={24} />
            <h3 className="text-xl font-semibold text-blue-800">
              Sequence & Automation Framework
            </h3>
          </div>
          <p className="text-gray-700">
            Based on our findings, we recommend creating a structured set of 24 sequence blueprints. This framework standardizes outreach for different scenarios, ensuring a consistent process while allowing for targeted messaging. These blueprints will form the core of a more efficient and measurable GTM motion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedWorkflows).map(([category, { icon: Icon, color, items }]) => {
            const colors = getColorClasses(color);
            return (
              <div key={category} className={`p-6 rounded-lg border ${colors.bg} ${colors.border}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className={colors.text} size={24} />
                  <h4 className={`font-semibold text-lg ${colors.header}`}>{category} Workflows</h4>
                </div>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.name} className="flex items-start space-x-3 bg-white p-2 rounded-md border border-gray-200">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`}></div>
                      <p className="text-sm text-gray-800">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ScenarioPlanning;
