export type OutcomeCard = {
  title: string;
  tracked: string;
  pilotOutcome: string;
  microcopy: string;
};

export type BoardMetric = {
  label: string;
  value: string;
  tone?: "danger" | "warning" | "neutral";
};

export type BoardRow = {
  caseId: string;
  route: "Skilled Worker" | "Partner";
  nextDeadline: string;
  blocker: string;
  nextAction: string;
};

export type BentoItem = {
  title: string;
  body: string;
};

export type ConvenienceCard = {
  title: string;
  body: string;
  mockTitle: string;
  mockLines: string[];
};

export type DeliveryMapStep = {
  id: "operator" | "evidence" | "architecture";
  label: string;
  title: string;
  before: string;
  after: string;
  payoff: string;
  microcopy: string[];
  outcomes: string[];
  legend: string[];
};

export type CaseWalkthroughStep = {
  id: string;
  title: string;
  caption: string;
  speedEffect: string;
  status: "active" | "blocked" | "ready" | "waiting";
  timeline: string;
  panelTitle: string;
  panelDetails: string[];
  panelBadges: string[];
};

export type WeekOneStep = {
  day: string;
  title: string;
  body: string;
};

export type StackTool = {
  name: string;
};

export type PilotPlan = {
  name: string;
  price: string;
  label: string;
  inclusions: string[];
  cta: string;
  subtext?: string;
  note?: string;
  featured?: boolean;
};

export type FocusedPilotOffer = {
  title: string;
  price: string;
  subtext: string;
  scope: string[];
  outcomes: string[];
  weekOneDeliverable: string;
  cta: string;
  note: string;
};

export type RolloutOffer = {
  title: string;
  price: string;
  subtext: string;
  includes: string[];
  cta: string;
};

export const navItems = [
  { label: "How it speeds delivery", href: "#how-it-works" },
  { label: "Case walkthrough", href: "#single-case" },
  { label: "Pilot", href: "#pilot" },
  { label: "FAQ", href: "#faq" }
];

export const heroContent = {
  eyebrow: "For UK immigration teams with 3–15 staff",
  title: "Stop chasing documents.\nGet cases submission-ready faster.",
  subhead: "Operational delivery control for UK extension + ILR teams",
  support:
    "Bring deadlines, evidence, and client updates into one operational layer. Reduce document chasing, remove nearly-ready ambiguity, and keep clients informed without the partner acting as the manual control system.",
  trust:
    "Works alongside your current case system. Operational workflow only — not legal advice.",
  primaryCta: "Book pilot conversation",
  secondaryCta: "See a real case walkthrough"
};

export const outcomeCards: OutcomeCard[] = [
  {
    title: "Time to submission-ready",
    tracked: "Tracked baseline",
    pilotOutcome: "Pilot outcome target",
    microcopy: "Days from instruction -> submission-ready (tracked in pilot)"
  },
  {
    title: "Chase events per case",
    tracked: "Tracked baseline",
    pilotOutcome: "Pilot outcome target",
    microcopy: "How many times we have to chase documents per matter"
  },
  {
    title: "Partner interruptions per matter",
    tracked: "Tracked baseline",
    pilotOutcome: "Pilot outcome target",
    microcopy: "Escalations that require partner attention"
  },
  {
    title: "Client clarity / update gaps",
    tracked: "Tracked baseline",
    pilotOutcome: "Pilot outcome target",
    microcopy: "Days a case sits waiting without a logged update"
  }
];

export const portfolioBoard = {
  heading: "See what’s slowing cases down — before deadlines create panic.",
  caption:
    "Your team stops digging through inboxes. The system tells you exactly what to unblock next."
};

export const boardMetrics: BoardMetric[] = [
  {
    label: "Cases not submission-ready inside 14 days",
    value: "7",
    tone: "danger"
  },
  { label: "Blocked by evidence", value: "11", tone: "warning" },
  { label: "Overdue client response", value: "6", tone: "warning" },
  { label: "Waiting-state: update due", value: "9", tone: "warning" },
  { label: "Partner queue (exceptions only)", value: "5", tone: "danger" }
];

