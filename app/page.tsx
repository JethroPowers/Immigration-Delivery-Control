'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  useRef,
  useState,
  type ReactNode,
} from 'react'

type FlowTone = 'neutral' | 'verified' | 'exception' | 'manual'

type FlowStep = {
  chip?: string
  label: string
  detail?: string
  tone?: FlowTone
}

type StatePoint = {
  chip: string
  label: string
  detail: string
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]
const brandName = 'Arbiter'
const contactEmail = 'hello@casepilotai.com'

const heroSteps: FlowStep[] = [
  {
    chip: 'STACK',
    label: 'Current stack',
    detail: 'Clio, another legal platform, or a hybrid of inboxes, drives, and spreadsheets.',
  },
  {
    chip: 'AUDIT',
    label: 'Workflow audit',
    detail: 'Map how cases really move from consultation to submission.',
  },
  {
    chip: 'REDESIGN',
    label: 'Operating model redesign',
    detail: 'Tighten stages, ownership, document flow, and escalation rules.',
  },
  {
    chip: 'IMPLEMENT',
    label: 'Implementation in your system',
    detail: 'Build the improved workflow into the tools the team already uses.',
  },
  {
    chip: 'RESULT',
    label: 'Cleaner case delivery',
    detail: 'The firm can see what is moving, what is blocked, and what needs attention next.',
    tone: 'verified',
  },
]

const heroOutcomes = [
  'Clearer case stages and ownership',
  'Cleaner document handling and handoffs',
  'Less partner interruption on live matters',
]

const workflowTools = [
  { name: 'Clio', mark: 'clio' },
  { name: 'Actionstep', mark: 'actionstep' },
  { name: 'Docketwise', mark: 'docketwise' },
  { name: 'Microsoft 365', mark: 'microsoft' },
] as const

const diagnosisCards = [
  {
    title: 'Case progression becomes unclear',
    body: 'Stages exist on paper, but live matters drift between waiting, ready, and blocked without a rule set the team actually trusts.',
  },
  {
    title: 'Documents are still controlled manually',
    body: 'Requests, reviews, and missing evidence often sit across inboxes, drives, WhatsApp, and informal follow-up.',
  },
  {
    title: 'Partners still absorb routine operational drag',
    body: 'Updates, escalations, and unclear ownership keep landing on senior staff when they should stay operational.',
  },
]

const diagnosisNotes = [
  {
    label: 'What is usually missing',
    body: 'Explicit stage rules, ownership, triggers, and exception handling inside the workflow the team already uses.',
  },
  {
    label: 'What it costs',
    body: 'Stalled files, weak visibility, inconsistent updates, and avoidable partner interruption across the live caseload.',
  },
  {
    label: 'What Arbiter changes',
    body: 'The workflow behind the system, not the system itself.',
  },
]

const serviceCards = [
  {
    chip: '01',
    title: 'Audit the current workflow',
    body: 'Map how cases actually progress today, where documents are handled, where handoffs happen, and where work still leaks outside the system of record.',
  },
  {
    chip: '02',
    title: 'Redesign the operating model',
    body: 'Define cleaner stages, entry and exit conditions, ownership rules, document flow, update triggers, escalation logic, and exception handling.',
  },
  {
    chip: '03',
    title: 'Implement the improvements',
    body: 'Build the improved workflow into the current stack through configuration, templates, dashboards, reporting views, and team handover.',
  },
]

const deliverables = [
  'Current-state workflow map',
  'Bottleneck diagnosis',
  'Redesigned workflow architecture',
  'Stage and ownership model',
  'Implementation in the current stack',
  'Team handover, SOPs, and support',
]

const beforeState: StatePoint[] = [
  {
    chip: 'STAGES',
    label: 'Loose progression',
    detail: 'Matters drift between waiting, ready, and blocked without trusted move-forward rules.',
  },
  {
    chip: 'DOCS',
    label: 'Documents across channels',
    detail: 'Evidence lives across inboxes, drives, and ad hoc follow-up.',
  },
  {
    chip: 'UPDATES',
    label: 'Updates depend on memory',
    detail: 'Status communication changes with whoever last touched the file.',
  },
  {
    chip: 'OWNER',
    label: 'Ownership is unclear',
    detail: 'Routine admin and escalation sit with the team by default.',
  },
]

