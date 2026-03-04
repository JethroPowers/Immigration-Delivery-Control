export type RiskMetric = {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "neutral" | "danger" | "warning" | "success";
};

export type RedQueueItem = {
  caseId: string;
  route: "Skilled Worker" | "Partner";
  deadline: string;
  blocker: string;
};

export type CaseStep = {
  id: string;
  title: string;
  caption: string;
  status: "active" | "blocked" | "ready" | "waiting";
  timeline: string;
  panel: {
    heading: string;
    details: string[];
    badges: string[];
  };
};

export type PilotPlan = {
  name: string;
  price: string;
  label?: string;
  cta: string;
  inclusions: string[];
  featured?: boolean;
};

export type PartnerProofStat = {
  label: string;
  value: string;
  note: string;
};

export type MapStoryStep = {
  id: "operator" | "evidence" | "architecture";
  label: string;
  title: string;
  description: string;
  benefit: string;
  payoff: string;
  before: string;
  after: string;
  microcopy: string[];
  outcomes: string[];
  legend: string[];
};

export const riskMetrics: RiskMetric[] = [
  {
    label: "At-Risk Deadline Count",
    value: 12,
    hint: "Inside critical window and not submission-ready",
    tone: "danger"
  },
  { label: "45-day window", value: 9, tone: "warning" },
  { label: "30-day window", value: 5, tone: "warning" },
  { label: "14-day window", value: 3, tone: "danger" },
  { label: "Blocked by evidence", value: 8, tone: "danger" },
  { label: "Overdue updates", value: 6, tone: "warning" }
];

export const partnerProofStats: PartnerProofStat[] = [
  {
    label: "At-risk matters under active triage",
    value: "100%",
    note: "Red queue owned with explicit next action"
  },
  {
    label: "Target reduction in update latency",
    value: "30-50%",
    note: "From ad-hoc updates to SLA-controlled updates"
  },
  {
    label: "Evidence readiness by D-14 checkpoint",
    value: ">=85%",
    note: "Pilot benchmark for controlled submissions"
  }
];

export const redQueueItems: RedQueueItem[] = [
  {
    caseId: "IDC-2419",
    route: "Skilled Worker",
    deadline: "14 days",
    blocker: "Blocked: missing payslips"
  },
  {
    caseId: "IDC-2430",
    route: "Partner",
    deadline: "11 days",
    blocker: "Needs fix: address mismatch"
  },
  {
    caseId: "IDC-2397",
    route: "Skilled Worker",
    deadline: "9 days",
    blocker: "Sign-off pending: partner review"
  },
  {
    caseId: "IDC-2451",
    route: "Partner",
    deadline: "6 days",
    blocker: "Update overdue: 3 days"
  },
  {
    caseId: "IDC-2388",
    route: "Skilled Worker",
    deadline: "4 days",
    blocker: "Timing invalid: COS amendment needed"
  }
];

export const caseSteps: CaseStep[] = [
  {
    id: "timeline",
    title: "1. Timeline computed",
    caption: "Route + expiry captured, control dates generated",
    status: "active",
    timeline: "Day 0",
    panel: {
      heading: "Case IDC-2430 • Partner extension",
      details: [
        "Visa expiry: 12 Aug 2026",
        "Critical checkpoints auto-created: D-45 / D-30 / D-14",
        "Owner assigned, review path set"
      ],
      badges: ["Control date health: good", "Partner visibility: on"]
    }
  },
  {
    id: "evidence",
    title: "2. Evidence requested",
    caption: "Checklist sent with file-level requirements",
    status: "waiting",
    timeline: "Day 5",
    panel: {
      heading: "Evidence loop opened",
      details: [
        "Checklist request sent to client portal",
        "Auto-filing labels expected documents by category",
        "SLA timer starts for missing uploads"
      ],
      badges: ["Client action: pending", "Reminder cadence: active"]
    }
  },
  {
    id: "validation",
    title: "3. Validation catches defects",
    caption: "Issues routed back with exact fix requests",
    status: "blocked",
    timeline: "Day 11",
    panel: {
      heading: "Validation status: blocked",
      details: [
        "Issue flagged: Needs fix: address mismatch",
        "Issue flagged: Missing employer letter signature",
        "Case cannot progress until blockers resolved"
      ],
      badges: ["Blocked by evidence", "Escalation threshold: 48h"]
    }
  },
  {
    id: "gate",
    title: "4. Submission gate",
    caption: "Readiness checks for timing, sign-off, approvals",
    status: "active",
    timeline: "Day 19",
    panel: {
      heading: "Gate checks running",
      details: [
        "Evidence completeness: 100%",
        "Client declaration: signed",
        "Internal sign-off: awaiting partner"
      ],
      badges: ["Gate locked", "1 blocker remaining"]
    }
  },
  {
    id: "submitted",
    title: "5. Submitted + waiting-state control",
    caption: "Post-submission tasks and update SLAs tracked",
    status: "ready",
    timeline: "Day 23",
    panel: {
      heading: "Submitted safely",
      details: [
        "Submission event logged with timestamp",
        "Biometrics step tracked with due date",
        "Client update SLA countdown enabled"
      ],
      badges: ["Update due in 4 days", "Proof timeline append-only"]
    }
  },
  {
    id: "ilr",
    title: "6. ILR readiness trigger",
    caption: "Countdown opens ILR path when criteria match",
    status: "ready",
    timeline: "Future trigger",
    panel: {
      heading: "ILR conversion prepared",
      details: [
        "Eligibility window monitored continuously",
        "Evidence baseline carried forward",
        "ILR gate opens only when timing + docs align"
      ],
      badges: ["ILR watch: active", "Partner review queued"]
    }
  }
];

