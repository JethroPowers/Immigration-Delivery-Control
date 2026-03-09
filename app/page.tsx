'use client'

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'

type DiagramRouteTone = 'base' | 'success' | 'alert' | 'loop'
type DiagramNodeKind =
  | 'actor'
  | 'system'
  | 'gate'
  | 'exception'
  | 'output'
  | 'state'

type DiagramLane = {
  id: string
  label: string
  detail: string
  x: number
  width: number
}

type DiagramMark = {
  id: string
  text: string
  x: number
  y: number
  tone?: DiagramRouteTone
}

type DiagramPacket = {
  label: string
  delay: number
  duration?: number
}

type DiagramRoute = {
  id: string
  d: string
  label: string
  labelX: number
  labelY: number
  tooltip: string
  tone: DiagramRouteTone
  packet?: DiagramPacket
}

type DiagramNode = {
  id: string
  x: number
  y: number
  width: number
  height: number
  lane: string
  kind: DiagramNodeKind
  chip?: string
  label: string
  detail?: string
  tooltip: string
  pathIds: string[]
}

type DiagramConfig = {
  id: string
  viewBox: string
  lanes: DiagramLane[]
  nodes: DiagramNode[]
  routes: DiagramRoute[]
  marks?: DiagramMark[]
  notes?: string[]
}

