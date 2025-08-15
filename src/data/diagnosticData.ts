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
    category: "Technology & Tools",
    focusAreas: [
      {
        title: "Data Enrichment & Prospecting Tools",
        benchmarks: [
          "SDRs should have access to reliable data enrichment tools with >90% accuracy for contact information in their target markets.",
          "The process of finding and importing contacts should take less than 10% of an SDR's total prospecting time."
        ],
        insights: [
          "The team's current data acquisition tool was described as providing 'shocking' and ineffective data, especially in key international markets.",
          "A previously used tool was considered far more effective, and its removal is a key point of frustration and a direct cause of inefficiency.",
          "Finding correct contact data is a major time sink and bottleneck for the entire prospecting motion."
        ],
        recommendedActions: [
          {
            id: "ACTION-001",
            title: "Evaluate and Replace Ineffective Data Enrichment Tool",
            priority: "High",
            severity: "High",
            complexity: "Medium"
          }
        ]
      }
    ]
  },
  {
    category: "Engagement Capacity",
    focusAreas: [
      {
        title: "Workflow & Workload Balance",
        benchmarks: [
          "SDR time should be strategically allocated across high-impact workflows based on role and segment.",
          "Workload distribution (e.g., inbound vs. outbound focus) should be clearly defined and consistently applied."
        ],
        insights: [
          "There is a significant lack of clarity on how SDR time is, and should be, distributed across critical tasks.",
          "Without clear guidance, capacity is often misallocated to lower-priority activities, diminishing overall pipeline contribution."
        ],
        recommendedActions: [
          {
            id: "ACTION-002",
            title: "Define and Standardize SDR Workflow Allocations",
            priority: "High",
            severity: "Medium",
            complexity: "Medium"
          }
        ]
      },
      {
        title: "Account & Territory Saturation",
        benchmarks: [
          "SDRs should manage a sustainable number of accounts per quarter (typically 100-200) to ensure deep, effective engagement.",
          "Territory allocation must account for an SDR's capacity to prevent superficial outreach and burnout."
        ],
        insights: [
          "Many teams assign an unsustainable number of accounts (>300 per quarter) per SDR, leading to low conversion rates.",
          "Superficial, high-volume engagement fails to penetrate key accounts effectively and leads to territory saturation."
        ],
        recommendedActions: [
          {
            id: "ACTION-003",
            title: "Re-evaluate and Right-size SDR Territory Loads",
            priority: "High",
            severity: "High",
            complexity: "High"
          }
        ]
      },
      {
        title: "Engagement Quality & Consistency",
        benchmarks: [
          "Prospects should receive a minimum of 10-15 multi-channel touches for effective outbound engagement.",
          "Over 90% of all engagement tasks should be completed on-time to maintain momentum and maximize conversion."
        ],
        insights: [
          "A significant portion of targeted prospects receive insufficient touches (often less than 10), leading to missed opportunities.",
          "Low on-time task completion rates break engagement momentum, dramatically reducing conversion probability.",
          "The average time between touches is often too long, allowing prospects to go cold."
        ],
        recommendedActions: [
          {
            id: "ACTION-004",
            title: "Implement Standardized Engagement Playbooks",
            priority: "High",
            severity: "High",
            complexity: "Medium"
          },
          {
            id: "ACTION-005",
            title: "Establish and Monitor On-Time Task Completion SLAs",
            priority: "Medium",
            severity: "High",
            complexity: "Medium"
          }
        ]
      }
    ]
  },
  {
    category: "Content Strategy & Messaging",
    focusAreas: [
        {
            title: "Persona & ICP Alignment",
            benchmarks: [
                "All sales content should be mapped to specific buyer personas and stages of the customer journey.",
                "Messaging should be tailored to address the unique pain points and value drivers of each target segment."
            ],
            insights: [
                "A significant portion of email and sequence content is generic and lacks personalization, resulting in low engagement.",
                "There is no formal process for gathering persona insights from the field to refine messaging.",
                "The value proposition is not consistently articulated across different content assets."
            ],
            recommendedActions: [
                {
                    id: "ACTION-009",
                    title: "Conduct Persona & Messaging Workshop",
                    priority: "High",
                    severity: "High",
                    complexity: "Medium"
                }
            ]
        },
        {
            title: "Sequence Effectiveness",
            benchmarks: [
                "Outbound sequences should achieve a minimum reply rate of 8-10%.",
                "Sequences should be structured with a multi-channel approach, balancing automated emails with manual calls and social touches."
            ],
            insights: [
                "The majority of outbound sequences have a reply rate below 3%, indicating significant content and strategy issues.",
                "Many sequences are email-only and lack the channel diversity needed to break through the noise.",
                "Step-by-step drop-off rates are high, with engagement plummeting after the first two steps."
            ],
            recommendedActions: [
                {
                    id: "ACTION-010",
                    title: "Audit and Rebuild Core Sales Sequences",
                    priority: "High",
                    severity: "High",
                    complexity: "High"
                }
            ]
        }
    ]
  },
  {
      category: "Systems & Integrations",
      focusAreas: [
          {
              title: "CRM & Engagement Platform Sync",
              benchmarks: [
                  "Key activities (emails, calls, meetings) should sync from the engagement platform to the CRM in real-time with <1% error rate.",
                  "Contact and account data should be bi-directionally synced to ensure a single source of truth."
              ],
              insights: [
                  "Frequent sync errors between Outreach and Salesforce are causing significant data gaps and manual data entry work for reps.",
                  "Key engagement activities are not being properly logged, leading to an incomplete view of prospect interaction.",
                  "Field mapping is inconsistent, causing data to be lost or misplaced during synchronization."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-011",
                      title: "Conduct Full Audit of Salesforce-Outreach Integration",
                      priority: "High",
                      severity: "High",
                      complexity: "High"
                  }
              ]
          },
          {
              title: "Data Hygiene & Duplication",
              benchmarks: [
                  "The rate of duplicate contacts and leads in the CRM should be below 5%.",
                  "Automated processes should be in place to identify, merge, or remove duplicate records."
              ],
              insights: [
                  "High rates of duplicate records are causing confusion for lead routing and account ownership.",
                  "Reps are wasting time engaging duplicate leads that have already been contacted by a colleague.",
                  "There is no clear process or tool in place for managing data hygiene systematically."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-012",
                      title: "Implement a Data Deduplication & Hygiene Process",
                      priority: "Medium",
                      severity: "High",
                      complexity: "Medium"
                  }
              ]
          }
      ]
  },
  {
      category: "GTM Process & Handoffs",
      focusAreas: [
          {
              title: "Lead Routing & SLAs",
              benchmarks: [
                  "High-priority inbound leads (e.g., contact requests) should be followed up on within 5 minutes.",
                  "Clear SLAs should define the expected follow-up time and process for all lead types."
              ],
              insights: [
                  "Lead routing delays average over 24 hours, causing a significant drop in conversion rates.",
                  "There are no defined SLAs for MQL follow-up, leading to inconsistent rep behavior.",
                  "A significant percentage of leads are never contacted due to routing failures or lack of clarity on ownership."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-013",
                      title: "Redesign Lead Routing Rules and Implement Strict SLAs",
                      priority: "High",
                      severity: "High",
                      complexity: "High"
                  }
              ]
          },
          {
              title: "SDR to AE Handoff (SQL)",
              benchmarks: [
                  "There should be a universally understood and enforced definition of a Sales Qualified Lead (SQL).",
                  "The SQL acceptance rate by AEs should be above 90%."
              ],
              insights: [
                  "The definition of an SQL is subjective and varies from rep to rep, leading to conflict between SDRs and AEs.",
                  "A high percentage of meetings booked by SDRs are rejected by AEs as unqualified.",
                  "The handoff process is manual and lacks a formal checklist, resulting in lost information and a poor customer experience."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-014",
                      title: "Standardize SQL Definition and Automate Handoff Process",
                      priority: "High",
                      severity: "High",
                      complexity: "Medium"
                  }
              ]
          }
      ]
  },
  {
      category: "Leadership & Enablement",
      focusAreas: [
          {
              title: "SDR Management & Coaching",
              benchmarks: [
                  "SDR managers should spend at least 50% of their time on coaching and performance management.",
                  "Coaching sessions should be structured, data-driven, and occur on a consistent weekly cadence."
              ],
              insights: [
                  "High SDR manager turnover has led to a lack of stable leadership and process consistency.",
                  "Managers are often consumed by administrative tasks, leaving little time for proactive coaching.",
                  "Coaching is often ad-hoc and lacks a structured framework, leading to inconsistent development across the team."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-015",
                      title: "Develop a Standardized Sales Coaching Framework",
                      priority: "High",
                      severity: "Medium",
                      complexity: "Medium"
                  }
              ]
          },
          {
              title: "Tool Adoption & Proficiency",
              benchmarks: [
                  "Adoption rates for core sales tools (CRM, engagement, intelligence) should exceed 95%.",
                  "Formal training and certification should be required for all core tools in the tech stack."
              ],
              insights: [
                  "Adoption rates for key tools like Gong and Outreach are below 70%, meaning expensive investments are being wasted.",
                  "Reps report a lack of confidence in using the full feature set of the available tools.",
                  "There is no ongoing enablement to ensure the team is keeping up with new features and best practices."
              ],
              recommendedActions: [
                  {
                      id: "ACTION-016",
                      title: "Launch a Tech Stack Adoption & Enablement Program",
                      priority: "Medium",
                      severity: "High",
                      complexity: "Medium"
                  }
              ]
          }
      ]
  }
];