export const boardRows: BoardRow[] = [
  {
    caseId: "IDC-2419",
    route: "Skilled Worker",
    nextDeadline: "11 days",
    blocker: "Missing payslips (2/6)",
    nextAction: "Send targeted upload request + 24h reminder"
  },
  {
    caseId: "IDC-2430",
    route: "Partner",
    nextDeadline: "9 days",
    blocker: "Needs fix: address mismatch",
    nextAction: "Issue fix request with exact mismatch note"
  },
  {
    caseId: "IDC-2448",
    route: "Skilled Worker",
    nextDeadline: "8 days",
    blocker: "Awaiting sponsor letter",
    nextAction: "Escalate sponsor letter request to employer contact"
  },
  {
    caseId: "IDC-2451",
    route: "Partner",
    nextDeadline: "7 days",
    blocker: "Client silent: 4 days",
    nextAction: "Trigger stage-aware update + follow-up chase"
  },
  {
    caseId: "IDC-2388",
    route: "Skilled Worker",
    nextDeadline: "5 days",
    blocker: "Sign-off pending",
    nextAction: "Route to partner exception queue"
  }
];

export const whyChangeNow = {
  title: "Why firms add this before things break",
  paragraphOne:
    "Most teams can run on memory and inbox chasing until volume rises. Then speed drops, clients chase more, and partner attention becomes the bottleneck.",
  paragraphTwo:
    "Delivery Control pays for itself when your team is stuck in chasing loops and nearly-ready cases."
};

export const whyChangeNowCards: BentoItem[] = [
  {
    title: "Speed breaks first",
    body: "Evidence collection becomes the bottleneck."
  },
  {
    title: "Chasing becomes the workload",
    body: "Admin touches multiply without anyone noticing."
  },
  {
    title: "Partner becomes the operating system",
    body: "Everything escalates because no one has a single truth."
  }
];

export const whyCasesBreakBullets = [
  "Evidence arrives in fragments, then defects are found too late.",
  "Nearly ready cases are not actually submission-ready.",
  "Clients do not know what is next, so they chase.",
  "Team spends time searching across tools instead of moving the case.",
  "Partner becomes the escalation layer for routine uncertainty."
];

export const overlaySection = {
  title: "Not practice management. A delivery accelerator overlay.",
  subtitle:
    "This does not replace your case system. It runs the delivery workflow loops that move cases to submission-ready faster."
};

export const overlayColumns = {
  left: {
    title: "Practice management / CRM",
    points: ["Records matters", "Stores notes", "Logs tasks"]
  },
  right: {
    title: "Delivery Acceleration",
    points: [
      "Moves cases to submission-ready faster",
      "Runs evidence + update loops",
      "Surfaces unblock actions in real time"
    ]
  }
};

export const overlayPrimitives: BentoItem[] = [
  {
    title: "Speed Timeline",
    body: "Computes next deadlines and builds a submission-ready path with clear next actions."
  },
  {
    title: "Evidence Accelerator",
    body: "Request -> upload -> validation -> fix loops that reduce chase events and rework."
  },
  {
    title: "Client Clarity Layer",
    body: "Stage-aware updates plus a client view that reduces inbound chasing."
  }
];

export const proofTimelineSupport =
  "Proof Timeline (supporting): append-only log of overrides, sign-offs, and readiness state changes.";

export const adminLoopCards: BentoItem[] = [
  {
    title: "Deadline loop",
    body: "D-45 / D-30 / D-14 checkpoints stay visible so nearly-ready cases are challenged early."
  },
  {
    title: "Evidence loop",
    body: "Needs-fix cycles run with exact defect feedback to reduce repeated chasing and late surprises."
  },
  {
    title: "Client update loop",
    body: "Stage-aware updates run on cadence so waiting-state silence does not trigger inbound chasers."
  },
  {
    title: "Partner exception loop",
    body: "Only true exceptions hit partner queue, preserving senior time for decisions that need it."
  }
];