type TimelineStage = {
  day: string
  title: string
  detail: string
  chip: string
  board: DiagramConfig
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const heroProof = [
  {
    label: 'Cases automated',
    value: '87',
    detail: 'Across route-aware document chase loops',
  },
  {
    label: 'London firms live',
    value: '4',
    detail: 'Partner-led immigration practices in production',
  },
  {
    label: 'Status inquiries removed',
    value: '62%',
    detail: 'Measured reduction in ad-hoc client check-ins',
  },
  {
    label: 'Flat monthly price',
    value: 'GBP 395',
    detail: 'Transparent base plan with visible overage only',
  },
]

const problemCards = [
  {
    title: 'Knowledge trapped in channels',
    body: 'Evidence requests fragment across email, WhatsApp, and partner memory, so ownership changes case by case.',
  },
  {
    title: 'Validation happens too late',
    body: 'Teams discover blurry passports and route mismatches after avoidable back-and-forth, not at the gate.',
  },
  {
    title: 'Clients ask for updates because the system does not',
    body: 'Without a status cadence, partners become the message bus for routine waiting-state questions.',
  },
]

const faqItems = [
  {
    question: 'How fast can we deploy?',
    answer:
      'Most firms deploy in under 5 minutes. We connect the case system, define validation rules, and switch on the chase loop.',
  },
  {
    question: 'Does this replace my case management tool?',
    answer:
      'No. CasePilotAI sits between your case system and your clients. The product enforces validation, exception routing, and status cadence on top of the system you already use.',
  },
  {
    question: 'What counts as an exception?',
    answer:
      'Any case that fails a validation rule, misses a required document, or triggers a firm-specific escalation rule. Those cases move into the Partner Red Queue.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'GBP 395 per month covers up to 50 active cases. If the portfolio goes above that, overage is added at a visible per-case rate so the spend remains predictable.',
  },
  {
    question: 'What about security and auditability?',
    answer:
      'Every upload, validation result, chase, and status update is logged. Firms retain an audit trail for what was requested, what was uploaded, what failed, and what progressed.',
  },
]

const redQueueExceptions = [
  {
    title: 'Case 02',
    reason: 'Passport upload failed minimum resolution threshold.',
  },
  {
    title: 'Case 05',
    reason: 'Address evidence does not match the current route record.',
  },
  {
    title: 'Case 09',
    reason: 'Sponsor income evidence missing a required month in sequence.',
  },
  {
    title: 'Case 16',
    reason: 'BRP expiry date conflicts with the submitted status history.',
  },
  {
    title: 'Case 20',
    reason: 'Bank statement requires translation before submission-ready state.',
  },
]

const heroBoard: DiagramConfig = {
  id: 'hero-board',
  viewBox: '0 0 920 560',
  lanes: [
    {
      id: 'client',
      label: 'Client',
      detail: 'Uploads and re-uploads',
      x: 30,
      width: 220,
    },
    {
      id: 'automation',
      label: 'CasePilotAI automation layer',
      detail: 'Validation and routing',
      x: 280,
      width: 300,
    },
    {
      id: 'firm',
      label: 'Firm operations',
      detail: 'Exceptions and system sync',
      x: 610,
      width: 280,
    },
  ],
  marks: [
    {
      id: 'hero-mark-1',
      text: 'Exception branch only',
      x: 582,
      y: 128,
      tone: 'alert',
    },
    {
      id: 'hero-mark-2',
      text: 'Validated bundles continue automatically',
      x: 570,
      y: 450,
      tone: 'success',
    },
  ],
  routes: [
    {
      id: 'hero-upload',
      d: 'M230 142 H330',
      label: 'passport upload',
      labelX: 246,
      labelY: 122,
      tooltip: 'Clients upload evidence through one secure link instead of sending files into scattered channels.',
      tone: 'base',
      packet: { label: 'Passport', delay: 0, duration: 5.4 },
    },
    {
      id: 'hero-fail',
      d: 'M440 188 V250',
      label: 'defect found',
      labelX: 454,
      labelY: 230,
      tooltip: 'If a file fails quality or route rules, the case enters the needs-fix loop immediately.',
      tone: 'alert',
      packet: { label: 'Blur alert', delay: 0.35, duration: 4.8 },
    },
    {
      id: 'hero-request',
      d: 'M330 294 H248 V401 H230',
      label: 're-upload request',
      labelX: 204,
      labelY: 332,
      tooltip: 'CasePilotAI sends a defect-specific request with the exact evidence needed for correction.',
      tone: 'loop',
      packet: { label: 'Fix request', delay: 0.65, duration: 6 },
    },
    {
      id: 'hero-return',
      d: 'M230 401 H248 V444 H330',
      label: 'bank statement',
      labelX: 208,
      labelY: 474,
      tooltip: 'Corrected evidence returns to the validation gate without partner intervention.',
      tone: 'loop',
      packet: { label: 'Bank stmt', delay: 1.15, duration: 6.2 },
    },
    {
      id: 'hero-ready',
      d: 'M550 444 H650',
      label: 'submission-ready',
      labelX: 578,
      labelY: 424,
      tooltip: 'Once validation passes, the case becomes submission-ready and progresses automatically.',
      tone: 'success',
      packet: { label: 'Validated set', delay: 1.35, duration: 5.2 },
    },
    {
      id: 'hero-exception',
      d: 'M550 144 H650',
      label: 'partner review',
      labelX: 576,
      labelY: 124,
      tooltip: 'Only exception cases branch into the Partner Red Queue for partner review.',
      tone: 'alert',
      packet: { label: 'Exception', delay: 1.55, duration: 5.5 },
    },
    {
      id: 'hero-sync',
      d: 'M745 180 V280',
      label: 'cleared and synced',
      labelX: 758,
      labelY: 232,
      tooltip: 'Once a partner clears an exception, the case rejoins the automated flow and syncs to the case record.',
      tone: 'base',
    },
    {
      id: 'hero-cadence',
      d: 'M745 370 V430',
      label: 'status cadence',
      labelX: 760,
      labelY: 410,
      tooltip: 'Clients receive scheduled waiting-state updates without the team acting as a manual message relay.',
      tone: 'success',
      packet: { label: 'Status update', delay: 1.85, duration: 5.8 },
    },
  ],
  nodes: [
    {
      id: 'hero-upload-node',
      x: 60,
      y: 100,
      width: 170,
      height: 84,
      lane: 'client',
      kind: 'actor',
      chip: 'INPUT',
      label: 'Client upload',
      detail: 'Secure evidence link',
      tooltip: 'Upload links centralize intake and remove the need for ad-hoc file chasing.',
      pathIds: ['hero-upload'],
    },
    {
      id: 'hero-validation-node',
      x: 330,
      y: 100,
      width: 220,
      height: 88,
      lane: 'automation',
      kind: 'gate',
      chip: 'GATE',
      label: 'Validation gate',
      detail: 'Route rules and quality checks',
      tooltip: 'Validation enforces completeness, legibility, and route fit before the team sees the case.',
      pathIds: ['hero-upload', 'hero-fail', 'hero-exception'],
    },
    {
      id: 'hero-fix-node',
      x: 330,
      y: 250,
      width: 220,
      height: 88,
      lane: 'automation',
      kind: 'state',
      chip: 'LOOP',
      label: 'Needs-fix loop',
      detail: 'Defect detail and re-upload request',
      tooltip: 'The correction loop keeps the defect attached to the case until the right file returns.',
      pathIds: ['hero-fail', 'hero-request'],
    },
    {
      id: 'hero-reupload-node',
      x: 60,
      y: 360,
      width: 170,
      height: 84,
      lane: 'client',
      kind: 'actor',
      chip: 'RESPONSE',
      label: 'Client re-upload',
      detail: 'Corrected evidence only',
      tooltip: 'Clients are told exactly what to fix, reducing partner-led clarification loops.',
      pathIds: ['hero-request', 'hero-return'],
    },
    {
      id: 'hero-ready-node',
      x: 330,
      y: 400,
      width: 220,
      height: 88,
      lane: 'automation',
      kind: 'system',
      chip: 'READY',
      label: 'Submission-ready',
      detail: 'Validated bundle complete',
      tooltip: 'Validated evidence is now complete enough to advance without more routine human checking.',
      pathIds: ['hero-return', 'hero-ready'],
    },
    {
      id: 'hero-queue-node',
      x: 650,
      y: 90,
      width: 190,
      height: 90,
      lane: 'firm',
      kind: 'exception',
      chip: 'EXCEPTION',
      label: 'Partner Red Queue',
      detail: 'Only risk cases surface',
      tooltip: 'Partners see exception cases only, not the routine portfolio.',
      pathIds: ['hero-exception', 'hero-sync'],
    },
    {
      id: 'hero-sync-node',
      x: 650,
      y: 280,
      width: 190,
      height: 90,
      lane: 'firm',
      kind: 'output',
      chip: 'SYNC',
      label: 'Case system sync',
      detail: 'Audit trail and case record update',
      tooltip: 'Every validated or cleared case writes back into the firm system with a traceable record.',
      pathIds: ['hero-ready', 'hero-sync', 'hero-cadence'],
    },
    {
      id: 'hero-cadence-node',
      x: 650,
      y: 430,
      width: 190,
      height: 88,
      lane: 'firm',
      kind: 'output',
      chip: 'STATUS',
      label: 'Client status cadence',
      detail: 'Waiting-state updates sent automatically',
      tooltip: 'Status cadence removes routine "any update?" traffic from partner inboxes.',
      pathIds: ['hero-cadence'],
    },
  ],
  notes: [
    'Partner intervention occurs only on exception.',
    'Each document keeps its validation state and audit trail.',
  ],
}

const portfolioBoard: DiagramConfig = {
  id: 'portfolio-board',
  viewBox: '0 0 980 280',
  lanes: [
    {
      id: 'portfolio',
      label: 'Portfolio',
      detail: 'Active live cases',
      x: 30,
      width: 200,
    },
    {
      id: 'filter',
      label: 'CasePilotAI filter',
      detail: 'Rules and triage',
      x: 260,
      width: 220,
    },
    {
      id: 'routine',
      label: 'Routine flow',
      detail: 'Auto-progressed cases',
      x: 510,
      width: 210,
    },
    {
      id: 'partner',
      label: 'Partner queue',
      detail: 'Exception-only review',
      x: 750,
      width: 200,
    },
  ],
  routes: [
    {
      id: 'portfolio-ingress',
      d: 'M220 145 H330',
      label: '23 active matters',
      labelX: 244,
      labelY: 126,
      tooltip: 'The full live portfolio enters the triage layer rather than being worked case by case from memory.',
      tone: 'base',
      packet: { label: '23 cases', delay: 0.1, duration: 5.8 },
    },
    {
      id: 'portfolio-routine',
      d: 'M550 110 H670',
      label: '18 routine',
      labelX: 582,
      labelY: 92,
      tooltip: 'Routine cases stay in the automated path and do not consume partner attention.',
      tone: 'success',
      packet: { label: 'Routine', delay: 0.55, duration: 5.2 },
    },
    {
      id: 'portfolio-exception',
      d: 'M550 180 H790',
      label: '5 exceptions',
      labelX: 620,
      labelY: 205,
      tooltip: 'Only five cases with actual risk move into the Partner Red Queue.',
      tone: 'alert',
      packet: { label: 'Exceptions', delay: 0.95, duration: 5.2 },
    },
  ],
  nodes: [
    {
      id: 'portfolio-cases',
      x: 50,
      y: 100,
      width: 170,
      height: 88,
      lane: 'portfolio',
      kind: 'actor',
      chip: 'PORTFOLIO',
      label: 'All live cases',
      detail: '23 active immigration matters',
      tooltip: 'The portfolio is treated as a system, not as disconnected partner-held threads.',
      pathIds: ['portfolio-ingress'],
    },
    {
      id: 'portfolio-filter-node',
      x: 330,
      y: 100,
      width: 220,
      height: 88,
      lane: 'filter',
      kind: 'system',
      chip: 'FILTER',
      label: 'AI filter',
      detail: 'Routine vs exception split',
      tooltip: 'Triage separates routine work from cases that need bespoke judgement.',
      pathIds: ['portfolio-ingress', 'portfolio-routine', 'portfolio-exception'],
    },
    {
      id: 'portfolio-routine-node',
      x: 670,
      y: 60,
      width: 230,
      height: 84,
      lane: 'routine',
      kind: 'output',
      chip: 'ROUTINE',
      label: 'Auto-handled cases',
      detail: 'Filed, chased, and updated automatically',
      tooltip: 'Routine cases progress through the chase, validation, and status cycle without partner touch.',
      pathIds: ['portfolio-routine'],
    },
    {
      id: 'portfolio-queue-node',
      x: 790,
      y: 160,
      width: 150,
      height: 84,
      lane: 'partner',
      kind: 'exception',
      chip: 'QUEUE',
      label: 'Partner Red Queue',
      detail: '5 cases surfaced',
      tooltip: 'The partner queue is the narrow exception lane, not the default place where all cases land.',
      pathIds: ['portfolio-exception'],
    },
  ],
  notes: [
    'Portfolio routing protects partner time by moving only exceptions into review.',
  ],
}

const validationBoard: DiagramConfig = {
  id: 'validation-board',
  viewBox: '0 0 980 340',
  lanes: [
    {
      id: 'client',
      label: 'Client',
      detail: 'Evidence source',
      x: 30,
      width: 220,
    },
    {
      id: 'automation',
      label: 'CasePilotAI automation layer',
      detail: 'Validation and loop control',
      x: 280,
      width: 300,
    },
    {
      id: 'output',
      label: 'Firm output',
      detail: 'Case record and status',
      x: 610,
      width: 330,
    },
  ],
  routes: [
    {
      id: 'validation-upload',
      d: 'M220 120 H330',
      label: 'client upload',
      labelX: 244,
      labelY: 100,
      tooltip: 'Every requested document enters the same validation gate instead of arriving directly into fee-earner inboxes.',
      tone: 'base',
      packet: { label: 'Upload', delay: 0.1, duration: 5.1 },
    },
    {
      id: 'validation-fail',
      d: 'M440 168 V240',
      label: 'fails rules',
      labelX: 454,
      labelY: 212,
      tooltip: 'A failed check opens the correction loop with the defect attached to the case.',
      tone: 'alert',
      packet: { label: 'Defect', delay: 0.55, duration: 4.8 },
    },
    {
      id: 'validation-request',
      d: 'M330 262 H245 V280 H220',
      label: 'request issued',
      labelX: 210,
      labelY: 244,
      tooltip: 'The system sends a correction request that includes the exact reason the file failed.',
      tone: 'loop',
      packet: { label: 'Request', delay: 0.9, duration: 6.2 },
    },
    {
      id: 'validation-return',
      d: 'M220 280 H245 V120 H330',
      label: 'corrected file',
      labelX: 202,
      labelY: 302,
      tooltip: 'Corrected evidence re-enters the same gate until the case is clean.',
      tone: 'loop',
      packet: { label: 'Re-upload', delay: 1.25, duration: 6.4 },
    },
    {
      id: 'validation-ready',
      d: 'M550 120 H670',
      label: 'submission-ready',
      labelX: 582,
      labelY: 100,
      tooltip: 'Validated documents move into a submission-ready state with no extra partner chase.',
      tone: 'success',
      packet: { label: 'Ready', delay: 1.6, duration: 4.9 },
    },
    {
      id: 'validation-status',
      d: 'M780 160 V240',
      label: 'status update',
      labelX: 794,
      labelY: 205,
      tooltip: 'The case record and the client-facing status cadence stay synchronized.',
      tone: 'success',
      packet: { label: 'Update', delay: 2, duration: 5.5 },
    },
  ],
  nodes: [
    {
      id: 'validation-client-node',
      x: 60,
      y: 80,
      width: 160,
      height: 80,
      lane: 'client',
      kind: 'actor',
      chip: 'INPUT',
      label: 'Client upload',
      detail: 'Requested evidence arrives',
      tooltip: 'Upload intake is standardized from the start.',
      pathIds: ['validation-upload'],
    },
    {
      id: 'validation-gate-node',
      x: 330,
      y: 80,
      width: 220,
      height: 88,
      lane: 'automation',
      kind: 'gate',
      chip: 'GATE',
      label: 'Validation gate',
      detail: 'Completeness, quality, and route fit',
      tooltip: 'Validation is where operational certainty is enforced before human review is needed.',
      pathIds: [
        'validation-upload',
        'validation-fail',
        'validation-ready',
        'validation-return',
      ],
    },
    {
      id: 'validation-loop-node',
      x: 330,
      y: 220,
      width: 220,
      height: 80,
      lane: 'automation',
      kind: 'state',
      chip: 'LOOP',
      label: 'Needs-fix loop',
      detail: 'Defect-specific correction request',
      tooltip: 'The correction loop is route-aware, so the client gets the right re-upload request immediately.',
      pathIds: ['validation-fail', 'validation-request'],
    },
    {
      id: 'validation-ready-node',
      x: 670,
      y: 80,
      width: 220,
      height: 84,
      lane: 'output',
      kind: 'system',
      chip: 'READY',
      label: 'Submission-ready gate',
      detail: 'Validated evidence bundle complete',
      tooltip: 'A submission-ready state is explicit, measurable, and auditable.',
      pathIds: ['validation-ready', 'validation-status'],
    },
    {
      id: 'validation-sync-node',
      x: 670,
      y: 220,
      width: 220,
      height: 80,
      lane: 'output',
      kind: 'output',
      chip: 'SYNC',
      label: 'Case sync and status cadence',
      detail: 'Case record updated and client notified',
      tooltip: 'Validated state writes back into the case system and drives the client update cadence.',
      pathIds: ['validation-status'],
    },
  ],
  notes: [
    'The same gate controls routine progress and the needs-fix loop.',
  ],
}

const comparisonManualBoard: DiagramConfig = {
  id: 'comparison-manual',
  viewBox: '0 0 900 380',
  lanes: [
    {
      id: 'client',
      label: 'Client',
      detail: 'Evidence arrives in fragments',
      x: 30,
      width: 220,
    },
    {
      id: 'automation',
      label: 'Operating gap',
      detail: 'No gate, no routed system',
      x: 280,
      width: 280,
    },
    {
      id: 'firm',
      label: 'Firm operations',
      detail: 'Partners carry the load',
      x: 590,
      width: 280,
    },
  ],
  routes: [
    {
      id: 'comparison-manual-1',
      d: 'M220 115 H650',
      label: 'evidence lands in inboxes',
      labelX: 338,
      labelY: 96,
      tooltip: 'Evidence enters directly into partner-owned channels instead of a controlled intake path.',
      tone: 'alert',
    },
    {
      id: 'comparison-manual-2',
      d: 'M725 155 V215',
      label: 'manual tracking',
      labelX: 740,
      labelY: 192,
      tooltip: 'Tracking moves into spreadsheets because no system owns the operational state.',
      tone: 'alert',
    },
    {
      id: 'comparison-manual-3',
      d: 'M725 275 V325',
      label: 'ad-hoc updates',
      labelX: 742,
      labelY: 306,
      tooltip: 'Client updates become one-off replies rather than a maintained status cadence.',
      tone: 'alert',
    },
  ],
  nodes: [
    {
      id: 'comparison-client-manual',
      x: 60,
      y: 70,
      width: 160,
      height: 88,
      lane: 'client',
      kind: 'actor',
      chip: 'INPUT',
      label: 'Evidence threads',
      detail: 'Email, WhatsApp, forwarded attachments',
      tooltip: 'Client evidence is fragmented before the firm even starts working it.',
      pathIds: ['comparison-manual-1'],
    },
    {
      id: 'comparison-gap-manual',
      x: 330,
      y: 70,
      width: 190,
      height: 88,
      lane: 'automation',
      kind: 'gate',
      chip: 'GAP',
      label: 'No validation gate',
      detail: 'Rules live in memory',
      tooltip: 'Without a gate, quality standards depend on whichever partner catches the issue later.',
      pathIds: ['comparison-manual-1'],
    },
    {
      id: 'comparison-inbox-manual',
      x: 650,
      y: 70,
      width: 190,
      height: 88,
      lane: 'firm',
      kind: 'state',
      chip: 'MANUAL',
      label: 'Partner inbox',
      detail: 'Chase ownership sits in email',
      tooltip: 'Manual ownership pulls partner time into routine operational handling.',
      pathIds: ['comparison-manual-1', 'comparison-manual-2'],
    },
    {
      id: 'comparison-sheet-manual',
      x: 650,
      y: 190,
      width: 190,
      height: 88,
      lane: 'firm',
      kind: 'state',
      chip: 'MANUAL',
      label: 'Shared spreadsheet',
      detail: 'No authoritative case state',
      tooltip: 'Tracking exists, but not as an operational system with enforced transitions.',
      pathIds: ['comparison-manual-2', 'comparison-manual-3'],
    },
    {
      id: 'comparison-replies-manual',
      x: 650,
      y: 310,
      width: 190,
      height: 50,
      lane: 'firm',
      kind: 'output',
      chip: 'OUTPUT',
      label: 'Manual client replies',
      detail: 'Status answered on demand',
      tooltip: 'Client updates only happen when the team replies manually.',
      pathIds: ['comparison-manual-3'],
    },
  ],
  notes: [
    'Manual state lacks a gate, a routing layer, and a maintained status cadence.',
  ],
}

const comparisonAlignedBoard: DiagramConfig = {
  id: 'comparison-aligned',
  viewBox: '0 0 900 380',
  lanes: [
    {
      id: 'client',
      label: 'Client',
      detail: 'Controlled evidence intake',
      x: 30,
      width: 220,
    },
    {
      id: 'automation',
      label: 'CasePilotAI automation layer',
      detail: 'Gate, loop, and cadence',
      x: 280,
      width: 280,
    },
    {
      id: 'firm',
      label: 'Firm operations',
      detail: 'Exception-only review',
      x: 590,
      width: 280,
    },
  ],
  routes: [
    {
      id: 'comparison-aligned-1',
      d: 'M220 115 H330',
      label: 'controlled upload',
      labelX: 236,
      labelY: 96,
      tooltip: 'Evidence enters through a controlled upload flow instead of direct channel traffic.',
      tone: 'base',
      packet: { label: 'Upload', delay: 0.1, duration: 5.2 },
    },
    {
      id: 'comparison-aligned-2',
      d: 'M520 115 H650',
      label: 'exception only',
      labelX: 548,
      labelY: 96,
      tooltip: 'Only exception cases move into partner review.',
      tone: 'alert',
      packet: { label: 'Exception', delay: 0.75, duration: 5.1 },
    },
    {
      id: 'comparison-aligned-3',
      d: 'M520 255 H650',
      label: 'status + sync',
      labelX: 548,
      labelY: 236,
      tooltip: 'Validated cases write back into the case record and trigger the client status cadence.',
      tone: 'success',
      packet: { label: 'Status', delay: 1.3, duration: 5.4 },
    },
  ],
  nodes: [
    {
      id: 'comparison-client-aligned',
      x: 60,
      y: 70,
      width: 160,
      height: 88,
      lane: 'client',
      kind: 'actor',
      chip: 'INPUT',
      label: 'Client upload',
      detail: 'Secure evidence link',
      tooltip: 'The client now enters one operational flow instead of multiple channels.',
      pathIds: ['comparison-aligned-1'],
    },
    {
      id: 'comparison-gate-aligned',
      x: 330,
      y: 70,
      width: 190,
      height: 88,
      lane: 'automation',
      kind: 'gate',
      chip: 'GATE',
      label: 'Validation gate',
      detail: 'Rules enforced before review',
      tooltip: 'The gate standardizes what “ready” means across the firm.',
      pathIds: ['comparison-aligned-1', 'comparison-aligned-2'],
    },
    {
      id: 'comparison-loop-aligned',
      x: 330,
      y: 210,
      width: 190,
      height: 88,
      lane: 'automation',
      kind: 'system',
      chip: 'CADENCE',
      label: 'Status cadence',
      detail: 'Waiting-state updates maintained',
      tooltip: 'Status updates become part of the operating system rather than manual follow-up.',
      pathIds: ['comparison-aligned-3'],
    },
    {
      id: 'comparison-queue-aligned',
      x: 650,
      y: 70,
      width: 190,
      height: 88,
      lane: 'firm',
      kind: 'exception',
      chip: 'QUEUE',
      label: 'Partner Red Queue',
      detail: 'Partners see exception work only',
      tooltip: 'Partner attention is protected for cases that require judgement.',
      pathIds: ['comparison-aligned-2'],
    },
    {
      id: 'comparison-sync-aligned',
      x: 650,
      y: 210,
      width: 190,
      height: 88,
      lane: 'firm',
      kind: 'output',
      chip: 'SYNC',
      label: 'Case system sync',
      detail: 'Audit trail and client update',
      tooltip: 'Validated progress is written back and reflected to the client without separate handling.',
      pathIds: ['comparison-aligned-3'],
    },
  ],
  notes: [
    'Aligned state adds the missing gate, preserves system ownership, and narrows partner work to exceptions.',
  ],
}

const redQueueBoard: DiagramConfig = {
  id: 'red-queue-board',
  viewBox: '0 0 900 300',
  lanes: [
    {
      id: 'ingress',
      label: 'Ingress',
      detail: 'Live portfolio entering triage',
      x: 30,
      width: 220,
    },
    {
      id: 'filter',
      label: 'CasePilotAI filter',
      detail: 'Risk and rule evaluation',
      x: 280,
      width: 220,
    },
    {
      id: 'outputs',
      label: 'Outputs',
      detail: 'Routine vs exception routing',
      x: 530,
      width: 340,
    },
  ],
  routes: [
    {
      id: 'queue-ingress-route',
      d: 'M250 145 H360',
      label: 'portfolio enters',
      labelX: 270,
      labelY: 126,
      tooltip: 'The filter evaluates the current portfolio as a system, not as isolated manual work items.',
      tone: 'base',
      packet: { label: '23 cases', delay: 0.1, duration: 4.8 },
    },
    {
      id: 'queue-routine-route',
      d: 'M540 110 H650',
      label: '18 auto-handled',
      labelX: 562,
      labelY: 92,
      tooltip: 'Routine cases collapse into one managed output instead of consuming manual review time.',
      tone: 'success',
      packet: { label: 'Routine', delay: 0.45, duration: 4.8 },
    },
    {
      id: 'queue-exception-route',
      d: 'M540 180 H650',
      label: '5 exceptions',
      labelX: 576,
      labelY: 203,
      tooltip: 'Exception cases are surfaced with explicit reasons for partner review.',
      tone: 'alert',
      packet: { label: 'Exceptions', delay: 0.8, duration: 4.8 },
    },
  ],
  nodes: [
    {
      id: 'queue-ingress-node',
      x: 50,
      y: 100,
      width: 200,
      height: 88,
      lane: 'ingress',
      kind: 'actor',
      chip: 'PORTFOLIO',
      label: '23 active cases',
      detail: 'Current live workload',
      tooltip: 'The red queue starts with the live portfolio, not a manually curated shortlist.',
      pathIds: ['queue-ingress-route'],
    },
    {
      id: 'queue-filter-node',
      x: 360,
      y: 100,
      width: 180,
      height: 88,
      lane: 'filter',
      kind: 'system',
      chip: 'FILTER',
      label: 'AI filter',
      detail: 'Rules, risk, and deadline checks',
      tooltip: 'The filter decides whether the case remains routine or enters exception review.',
      pathIds: [
        'queue-ingress-route',
        'queue-routine-route',
        'queue-exception-route',
      ],
    },
    {
      id: 'queue-routine-node',
      x: 650,
      y: 60,
      width: 200,
      height: 84,
      lane: 'outputs',
      kind: 'output',
      chip: 'ROUTINE',
      label: '18 auto-handled',
      detail: 'Filed, chased, and updated',
      tooltip: 'Routine work is collapsed into one managed output with no partner touch.',
      pathIds: ['queue-routine-route'],
    },
    {
      id: 'queue-alert-node',
      x: 650,
      y: 170,
      width: 200,
      height: 84,
      lane: 'outputs',
      kind: 'exception',
      chip: 'QUEUE',
      label: 'Partner Red Queue',
      detail: '5 surfaced exceptions',
      tooltip: 'Only five cases land in the red queue, with a visible reason attached.',
      pathIds: ['queue-exception-route'],
    },
  ],
  notes: [
    'The red queue is a routing output, not a second manual backlog.',
  ],
}

const timelineStages: TimelineStage[] = [
  {
    day: 'Day 0',
    title: 'Case initialized',
    detail:
      'CasePilotAI maps the route, defines the evidence list, and opens the chase path before the case leaves intake.',
    chip: 'INIT',
    board: {
      id: 'timeline-init',
      viewBox: '0 0 640 170',
      lanes: [
        { id: 'firm', label: 'Firm', detail: 'Case opened', x: 20, width: 160 },
        {
          id: 'automation',
          label: 'Automation',
          detail: 'Route template applied',
          x: 210,
          width: 190,
        },
        {
          id: 'client',
          label: 'Client',
          detail: 'Request prepared',
          x: 430,
          width: 190,
        },
      ],
      routes: [
        {
          id: 'timeline-init-route-1',
          d: 'M170 86 H250',
          label: 'route mapped',
          labelX: 180,
          labelY: 66,
          tooltip: 'The case inherits a route-specific evidence model immediately.',
          tone: 'base',
        },
        {
          id: 'timeline-init-route-2',
          d: 'M400 86 H470',
          label: 'request assembled',
          labelX: 406,
          labelY: 66,
          tooltip: 'The first evidence request is generated from the route map rather than manual drafting.',
          tone: 'success',
        },
      ],
      nodes: [
        {
          id: 'timeline-init-node-1',
          x: 40,
          y: 50,
          width: 130,
          height: 72,
          lane: 'firm',
          kind: 'state',
          chip: 'CASE',
          label: 'Case created',
          detail: 'Matter opened',
          tooltip: 'The case exists, but the operating model must now take over the routine path.',
          pathIds: ['timeline-init-route-1'],
        },
        {
          id: 'timeline-init-node-2',
          x: 250,
          y: 40,
          width: 150,
          height: 90,
          lane: 'automation',
          kind: 'system',
          chip: 'MODEL',
          label: 'Route checklist',
          detail: 'Required evidence mapped',
          tooltip: 'CasePilotAI applies a route-specific evidence list and chase schedule.',
          pathIds: ['timeline-init-route-1', 'timeline-init-route-2'],
        },
        {
          id: 'timeline-init-node-3',
          x: 470,
          y: 50,
          width: 130,
          height: 72,
          lane: 'client',
          kind: 'actor',
          chip: 'NEXT',
          label: 'Client request',
          detail: 'Upload link ready',
          tooltip: 'The client request is ready before any manual chasing begins.',
          pathIds: ['timeline-init-route-2'],
        },
      ],
    },
  },
  {
    day: 'Day 4',
    title: 'Evidence request sent',
    detail:
      'The route-aware chaser sends one structured upload request with guidance on what qualifies and what will fail.',
    chip: 'CHASE',
    board: {
      id: 'timeline-chase',
      viewBox: '0 0 640 170',
      lanes: [
        { id: 'automation', label: 'Automation', detail: 'Request owner', x: 20, width: 180 },
        { id: 'client', label: 'Client', detail: 'Response path', x: 220, width: 180 },
        { id: 'firm', label: 'Firm', detail: 'Partner untouched', x: 420, width: 180 },
      ],
      routes: [
        {
          id: 'timeline-chase-route-1',
          d: 'M170 86 H260',
          label: 'upload link sent',
          labelX: 176,
          labelY: 66,
          tooltip: 'The request comes from the system with validation guidance built in.',
          tone: 'success',
        },
        {
          id: 'timeline-chase-route-2',
          d: 'M400 86 H460',
          label: 'no partner action',
          labelX: 402,
          labelY: 66,
          tooltip: 'Routine chasing does not require a partner to intervene.',
          tone: 'base',
        },
      ],
      nodes: [
        {
          id: 'timeline-chase-node-1',
          x: 40,
          y: 40,
          width: 130,
          height: 90,
          lane: 'automation',
          kind: 'system',
          chip: 'CHASE',
          label: 'Evidence request',
          detail: 'Route-aware chaser',
          tooltip: 'The request is generated from the route model and validation rules.',
          pathIds: ['timeline-chase-route-1'],
        },
        {
          id: 'timeline-chase-node-2',
          x: 260,
          y: 50,
          width: 140,
          height: 72,
          lane: 'client',
          kind: 'actor',
          chip: 'INPUT',
          label: 'Client portal',
          detail: 'Ready to upload',
          tooltip: 'Clients are given one place to respond and one standard to meet.',
          pathIds: ['timeline-chase-route-1', 'timeline-chase-route-2'],
        },
        {
          id: 'timeline-chase-node-3',
          x: 460,
          y: 50,
          width: 140,
          height: 72,
          lane: 'firm',
          kind: 'state',
          chip: 'QUIET',
          label: 'Partner inbox',
          detail: 'No chase traffic',
          tooltip: 'Routine chase activity stays out of partner email.',
          pathIds: ['timeline-chase-route-2'],
        },
      ],
    },
  },
  {
    day: 'Day 10',
    title: 'Validation catches a defect',
    detail:
      'The passport fails the gate overnight. The case moves into the needs-fix loop before the team starts work the next morning.',
    chip: 'GATE',
    board: {
      id: 'timeline-defect',
      viewBox: '0 0 640 170',
      lanes: [
        { id: 'client', label: 'Client', detail: 'Corrective upload', x: 20, width: 170 },
        { id: 'automation', label: 'Automation', detail: 'Defect loop', x: 210, width: 210 },
        { id: 'firm', label: 'Firm', detail: 'Partner still untouched', x: 440, width: 170 },
      ],
      routes: [
        {
          id: 'timeline-defect-route-1',
          d: 'M320 70 V115 H170',
          label: 'needs-fix request',
          labelX: 176,
          labelY: 130,
          tooltip: 'The failed file triggers the correction loop with a precise defect reason.',
          tone: 'alert',
        },
        {
          id: 'timeline-defect-route-2',
          d: 'M170 115 H210',
          label: 'corrected re-upload',
          labelX: 170,
          labelY: 95,
          tooltip: 'The client returns a corrected document to the same gate.',
          tone: 'loop',
        },
        {
          id: 'timeline-defect-route-3',
          d: 'M420 70 H470',
          label: 'no escalation yet',
          labelX: 424,
          labelY: 50,
          tooltip: 'Routine defects do not surface to partners unless the rule set says they should.',
          tone: 'base',
        },
      ],
      nodes: [
        {
          id: 'timeline-defect-node-1',
          x: 40,
          y: 80,
          width: 130,
          height: 72,
          lane: 'client',
          kind: 'actor',
          chip: 'FIX',
          label: 'Client re-upload',
          detail: 'Corrected passport',
          tooltip: 'The client receives a corrective request tied to the exact failed evidence.',
          pathIds: ['timeline-defect-route-1', 'timeline-defect-route-2'],
        },
        {
          id: 'timeline-defect-node-2',
          x: 210,
          y: 20,
          width: 210,
          height: 98,
          lane: 'automation',
          kind: 'gate',
          chip: 'FAIL',
          label: 'Validation gate',
          detail: 'Blurry passport detected',
          tooltip: 'The gate catches the defect early and routes it into correction automatically.',
          pathIds: [
            'timeline-defect-route-1',
            'timeline-defect-route-2',
            'timeline-defect-route-3',
          ],
        },
        {
          id: 'timeline-defect-node-3',
          x: 470,
          y: 20,
          width: 130,
          height: 72,
          lane: 'firm',
          kind: 'state',
          chip: 'QUIET',
          label: 'Partner queue',
          detail: 'Still clear',
          tooltip: 'Because the defect is routine, it does not consume partner attention.',
          pathIds: ['timeline-defect-route-3'],
        },
      ],
    },
  },
  {
    day: 'Day 16',
    title: 'Submission-ready gate passed',
    detail:
      'The corrected evidence passes validation. The case is now explicitly submission-ready and only exception work remains visible to partners.',
    chip: 'READY',
    board: {
      id: 'timeline-ready',
      viewBox: '0 0 640 170',
      lanes: [
        { id: 'automation', label: 'Automation', detail: 'Ready state', x: 20, width: 200 },
        { id: 'firm', label: 'Firm', detail: 'Case record', x: 240, width: 190 },
        { id: 'partner', label: 'Partner', detail: 'Exceptions only', x: 450, width: 170 },
      ],
      routes: [
        {
          id: 'timeline-ready-route-1',
          d: 'M190 86 H280',
          label: 'ready sync',
          labelX: 202,
          labelY: 66,
          tooltip: 'Submission-ready state writes back into the case record.',
          tone: 'success',
        },
        {
          id: 'timeline-ready-route-2',
          d: 'M430 86 H480',
          label: 'exceptions remain isolated',
          labelX: 384,
          labelY: 118,
          tooltip: 'Partners continue to see only exceptions, not routine ready cases.',
          tone: 'base',
        },
      ],
      nodes: [
        {
          id: 'timeline-ready-node-1',
          x: 40,
          y: 40,
          width: 150,
          height: 90,
          lane: 'automation',
          kind: 'system',
          chip: 'READY',
          label: 'Submission-ready',
          detail: 'Validated evidence complete',
          tooltip: 'The case reaches a defined ready state that the firm can trust.',
          pathIds: ['timeline-ready-route-1'],
        },
        {
          id: 'timeline-ready-node-2',
          x: 280,
          y: 50,
          width: 150,
          height: 72,
          lane: 'firm',
          kind: 'output',
          chip: 'SYNC',
          label: 'Case record',
          detail: 'Audit trail updated',
          tooltip: 'The case system becomes the live record of progress.',
          pathIds: ['timeline-ready-route-1', 'timeline-ready-route-2'],
        },
        {
          id: 'timeline-ready-node-3',
          x: 480,
          y: 50,
          width: 120,
          height: 72,
          lane: 'partner',
          kind: 'exception',
          chip: 'QUEUE',
          label: 'Red queue',
          detail: 'Exception-only',
          tooltip: 'Partner attention is reserved for actual exception work.',
          pathIds: ['timeline-ready-route-2'],
        },
      ],
    },
  },
  {
    day: 'Day 22',
    title: 'Waiting-state update sent',
    detail:
      'The case remains in a waiting state, but the client still receives the right update without generating a partner email thread.',
    chip: 'STATUS',
    board: {
      id: 'timeline-status',
      viewBox: '0 0 640 170',
      lanes: [
        { id: 'firm', label: 'Firm', detail: 'Case record', x: 20, width: 180 },
        { id: 'automation', label: 'Automation', detail: 'Cadence engine', x: 220, width: 190 },
        { id: 'client', label: 'Client', detail: 'Update received', x: 430, width: 180 },
      ],
      routes: [
        {
          id: 'timeline-status-route-1',
          d: 'M170 86 H260',
          label: 'waiting-state read',
          labelX: 170,
          labelY: 66,
          tooltip: 'The cadence engine reads the case state directly from the system record.',
          tone: 'base',
        },
        {
          id: 'timeline-status-route-2',
          d: 'M410 86 H470',
          label: 'status update sent',
          labelX: 406,
          labelY: 66,
          tooltip: 'The client receives the update without manual drafting or sending.',
          tone: 'success',
        },
      ],
      nodes: [
        {
          id: 'timeline-status-node-1',
          x: 40,
          y: 50,
          width: 130,
          height: 72,
          lane: 'firm',
          kind: 'output',
          chip: 'STATE',
          label: 'Case record',
          detail: 'Waiting state stored',
          tooltip: 'The system record is the source of truth for the current case state.',
          pathIds: ['timeline-status-route-1'],
        },
        {
          id: 'timeline-status-node-2',
          x: 260,
          y: 40,
          width: 150,
          height: 90,
          lane: 'automation',
          kind: 'system',
          chip: 'CADENCE',
          label: 'Status cadence',
          detail: 'Update timing enforced',
          tooltip: 'CasePilotAI turns stored state into client-facing communication on schedule.',
          pathIds: ['timeline-status-route-1', 'timeline-status-route-2'],
        },
        {
          id: 'timeline-status-node-3',
          x: 470,
          y: 50,
          width: 130,
          height: 72,
          lane: 'client',
          kind: 'actor',
          chip: 'OUTPUT',
          label: 'Client update',
          detail: 'No manual reply needed',
          tooltip: 'Routine status updates no longer rely on someone noticing and replying.',
          pathIds: ['timeline-status-route-2'],
        },
      ],
    },
  },
]

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, duration, target])

  return value
}