const afterState: StatePoint[] = [
  {
    chip: 'STAGES',
    label: 'Explicit case stages',
    detail: 'Each stage has a meaning, an owner, and a move-forward rule.',
  },
  {
    chip: 'DOCS',
    label: 'Structured document control',
    detail: 'Evidence is requested, tracked, reviewed, and handed off through a clearer path.',
  },
  {
    chip: 'UPDATES',
    label: 'Triggered client updates',
    detail: 'Updates follow the workflow more consistently instead of relying on memory.',
  },
  {
    chip: 'EXCEPTION',
    label: 'Faster exception visibility',
    detail: 'Blocked or unusual matters surface earlier, with partner attention narrowed to what matters.',
  },
]

const improvements = [
  {
    title: 'Case progression',
    body: 'Define what each stage means, what is required to move forward, and where matters get stuck.',
  },
  {
    title: 'Document control',
    body: 'Tighten how evidence is requested, reviewed, tracked, and handed off so back-and-forth drops.',
  },
  {
    title: 'Client update cadence',
    body: 'Make updates more consistent and less dependent on memory or inbox reminders.',
  },
  {
    title: 'Handoffs and ownership',
    body: 'Make responsibility visible at each stage so the next action is clear.',
  },
  {
    title: 'Exception handling',
    body: 'Surface blocked or unusual matters earlier and with clearer reasons.',
  },
  {
    title: 'Partner visibility',
    body: 'Keep routine admin away from partners and make real decision points easier to see.',
  },
]

const engagementPhases = [
  {
    phase: 'Phase 1',
    title: 'Workflow review',
    body: 'A paid audit of the current workflow, where work leaks, and what is creating operational drag.',
  },
  {
    phase: 'Phase 2',
    title: 'Implementation project',
    body: 'A scoped project that puts the redesigned stages, ownership model, templates, and views into the current stack.',
  },
  {
    phase: 'Phase 3',
    title: 'Ongoing optimisation',
    body: 'Optional support to refine the workflow, reporting, and operating discipline as the firm grows.',
  },
]

const fitGroups = [
  {
    title: 'Ideal for',
    tone: 'verified' as FlowTone,
    items: [
      'Partner-led immigration firms',
      'Small to mid-sized teams with real case volume',
      'Firms with an existing stack but weak execution',
      'Firms where partners still get dragged into routine admin',
      'Firms that want practical workflow improvement, not a migration project',
    ],
  },
  {
    title: 'Not ideal for',
    tone: 'manual' as FlowTone,
    items: [
      'Firms looking for a full platform replacement',
      'Firms shopping for generic AI features',
      'Firms with no real operational pain',
      'Firms unwilling to change internal workflow behaviour',
    ],
  },
]

const commercialCards = [
  {
    label: 'Fixed scope',
    title: 'Workflow audit',
    body: 'A structured review of how the current workflow runs, where it breaks, and what should change first.',
  },
  {
    label: 'Project based',
    title: 'Implementation project',
    body: 'A scoped implementation that puts the redesigned workflow into the current stack through configuration, templates, dashboards, and reporting views.',
  },
  {
    label: 'Optional monthly',
    title: 'Ongoing support',
    body: 'Continued refinement, reporting improvements, and operational support after the implementation is live.',
  },
]

const faqItems = [
  {
    question: 'Do you replace our case management system?',
    answer: 'No. Arbiter does not start by replacing your current system. We improve how the workflow runs inside the tools you already use.',
  },
  {
    question: 'Can you work with the tools we already use?',
    answer: 'Yes. Arbiter is designed to work with the current stack, whether that is Clio, another legal platform, or a more manual hybrid of inboxes, drives, and spreadsheets.',
  },
  {
    question: 'What does the audit include?',
    answer: 'The audit maps the current workflow from consultation to submission, identifies where operational drag and inconsistency live, and shows what should change first.',
  },
  {
    question: 'How long does an implementation take?',
    answer: 'Implementation time depends on the current workflow and scope, but the point is a practical project with clear outputs rather than an open-ended transformation exercise.',
  },
  {
    question: 'What kinds of firms are the best fit?',
    answer: 'Partner-led immigration firms with repetitive case workflows, an existing stack, and real friction in daily execution are usually the best fit.',
  },
  {
    question: 'Do you only work with Clio?',
    answer: 'No. Arbiter can work with Clio, other legal platforms, or a hybrid setup, as long as the firm is serious about tightening how the workflow runs.',
  },
  {
    question: 'What happens after implementation?',
    answer: 'After implementation, the team runs the redesigned workflow in the current stack. Arbiter can then support handover, refinement, and optional ongoing optimisation.',
  },
  {
    question: 'Can this become a deeper control layer later?',
    answer: 'Yes. Once the workflow is structured properly, Arbiter can later support readiness logic, exception views, and deeper operational reporting.',
  },
]