export const clientConvenienceCards: ConvenienceCard[] = [
  {
    title: "Personalised checklist",
    body: "Route-aware doc requests, not generic lists.",
    mockTitle: "Checklist: Partner extension",
    mockLines: ["Address proof (2 docs)", "Relationship evidence", "Income proof (latest 6 months)"]
  },
  {
    title: "One-tap mobile upload",
    body: "Magic link upload, clear file requirements, instant needs-fix feedback.",
    mockTitle: "Upload link (mobile)",
    mockLines: ["Upload payslip_04.pdf", "Needs fix: blurred document", "Re-upload to continue"]
  },
  {
    title: "Stage-aware updates",
    body: "Clients see what’s next and when they’ll hear from you.",
    mockTitle: "Client timeline",
    mockLines: ["Evidence review in progress", "Next update: Friday", "Submission gate pending sign-off"]
  }
];

export const clientConvenienceNote =
  "This is not about nicer messaging. It reduces inbound chasers and speeds document completion.";

export const deliveryMapSteps: DeliveryMapStep[] = [
  {
    id: "operator",
    label: "Operator flow",
    title: "How it speeds delivery",
    before: "Status spread across inbox and memory.",
    after: "Single red queue with blocker-level visibility.",
    payoff: "This reduces partner interruptions caused by status uncertainty.",
    microcopy: ["Blocked: missing payslips", "Update overdue: 3 days", "Waiting: biometrics booked"],
    outcomes: ["Fewer late filings", "Lower partner escalations", "Faster evidence readiness", "Defensible audit trail"],
    legend: ["Blocked", "Waiting", "Ready"]
  },
  {
    id: "evidence",
    label: "Evidence loop",
    title: "How it cuts chase volume",
    before: "Evidence arrives in fragments and defects are discovered late.",
    after: "Needs-fix loops run early with exact issue feedback.",
    payoff: "This reduces repeated chasing by making missing and defective items explicit.",
    microcopy: ["Needs fix: address mismatch", "Verified: sponsor letter", "Blocked: bank statement missing page"],
    outcomes: ["Fewer late filings", "Lower partner escalations", "Faster evidence readiness", "Defensible audit trail"],
    legend: ["Blocked", "Waiting", "Ready"]
  },
  {
    id: "architecture",
    label: "Overlay architecture",
    title: "How it works with current stack",
    before: "Work is split across tools with no operational single truth.",
    after: "Existing tools feed one acceleration layer for unblock actions.",
    payoff: "This reduces rollout friction and gets week-1 value without replacement.",
    microcopy: ["Ingested: email evidence upload", "Linked: existing case metadata", "Partner queue: exceptions only"],
    outcomes: ["Fewer late filings", "Lower partner escalations", "Faster evidence readiness", "Defensible audit trail"],
    legend: ["Blocked", "Waiting", "Ready"]
  }
];

export const mapOverviewDefinitions = {
  operator: `stateDiagram-v2
  [*] --> Intake
  Intake --> Evidence
  Evidence --> SubmissionGate
  SubmissionGate --> Submitted
  Submitted --> Waiting
  Waiting --> Granted
  Granted --> ILRReady
  Evidence --> Blocked
  SubmissionGate --> Blocked
  Blocked --> Evidence`,
  evidence: `flowchart LR
  A[Request] --> B[Upload]
  B --> C{Validate}
  C -- Pass --> D[Verified]
  C -- Fail --> E[Needs fix]
  E --> B
  D --> F[Submission-ready gate]`,
  architecture: `flowchart LR
  A[Email/WhatsApp/Drive/Case system] --> B[Delivery acceleration layer]
  B --> C[Unblock queue]
  B --> D[Submission-ready path]
  B --> E[Client update flow]
  D --> F[Partner exceptions only]`
};