function formatCurrency(value: number) {
  return value.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  })
}

export default function Home() {
  const reduceMotion = useReducedMotion()

  const [salary, setSalary] = useState(32000)
  const [docHours, setDocHours] = useState(12)
  const [statusHours, setStatusHours] = useState(8)
  const [caseCount, setCaseCount] = useState(30)
  const [filterState, setFilterState] = useState<'idle' | 'scanning' | 'done'>(
    'idle',
  )
  const [aligned, setAligned] = useState(false)

  const filterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const outcomesRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.45])
  const heroBoardY = useTransform(heroProgress, [0, 1], [0, -34])
  const outcomesVisible = useInView(outcomesRef, { once: true, amount: 0.35 })

  useEffect(() => {
    return () => {
      if (filterTimerRef.current) clearTimeout(filterTimerRef.current)
    }
  }, [])

  const handleFilterRun = () => {
    if (filterTimerRef.current) clearTimeout(filterTimerRef.current)
    setFilterState('scanning')
    filterTimerRef.current = setTimeout(() => setFilterState('done'), 1350)
  }

  const resetFilter = () => {
    if (filterTimerRef.current) clearTimeout(filterTimerRef.current)
    setFilterState('idle')
  }

  const hourlyRate = useMemo(() => salary / (52 * 40), [salary])
  const weeklyHours = docHours + statusHours
  const manualWeeklyCost = hourlyRate * weeklyHours
  const manualMonthly = manualWeeklyCost * 4.3
  const aiMonthly = 395
  const savings = Math.max(manualMonthly - aiMonthly, 0)
  const annualizedSavings = savings * 12
  const roi = savings > 0 ? Math.round((savings / aiMonthly) * 100) : 0
  const breakEvenWeeklyHours = aiMonthly / hourlyRate / 4.3
  const recoveredHoursMonthly = weeklyHours * 4.3
  const savingsPerCase = caseCount > 0 ? savings / caseCount : 0

  const overage = Math.max(caseCount - 50, 0)
  const overageCost = overage * 6
  const monthlyPrice = 395 + overageCost
  const annualPrice = 3900 + overageCost * 12
  const recommendedPlan = annualPrice < monthlyPrice * 12 ? 'annual' : 'monthly'
  const annualDelta = monthlyPrice * 12 - annualPrice

  const metricTime = useCountUp(10, outcomesVisible)
  const metricDefects = useCountUp(87, outcomesVisible)
  const metricMinutes = useCountUp(45, outcomesVisible)
  const metricSavings = useCountUp(17760, outcomesVisible)

  const comparisonBoard = aligned ? comparisonAlignedBoard : comparisonManualBoard
  const comparisonNotes = aligned
    ? [
        'Validation is explicit before any case reaches partner review.',
        'Status cadence and case sync now belong to the operating layer.',
        'Partner attention is constrained to the exception lane.',
      ]
    : [
        'Uploads land in channels instead of a controlled intake path.',
        'Rules are implied by partner memory rather than enforced by a gate.',
        'Client status becomes manual message traffic instead of system output.',
      ]

  const forcedQueuePaths =
    filterState === 'idle'
      ? []
      : ['queue-ingress-route', 'queue-routine-route', 'queue-exception-route']

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <span className="dot" />
          <span>CasePilotAI</span>
        </div>
        <nav className="nav-links">
          <a href="#system">System</a>
          <a href="#comparison">Compare</a>
          <a href="#red-queue">Red Queue</a>
          <a href="#roi">ROI</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-cta">
          <a className="btn ghost" href="#system">
            Inspect system
          </a>
          <a className="btn primary" href="#cta">
            Book a demo
          </a>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: pageProgress }} />
      </header>

      <main>
        <motion.section
          ref={heroRef}
          className="hero section-dark"
          style={reduceMotion ? undefined : { opacity: heroOpacity }}
        >
          <div className="section-content hero-shell">
            <div className="hero-grid">
              <motion.div
                className="hero-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease: smoothEase }}
              >
                <div className="hero-kicker">
                  <span className="section-number">00</span>
                  <p className="eyebrow">CasePilotAI for partner-led UK immigration firms</p>
                </div>
                <h1>The operating layer between your case system and your clients.</h1>
                <p className="lead">
                  CasePilotAI enforces document chasing, upload validation,
                  exception routing, and status cadence across every live case.
                  Partners see only the red queue.
                </p>
                <div className="hero-actions">
                  <a className="btn primary" href="#cta">
                    Start 5-min setup
                  </a>
                  <a className="btn ghost" href="#system">
                    See the operating model
                  </a>
                </div>
                <div className="hero-proof-strip">
                  {heroProof.map((item) => (
                    <div key={item.label} className="proof-cell">
                      <span className="proof-label">{item.label}</span>
                      <strong>{item.value}</strong>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hero-panel"
                style={reduceMotion ? undefined : { y: heroBoardY }}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              >
                <div className="hero-panel-head">
                  <div>
                    <span className="spec-label">Live operating model</span>
                    <h2>One route-aware loop governs every case.</h2>
                  </div>
                  <p>
                    Client evidence enters a single gate. Failures loop back.
                    Only exception work reaches partners.
                  </p>
                </div>
                <ArchitectureBoard config={heroBoard} className="hero-board" />
                <div className="hero-panel-footer">
                  <div>
                    <span className="spec-label">System rule</span>
                    <p>Submission-ready state is explicit and auditable.</p>
                  </div>
                  <div>
                    <span className="spec-label">Partner load</span>
                    <p>Exception branch only. Routine cases remain automated.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <RevealSection className="section problem" id="problem" tone="light">
          <SectionIntro
            index="01"
            eyebrow="Knowledge infrastructure failure"
            title="When operational state lives in inboxes and memory, partner time becomes the workflow engine."
            body="The product problem is not a missing assistant. It is missing system ownership over intake, validation, correction loops, and client-facing status."
          />
          <div className="problem-layout">
            <div className="problem-grid">
              {problemCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="problem-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.52,
                    delay: 0.08 + index * 0.08,
                    ease: smoothEase,
                  }}
                >
                  <span className="spec-label">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
            <div className="problem-ledger">
              <div>
                <span className="spec-label">Operational effect</span>
                <p>Partners absorb routine chase work because the system does not own it.</p>
              </div>
              <div>
                <span className="spec-label">Result</span>
                <p>Defects are caught late, client updates are manual, and the case state is never fully trusted.</p>
              </div>
              <div>
                <span className="spec-label">Required fix</span>
                <p>An automation layer that defines gates, loops, and exception routing before partner review.</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section system" id="system" tone="dark">
          <SectionIntro
            index="02"
            eyebrow="System architecture"
            title="A portfolio routing system and a single-case validation system work together."
            body="The product is easiest to trust when the routing model and the validation model are both explicit. Routine cases stay in flow. Exceptions surface with a reason."
          />
          <div className="system-layout">
            <div className="system-copy">
              <div className="system-spec-list">
                <div>
                  <span className="spec-label">Routing rule</span>
                  <p>All live cases enter the filter. Routine work never becomes partner workload by default.</p>
                </div>
                <div>
                  <span className="spec-label">Validation rule</span>
                  <p>Every document passes the same gate, and every failure loops back with the defect reason attached.</p>
                </div>
                <div>
                  <span className="spec-label">Output rule</span>
                  <p>Validated state writes back into the case record and drives the client status cadence.</p>
                </div>
              </div>
            </div>
            <div className="system-shell">
              <div className="board-module">
                <div className="board-module-head">
                  <div>
                    <span className="spec-label">Subsystem A</span>
                    <h3>Portfolio routing</h3>
                  </div>
                  <p>23 cases enter. 18 remain routine. 5 become partner-visible.</p>
                </div>
                <ArchitectureBoard config={portfolioBoard} showLegend />
              </div>
              <div className="board-module">
                <div className="board-module-head">
                  <div>
                    <span className="spec-label">Subsystem B</span>
                    <h3>Single-case validation</h3>
                  </div>
                  <p>The same gate controls first-pass validation, correction loops, and submission-ready state.</p>
                </div>
                <ArchitectureBoard config={validationBoard} />
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section comparison" id="comparison" tone="light">
          <SectionIntro
            index="03"
            eyebrow="Manual vs aligned state"
            title="The same architecture reads very differently before and after the operating layer exists."
            body="This is the same workflow rendered in two states. The manual state has no gate and no routing ownership. The aligned state snaps into one controlled system."
          />
          <div className="comparison-layout">
            <div className="comparison-copy">
              <div className="comparison-toggle">
                <button className="btn secondary" onClick={() => setAligned((prev) => !prev)}>
                  {aligned ? 'Show manual state' : 'Show aligned state'}
                </button>
                <span className={`mode-pill ${aligned ? 'aligned' : 'manual'}`}>
                  {aligned ? 'Aligned architecture' : 'Manual architecture'}
                </span>
              </div>
              <div className="comparison-notes">
                {comparisonNotes.map((item) => (
                  <div key={item} className="comparison-note-row">
                    <span className="spec-label">Spec</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="comparison-shell">
              <AnimatePresence mode="wait">
                <motion.div
                  key={comparisonBoard.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: smoothEase }}
                >
                  <ArchitectureBoard config={comparisonBoard} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section outcomes" id="outcomes" tone="dark">
          <SectionIntro
            index="04"
            eyebrow="Operational outcomes"
            title="Authority comes from measurable control, not animation for its own sake."
            body="The commercial case stays visible: partner hours recovered, defects caught earlier, and annual savings against the flat monthly price."
          />
          <div className="metrics-grid" ref={outcomesRef}>
            <MetricCard
              label="Partner time recovered weekly"
              value={metricTime}
              suffix="h"
              active={outcomesVisible}
              delay={0.08}
            />
            <MetricCard
              label="Defects caught earlier"
              value={metricDefects}
              suffix="%"
              active={outcomesVisible}
              delay={0.16}
            />
            <MetricCard
              label="Time saved per case"
              value={metricMinutes}
              suffix="min"
              active={outcomesVisible}
              delay={0.24}
            />
            <MetricCard
              label="Annual net savings"
              value={metricSavings}
              format="currency"
              active={outcomesVisible}
              delay={0.32}
            />
          </div>
        </RevealSection>

        <RevealSection className="section timeline" id="timeline" tone="light">
          <SectionIntro
            index="05"
            eyebrow="Case-state timeline"
            title="One immigration case, rendered as explicit state transitions rather than generic milestones."
            body="Each stage is a small excerpt of the same operating model. That keeps the timeline tied to the real product instead of becoming a decorative checklist."
          />
          <div className="timeline-rail">
            {timelineStages.map((stage, index) => (
              <TimelineCard key={stage.day} stage={stage} index={index} />
            ))}
          </div>
        </RevealSection>

        <RevealSection className="section red-queue" id="red-queue" tone="dark">
          <SectionIntro
            index="06"
            eyebrow="Partner Red Queue"
            title="The red queue is a routing output, not a second backlog."
            body="Run the filter and the portfolio separates into one collapsed routine lane and one visible exception lane. Each surfaced case carries a reason for review."
          />
          <div className="queue-layout">
            <div className="queue-board-shell">
              <div className={`queue-ingress state-${filterState}`}>
                <div className="queue-ingress-head">
                  <span className="spec-label">Ingress bar</span>
                  <p>23 live cases under current management</p>
                </div>
                <div className="queue-ingress-bar">
                  {Array.from({ length: 23 }).map((_, index) => {
                    const isException = [1, 4, 8, 15, 19].includes(index)
                    return (
                      <span
                        key={index}
                        className={`queue-segment ${isException ? 'exception' : 'routine'}`}
                      />
                    )
                  })}
                  <span className="queue-scan-line" />
                </div>
              </div>

              <ArchitectureBoard config={redQueueBoard} forceActivePaths={forcedQueuePaths} />
            </div>

            <div className="queue-side">
              <div className="queue-controls">
                <button
                  className="btn primary"
                  onClick={handleFilterRun}
                  disabled={filterState === 'scanning'}
                >
                  {filterState === 'done' ? 'Run again' : 'Run filter'}
                </button>
                <button className="btn ghost" onClick={resetFilter}>
                  Reset
                </button>
              </div>
              <div className="routine-summary-card">
                <span className="spec-label">Routine output</span>
                <strong>18 cases stay auto-handled</strong>
                <p>
                  Chase requests, corrected re-uploads, case sync, and client status
                  updates continue without entering the partner lane.
                </p>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  className="exception-list"
                  initial={false}
                  animate={{ opacity: filterState === 'idle' ? 0.45 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {redQueueExceptions.map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="exception-card"
                      initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                      animate={
                        filterState === 'done'
                          ? { opacity: 1, x: 0 }
                          : filterState === 'scanning'
                            ? { opacity: 0.4, x: 8 }
                            : { opacity: 0.28, x: 0 }
                      }
                      transition={{
                        duration: 0.34,
                        delay: filterState === 'done' ? 0.08 + index * 0.05 : 0,
                        ease: smoothEase,
                      }}
                    >
                      <div className="exception-card-head">
                        <span className="spec-label">Needs partner</span>
                        <strong>{item.title}</strong>
                      </div>
                      <p>{item.reason}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section roi" id="roi" tone="light">
          <SectionIntro
            index="07"
            eyebrow="ROI clarity"
            title="The commercial model stays as explicit as the operating model."
            body="Move the assumptions and the monthly economics update in place. The math is visible, the break-even point is visible, and the savings per case are visible."
          />
          <div className="roi-grid">
            <div className="roi-inputs spec-panel">
              <label>
                Paralegal salary (annual)
                <input
                  type="range"
                  min={24000}
                  max={48000}
                  step={1000}
                  value={salary}
                  onChange={(event) => setSalary(Number(event.target.value))}
                />
                <span className="input-value">{formatCurrency(salary)}</span>
              </label>
              <label>
                Hours on document chasing (per week)
                <input
                  type="range"
                  min={4}
                  max={24}
                  step={1}
                  value={docHours}
                  onChange={(event) => setDocHours(Number(event.target.value))}
                />
                <span className="input-value">{docHours}h</span>
              </label>
              <label>
                Hours on status updates (per week)
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={statusHours}
                  onChange={(event) => setStatusHours(Number(event.target.value))}
                />
                <span className="input-value">{statusHours}h</span>
              </label>
            </div>

            <div className="roi-output">
              <div className="roi-chart spec-panel">
                <div className="bar">
                  <div className="bar-label">
                    <span>Manual monthly cost</span>
                    <strong>{formatCurrency(manualMonthly)}</strong>
                  </div>
                  <div className="bar-track">
                    <motion.div
                      className="bar-fill manual"
                      animate={{ width: `${Math.min((manualMonthly / 2500) * 100, 100)}%` }}
                      transition={{ duration: 0.45, ease: smoothEase }}
                    />
                  </div>
                </div>
                <div className="bar">
                  <div className="bar-label">
                    <span>CasePilotAI monthly cost</span>
                    <strong>{formatCurrency(aiMonthly)}</strong>
                  </div>
                  <div className="bar-track">
                    <motion.div
                      className="bar-fill ai"
                      animate={{ width: `${Math.min((aiMonthly / 2500) * 100, 100)}%` }}
                      transition={{ duration: 0.45, ease: smoothEase }}
                    />
                  </div>
                </div>
                <div className="savings-panel">
                  <div>
                    <span className="spec-label">Monthly savings</span>
                    <strong>{formatCurrency(savings)}</strong>
                  </div>
                  <div>
                    <span className="spec-label">ROI</span>
                    <strong className="green">{roi}%</strong>
                  </div>
                </div>
              </div>

              <div className="roi-ledger">
                <div className="ledger-card">
                  <span className="spec-label">Recovered monthly hours</span>
                  <strong>{recoveredHoursMonthly.toFixed(1)}h</strong>
                </div>
                <div className="ledger-card">
                  <span className="spec-label">Break-even weekly hours</span>
                  <strong>{breakEvenWeeklyHours.toFixed(1)}h</strong>
                </div>
                <div className="ledger-card">
                  <span className="spec-label">Savings per active case</span>
                  <strong>{formatCurrency(savingsPerCase || 0)}</strong>
                </div>
                <div className="ledger-card emphasis">
                  <span className="spec-label">Annualized savings</span>
                  <strong>{formatCurrency(annualizedSavings)}</strong>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section pricing" id="pricing" tone="dark">
          <SectionIntro
            index="08"
            eyebrow="Transparent pricing"
            title="The infrastructure layer is priced plainly and scales predictably."
            body="Base plan covers up to 50 active cases. If your live caseload is higher, the overage is visible immediately and the recommendation updates in place."
          />
          <div className="pricing-controls spec-panel">
            <label>
              How many active cases do you have?
              <input
                type="number"
                value={caseCount}
                min={0}
                onChange={(event) => setCaseCount(Number(event.target.value) || 0)}
              />
            </label>
            <div className="pricing-inline-ledger">
              <div>
                <span className="spec-label">Plan threshold</span>
                <strong>50 active cases</strong>
              </div>
              <div>
                <span className="spec-label">Current overage</span>
                <strong>{overage > 0 ? `${overage} cases` : 'Within limit'}</strong>
              </div>
              <div>
                <span className="spec-label">Annual delta</span>
                <strong>{formatCurrency(Math.max(annualDelta, 0))}</strong>
              </div>
            </div>
          </div>

          <div className="pricing-grid">
            <motion.article
              className={`pricing-card ${recommendedPlan === 'monthly' ? 'featured' : ''}`}
              layout
            >
              <AnimatePresence>
                {recommendedPlan === 'monthly' ? (
                  <motion.div
                    className="badge"
                    layoutId="pricing-recommendation"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    Recommended
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <span className="spec-label">Monthly</span>
              <h3>{formatCurrency(monthlyPrice)}</h3>
              <p>
                Flat base plan plus {formatCurrency(6)} per additional active case
                above 50.
              </p>
              <div className="pricing-specs">
                <div>Validation gate</div>
                <div>Needs-fix loop</div>
                <div>Partner Red Queue</div>
                <div>Status cadence</div>
              </div>
              <a className="btn primary" href="#cta">
                Start monthly
              </a>
            </motion.article>

            <motion.article
              className={`pricing-card ${recommendedPlan === 'annual' ? 'featured' : ''}`}
              layout
            >
              <AnimatePresence>
                {recommendedPlan === 'annual' ? (
                  <motion.div
                    className="badge"
                    layoutId="pricing-recommendation"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    Recommended
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <span className="spec-label">Annual</span>
              <h3>{formatCurrency(annualPrice)}</h3>
              <p>Two months free at base plan level. Same visible overage structure.</p>
              <div className="pricing-specs">
                <div>Implementation included</div>
                <div>Rule setup included</div>
                <div>Same routing layer</div>
                <div>Same support model</div>
              </div>
              <a className="btn secondary" href="#cta">
                Choose annual
              </a>
            </motion.article>
          </div>

          <div className="pricing-footnote">
            {overage > 0 ? (
              <span className="pill warning">
                Over plan by {overage} cases: +{formatCurrency(overageCost)} / month
              </span>
            ) : (
              <span className="pill success">Within plan limit</span>
            )}
            <p>No per-user fees. No per-upload fees. The cost model remains visible.</p>
          </div>
        </RevealSection>

        <RevealSection className="section testimonial" id="testimonial" tone="light">
          <SectionIntro
            index="09"
            eyebrow="Partner proof"
            title="What changed was not just throughput. It was who had to think about routine case state."
          />
          <motion.blockquote
            className="quote-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.68, ease: smoothEase }}
          >
            <p>
              &quot;When the system caught a <mark>blurry passport overnight</mark>
              and got it corrected before the team logged in, we stopped treating
              it as software and started treating it as <mark>operational capacity</mark>.&quot;
            </p>
            <footer>
              <strong>Senior Partner, 12-person London firm</strong>
              <span>40 active cases | 62% fewer status inquiries | 8-10h recovered weekly</span>
            </footer>
          </motion.blockquote>
        </RevealSection>

        <RevealSection className="section faq" id="faq" tone="dark">
          <SectionIntro
            index="10"
            eyebrow="FAQ"
            title="Concrete answers for teams evaluating operational infrastructure, not a generic SaaS tool."
          />
          <FaqAccordion items={faqItems} />
        </RevealSection>

        <RevealSection className="section cta" id="cta" tone="light">
          <div className="cta-panel">
            <div>
              <span className="section-number">11</span>
              <p className="eyebrow">Switch on the operating layer</p>
              <h2>Enforce certainty across every live immigration case.</h2>
              <p className="body">
                We map the route rules, wire the validation gate, define the red
                queue, and start the chase loop without changing the system you
                already use.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn primary" href="mailto:hello@casepilotai.com">
                Book a demo
              </a>
              <a className="btn ghost" href="#system">
                Review architecture
              </a>
            </div>
          </div>
        </RevealSection>
      </main>
    </div>
  )
}

function RevealSection({
  children,
  className,
  id,
  tone = 'light',
}: {
  children: ReactNode
  className: string
  id?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <motion.section
      id={id}
      className={`${className} section section-${tone}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, ease: smoothEase }}
    >
      <div className="section-content">{children}</div>
    </motion.section>
  )
}

function SectionIntro({
  index,
  eyebrow,
  title,
  body,
}: {
  index: string
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div className="section-intro">
      <div className="section-rule" />
      <div className="section-meta">
        <span className="section-number">{index}</span>
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div className="section-head-grid">
        <h2>{title}</h2>
        {body ? <p className="body">{body}</p> : null}
      </div>
    </div>
  )
}

function ArchitectureBoard({
  config,
  className,
  compact = false,
  showLegend = false,
  forceActivePaths = [],
}: {
  config: DiagramConfig
  className?: string
  compact?: boolean
  showLegend?: boolean
  forceActivePaths?: string[]
}) {
  const reduceMotion = useReducedMotion()
  const boardId = useId()
  const boardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const visible = useInView(boardRef, { once: true, amount: compact ? 0.35 : 0.25 })
  const [boardWidth, setBoardWidth] = useState(0)
  const [hoveredPaths, setHoveredPaths] = useState<string[]>([])
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)

  const activePaths = hoveredPaths.length > 0 ? hoveredPaths : forceActivePaths
  const viewBoxHeight = Number(config.viewBox.split(' ')[3] ?? 0)
  const laneHeight = Math.max(viewBoxHeight - 36, 120)
  const laneBottom = Math.max(viewBoxHeight - 18, 138)
  const stackedBreakpoint = compact ? 500 : 640
  const isStacked = boardWidth > 0 && boardWidth < stackedBreakpoint

  useEffect(() => {
    const node = boardRef.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const updateWidth = () => setBoardWidth(node.getBoundingClientRect().width)
    updateWidth()

    const observer = new ResizeObserver(() => updateWidth())
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const stackedLanes = useMemo(
    () =>
      config.lanes.map((lane) => {
        const nodes = config.nodes
          .filter((node) => node.lane === lane.id)
          .sort((left, right) => left.y - right.y || left.x - right.x)

        const routeIds = Array.from(
          new Set(nodes.flatMap((node) => node.pathIds)),
        )

        return {
          ...lane,
          nodes,
          routes: config.routes.filter((route) => routeIds.includes(route.id)),
        }
      }),
    [config],
  )

  const updateTooltip = (
    event: ReactMouseEvent<SVGElement>,
    text: string,
    pathIds: string[],
  ) => {
    const svgBounds = svgRef.current?.getBoundingClientRect()
    if (!svgBounds) return

    const maxX = Math.max(svgBounds.width - 250, 14)
    const maxY = Math.max(svgBounds.height - 90, 14)
    const x = Math.min(Math.max(event.clientX - svgBounds.left + 16, 14), maxX)
    const y = Math.min(Math.max(event.clientY - svgBounds.top + 16, 14), maxY)

    setHoveredPaths(pathIds)
    setTooltip({ text, x, y })
  }

  const clearTooltip = () => {
    setHoveredPaths([])
    setTooltip(null)
  }

  if (isStacked) {
    return (
      <div
        ref={boardRef}
        className={`architecture-board is-stacked ${compact ? 'compact' : ''} ${className ?? ''}`.trim()}
      >
        <div className="stacked-board">
          {stackedLanes.map((lane, laneIndex) => (
            <div key={lane.id} className="stack-lane">
              <div className="stack-lane-head">
                <div>
                  <span className="spec-label">{lane.label}</span>
                  <p>{lane.detail}</p>
                </div>
                <span className="stack-node-count">
                  {lane.nodes.length} {lane.nodes.length === 1 ? 'node' : 'nodes'}
                </span>
              </div>

              <div className="stack-lane-body">
                {lane.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`stack-node stack-node-${node.kind}`}
                    title={node.tooltip}
                  >
                    {node.chip ? (
                      <span className="stack-node-chip">{node.chip}</span>
                    ) : null}
                    <strong>{node.label}</strong>
                    {node.detail ? <p>{node.detail}</p> : null}
                  </div>
                ))}
              </div>

              {lane.routes.length ? (
                <div className="stack-route-list" aria-label={`${lane.label} routes`}>
                  {lane.routes.map((route) => (
                    <span
                      key={`${boardId}-${route.id}`}
                      className={`stack-route-chip route-${route.tone}`}
                      title={route.tooltip}
                    >
                      {route.label}
                    </span>
                  ))}
                </div>
              ) : null}

              {laneIndex < stackedLanes.length - 1 ? (
                <div className="stack-lane-connector" aria-hidden="true">
                  <span />
                </div>
              ) : null}
            </div>
          ))}

          {config.notes?.length ? (
            <div className="board-notes">
              {config.notes.map((note) => (
                <div key={note} className="board-note-item">
                  <span className="board-dot" />
                  <p>{note}</p>
                </div>
              ))}
            </div>
          ) : null}

          {showLegend ? <BoardLegend /> : null}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={boardRef}
      className={`architecture-board ${compact ? 'compact' : ''} ${className ?? ''}`.trim()}
    >
      <svg ref={svgRef} viewBox={config.viewBox} role="presentation">
        {config.lanes.map((lane) => (
          <g key={lane.id}>
            <rect
              className="diagram-lane-band"
              x={lane.x}
              y="18"
              width={lane.width}
              height={laneHeight}
            />
            <line
              x1={lane.x + lane.width}
              y1="18"
              x2={lane.x + lane.width}
              y2={laneBottom}
              className="diagram-lane-divider"
            />
            <text x={lane.x + 18} y="40" className="diagram-lane-label">
              {lane.label}
            </text>
            <text x={lane.x + 18} y="58" className="diagram-lane-detail">
              {lane.detail}
            </text>
          </g>
        ))}

        {config.routes.map((route, index) => (
          <g key={route.id}>
            <motion.path
              id={route.id}
              className={`flow-route flow-route-${route.tone} ${
                activePaths.includes(route.id) ? 'active' : ''
              }`}
              d={route.d}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={visible ? { opacity: 1, pathLength: 1 } : undefined}
              transition={{
                duration: compact ? 0.65 : 0.92,
                delay: compact ? 0.04 + index * 0.04 : 0.08 + index * 0.08,
                ease: smoothEase,
              }}
              onMouseEnter={(event) => updateTooltip(event, route.tooltip, [route.id])}
              onMouseMove={(event) => updateTooltip(event, route.tooltip, [route.id])}
              onMouseLeave={clearTooltip}
            />
            <text x={route.labelX} y={route.labelY} className={`route-label route-${route.tone}`}>
              {route.label}
            </text>
          </g>
        ))}

        {config.marks?.map((mark) => (
          <text
            key={mark.id}
            x={mark.x}
            y={mark.y}
            className={`diagram-mark ${mark.tone ? `route-${mark.tone}` : ''}`}
          >
            {mark.text}
          </text>
        ))}

        {config.nodes.map((node, index) => {
          const isActive = node.pathIds.some((pathId) => activePaths.includes(pathId))
          return (
            <motion.g
              key={node.id}
              transform={`translate(${node.x} ${node.y})`}
              className={`diagram-node diagram-node-${node.kind} ${isActive ? 'active' : ''}`}
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : undefined}
              transition={{
                duration: compact ? 0.34 : 0.44,
                delay: compact ? 0.08 + index * 0.05 : 0.1 + index * 0.08,
                ease: smoothEase,
              }}
              onMouseEnter={(event) => updateTooltip(event, node.tooltip, node.pathIds)}
              onMouseMove={(event) => updateTooltip(event, node.tooltip, node.pathIds)}
              onMouseLeave={clearTooltip}
            >
              <rect width={node.width} height={node.height} rx="4" ry="4" />
              {node.chip ? (
                <text x="16" y="24" className="diagram-node-chip">
                  {node.chip}
                </text>
              ) : null}
              <text x="16" y={node.chip ? 48 : 34} className="diagram-node-title">
                {node.label}
              </text>
              {node.detail ? (
                <text x="16" y={node.chip ? 68 : 54} className="diagram-node-detail">
                  {node.detail}
                </text>
              ) : null}
            </motion.g>
          )
        })}

        {!reduceMotion && visible
          ? config.routes
              .filter((route) => route.packet)
              .map((route) => (
                <PacketBadge key={route.id} route={route} />
              ))
          : null}
      </svg>

      {config.notes?.length ? (
        <div className="board-notes">
          {config.notes.map((note) => (
            <div key={note} className="board-note-item">
              <span className="board-dot" />
              <p>{note}</p>
            </div>
          ))}
        </div>
      ) : null}

      {showLegend ? <BoardLegend /> : null}

      <AnimatePresence>
        {tooltip ? (
          <motion.div
            className="diagram-tooltip"
            style={{ left: tooltip.x, top: tooltip.y }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            {tooltip.text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function PacketBadge({ route }: { route: DiagramRoute }) {
  if (!route.packet) return null

  const width = Math.max(route.packet.label.length * 7 + 26, 74)

  return (
    <g className={`packet-badge packet-${route.tone}`}>
      <rect x={-width / 2} y={-12} width={width} height={24} rx="12" ry="12" />
      <text x="0" y="4" textAnchor="middle">
        {route.packet.label}
      </text>
      <animateMotion
        dur={`${route.packet.duration ?? 5.2}s`}
        begin={`${route.packet.delay}s`}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath href={`#${route.id}`} xlinkHref={`#${route.id}`} />
      </animateMotion>
    </g>
  )
}

function BoardLegend() {
  return (
    <div className="board-legend">
      <div className="legend-item">
        <span className="legend-line base" />
        <span>Core route</span>
      </div>
      <div className="legend-item">
        <span className="legend-line success" />
        <span>Verified progression</span>
      </div>
      <div className="legend-item">
        <span className="legend-line alert" />
        <span>Exception path</span>
      </div>
      <div className="legend-item">
        <span className="legend-line loop" />
        <span>Correction loop</span>
      </div>
    </div>
  )
}

function MetricCard({
  value,
  label,
  suffix,
  format,
  active,
  delay,
}: {
  value: number
  label: string
  suffix?: string
  format?: 'currency'
  active: boolean
  delay: number
}) {
  const displayValue =
    format === 'currency' ? formatCurrency(value) : `${value}${suffix ?? ''}`

  return (
    <motion.article
      className="metric-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.48, delay, ease: smoothEase }}
    >
      <div className="metric-value">
        <motion.span
          className="accent-line"
          initial={{ scaleX: 0, originX: 0 }}
          animate={active ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, delay, ease: smoothEase }}
        />
        {displayValue}
      </div>
      <p>{label}</p>
    </motion.article>
  )
}

function TimelineCard({
  stage,
  index,
}: {
  stage: TimelineStage
  index: number
}) {
  return (
    <motion.article
      className="timeline-stage"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.56, delay: index * 0.06, ease: smoothEase }}
    >
      <div className="timeline-day-wrap">
        <span className="timeline-day">{stage.day}</span>
        <span className="timeline-marker" />
      </div>
      <div className="timeline-card">
        <div className="timeline-card-head">
          <div>
            <span className="spec-label">{stage.chip}</span>
            <h3>{stage.title}</h3>
          </div>
          <p>{stage.detail}</p>
        </div>
        <ArchitectureBoard config={stage.board} compact />
      </div>
    </motion.article>
  )
}

function FaqAccordion({ items }: { items: typeof faqItems }) {
  const [openQuestion, setOpenQuestion] = useState<string>(items[0].question)
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = items.filter((item) => {
    if (!normalizedQuery) return true
    return (
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery)
    )
  })

  const activeQuestion = filtered.some((item) => item.question === openQuestion)
    ? openQuestion
    : (filtered[0]?.question ?? '')

  return (
    <div className="faq-wrap">
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search questions..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="faq-list">
        {filtered.map((item) => {
          const isOpen = activeQuestion === item.question
          return (
            <div key={item.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
              >
                <span>{renderHighlightedText(item.question, normalizedQuery)}</span>
                <span className="indicator">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{renderHighlightedText(item.answer, normalizedQuery)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function renderHighlightedText(text: string, query: string) {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  )
}