export default function Home() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0.5])
  const heroBoardY = useTransform(heroProgress, [0, 1], [0, -22])

  return (
    <div className="page page-simple">
      <header className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
            <span className="brand-mark-stem" />
          </span>
          <span className="brand-wordmark">
            <span>{brandName}</span>
            <span className="brand-byline">by the4five</span>
          </span>
        </div>
        <nav className="nav-links">
          <a href="#approach">Approach</a>
          <a href="#compare">Compare</a>
          <a href="#engagement">Engagement</a>
          <a href="#fit">Fit</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <a className="btn primary" href="#cta">
            Book a workflow review
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
          <div className="section-content hero-shell simple-hero-shell">
            <div className="hero-copy hero-copy-centered simple-hero-copy">
              <div className="hero-kicker">
                <span className="section-number">00</span>
                <p className="eyebrow">For partner-led UK immigration firms</p>
              </div>
              <h1>Make immigration case delivery easier to run.</h1>
              <p className="lead">
                For partner-led UK immigration firms, {brandName} audits the current workflow, redesigns the operating model, and implements the improvements inside the tools your firm already uses.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#cta">
                  Book a workflow review
                </a>
                <a className="btn ghost" href="#engagement">
                  See the implementation process
                </a>
              </div>
            </div>

            <motion.div
              className="hero-panel hero-panel-stage hero-panel-simple"
              style={reduceMotion ? undefined : { y: heroBoardY }}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.12, ease: smoothEase }}
            >
              <div className="hero-panel-head">
                <div>
                  <span className="spec-label">What Arbiter changes</span>
                  <h2>The value is clearer progression, cleaner ownership, and less interruption for partners.</h2>
                </div>
                <p>
                  We work inside the current stack, clarify how matters progress, tighten document control and handoffs, and make partner visibility easier to trust.
                </p>
              </div>
              <div className="spec-shell hero-simple-board">
                <FlowSequence steps={heroSteps} className="hero-main-sequence" />
                <div className="hero-summary-grid">
                  {heroOutcomes.map((item) => (
                    <SectionSpecNote key={item}>{item}</SectionSpecNote>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="compatibility-strip"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }}
            >
              <div className="compatibility-copy">
                <h2>Works with your current workflow</h2>
                <p>Implemented inside the tools your firm already uses.</p>
              </div>
              <div className="compatibility-logos" aria-label="Tools we commonly work alongside">
                {workflowTools.map((tool) => (
                  <div key={tool.name} className="compatibility-logo" aria-label={tool.name}>
                    <WorkflowLogo mark={tool.mark} name={tool.name} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <RevealSection className="section diagnosis" id="diagnosis" tone="light">
          <SectionIntro
            index="01"
            eyebrow="The real problem"
            title="Most firms already have a process. The problem is how case delivery runs day to day."
            body="The stack usually exists already. The execution leaks across inboxes, drives, spreadsheets, memory, and manual follow-up."
          />
          <div className="diagnosis-grid">
            <div className="problem-grid diagnosis-card-grid">
              {diagnosisCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="problem-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: smoothEase }}
                >
                  <span className="spec-label">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
            <div className="problem-ledger diagnosis-side-panel">
              {diagnosisNotes.map((item) => (
                <div key={item.label}>
                  <span className="spec-label">{item.label}</span>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section approach" id="approach" tone="dark">
          <SectionIntro
            index="02"
            eyebrow="What Arbiter does"
            title="Audit, redesign, implement."
            body="We improve how cases move inside the tools your team already uses, then help the firm run the improved workflow properly."
          />
          <div className="service-grid-simple">
            <div className="service-card-grid">
              {serviceCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="spec-panel service-card-simple"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: smoothEase }}
                >
                  <span className="section-number service-card-number">{item.chip}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
            <div className="spec-panel deliverables-panel">
              <div>
                <span className="spec-label">What the firm gets</span>
                <h3>Clear deliverables, not vague operational advice.</h3>
              </div>
              <div className="deliverable-list">
                {deliverables.map((item) => (
                  <div key={item} className="deliverable-item">
                    <span className="section-spec-dot" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <SectionSpecNote>
                Ongoing optimisation can follow later, but the first job is to leave the firm with a workflow that is easier to run and easier to trust.
              </SectionSpecNote>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section compare" id="compare" tone="light">
          <SectionIntro
            index="03"
            eyebrow="Before and after"
            title="The difference is not whether a process exists. It is whether the process is clear enough to run reliably."
            body="Compare a loosely operated workflow with an Arbiter-designed operating model inside the current stack."
          />
          <div className="state-grid">
            <StatePanel
              tone="manual"
              chip="Before"
              title="The workflow exists, but execution is fragmented."
              intro="Stages are loose, documents live across channels, and routine admin still reaches partners."
              points={beforeState}
            />
            <StatePanel
              tone="verified"
              chip="After"
              title="The workflow runs with clearer stages and ownership."
              intro="Document handling, updates, handoffs, and partner visibility become easier to run consistently."
              points={afterState}
            />
          </div>
        </RevealSection>

        <RevealSection className="section improves" id="improves" tone="dark">
          <SectionIntro
            index="04"
            eyebrow="Where the work improves"
            title="Arbiter usually fixes the same operational fault lines."
            body="The output is not more software theatre. It is cleaner progression, tighter document control, clearer handoffs, and better visibility on live matters."
          />
          <div className="improvement-grid-simple">
            {improvements.map((item, index) => (
              <motion.article
                key={item.title}
                className="metric-card capability-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: 0.04 + index * 0.05, ease: smoothEase }}
              >
                <span className="spec-label">0{index + 1}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
          <div className="section-note-wrap">
            <SectionSpecNote className="future-note">
              The Red Queue survives later as an exception-handling principle, not as the main thing being sold on this page.
            </SectionSpecNote>
          </div>
        </RevealSection>

        <RevealSection className="section engagement" id="engagement" tone="light">
          <SectionIntro
            index="05"
            eyebrow="How the engagement works"
            title="This starts as a workflow review, then moves into implementation."
            body="The engagement is usually structured in three clear phases so the firm can see what it is buying and what it is getting."
          />
          <div className="phase-grid">
            {engagementPhases.map((item, index) => (
              <motion.article
                key={item.title}
                className="spec-panel phase-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: 0.08 + index * 0.07, ease: smoothEase }}
              >
                <div className="phase-head">
                  <span className="section-number">0{index + 1}</span>
                  <span className="spec-label">{item.phase}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="section fit-commercial" id="fit" tone="dark">
          <SectionIntro
            index="06"
            eyebrow="Fit and commercial model"
            title="Best for firms with an existing stack and messy execution."
            body="Arbiter is usually most useful where the stack already exists but the workflow around it still creates drag, inconsistency, and partner interruption."
          />
          <div className="fit-commercial-grid">
            <div className="fit-stack">
              {fitGroups.map((group) => (
                <article key={group.title} className="spec-panel fit-panel-simple">
                  <div>
                    <FlowChip tone={group.tone}>{group.title}</FlowChip>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="fit-list">
                    {group.items.map((item) => (
                      <div key={item} className="deliverable-item">
                        <span className="section-spec-dot" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="commercial-stack">
              <div className="spec-panel commercial-summary-simple">
                <div>
                  <span className="spec-label">Commercial model</span>
                  <h3>Start with the workflow review, then scope the right implementation.</h3>
                </div>
                <p>
                  Pricing depends on firm size, workflow complexity, and implementation scope. Arbiter is typically structured as a fixed-scope audit, a project-based implementation, and optional ongoing support.
                </p>
              </div>
              <div className="commercial-card-grid">
                {commercialCards.map((item) => (
                  <article key={item.title} className="pricing-card commercial-card-simple">
                    <span className="spec-label">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <SectionSpecNote className="future-note">
                Once the workflow is clean, Arbiter can later support readiness logic, exception views, and deeper operational reporting.
              </SectionSpecNote>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section faq" id="faq" tone="light">
          <SectionIntro
            index="07"
            eyebrow="FAQ"
            title="Straight answers for firms deciding whether this is the right kind of operational help."
          />
          <FaqAccordion items={faqItems} />
        </RevealSection>

        <RevealSection className="section cta" id="cta" tone="dark">
          <div className="cta-panel cta-panel-dark">
            <div>
              <span className="section-number">08</span>
              <p className="eyebrow">Review your current workflow</p>
              <h2>See where case delivery is leaking before it turns into more software.</h2>
              <p className="body">
                We will look at how your team currently handles case progression, documents, handoffs, client updates, and partner visibility, then show you where the workflow can be tightened.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn primary" href={`mailto:${contactEmail}?subject=Workflow%20Review`}>
                Book a workflow review
              </a>
              <a className="btn ghost" href="#approach">
                Review the approach
              </a>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="mini-footer">
        <p>
          {brandName} helps immigration firms tighten case progression, document control, handoffs, and partner visibility inside the systems they already use.
        </p>
      </footer>
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

function getFlowTone(tone?: FlowTone) {
  return tone ?? 'neutral'
}

function FlowChip({
  children,
  tone,
  className,
}: {
  children: ReactNode
  tone?: FlowTone
  className?: string
}) {
  return (
    <span className={`flow-chip tone-${getFlowTone(tone)} ${className ?? ''}`.trim()}>
      {children}
    </span>
  )
}

function FlowCard({
  step,
  className,
}: {
  step: FlowStep
  className?: string
}) {
  return (
    <article className={`flow-card tone-${getFlowTone(step.tone)} ${className ?? ''}`.trim()}>
      {step.chip ? <FlowChip tone={step.tone}>{step.chip}</FlowChip> : null}
      <strong>{step.label}</strong>
      {step.detail ? <p>{step.detail}</p> : null}
    </article>
  )
}

function FlowArrow({
  tone,
  vertical = false,
  className,
}: {
  tone?: FlowTone
  vertical?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`flow-arrow ${vertical ? 'vertical' : 'horizontal'} tone-${getFlowTone(tone)} ${className ?? ''}`.trim()}
    />
  )
}

function WorkflowLogo({
  mark,
  name,
}: {
  mark: 'clio' | 'actionstep' | 'docketwise' | 'microsoft'
  name: string
}) {
  return (
    <>
      <span className="compatibility-logo-mark" aria-hidden="true">
        {mark === 'clio' ? (
          <svg viewBox="0 0 24 24" role="presentation">
            <circle cx="12" cy="12" r="7.25" />
            <circle cx="12" cy="12" r="3.1" />
          </svg>
        ) : null}
        {mark === 'actionstep' ? (
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M4 17.5h7.2" />
            <path d="M4 12h10.2" />
            <path d="M4 6.5h13.2" />
            <path d="M14.8 5.25l3.4 1.25-3.4 1.25" />
            <path d="M14.8 10.75l3.4 1.25-3.4 1.25" />
            <path d="M11.2 16.25l3.4 1.25-3.4 1.25" />
          </svg>
        ) : null}
        {mark === 'docketwise' ? (
          <svg viewBox="0 0 24 24" role="presentation">
            <rect x="5" y="4.5" width="10.5" height="15" rx="1.6" />
            <path d="M8 8h4.8" />
            <path d="M8 11h6.2" />
            <path d="M8 14h5.2" />
            <path d="M16 11.5l2.2 2.2 3.2-3.6" />
          </svg>
        ) : null}
        {mark === 'microsoft' ? (
          <svg viewBox="0 0 24 24" role="presentation">
            <rect x="3.5" y="3.5" width="7" height="7" />
            <rect x="13.5" y="3.5" width="7" height="7" />
            <rect x="3.5" y="13.5" width="7" height="7" />
            <rect x="13.5" y="13.5" width="7" height="7" />
          </svg>
        ) : null}
      </span>
      <span className="compatibility-logo-name">{name}</span>
    </>
  )
}

function FlowSequence({
  steps,
  className,
}: {
  steps: FlowStep[]
  className?: string
}) {
  return (
    <div className={`flow-sequence ${className ?? ''}`.trim()}>
      {steps.map((step, index) => (
        <div key={`${step.label}-${index}`} className="flow-sequence-part">
          <FlowCard step={step} />
          {index < steps.length - 1 ? <FlowArrow tone={step.tone} /> : null}
        </div>
      ))}
    </div>
  )
}

function SectionSpecNote({
  children,
  tone,
  className,
}: {
  children: ReactNode
  tone?: FlowTone
  className?: string
}) {
  return (
    <div className={`section-spec-note tone-${getFlowTone(tone)} ${className ?? ''}`.trim()}>
      <span className="section-spec-dot" />
      <p>{children}</p>
    </div>
  )
}

function StatePanel({
  tone,
  chip,
  title,
  intro,
  points,
}: {
  tone: FlowTone
  chip: string
  title: string
  intro: string
  points: StatePoint[]
}) {
  return (
    <motion.article
      className={`state-panel tone-${tone}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.52, ease: smoothEase }}
    >
      <div className="state-panel-head">
        <div>
          <FlowChip tone={tone}>{chip}</FlowChip>
          <h3>{title}</h3>
        </div>
        <p>{intro}</p>
      </div>
      <div className="state-list">
        {points.map((point) => (
          <div key={point.label} className="state-row">
            <span className="spec-label">{point.chip}</span>
            <div>
              <strong>{point.label}</strong>
              <p>{point.detail}</p>
            </div>
          </div>
        ))}
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