export const mapDetailDefinitions = {
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

export const caseWalkthroughSteps: CaseWalkthroughStep[] = [
  {
    id: "timeline",
    title: "Timeline + next actions created",
    caption: "Deadline path is generated from route + expiry date.",
    speedEffect: "Speed effect: uncertainty drops because next actions are explicit.",
    status: "active",
    timeline: "Day 0",
    panelTitle: "Case IDC-2430 • Partner extension",
    panelDetails: [
      "Submission-ready path created with D-45 / D-30 / D-14 checkpoints",
      "Owner and partner exception rules assigned",
      "Client update cadence activated"
    ],
    panelBadges: ["Path active", "Partner by exception"]
  },
  {
    id: "request",
    title: "Personalised evidence request sent",
    caption: "Route-aware checklist goes out via client-friendly upload flow.",
    speedEffect: "Speed effect: chase reduced by making missing items explicit.",
    status: "waiting",
    timeline: "Day 4",
    panelTitle: "Evidence request issued",
    panelDetails: [
      "Checklist tailored to case route and stage",
      "Magic upload link sent with required file standards",
      "Reminder SLA starts if no response"
    ],
    panelBadges: ["Client action pending", "Chase loop active"]
  },
  {
    id: "validation",
    title: "Validation catches defects early (needs-fix loop)",
    caption: "Defects are surfaced before deadline pressure peaks.",
    speedEffect: "Speed effect: rework prevented by early defect detection.",
    status: "blocked",
    timeline: "Day 10",
    panelTitle: "Needs-fix loop running",
    panelDetails: [
      "Needs fix: address mismatch",
      "Missing payslips (2/6)",
      "Submission gate stays locked until verification passes"
    ],
    panelBadges: ["Blocked by evidence", "Fix request sent"]
  },
  {
    id: "gate",
    title: "Submission-ready gate (sign-off + approvals)",
    caption: "Case progresses only when evidence, timing, and approvals are valid.",
    speedEffect: "Speed effect: partner only sees exceptions, not routine checks.",
    status: "active",
    timeline: "Day 16",
    panelTitle: "Gate checks in progress",
    panelDetails: [
      "Evidence completeness verified",
      "Timing validity check passed",
      "Partner sign-off required only for exception path"
    ],
    panelBadges: ["Gate locked", "Exception routing active"]
  },
  {
    id: "waiting",
    title: "Waiting-state updates scheduled (no silence)",
    caption: "Clients and team stay aligned while waiting for external steps.",
    speedEffect: "Speed effect: inbound chasers drop due to stage-aware updates.",
    status: "ready",
    timeline: "Day 22",
    panelTitle: "Submitted + waiting-state control",
    panelDetails: [
      "Submission logged to proof timeline",
      "Biometrics step tracked",
      "Next client update date already scheduled"
    ],
    panelBadges: ["Submitted", "Update due in 4 days"]
  },
  {
    id: "ilr",
    title: "ILR path opens automatically when eligible window approaches",
    caption: "The next route is prepared without rebuilding from zero.",
    speedEffect: "Speed effect: partner only sees exception cases in ILR prep.",
    status: "ready",
    timeline: "Future",
    panelTitle: "ILR readiness monitoring active",
    panelDetails: [
      "Eligibility window monitored continuously",
      "Evidence baseline carried forward",
      "ILR readiness path opens on trigger"
    ],
    panelBadges: ["ILR watch active", "Supervision by exception"]
  }
];

export const weekOneSteps: WeekOneStep[] = [
  {
    day: "Day 1",
    title: "Import 20–25 active matters (CSV)",
    body: "Bring your live extension and ILR pipeline into one acceleration board."
  },
  {
    day: "Day 2-3",
    title: "Compute deadlines + submission-ready paths",
    body: "Each matter gets route-aware checkpoints and explicit next actions."
  },
  {
    day: "Day 4-5",
    title: "Activate evidence statuses + blocker taxonomy",
    body: "Standardise needs-fix, missing, waiting, and verified statuses."
  },
  {
    day: "Day 6-7",
    title: "Red Queue live + first unblock wins",
    body: "Partner exceptions are visible and first high-friction blockers are resolved."
  }
];

export const stackTools: StackTool[] = [
  { name: "Email" },
  { name: "WhatsApp forwarding (optional)" },
  { name: "Drive/SharePoint" },
  { name: "Existing case system" },
  { name: "Spreadsheet import" }
];

export const stackStripCopy =
  "This does NOT replace your case system. It sits above it to accelerate delivery and reduce chasing.";

export const pilotSectionCopy = {
  title: "Prove faster case delivery in 90 days",
  subtitle:
    "A focused pilot designed to reduce document chasing and get immigration matters submission-ready faster before any wider rollout.",
  metricsTitle: "Operational improvements tracked during the pilot"
};

export const focusedPilot: FocusedPilotOffer = {
  title: "Focused 90-day pilot",
  price: "£750 / month",
  subtext:
    "Run a controlled operational pilot on your active extension matters and measure real improvements in submission readiness and document chasing.",
  scope: [
    "Up to 25 active matters",
    "Skilled Worker extensions",
    "Partner / spouse extensions",
    "Linked ILR preparation where relevant"
  ],
  outcomes: [
    "Faster time to submission-ready",
    "Fewer document chase loops",
    "Fewer partner interruptions",
    "Clear delivery visibility across active matters"
  ],
  weekOneDeliverable:
    "Deadlines computed, evidence statuses live, and the Partner Red Queue activated with the first unblock wins identified.",
  cta: "Book pilot conversation",
  note: "No migration required. Runs alongside your current case system."
};

export const rolloutOffer: RolloutOffer = {
  title: "Pilot + rollout design",
  price: "From £1,200 / month after pilot",
  subtext:
    "For firms that want to extend delivery acceleration across their full immigration caseload.",
  includes: [
    "Everything in the focused pilot",
    "Expanded route rollout",
    "Team operating rhythm design",
    "Partner supervision framework",
    "Implementation playbook handover"
  ],
  cta: "Request rollout plan"
};

export const pilotMetrics = [
  "Time to submission-ready",
  "Document chase events per case",
  "Partner interruptions per matter",
  "Client update gaps during waiting states",
  "% of matters submission-ready by the D-14 checkpoint"
];

export const pilotPlans: PilotPlan[] = [
  {
    name: "Focused 90-day pilot",
    price: "£750 / month",
    label: "Core pilot",
    cta: "Book pilot conversation",
    subtext:
      "Run a controlled operational pilot on your active extension matters and measure real improvements in submission readiness and document chasing.",
    note: "No migration required. Runs alongside your current case system.",
    featured: true,
    inclusions: [
      "Up to 25 active matters",
      "Skilled Worker extensions",
      "Partner / spouse extensions",
      "Linked ILR preparation where relevant"
    ]
  },
  {
    name: "Pilot + rollout design",
    price: "From £1,200 / month after pilot",
    label: "Pilot + roadmap",
    cta: "Request rollout plan",
    subtext:
      "For firms that want to extend delivery acceleration across their full immigration caseload.",
    inclusions: [
      "Everything in the focused pilot",
      "Expanded route rollout",
      "Team operating rhythm design",
      "Partner supervision framework",
      "Implementation playbook handover"
    ]
  }
];

export const notForBullets = [
  "Firms looking for legal advice automation",
  "Teams expecting a full case management replacement in week one",
  "Low-volume practices with no active extension + ILR pipeline"
];

export const trustBullets = [
  "Operational workflow only; legal judgment remains with your firm.",
  "Submission requires authorised sign-off.",
  "Overrides logged with audit note.",
  "Append-only proof timeline for supervision and post-incident review."
];

export const securityItems = [
  "Encryption in transit and at rest",
  "Role-based access controls",
  "Append-only audit logs",
  "Configurable retention windows"
];

export const founderStrip = {
  title: "Built from London immigration ops research",
  lines: [
    "We interviewed partner-led immigration teams managing extension and ILR pipelines across fragmented tools.",
    "The recurring pattern was deadline cliffs, document chasing, and communication drift consuming senior attention."
  ],
  cta: "Request the research summary"
};

export const faqItems = [
  {
    question: "Is this replacing our case management system?",
    answer:
      "No. It is an overlay that accelerates delivery and reduces chasing while your existing case system remains in place."
  },
  {
    question: "Does this provide legal advice?",
    answer:
      "No. Legal judgment stays with your team. This product handles operational workflow and visibility."
  },
  {
    question: "What value should we expect in the first weeks?",
    answer:
      "Week 1 focuses on live matters, blockers, and red queue visibility so your team sees immediate unblock wins without migration."
  },
  {
    question: "Will this add admin overhead?",
    answer:
      "It should reduce admin touches by standardising evidence and update loops and reducing avoidable partner escalations."
  }
];

export const finalCta = {
  title: "Speed up submissions without adding operational chaos.",
  body:
    "If your team is spending too much time chasing documents and firefighting uncertainty, this is where delivery acceleration starts.",
  sub: "30-minute pilot scoping call. You leave with a practical 90-day pilot plan focused on faster submission readiness and less chasing."
};