export const whyCasesBreak = [
  "Expiry dates are visible somewhere, but not controlled operationally.",
  "Evidence packs stay half-ready until the critical window.",
  "Cases appear nearly ready without passing a real submission gate.",
  "Client updates drift, then become partner escalations.",
  "No single red queue shows what is truly at risk right now."
];

export const primitives = [
  {
    title: "Timeline Engine",
    body: "Computes route-specific checkpoints for extension and ILR readiness, then pushes risk windows to the board."
  },
  {
    title: "Evidence Gate",
    body: "Runs request → upload → validation → fix loops until evidence is actually usable, not just uploaded."
  },
  {
    title: "Proof Timeline",
    body: "Append-only log of readiness shifts, escalations, sign-offs, and submission events for defensible supervision."
  }
];

export const bentoCards = [
  {
    title: "Deadline loop",
    body: "Critical windows surface automatically. Matters without readiness become red queue entries before they become urgent.",
    metric: "45/30/14-day board"
  },
  {
    title: "Evidence loop",
    body: "File defects are identified early with exact fix instructions, reducing repeated back-and-forth.",
    metric: "Needs-fix cycle time"
  },
  {
    title: "Comms loop",
    body: "Waiting-state updates are scheduled and visible, reducing client chasers and ad-hoc messaging.",
    metric: "Update latency"
  },
  {
    title: "Partner escalation loop",
    body: "Only true exceptions rise. Partners see risk by deadline and blocker, not narrative status notes.",
    metric: "Red queue clarity"
  },
  {
    title: "Readiness gate loop",
    body: "No submission proceeds on optimism. Timing, sign-off, evidence and approvals must all be green.",
    metric: "Unsafe filings blocked"
  }
];

export const regulatedDeliveryBullets = [
  "Role-based handoffs with clear ownership at each state transition",
  "Submission gating that separates legal judgment from operational controls",
  "Evidence and decision trail built for supervision and post-incident review",
  "Designed for small teams with partner-led accountability"
];

export const securityItems = [
  "Encryption in transit and at rest",
  "Role-based access controls",
  "Append-only audit logs",
  "Configurable retention windows"
];

export const pilotPlans: PilotPlan[] = [
  {
    name: "Focused Pilot",
    price: "From £X",
    label: "90 days",
    cta: "Book pilot scoping call",
    featured: true,
    inclusions: [
      "Up to 25 active matters",
      "Portfolio Risk Board + red queue",
      "Evidence gating workflow",
      "Submission readiness gate",
      "Partner weekly control review"
    ]
  },
  {
    name: "Pilot + Rollout Design",
    price: "From £X+",
    label: "90 days + roadmap",
    cta: "Request rollout plan",
    inclusions: [
      "Everything in Focused Pilot",
      "Post-pilot operating model design",
      "Route expansion plan (next case types)",
      "Control metrics baseline + target model",
      "Implementation playbook handover"
    ]
  }
];

export const pilotMetrics = [
  "At-Risk Deadline Count",
  "Document readiness rate",
  "Time spent in needs-fix loops",
  "Client update latency",
  "Stalled matters without clear next action"
];

export const mapStorySteps: MapStoryStep[] = [
  {
    id: "operator",
    label: "Step 1",
    title: "Operator flow from intake to ILR",
    description:
      "This state map makes every case stage explicit, including blocked and waiting states that typically create surprises.",
    benefit: "Partners get one defensible control path instead of status guesswork.",
    payoff: "This reduces partner escalation by removing ambiguity in case status.",
    before: "Case status is interpreted differently by each team member.",
    after: "One shared state model defines exactly where each matter is and what must happen next.",
    microcopy: [
      "Blocked: missing payslips",
      "Update overdue: 3 days",
      "Waiting: biometrics booked"
    ],
    outcomes: [
      "Single operational truth per matter",
      "Cleaner partner supervision",
      "Less status ambiguity in team handoffs",
      "Earlier exception escalation"
    ],
    legend: ["Ready", "Blocked", "Waiting"]
  },
  {
    id: "evidence",
    label: "Step 2",
    title: "Evidence gating loop in action",
    description:
      "The loop enforces request, validation, fix, and verify cycles so evidence quality improves before the deadline window tightens.",
    benefit: "Fee earners spend less time chasing and more time progressing ready matters.",
    payoff: "This reduces rework by catching quality defects before submission windows tighten.",
    before: "Documents arrive in fragments and issues are discovered too late.",
    after: "Validation finds defects early with exact fix requests before submission pressure spikes.",
    microcopy: [
      "Needs fix: address mismatch",
      "Verified: employment letter",
      "Blocked: bank statement missing page"
    ],
    outcomes: [
      "Fewer document chase loops",
      "Higher evidence quality before gate",
      "Reduced last-minute correction pressure",
      "Faster path to submission readiness"
    ],
    legend: ["Requested", "Needs fix", "Verified"]
  },
  {
    id: "architecture",
    label: "Step 3",
    title: "Overlay architecture with current tooling",
    description:
      "Shows where email, WhatsApp, drive links, and your existing case system connect into one control layer.",
    benefit: "You gain control without replacing your current platform first.",
    payoff: "This reduces rollout friction by working with tools your team already uses.",
    before: "Teams keep context in separate tools with no single operational truth.",
    after: "Current tooling feeds one control layer for risk, readiness, and proof logging.",
    microcopy: [
      "Ingested: email evidence upload",
      "Linked: current PMS case metadata",
      "Red queue: 5 matters need partner sign-off"
    ],
    outcomes: [
      "No forced platform migration",
      "Faster implementation for small teams",
      "Unified risk visibility across tools",
      "Defensible proof logging for review"
    ],
    legend: ["Source systems", "Control layer", "Partner outputs"]
  }
];

