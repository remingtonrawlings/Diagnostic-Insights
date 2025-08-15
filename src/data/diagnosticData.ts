export interface RecommendedAction {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  severity: 'High' | 'Medium' | 'Low';
  complexity: 'High' | 'Medium' | 'Low';
}

export interface FocusArea {
  title: string;
  benchmarks: string[];
  insights: string[];
  recommendedActions: RecommendedAction[];
}

export interface AssessmentCategory {
  category: string;
  focusAreas: FocusArea[];
}

export const diagnosticData: AssessmentCategory[] = [
    {
        category: "ICP Targeting",
        focusAreas: [
            {
                title: "Account Assignments",
                benchmarks: ["SDRs should manage a sustainable number of accounts per quarter (typically 100-200) to ensure deep, effective engagement."],
                insights: ["Initial analysis of account assignments reveals potential imbalances, with some reps managing over 300 accounts, leading to superficial engagement."],
                recommendedActions: [{ id: "ICP-AA-01", title: "Review and rebalance account assignments based on capacity", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Signal-based ICPs",
                benchmarks: ["Best-in-class teams leverage buying signals (e.g., new funding, job postings, technology installs) to prioritize outreach."],
                insights: ["Current ICP definition is static and may not fully leverage dynamic buying signals, leading to missed opportunities."],
                recommendedActions: [{ id: "ICP-SB-01", title: "Incorporate real-time buying signals into ICP definition and prioritization", priority: "High", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Industry Focuses",
                benchmarks: ["Targeting should be focused on a few key industries where the company has a proven track record and competitive advantage."],
                insights: ["The current industry focus is broad, diluting messaging and preventing deep market penetration in high-potential segments."],
                recommendedActions: [{ id: "ICP-IF-01", title: "Analyze win rates by industry and refine target segments", priority: "Medium", severity: "Medium", complexity: "Medium" }]
            },
            {
                title: "Persona Strategy",
                benchmarks: ["Content and outreach should be tailored to specific buyer personas, addressing their unique pain points."],
                insights: ["Persona strategy is not consistently applied, resulting in generic messaging that fails to resonate with key decision-makers."],
                recommendedActions: [{ id: "ICP-PS-01", title: "Develop and standardize persona-based messaging and outreach plays", priority: "High", severity: "High", complexity: "Medium" }]
            },
        ]
    },
    {
        category: "Data Lists",
        focusAreas: [
            {
                title: "Account Lists",
                benchmarks: ["Target account lists should be regularly refreshed and tiered based on strategic value."],
                insights: ["Account list quality varies significantly, with many lists containing outdated or irrelevant companies."],
                recommendedActions: [{ id: "DL-AL-01", title: "Implement a quarterly process for auditing and refreshing target account lists", priority: "Medium", severity: "Medium", complexity: "Medium" }]
            },
            {
                title: "Prospect Lists",
                benchmarks: ["Prospect data should have over 90% accuracy for email and phone number information."],
                insights: ["Prospect lists suffer from high bounce rates and contain many contacts who are no longer with the target company."],
                recommendedActions: [{ id: "DL-PL-01", title: "Implement a regular process for prospect list hygiene and validation", priority: "Medium", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Data Enrichment / Lead Sourcing",
                benchmarks: ["A multi-source strategy for data enrichment should be in place to ensure comprehensive and accurate data."],
                insights: ["Over-reliance on a single data provider is leading to gaps in key markets and segments."],
                recommendedActions: [{ id: "DL-DE-01", title: "Evaluate and diversify data enrichment and lead sourcing tools", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Data Cleanliness",
                benchmarks: ["Data governance policies should be in place to maintain CRM data hygiene proactively."],
                insights: ["A lack of clear data governance has led to widespread data cleanliness issues affecting reporting and targeting.", "High rates of duplicate records are causing confusion."],
                recommendedActions: [{ id: "DL-DC-01", title: "Establish a data governance committee and cleanliness plan", priority: "High", severity: "High", complexity: "High" }]
            },
        ]
    },
    {
        category: "CRM Setup",
        focusAreas: [
            {
                title: "Person Record Object Use",
                benchmarks: ["A clear, documented policy should define when to use Lead vs. Contact objects."],
                insights: ["The inconsistent use of Lead and Contact objects is creating duplicate records, sync errors, and reporting challenges."],
                recommendedActions: [{ id: "CRM-PRO-01", title: "Define and enforce a standardized model for using Lead and Contact objects", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Field Strategy",
                benchmarks: ["CRM fields should be regularly audited to remove redundancy and improve usability."],
                insights: ["An excess of unused and redundant fields is cluttering page layouts and leading to inconsistent data entry."],
                recommendedActions: [{ id: "CRM-FS-01", title: "Audit and streamline all fields on core objects (Lead, Contact, Account, Opportunity)", priority: "Medium", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Automation",
                benchmarks: ["Automation should handle repetitive tasks like data updates, task creation, and notifications."],
                insights: ["Numerous manual processes exist that could be automated, freeing up significant time for sales reps."],
                recommendedActions: [{ id: "CRM-A-01", title: "Identify and implement top 3-5 high-impact automation workflows", priority: "High", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Duplicates",
                benchmarks: ["Automated duplicate detection and merging rules should be active and monitored."],
                insights: ["Duplicate records are a significant problem, and there is no systematic process for managing them."],
                recommendedActions: [{ id: "CRM-D-01", title: "Implement and configure a duplicate management tool/strategy", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Notes Plan",
                benchmarks: ["A standardized template for meeting notes and call logs ensures key information is captured consistently."],
                insights: ["The lack of a structured note-taking process results in inconsistent data capture and makes it difficult to find key information."],
                recommendedActions: [{ id: "CRM-NP-01", title: "Implement a standardized template and process for CRM notes", priority: "Low", severity: "Medium", complexity: "Low" }]
            },
        ]
    },
    {
        category: "Other Systems",
        focusAreas: [
            {
                title: "Sales Engagement Sync",
                benchmarks: ["Activity and data sync between CRM and sales engagement platform should be real-time with less than 1% error rate."],
                insights: ["Frequent sync errors between Salesforce and Outreach are causing critical data gaps and require manual intervention."],
                recommendedActions: [{ id: "OS-SES-01", title: "Conduct a full audit and resolve root causes of CRM-Sales Engagement sync issues", priority: "High", severity: "High", complexity: "High" }]
            },
            {
                title: "Email Deliverability",
                benchmarks: ["Email authentication (SPF, DKIM, DMARC) should be properly configured to ensure high deliverability."],
                insights: ["Lack of proper email authentication setup is likely impacting email deliverability and sender reputation."],
                recommendedActions: [{ id: "OS-ED-01", title: "Implement and verify all email authentication protocols", priority: "Medium", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Tech Stack Optimizations",
                benchmarks: ["The tech stack should be rationalized to eliminate redundancies and maximize ROI."],
                insights: ["There are overlapping functionalities in the current tech stack and some tools are significantly underutilized."],
                recommendedActions: [{ id: "OS-TSO-01", title: "Conduct a full tech stack audit to identify optimization and consolidation opportunities", priority: "Medium", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Lead Routing",
                benchmarks: ["Lead routing rules should be automated, clearly defined, and able to handle various scenarios (e.g., territory, round-robin)."],
                insights: ["Lead routing is slow and inconsistent, causing delays in follow-up and creating a poor prospect experience."],
                recommendedActions: [{ id: "OS-LR-01", title: "Implement an automated lead routing solution (e.g., LeanData, Salesforce Flow)", priority: "High", severity: "High", complexity: "High" }]
            },
        ]
    },
    {
        category: "Reporting Structure",
        focusAreas: [
            { title: "Metrics of Importance", benchmarks: ["Key metrics should be clearly defined, tracked, and understood across the organization."], insights: ["There is a lack of alignment on the most critical KPIs, leading to conflicting priorities and an inability to accurately assess performance."], recommendedActions: [{ id: "RS-MOI-01", title: "Define and align on a core set of GTM key performance indicators", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Structured Selling Motion", benchmarks: ["A structured, documented sales process with clear stages and exit criteria is essential for scalability."], insights: ["The current selling motion is ad-hoc and varies by rep, making it difficult to forecast accurately and coach effectively."], recommendedActions: [{ id: "RS-SSM-01", title: "Document and implement a standardized, structured selling motion", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Rep Reporting (Customer View)", benchmarks: ["Reps should have easy access to a 360-degree view of their customers and prospects."], insights: ["Reps struggle to get a complete picture of customer history and interactions without checking multiple systems."], recommendedActions: [{ id: "RS-RR-01", title: "Develop a unified 'customer view' report or dashboard for reps", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Manager Reporting (Coaching View)", benchmarks: ["Managers need dashboards focused on team performance and coaching opportunities."], insights: ["Existing reports are not designed to help managers effectively coach their teams on performance gaps."], recommendedActions: [{ id: "RS-MR-01", title: "Create manager-specific dashboards focused on coaching and performance metrics", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Strategic Reporting (Operational View)", benchmarks: ["Leadership requires high-level dashboards to track strategic goals and operational efficiency."], insights: ["Leadership lacks a clear, consolidated view of the health of the entire revenue engine."], recommendedActions: [{ id: "RS-SR-01", title: "Build strategic dashboards for leadership to monitor GTM health and progress", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Admin Reporting (Diagnostic View)", benchmarks: ["System admins need reports to monitor data quality, sync errors, and system health."], insights: ["There is a lack of diagnostic reporting, making it difficult to proactively identify and fix system issues."], recommendedActions: [{ id: "RS-AR-01", title: "Design admin-level reports and alerts for system diagnostics and health monitoring", priority: "Medium", severity: "Low", complexity: "Medium" }] },
            { title: "Account Types in Salesforce", benchmarks: ["Account Types (e.g., Prospect, Customer, Partner) should be clearly defined and consistently used."], insights: ["Inconsistent use of 'Account Type' field makes it difficult to segment and report on the customer base accurately."], recommendedActions: [{ id: "RS-AT-01", title: "Standardize and enforce the use of Account Types in Salesforce", priority: "Medium", severity: "Medium", complexity: "Low" }] },
            { title: "Activity Types in Salesforce", benchmarks: ["Custom activity types should be used to track meaningful interactions beyond standard calls and emails."], insights: ["Valuable interactions are being lost because of a limited and inconsistent set of activity types."], recommendedActions: [{ id: "RS-ACT-01", title: "Standardize and expand Activity Types to capture key interactions", priority: "Low", severity: "Medium", complexity: "Low" }] },
            { title: "Call Dispositions in Outreach", benchmarks: ["Call dispositions should be mandatory and structured to provide insight into call outcomes."], insights: ["Call disposition data is inconsistent and incomplete, providing little value for analysis or coaching."], recommendedActions: [{ id: "RS-CD-01", title: "Optimize and enforce the use of Call Dispositions in Outreach", priority: "Medium", severity: "Medium", complexity: "Low" }] },
            { title: "Opportunity Types in Salesforce", benchmarks: ["Opportunity Types (e.g., New Business, Expansion, Renewal) are crucial for accurate forecasting."], insights: ["Lack of clear Opportunity Types makes it difficult to analyze revenue streams and forecast accurately."], recommendedActions: [{ id: "RS-OT-01", title: "Define and implement standardized Opportunity Types", priority: "Medium", severity: "High", complexity: "Medium" }] },
            { title: "Opportunity Stages in Salesforce", benchmarks: ["Opportunity Stages should reflect the actual sales process and have clear exit criteria."], insights: ["Current Opportunity Stages are ambiguous and not consistently applied, leading to an inaccurate pipeline."], recommendedActions: [{ id: "RS-OS-01", title: "Review and optimize Opportunity Stages with clear exit criteria", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Meeting Tyes in Salesforce", benchmarks: ["Different types of meetings (e.g., Discovery Call, Demo) should be tracked to analyze their impact."], insights: ["All meetings are logged generically, missing an opportunity to analyze which meeting types drive progress."], recommendedActions: [{ id: "RS-MT-01", title: "Standardize and track different Meeting Types in Salesforce", priority: "Low", severity: "Low", complexity: "Low" }] },
            { title: "Lead/Contact Status in Salesforce", benchmarks: ["Status fields should be used to track a prospect's journey from new to qualified."], insights: ["Lead and Contact Status fields are used inconsistently, providing an unreliable view of prospect engagement."], recommendedActions: [{ id: "RS-LCS-01", title: "Optimize and govern the use of Lead/Contact Status fields", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Lead Funnel Stages in MKT Automation", benchmarks: ["Marketing automation funnel stages (e.g., MQL, SAL) should be aligned with sales stages."], insights: ["A disconnect between marketing and sales funnel definitions is causing friction and data discrepancies in the handoff."], recommendedActions: [{ id: "RS-LFS-01", title: "Align marketing automation funnel stages with the sales process", priority: "High", severity: "High", complexity: "High" }] }
        ]
    },
    {
        category: "Sequence Effectiveness",
        focusAreas: [
            { title: "Account-specific Sequences", benchmarks: ["Sequences should be adaptable for targeting specific high-value accounts."], insights: ["The current sequence library lacks flexibility for true account-based personalization."], recommendedActions: [{ id: "SE-AS-01", title: "Develop templates and training for account-specific sequence customization", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Full Auto Sequences", benchmarks: ["Fully automated sequences are best for nurturing or lower-priority leads."], insights: ["Overuse of fully automated sequences for top-tier prospects is leading to low engagement rates."], recommendedActions: [{ id: "SE-FA-01", title: "Define appropriate use cases for fully automated vs. semi-automated sequences", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Full Manual Sequences", benchmarks: ["Manual sequences should be used for strategic accounts requiring bespoke outreach."], insights: ["There is no framework or guidance for reps on how to effectively execute manual, high-touch sequences."], recommendedActions: [{ id: "SE-FM-01", title: "Provide frameworks and best practices for executing manual sequences", priority: "Low", severity: "Medium", complexity: "Low" }] },
            { title: "Capitalizing on Higher Priority Inbound", benchmarks: ["High-priority inbound leads should be placed into specific, fast-response sequences."], insights: ["High-intent inbound leads are often treated the same as cold outbound prospects, slowing down engagement."], recommendedActions: [{ id: "SE-HPI-01", title: "Create dedicated sequences and SLAs for high-priority inbound leads", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Automation of Lower Priority Inbound", benchmarks: ["Lower priority leads should be automatically enrolled in long-term nurture sequences."], insights: ["Lower priority inbound leads are often ignored or receive minimal follow-up, wasting marketing spend."], recommendedActions: [{ id: "SE-LPI-01", title: "Implement automated nurturing sequences for lower-priority inbound leads", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Messaging / Positioning", benchmarks: ["Sequence messaging should be persona-centric and focused on solving specific business problems."], insights: ["Current sequence messaging is often product-focused rather than problem-focused, failing to capture prospect interest."], recommendedActions: [{ id: "SE-MP-01", title: "Overhaul sequence messaging to be persona-centric and value-driven", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Email Variables Used", benchmarks: ["Personalization should go beyond {{first_name}} and {{company}} to include more contextual variables."], insights: ["The use of personalization variables is basic, leading to emails that feel generic and automated."], recommendedActions: [{ id: "SE-EV-01", title: "Audit and expand the use of custom fields and personalization variables", priority: "Low", severity: "Medium", complexity: "Low" }] },
            { title: "Email Template Analysis", benchmarks: ["A/B testing should be systematically used to optimize email templates."], insights: ["There is no process for analyzing the performance of different email templates, leading to guesswork."], recommendedActions: [{ id: "SE-ET-01", title: "Implement a process for A/B testing and performance analysis of email templates", priority: "Medium", severity: "High", complexity: "Medium" }] }
        ]
    },
    {
        category: "Seller Execution",
        focusAreas: [
            { title: "Prospects Added per Day", benchmarks: ["Reps should have clear targets for adding new, qualified prospects to sequences daily."], insights: ["There is no clear expectation for daily prospecting activity, leading to inconsistent pipeline generation."], recommendedActions: [{ id: "SX-PAD-01", title: "Establish and monitor targets for daily new prospect additions", priority: "Low", severity: "Low", complexity: "Low" }] },
            { title: "Aligned ICP and Sequence Strategy", benchmarks: ["Reps should demonstrate a clear understanding of which sequences to use for which ICPs."], insights: ["There is a disconnect between the defined ICP/persona strategy and the sequences reps are actually using."], recommendedActions: [{ id: "SX-AIS-01", title: "Train and enforce alignment between ICP targeting and sequence selection", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Skipped Tasks", benchmarks: ["Skipped task rates should be below 2-3% of total tasks."], insights: ["A high rate of skipped tasks indicates that reps are either overwhelmed or sequences are poorly designed."], recommendedActions: [{ id: "SX-ST-01", title: "Investigate the root causes of skipped tasks and address them", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Past Due Tasks", benchmarks: ["The number of past-due tasks should be minimal, with a clear process for managing them."], insights: ["A large backlog of past-due tasks is crippling rep productivity and causing leads to go cold."], recommendedActions: [{ id: "SX-PDT-01", title: "Implement a plan to clear the backlog and prevent future past-due tasks", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Touches per Prospect", benchmarks: ["An ideal number of touches (e.g., 8-12) should be defined and tracked for effective engagement."], insights: ["Many prospects are abandoned after only a few touches, significantly reducing the chances of conversion."], recommendedActions: [{ id: "SX-TPP-01", title: "Establish and monitor a benchmark for minimum touches per prospect", priority: "Medium", severity: "High", complexity: "Medium" }] },
            { title: "On-Time Completion %", benchmarks: ["On-time task completion should be above 95% to maintain engagement momentum."], insights: ["Low on-time task completion rates are breaking engagement cadence and hurting reply rates."], recommendedActions: [{ id: "SX-OTC-01", title: "Set and enforce goals for on-time task completion percentage", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Average Days Past Due", benchmarks: ["The average age of past-due tasks should not exceed 1-2 days."], insights: ["The high average age of past-due tasks indicates a chronic workload management problem."], recommendedActions: [{ id: "SX-ADP-01", title: "Track and work to reduce the average number of days tasks are past due", priority: "Medium", severity: "High", complexity: "Low" }] }
        ]
    },
    {
        category: "Capacity Modeling",
        focusAreas: [
            { title: "Capacity Profiles", benchmarks: ["Capacity models should define the maximum workload (e.g., active prospects, tasks per day) for each role."], insights: ["Without capacity profiles, it's impossible to know if reps are underutilized or overloaded."], recommendedActions: [{ id: "CM-CP-01", title: "Develop data-driven capacity profiles for each sales role", priority: "High", severity: "Medium", complexity: "High" }] },
            { title: "Decay Averages", benchmarks: ["Understanding how engagement and conversion rates decay over time is key to process optimization."], insights: ["There is no analysis on lead/opportunity decay, making it hard to identify bottlenecks in the funnel."], recommendedActions: [{ id: "CM-DA-01", title: "Analyze lead and opportunity decay rates to identify funnel leaks", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Funnel Metrics Averages", benchmarks: ["Clear baseline conversion rates for each stage of the funnel are necessary for accurate forecasting."], insights: ["The lack of reliable funnel metrics makes capacity planning and forecasting pure guesswork."], recommendedActions: [{ id: "CM-FMA-01", title: "Establish and track baseline funnel conversion metrics", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Workflow Blueprints", benchmarks: ["Workflow blueprints map out the ideal sequence of activities for different scenarios."], insights: ["Reps are left to guess the best next action, leading to inconsistent and inefficient execution."], recommendedActions: [{ id: "CM-WB-01", title: "Create workflow blueprints to guide reps on best-practice execution", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Prioritized Outbound", benchmarks: ["Capacity planning should account for the extra effort required for high-priority outbound targets."], insights: ["The team's capacity is not being strategically allocated to the highest-value outbound targets."], recommendedActions: [{ id: "CM-PO-01", title: "Build a capacity model for prioritized, account-based outbound efforts", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Prioritized Inbound", benchmarks: ["Capacity must be reserved to handle high-priority inbound leads within strict SLAs."], insights: ["Inbound lead handling is often delayed because reps do not have dedicated capacity to handle them immediately."], recommendedActions: [{ id: "CM-PI-01", title: "Model and allocate dedicated capacity for prioritized inbound lead response", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Engagement Plan Rollout", benchmarks: ["A phased rollout plan for new engagement strategies ensures smooth adoption and minimizes disruption."], insights: ["New engagement plans are often rolled out without a structured plan, leading to confusion and inconsistent execution by the team."], recommendedActions: [{ id: "CM-EPR-01", title: "Develop a phased rollout strategy for new engagement plans", priority: "Medium", severity: "Medium", complexity: "Medium" }] }
        ]
    },
    {
        category: "Strategic Focuses",
        focusAreas: [
            { title: "Comp Plan", benchmarks: ["Compensation plans should directly incentivize the behaviors and outcomes the business wants to drive."], insights: ["The current comp plan may be inadvertently rewarding volume of activity over quality of outcomes."], recommendedActions: [{ id: "SF-CP-01", title: "Review and align the compensation plan with new strategic goals and desired behaviors", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Sales Playbook", benchmarks: ["A centralized playbook should provide guidance on process, messaging, and strategy."], insights: ["There is no single source of truth for the sales team, leading to inconsistent execution."], recommendedActions: [{ id: "SF-SP-01", title: "Develop and launch a comprehensive, living sales playbook", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "SDR Playbook", benchmarks: ["SDRs require a dedicated playbook focused on top-of-funnel activities."], insights: ["The lack of an SDR-specific playbook contributes to inconsistent qualification and handoffs."], recommendedActions: [{ id: "SF-SDRP-01", title: "Create a dedicated SDR playbook covering all aspects of their role", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "ROE", benchmarks: ["Rules of Engagement (ROE) are critical for preventing channel conflict and lead ownership disputes."], insights: ["Frequent disputes over lead ownership are creating friction between teams and wasting time."], recommendedActions: [{ id: "SF-ROE-01", title: "Define, document, and enforce clear Rules of Engagement", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Inbound", benchmarks: ["The inbound lead management process should be optimized for speed and efficiency."], insights: ["The current inbound process is slow and leaky, resulting in significant missed revenue opportunities."], recommendedActions: [{ id: "SF-I-01", title: "Overhaul and optimize the end-to-end inbound lead management process", priority: "High", severity: "High", complexity: "High" }] },
            { title: "MKT > SDR Handoff", benchmarks: ["The handoff from Marketing to SDRs should be seamless with clear definitions and SLAs."], insights: ["The MQL-to-SQL handoff is a major bottleneck, characterized by data loss and delays."], recommendedActions: [{ id: "SF-MSH-01", title: "Formalize and streamline the Marketing to SDR handoff process", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "SDR > Sales Handoff", benchmarks: ["The handoff from SDRs to AEs must be supported by a clear SQL definition and process."], insights: ["The SQL handoff is inconsistent, leading to a high rejection rate by AEs and wasted effort."], recommendedActions: [{ id: "SF-SSH-01", title: "Standardize the SDR to Sales handoff with a clear SQL definition and checklist", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Change Readiness", benchmarks: ["The team's readiness for change should be assessed before rolling out major initiatives."], insights: ["Past initiatives have struggled due to a lack of buy-in and preparation for change."], recommendedActions: [{ id: "SF-CR-01", title: "Develop a change management plan to ensure successful adoption of new processes", priority: "Medium", severity: "High", complexity: "Medium" }] },
            { title: "Miscellaneous Observations", benchmarks: ["This area captures other strategic issues that don't fit neatly into other categories."], insights: ["A collection of smaller, miscellaneous issues are contributing to overall inefficiency."], recommendedActions: [{ id: "SF-MO-01", title: "Create a project plan to address miscellaneous strategic observations", priority: "Low", severity: "Low", complexity: "Low" }] }
        ]
    },
    {
        category: "Training & Enablement",
        focusAreas: [
            { title: "Onboarding Training", benchmarks: ["A structured onboarding program should ramp up new hires to productivity within a defined timeframe (e.g., 90 days)."], insights: ["The current onboarding process is ad-hoc, leading to inconsistent knowledge and longer ramp times for new hires."], recommendedActions: [{ id: "TE-OT-01", title: "Develop and implement a structured, role-based onboarding program", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Ongoing Enablement", benchmarks: ["A regular cadence of training and enablement should keep the team's skills sharp."], insights: ["Enablement is treated as a one-time event rather than an ongoing process, leading to knowledge decay."], recommendedActions: [{ id: "TE-OE-01", title: "Establish a calendar and curriculum for ongoing sales enablement", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Systems Training", benchmarks: ["Reps should be proficient in using the core features of the tech stack."], insights: ["Many powerful features of the sales tech stack are going unused due to a lack of training."], recommendedActions: [{ id: "TE-ST-01", title: "Provide comprehensive and ongoing training on the GTM tech stack", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Targeting Training", benchmarks: ["Reps need to be trained on how to identify and research their target ICP and personas."], insights: ["Reps are struggling to apply the ICP and persona definitions in their day-to-day prospecting."], recommendedActions: [{ id: "TE-TT-01", title: "Deliver practical training on how to effectively target the ICP and personas", priority: "Medium", severity: "Medium", complexity: "Low" }] },
            { title: "Sequence Use Training", benchmarks: ["Training should cover not just which sequence to use, but how to personalize it effectively."], insights: ["Reps are using sequences as a blunt instrument without understanding the strategy behind them."], recommendedActions: [{ id: "TE-SUT-01", title: "Train reps on the strategy and effective personalization of sequences", priority: "Medium", severity: "Medium", complexity: "Low" }] },
            { title: "Sales Playbook Frameworks", benchmarks: ["The team should be trained on how to use the frameworks and plays within the sales playbook."], insights: ["Even if a playbook exists, it won't be used if the team isn't trained on how to apply it."], recommendedActions: [{ id: "TE-SPF-01", title: "Conduct workshops to train the team on using the sales playbook frameworks", priority: "Medium", severity: "Medium", complexity: "Low" }] }
        ]
    },
    {
        category: "AI Use Cases",
        focusAreas: [
            { title: "Research", benchmarks: ["AI can be used to accelerate and deepen pre-call research."], insights: ["Reps spend a significant amount of time on manual research that could be augmented by AI."], recommendedActions: [{ id: "AI-R-01", title: "Pilot AI-powered tools for prospect and account research", priority: "Low", severity: "Low", complexity: "Medium" }] },
            { title: "Messaging", benchmarks: ["AI can help draft and refine email and social media messages."], insights: ["Reps struggle with crafting compelling, personalized messages at scale."], recommendedActions: [{ id: "AI-M-01", title: "Leverage AI writing assistants for messaging optimization and personalization", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Strategic Account Planning", benchmarks: ["AI can analyze data to provide insights for strategic account plans."], insights: ["Account plans are often superficial and lack deep, data-driven insights."], recommendedActions: [{ id: "AI-SAP-01", title: "Explore using AI to generate insights for strategic account planning", priority: "Low", severity: "Medium", complexity: "High" }] },
            { title: "Call Transcript Analysis", benchmarks: ["AI-powered conversation intelligence tools can analyze call transcripts to identify coaching opportunities."], insights: ["Managers lack the time to review every sales call, leading to missed coaching opportunities."], recommendedActions: [{ id: "AI-CTA-01", title: "Fully implement a conversation intelligence tool for call analysis and coaching", priority: "High", severity: "High", complexity: "Medium" }] }
        ]
    }
];
