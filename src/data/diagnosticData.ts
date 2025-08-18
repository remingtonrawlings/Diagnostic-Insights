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
                benchmarks: [],
                insights: ["ICP accounts are defined and assigned, but the process is static (refreshed quarterly). There is no dynamic assignment based on real-time buying signals or intent data."],
                recommendedActions: [{ id: "ICP-AA-01", title: "Transition to a dynamic account assignment model that prioritizes accounts based on real-time intent data from tools like Demandbase.", priority: "High", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Signal-based ICPs",
                benchmarks: [],
                insights: ["The team uses Demandbase for intent signals (\"hot accounts\") to guide outreach. However, this is largely a manual process of flagging accounts rather than an integrated, automated part of the core GTM motion."],
                recommendedActions: [{ id: "ICP-SB-01", title: "Formalize the use of intent data by creating dedicated \"intent-based\" sequences and plays that are triggered automatically.", priority: "High", severity: "Medium", complexity: "Medium" }]
            },
            {
                title: "Industry Focuses",
                benchmarks: [],
                insights: ["The ICP is defined by specific industries (Financial Services, Manufacturing, etc.), and this is understood by the team. However, messaging is not consistently tailored to these industry-specific pain points."],
                recommendedActions: [{ id: "ICP-IF-01", title: "Develop industry-specific messaging variants for all core outreach sequences to increase resonance.", priority: "Medium", severity: "Medium", complexity: "Medium" }]
            },
            {
                title: "Persona Strategy",
                benchmarks: [],
                insights: ["The team targets specific personas (L&D, Skills, HR Tech) and has created persona-based sequences. However, a major challenge is that SDRs often get stuck at lower levels and struggle to reach executive buyers."],
                recommendedActions: [{ id: "ICP-PS-01", title: "Create a formal multi-threading playbook that trains SDRs on how to leverage initial contacts to navigate to executive-level decision-makers.", priority: "High", severity: "High", complexity: "Medium" }]
            },
        ]
    },
    {
        category: "Data Lists",
        focusAreas: [
            {
                title: "Account Lists",
                benchmarks: [],
                insights: ["The ICP account list exists but is not centrally managed in a way that preserves historical context. When territories change, valuable account intelligence is lost."],
                recommendedActions: [{ id: "DL-AL-01", title: "Create a \"Master ICP Account Hub\" (e.g., in Salesforce) to serve as a persistent record of all historical interactions and intelligence.", priority: "High", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Prospect Lists",
                benchmarks: [],
                insights: ["The process of building prospect lists is a major time sink due to poor data enrichment tools and a cluttered CRM, forcing SDRs to \"start from scratch\" on accounts."],
                recommendedActions: [{ id: "DL-PL-01", title: "Implement a better data enrichment tool and clean the CRM to allow for efficient list building directly from Salesforce/Outreach.", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Data Enrichment / Lead Sourcing",
                benchmarks: [],
                insights: ["The current tool, LeadIQ, was described as \"shocking\" and ineffective. The previous, more effective tool (Lusha) was removed, creating a critical data acquisition bottleneck."],
                recommendedActions: [{ id: "DL-DE-01", title: "Immediately evaluate and replace the ineffective data enrichment tool with a reliable alternative (e.g., reinstate Lusha or a competitor). Add data enrichment services with external consultancy. Implement Clay", priority: "High", severity: "High", complexity: "High" }]
            },
            {
                title: "Data Cleanliness",
                benchmarks: [],
                insights: ["The CRM is filled with outdated contacts and duplicates (individuals existing as both Leads and Contacts), which causes sync errors and wasted outreach."],
                recommendedActions: [{ id: "DL-DC-01", title: "Initiate a formal data hygiene project to cleanse outdated records and implement a deduplication process in Salesforce.", priority: "Medium", severity: "High", complexity: "High" }]
            },
        ]
    },
    {
        category: "CRM Setup",
        focusAreas: [
            {
                title: "Person Record Object Use",
                benchmarks: [],
                insights: ["The process of converting Leads to Contacts is a manual point of friction. A recent change to auto-convert MQLs to Contacts is intended to streamline this."],
                recommendedActions: [{ id: "CRM-PRO-01", title: "Monitor the new auto-conversion process and build reporting to ensure it's solving the lead-to-contact friction as intended.", priority: "Medium", severity: "Medium", complexity: "Low" }]
            },
            {
                title: "Field Strategy",
                benchmarks: [],
                insights: ["Critical fields for attribution (e.g., Last Sequence Name) are not consistently populated on the Salesforce Event object for meetings, making it impossible to analyze which sequences are effective."],
                recommendedActions: [{ id: "CRM-FS-01", title: "Re-configure the Outreach-Salesforce integration to ensure all relevant engagement data is synced to the Event/Activity object and ownership/duplicate mappings are aligned.", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Automation",
                benchmarks: [],
                insights: ["There is a lack of automation in the handoff process. SDRs manually create Stage 0 opportunities, and AEs manually review them. A \"Manager Approved\" checkbox is a manual gate for comp."],
                recommendedActions: [{ id: "CRM-A-01", title: "Implement a Salesforce Flow to automate parts of the opportunity creation and handoff process, reducing manual steps and subjectivity.", priority: "Medium", severity: "Medium", complexity: "High" }]
            },
            {
                title: "Duplicates",
                benchmarks: [],
                insights: ["Duplicate records exist in Salesforce, with individuals listed as both Leads and Contacts, causing confusion and sync errors with Outreach."],
                recommendedActions: [{ id: "CRM-D-01", title: "Implement a data deduplication process and merge existing duplicate records in Salesforce.", priority: "Medium", severity: "High", complexity: "High" }]
            },
            {
                title: "Notes Plan",
                benchmarks: [],
                insights: ["Individual SDRs have developed their own structured note-taking templates, but there is no globally enforced standard, leading to inconsistent handoff quality."],
                recommendedActions: [{ id: "CRM-NP-01", title: "Standardize a discovery and handoff note template within Salesforce/Outreach and train the entire SDR team on its use.", priority: "Low", severity: "Medium", complexity: "Low" }]
            },
        ]
    },
    {
        category: "Other Systems",
        focusAreas: [
            {
                title: "Sales Engagement Sync",
                benchmarks: [],
                insights: ["The sync between Outreach and Salesforce is unreliable, particularly for contact status updates, meeting attribution, and opportunity data.", "Fix the template syntax in sequences where it's broken.", "Fix failed sequence states."],
                recommendedActions: [{ id: "OS-SES-01", title: "Conduct a full audit of the Outreach-Salesforce integration, focusing on field mappings, triggers, and error logs to ensure data consistency.", priority: "High", severity: "High", complexity: "High" }]
            },
            {
                title: "Email Deliverability",
                benchmarks: [],
                insights: ["A critical issue was identified where many emails are not being delivered at all, not even reaching spam folders. This is a massive technical problem undermining a core outreach channel."],
                recommendedActions: [{ id: "OS-ED-01", title: "Launch an immediate, \"Code Red\" (confidential) technical investigation into email deliverability, including domain reputation checks and system configuration audits.", priority: "High", severity: "High", complexity: "High" }]
            },
            {
                title: "Tech Stack Optimizations",
                benchmarks: [],
                insights: ["The sales directors (AEs) do not consistently use Outreach, viewing it as optional. This creates a massive gap in data, process adherence, and collaboration with SDRs."],
                recommendedActions: [{ id: "OS-TSO-01", title: "Implement a leadership-led mandate for universal Outreach adoption by all GTM roles, supported by role-specific enablement. Ensure lead sourcing is either outsourced/done for reps or made easier for list building.", priority: "High", severity: "High", complexity: "Medium" }]
            },
            {
                title: "Lead Routing",
                benchmarks: [],
                insights: ["There are technical issues with the lead routing process that require manual oversight to ensure leads are assigned correctly."],
                recommendedActions: [{ id: "OS-LR-01", title: "Audit and fix the lead routing rules in the marketing automation platform and Salesforce to ensure accurate and timely assignment.", priority: "Medium", severity: "Medium", complexity: "Medium" }]
            },
        ]
    },
    {
        category: "Reporting Structure",
        focusAreas: [
            { title: "Metrics of Importance", benchmarks: [], insights: ["The primary metrics are \"First Meetings\" (monthly) and \"Stage 1 Opportunities\" (quarterly). However, there is a strong sense that the team isn't consistently tracking the leading indicators (activity levels, connect rates) that produce these outcomes."], recommendedActions: [{ id: "RS-MOI-01", title: "Establish and report on a clear hierarchy of metrics: leading activity indicators (calls, emails), intermediate effectiveness indicators (connect/reply rates), and lagging outcome indicators (meetings, pipeline).", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Structured Selling Motion", benchmarks: [], insights: ["There is no single, structured selling motion. The process is highly variable depending on the rep, and there are no clear definitions for opportunity stages or entry/exit criteria."], recommendedActions: [{ id: "RS-SSM-01", title: "Define and document a single, global sales process with clear entry/exit criteria for each opportunity stage as part of the Sales Playbook initiative.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Rep Reporting (Customer View)", benchmarks: [], insights: ["SDRs and AEs lack a single, easy-to-use dashboard to see their own performance against goals and the status of their accounts."], recommendedActions: [{ id: "RS-RR-01", title: "Create standardized, role-specific performance dashboards in Salesforce that are easy to access and understand.", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Manager Reporting (Coaching View)", benchmarks: [], insights: ["Managers lack the reports needed to effectively coach their teams, such as views on individual rep activity levels, overdue tasks, and conversion rates."], recommendedActions: [{ id: "RS-MR-01", title: "Build manager-specific dashboards focused on coaching metrics: activity levels, on-time completion rates, and stage-to-stage conversion rates per rep.", priority: "High", severity: "Medium", complexity: "Medium" }] },
            { title: "Strategic Reporting (Operational View)", benchmarks: [], insights: ["Leadership cannot get a clear, trustworthy view of pipeline generation and overall GTM health due to inconsistent data across multiple systems."], recommendedActions: [{ id: "RS-SR-01", title: "Create a unified \"source of truth\" dashboard (in Salesforce or a BI tool like Domo) that pulls from all systems to report on overall GTM performance.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Admin Reporting (Diagnostic View)", benchmarks: [], insights: ["RevOps and leadership lack the diagnostic reports to see systemic issues, such as sequence performance by persona or the rate of AE \"kickbacks\" on SDR-sourced opportunities."], recommendedActions: [{ id: "RS-AR-01", title: "Create a suite of diagnostic reports to monitor GTM health, including sequence attribution, opportunity stage velocity, and SDR-to-AE conversion rates.", priority: "High", severity: "Medium", complexity: "High" }] },
            { title: "Opportunity Stages in Salesforce", benchmarks: [], insights: ["The definitions for what constitutes each opportunity stage are not consistently understood or applied across the sales team."], recommendedActions: [{ id: "RS-OS-01", title: "Finalize and document the entry/exit criteria for every opportunity stage and conduct mandatory enablement for the entire sales team.", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Meeting Types in Salesforce", benchmarks: [], insights: ["The team uses a manual \"First Meeting\" type on the Event object for comp, but it's disconnected from Outreach. There's also an \"Additional SDR Meeting\" type that is no longer comped."], recommendedActions: [{ id: "RS-MT-01", title: "Automate the setting of the \"First Meeting\" type based on rules and reintegrate the \"Additional SDR Meeting\" into the comp plan to incentivize multi-threading.", priority: "High", severity: "High", complexity: "Medium" }] },
        ]
    },
    {
        category: "Sequence Effectiveness",
        focusAreas: [
            { title: "Messaging / Positioning", benchmarks: [], insights: ["The standardized messaging from marketing is seen as generic and ineffective. Rep-driven, creative messaging (using memes, humor) generates significantly more engagement."], recommendedActions: [{ id: "SE-MP-01", title: "Create a formal process for SDRs to experiment with and share creative messaging, and build a library of proven, non-standard templates.", priority: "Medium", severity: "High", complexity: "Medium" }] }
        ]
    },
    {
        category: "Seller Execution",
        focusAreas: [
            { title: "Skipped Tasks", benchmarks: [], insights: ["Reps are frequently skipping tasks in sequences, particularly manual steps like phone calls."], recommendedActions: [{ id: "SX-ST-01", title: "Implement manager dashboards to track skipped task rates per rep and use it as a primary coaching metric.", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Past Due Tasks", benchmarks: [], insights: ["A large volume of overdue tasks indicates that reps are overwhelmed and unable to keep up with their assigned workload."], recommendedActions: [{ id: "SX-PDT-01", title: "Redesign sequences to have fewer manual steps and implement capacity modeling to ensure reps are not assigned more work than they can handle.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Touches per Prospect", benchmarks: [], insights: ["Analysis of 25 similar companies showed an average of less than 3 touches per prospect, indicating a massive execution gap across the industry. This needs to be a core metric."], recommendedActions: [{ id: "SX-TPP-01", title: "Establish a benchmark for minimum touches per prospect (e.g., 8-12 touches) and build reporting and coaching around this metric.", priority: "High", severity: "High", complexity: "Medium" }] },
        ]
    },
    {
        category: "Capacity Modeling",
        focusAreas: [
            { title: "Capacity Profiles", benchmarks: [], insights: ["Leadership views the core problem not as a messaging or targeting issue, but as a capacity challenge. Reps are overwhelmed with tasks from various sources (outbound, marketing, AI agents), leading to burnout and an inability to execute the designed process effectively."], recommendedActions: [{ id: "CM-CP-01", title: "Implement a formal capacity model that calculates the total number of tasks a rep can handle per day and use it to govern how many prospects are added to sequences from all sources (outbound, inbound, AI, etc.).", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Decay Averages", benchmarks: [], insights: ["Leadership confirmed a key industry-wide problem: sequences are not being completed. The average prospect receives fewer than 3 touches, and tasks are often completed 7.5 days late, destroying the \"stacking effect\" of consistent outreach."], recommendedActions: [{ id: "CM-DA-01", title: "Establish and monitor a \"Sequence Decay\" metric. Implement a manager-led coaching motion focused on ensuring reps complete sequences and reduce task latency.", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "Funnel Metrics Averages", benchmarks: [], insights: ["Leadership philosophy is that only 5-10% of the market is \"in-market\" at any given time. The current GTM motion is a \"fool's errand\" that focuses only on this small slice, leading to low conversion rates."], recommendedActions: [{ id: "CM-FMA-01", title: "Shift the GTM model from a short-term, 30-day \"win-or-lose\" approach to a 12-18 month account development lifecycle that includes formal nurture and re-engagement programs.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Workflow Blueprints", benchmarks: [], insights: ["There is no standardized set of sequence structures (blueprints) for different GTM motions (e.g., Inbound vs. Outbound, High vs. Low Priority). This leads to inconsistent execution and an inability to compare performance."], recommendedActions: [{ id: "CM-WB-01", title: "Design and implement a limited set of standardized sequence \"blueprints\" for core GTM workflows, focusing on a balance of automated and manual, multi-channel touches.", priority: "Medium", severity: "High", complexity: "Medium" }] },
            { title: "Prioritized Outbound", benchmarks: [], insights: ["The current outbound motion is a \"one-size-fits-all\" approach. There is no clear distinction or process for how to engage high-priority vs. low-priority accounts."], recommendedActions: [{ id: "CM-PO-01", title: "Implement separate, distinct engagement plans for high-priority (account-based, highly manual) and low-priority (automated, tech-touch) outbound motions.", priority: "Medium", severity: "Medium", complexity: "High" }] },
            { title: "Prioritized Inbound", benchmarks: [], insights: ["Similar to outbound, inbound leads are not systematically prioritized. A \"hot\" MQL (e.g., demo request) is likely treated the same as a \"cold\" MQL (e.g., whitepaper download)."], recommendedActions: [{ id: "CM-PI-01", title: "Create separate workflows and sequences for high-priority (\"hand-raiser\") and low-priority (\"nurture\") inbound leads to align effort with intent.", priority: "Medium", severity: "Medium", complexity: "Medium" }] },
            { title: "Engagement Plan Rollout", benchmarks: [], insights: ["Leadership's philosophy is that a new GTM plan should not be a \"jail cell\" but a structured framework. The key is getting reps to follow the core plan consistently before allowing for experimentation."], recommendedActions: [{ id: "CM-EPR-01", title: "Roll out the new engagement plan with a focus on 100% process adherence first. The manager's primary role should be to monitor and coach to the plan's execution, not the immediate outcomes.", priority: "High", severity: "High", complexity: "Medium" }] }
        ]
    },
    {
        category: "Strategic Focuses",
        focusAreas: [
            { title: "Comp Plan", benchmarks: [], insights: ["The current SDR comp plan is heavily weighted on pipeline creation, a metric largely outside their control, which creates friction with AEs and is demotivating."], recommendedActions: [{ id: "SF-CP-01", title: "Redesign the SDR comp plan to be heavily weighted on controllable metrics (qualified First Meetings) and include incentives for multi-threading.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "Sales Playbook", benchmarks: [], insights: ["There is no standardized sales playbook. Multiple attempts to create one have failed due to constant leadership changes."], recommendedActions: [{ id: "SF-SP-01", title: "Commit to and execute the creation of a single, global sales playbook as a top-priority, cross-functional initiative.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "SDR Playbook", benchmarks: [], insights: ["SDRs lack a \"back to basics\" guide for daily and weekly activities, leading to inconsistent execution and poor tool adoption."], recommendedActions: [{ id: "SF-SDRP-01", title: "Create a simple, documented SDR Playbook that outlines the core operational rhythm, activity benchmarks, and tool usage expectations.", priority: "High", severity: "High", complexity: "Medium" }] },
            { title: "SDR > Sales Handoff", benchmarks: [], insights: ["The handoff from SDR to Sales Director is a major point of friction, with AEs often rejecting opportunities. The process is subjective and inconsistent.", "Leadership's view is that the handoff is broken because it puts qualification criteria on SDRs that are outside their control (e.g., \"is the prospect ready to buy now?\"). This creates friction and disincentivizes AEs from nurturing early-stage deals."], recommendedActions: [{ id: "SF-SSH-01", title: "Define and enforce objective, non-discretionary qualification criteria for an opportunity to move from Stage 0 to Stage 1. Redefine a qualified meeting based on objective, controllable criteria (Right Account + Right Persona). The AE, not the SDR, is responsible for nurturing the deal if the timing isn't right.", priority: "High", severity: "High", complexity: "High" }] },
            { title: "MKT > SDR Handoff", benchmarks: [], insights: ["The handoff is complicated by a process where leads are converted to contacts. This has been a point of friction, though a new auto-conversion process is being implemented to address it."], recommendedActions: [{ id: "SF-MSH-01", title: "Monitor the new MQL auto-conversion process to ensure it is effectively streamlining the handoff and reducing manual work for SDRs.", priority: "Medium", severity: "Medium", complexity: "Low" }] },
            { title: "Change Readiness", benchmarks: [], insights: ["The entire organization is suffering from severe \"change fatigue\" after years of constant leadership turnover, layoffs, and shifting strategies. Leadership confirmed the business has gone through immense change (layoffs, leadership turnover, ICP shifts, marketing budget cuts), leading to team burnout and \"change fatigue.\""], recommendedActions: [{ id: "SF-CR-01", title: "Stabilize the organization by freezing all non-essential GTM initiatives for a 60-day period and communicating a clear, long-term commitment to the new SDR leadership and structure. Implement a 60-day freeze on all new, non-essential GTM initiatives. Clearly communicate a long-term commitment to the new SDR leadership and GTM structure to signal stability.", priority: "High", severity: "High", complexity: "High" }] },
        ]
    },
    {
        category: "Training & Enablement",
        focusAreas: [
            { title: "Ongoing Enablement", benchmarks: [], insights: ["The enablement function has been inconsistent, appearing and disappearing over the years. This has prevented any long-term, sustainable training programs from taking hold."], recommendedActions: [{ id: "TE-OE-01", title: "Formally commit to the Revenue Enablement function as a permanent, strategic pillar of the GTM organization and resource it accordingly.", priority: "High", severity: "Medium", complexity: "High" }] }
        ]
    },
    {
        category: "AI Use Cases",
        focusAreas: [
            { 
                title: "AI-Powered Research", 
                benchmarks: [], 
                insights: ["Best practice involves using AI to automate pre-call research, synthesizing data from LinkedIn, news, and company reports into concise briefs. This saves significant time and equips reps with hyper-relevant talking points, boosting engagement efficiency."], 
                recommendedActions: [{ id: "AI-R-01", title: "Implement an AI-powered research workflow within the sales playbook. Train reps on specific AI prompting techniques to generate account summaries, identify key stakeholders, and uncover strategic initiatives, making research a repeatable, high-ROI activity.", priority: "Medium", severity: "Medium", complexity: "Medium" }] 
            },
            { 
                title: "AI-Assisted Messaging", 
                benchmarks: [], 
                insights: ["Effective teams use AI as a 'writing co-pilot' to personalize outreach at scale, not just automate it. Best practices focus on using AI to generate variations, improve tone, and draft messages based on prospect data, augmenting—not replacing—rep creativity."], 
                recommendedActions: [{ id: "AI-M-01", title: "Create and train on an 'AI-Assisted Messaging' framework. This includes best practices for using AI to A/B test subject lines, personalize opening sentences based on prospect activity, and rapidly convert generic marketing copy into persona-specific value propositions.", priority: "Medium", severity: "High", complexity: "High" }] 
            },
            { 
                title: "AI for Strategic Account Planning", 
                benchmarks: [], 
                insights: ["Best practice shifts account planning from a static exercise to a dynamic strategy powered by AI. By analyzing CRM data, intent signals, and market trends, AI can efficiently identify whitespace opportunities, suggest key personas, and map out data-driven paths to decision-makers."], 
                recommendedActions: [{ id: "AI-SAP-01", title: "Develop and implement an AI-driven 'Engagement Plan' model. This best practice involves using AI to analyze target accounts and generate a recommended outreach strategy, including talking points and a multi-threading approach, turning planning into an efficient, strategic weapon.", priority: "High", severity: "Medium", complexity: "High" }] 
            },
            { 
                title: "AI for Call Analysis & Coaching", 
                benchmarks: [], 
                insights: ["Top-performing teams leverage AI-powered conversation intelligence (Gong) to scale coaching effectiveness. Instead of random call reviews, best practice involves using AI to automatically flag key moments—like effective objection handling or playbook adherence—allowing managers to focus coaching time efficiently."], 
                recommendedActions: [{ id: "AI-CTA-01", title: "Integrate AI call analysis into the formal management operating rhythm. Implement manager dashboards in Gong to track adoption of new talk tracks, identify and share 'best practice' call snippets for team-wide training, and provide data-driven, scalable coaching.", priority: "High", severity: "Medium", complexity: "Medium" }] 
            }
        ]
    }
];