export const faqs = [
  {
    question: "Is this a practice management replacement?",
    answer:
      "No. It operates as a control layer around your existing tools to improve risk visibility, readiness, and auditability."
  },
  {
    question: "Does this provide legal advice?",
    answer:
      "No. Legal judgment remains with your lawyers. The product supports operational discipline and escalation."
  },
  {
    question: "Will this create more admin for fee earners?",
    answer:
      "The goal is the opposite: structured loops reduce repetitive chasing and remove partner time spent finding status context."
  },
  {
    question: "Can we use it if we already run a case system?",
    answer:
      "Yes. Overlay mode is designed for firms with an existing PMS/CRM where control gaps still appear near deadlines."
  },
  {
    question: "Which case types are supported first?",
    answer:
      "In-country Skilled Worker and Partner extensions, with ILR readiness and conversion controls."
  }
];

export const mapDefinitions = {
  operator: `stateDiagram-v2
  [*] --> Intake
  Intake --> TimelineComputed: route + expiry captured
  TimelineComputed --> EvidencePlan
  EvidencePlan --> EvidenceCollection
  EvidenceCollection --> EvidenceValidation: doc uploaded
  EvidenceValidation --> EvidenceCollection: needs-fix
  EvidenceValidation --> SubmissionGate: verified pack
  SubmissionGate --> Blocked: missing sign-off/timing invalid
  Blocked --> SubmissionGate: resolved
  SubmissionGate --> Submitted: authorised sign-off
  Submitted --> IdentityStep: biometrics/ID
  IdentityStep --> Waiting
  Waiting --> RFI: HO request
  RFI --> Waiting: response sent
  Waiting --> Granted: decision
  Granted --> ILRReadiness: countdown trigger
  ILRReadiness --> ILRSubmitted: gate satisfied
  ILRSubmitted --> ILRWaiting
  ILRWaiting --> Settled: ILR granted
  Settled --> [*]`,
  evidence: `flowchart LR
  A[Request checklist] --> B[Client upload link]
  B --> C[Auto file + label]
  C --> D{Validation}
  D -- Pass --> E[Verified]
  D -- Fail --> F[Fix request: exact issue]
  F --> B
  E --> G[Ready-to-submit gate unlock]`,
  architecture: `flowchart TB
  subgraph FirmTooling[Existing firm tooling]
    Email[Email/Outlook] -->|forward| Ingest
    WA[WhatsApp docs] -->|forward| Ingest
    Drive[Drive/SharePoint] --> Links
    PMS[Current case system] --> CaseMeta
  end

  Ingest[Ingestion + auto-filing] --> Evidence[Evidence status + checklist]
  CaseMeta[Case metadata import] --> DateEngine[Date + rule engine]
  DateEngine --> RiskBoard[Portfolio Risk Board]
  Evidence --> Gate[Submission readiness gate]
  Gate --> Comms[Comms SLA + templates]
  RiskBoard --> RedQueue[Partner Red Queue]
  Comms --> Proof[Append-only proof timeline]
  Gate --> Proof
  Evidence --> Proof`
};

export const mapOverviewDefinitions = {
  operator: `stateDiagram-v2
  [*] --> Intake
  Intake --> Evidence
  Evidence --> SubmissionGate
  SubmissionGate --> Submitted
  Submitted --> Waiting
  Waiting --> Granted
  Granted --> ILRReadiness
  ILRReadiness --> Settled
  Evidence --> Blocked
  SubmissionGate --> Blocked
  Blocked --> Evidence`,
  evidence: `flowchart LR
  A[Request] --> B[Upload]
  B --> C{Check}
  C -- Pass --> D[Verified]
  C -- Fail --> E[Fix]
  E --> B
  D --> F[Gate unlock]`,
  architecture: `flowchart LR
  A[Current tools] --> B[Control layer]
  B --> C[Risk board]
  B --> D[Submission gate]
  B --> E[Proof timeline]
  C --> F[Partner red queue]`
};
