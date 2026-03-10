'use client'

import { AnimatedHero } from '../components/ui/animated-hero'
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
  useMemo,
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

type FlowBranch = {
  title: string
  detail: string
  steps: FlowStep[]
  tone?: FlowTone
}

type TimelineStep = {
  label: string
  chip?: string
  tone?: FlowTone
}

type TimelineStage = {
  day: string
  title: string
  detail: string
  chip: string
  steps: TimelineStep[]
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]
const brandName = 'Arbiter'

const heroPainPoints = [
  'document chasing',
  'failed uploads',
  'client update emails',
  'routine follow-up',
  'WhatsApp handoffs',
]

const problemCards = [
  {
    title: 'Document chasing lives in too many places',
    body: 'Evidence requests end up split across email, WhatsApp, and whoever last touched the case.',
  },
  {
    title: 'Bad uploads get found too late',
    body: 'Blurry passports, wrong files, and missing evidence are often spotted after avoidable back-and-forth.',
  },
  {
    title: 'Routine updates still come from fee-earners',
    body: 'When no system sends updates automatically, partners and paralegals end up replying to the same questions all week.',
  },
]

const faqItems = [
  {
    question: 'How fast can we deploy?',
    answer:
      'Most firms are live in around 5 working days. We connect your case system, configure the upload rules, and turn on the chasing and update flows without changing your existing setup.',
  },
  {
    question: 'Does this replace my case management tool?',
    answer:
      `${brandName} works alongside the case management system you already use. It handles the chasing, upload checks, and routine client updates around it.`,
  },
  {
    question: 'What counts as an exception?',
    answer:
      'Any case with missing evidence, a failed upload check, or something your firm wants reviewed by a senior person. Those are the cases sent to the Partner Red Queue.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'GBP 395 per month covers up to 50 active cases. If you go above that, we add a clear per-case overage so the monthly cost stays predictable.',
  },
  {
    question: 'What about security and auditability?',
    answer:
      'Every upload, chase, failed check, and status update is logged, so your team can see what was requested, what was uploaded, and what happened next.',
  },
]

const redQueueExceptions = [
  {
    id: 'case-02',
    title: 'Case 02',
    reason: 'Passport upload failed minimum resolution threshold.',
    action: 'Request a corrected passport image before submission review continues.',
  },
  {
    id: 'case-05',
    title: 'Case 05',
    reason: 'Address evidence does not match the current route record.',
    action: 'Confirm the current address trail and replace the mismatched evidence file.',
  },
  {
    id: 'case-09',
    title: 'Case 09',
    reason: 'Sponsor income evidence missing a required month in sequence.',
    action: 'Collect the missing payslip month before the bundle can return to routine flow.',
  },
  {
    id: 'case-16',
    title: 'Case 16',
    reason: 'BRP expiry date conflicts with the submitted status history.',
    action: 'Check the status timeline and resolve the date conflict before filing.',
  },
  {
    id: 'case-20',
    title: 'Case 20',
    reason: 'Bank statement requires translation before submission-ready state.',
    action: 'Obtain the translation and re-run the validation gate.',
  },
]

const redQueuePortfolio = Array.from({ length: 23 }, (_, index) => {
  const caseNumber = String(index + 1).padStart(2, '0')
  const title = `Case ${caseNumber}`
  const route = [
    'Skilled Worker',
    'Spouse',
    'Graduate',
    'ILR',
    'Visitor',
  ][index % 5]
  const exception = redQueueExceptions.find((item) => item.title === title)

  return {
    id: `case-${caseNumber}`,
    title,
    route,
    status: exception ? ('exception' as const) : ('routine' as const),
    summary: exception ? 'Needs partner review' : 'Routine flow',
  }
})

const heroMainSteps: FlowStep[] = [
  {
    chip: 'INPUT',
    label: 'Client upload',
    detail: 'Secure evidence link opens the chase path',
  },
  {
    chip: 'GATE',
    label: 'Validation gate',
    detail: 'Route rules and quality checks run before review',
  },
  {
    chip: 'READY',
    label: 'Submission-ready',
    detail: 'Validated evidence bundle is complete',
    tone: 'verified',
  },
  {
    chip: 'SYNC',
    label: 'Case system sync',
    detail: 'Audit trail and case record update',
    tone: 'verified',
  },
  {
    chip: 'STATUS',
    label: 'Client status cadence',
    detail: 'Waiting-state updates go out automatically',
    tone: 'verified',
  },
]

const heroCorrectionBranch: FlowBranch = {
  title: 'Correction loop',
  detail:
    'If a file fails the gate, the client receives a specific correction request and the same rules run again on re-upload.',
  tone: 'exception',
  steps: [
    {
      chip: 'LOOP',
      label: 'Needs-fix loop',
      detail: 'Defect reason issued automatically',
      tone: 'exception',
    },
    {
      chip: 'RE-UPLOAD',
      label: 'Client re-upload',
      detail: 'Corrected evidence only',
    },
    {
      chip: 'RE-CHECK',
      label: 'Validation runs again',
      detail: 'Same gate, same route, no manual reset',
      tone: 'verified',
    },
  ],
}

const heroExceptionBranch: FlowBranch = {
  title: 'Partner exception branch',
  detail:
    'Only cases with genuine risk, missing evidence, or route conflicts surface for partner attention.',
  tone: 'exception',
  steps: [
    {
      chip: 'QUEUE',
      label: 'Partner Red Queue',
      detail: 'Exception-only review lane',
      tone: 'exception',
    },
  ],
}

const heroNotes = [
  'The same workflow owns first upload, re-upload, validation, and client updates.',
  'Routine work stays inside the operating layer. Partner attention starts only on exception.',
]

const triageSourceSteps: FlowStep[] = [
  {
    chip: 'PORTFOLIO',
    label: 'All live cases',
    detail: '23 active immigration matters under management',
  },
  {
    chip: 'FILTER',
    label: 'AI filter',
    detail: 'Rules, deadlines, and exception triage',
  },
]

const triageOutputs = {
  routine: {
    chip: 'ROUTINE',
    label: 'Routine flow',
    detail: '18 cases stay auto-handled',
    tone: 'verified' as FlowTone,
  },
  exception: {
    chip: 'QUEUE',
    label: 'Partner Red Queue',
    detail: '5 cases surface with a reason',
    tone: 'exception' as FlowTone,
  },
}

const triageNotes = [
  'Every live case enters the same filter.',
  'Routine work does not become partner workload by default.',
]

const validationMainSteps: FlowStep[] = [
  {
    chip: 'INPUT',
    label: 'Client upload',
    detail: 'Requested evidence lands in one controlled intake path',
  },
  {
    chip: 'GATE',
    label: 'Validation gate',
    detail: 'Completeness, quality, and route fit are checked together',
  },
  {
    chip: 'READY',
    label: 'Submission-ready gate',
    detail: 'Validated evidence bundle is explicitly approved',
    tone: 'verified',
  },
  {
    chip: 'SYNC',
    label: 'Case sync and status cadence',
    detail: 'Case record is updated and the client receives the next status',
    tone: 'verified',
  },
]

const validationLoopBranch: FlowBranch = {
  title: 'If the upload fails',
  detail:
    'The system issues the correction request, waits for the new file, and re-runs the same gate without creating extra inbox work.',
  tone: 'exception',
  steps: [
    {
      chip: 'LOOP',
      label: 'Needs-fix loop',
      detail: 'Defect-specific request is generated',
      tone: 'exception',
    },
    {
      chip: 'RE-UPLOAD',
      label: 'Client re-upload',
      detail: 'Corrected file comes back into the same path',
    },
  ],
}

const comparisonManualSteps: FlowStep[] = [
  {
    chip: 'INPUT',
    label: 'Evidence threads',
    detail: 'Email, WhatsApp, and forwarded attachments',
  },
  {
    chip: 'GAP',
    label: 'No validation gate',
    detail: 'Rules live in memory instead of the system',
    tone: 'manual',
  },
  {
    chip: 'MANUAL',
    label: 'Partner inbox',
    detail: 'Chase ownership sits in email',
    tone: 'manual',
  },
  {
    chip: 'MANUAL',
    label: 'Shared spreadsheet',
    detail: 'No authoritative case state',
    tone: 'manual',
  },
  {
    chip: 'OUTPUT',
    label: 'Manual client replies',
    detail: 'Updates are sent on demand',
    tone: 'manual',
  },
]

const comparisonAlignedSteps: FlowStep[] = [
  {
    chip: 'INPUT',
    label: 'Client upload',
    detail: 'Secure evidence request and intake path',
  },
  {
    chip: 'GATE',
    label: 'Validation gate',
    detail: 'Rules are enforced before the case reaches the team',
  },
  {
    chip: 'QUEUE',
    label: 'Partner Red Queue',
    detail: 'Only exception cases become partner-visible',
    tone: 'exception',
  },
  {
    chip: 'SYNC',
    label: 'Case system sync',
    detail: 'Case record stays current automatically',
    tone: 'verified',
  },
  {
    chip: 'STATUS',
    label: 'Client status cadence',
    detail: 'Routine updates go out without fee-earner effort',
    tone: 'verified',
  },
]

const comparisonManualNotes = [
  'Files arrive in fragments instead of a controlled path.',
  'Partners and senior staff end up carrying the admin load.',
]

const comparisonAlignedNotes = [
  'The gate catches defects before human review starts.',
  'The queue narrows partner work to genuine exceptions.',
]

const queueFilterSteps: FlowStep[] = [
  {
    chip: 'PORTFOLIO',
    label: '23 active cases',
    detail: 'Current live portfolio entering triage',
  },
  {
    chip: 'FILTER',
    label: 'AI filter',
    detail: 'Risk, rule, and completeness checks',
  },
]

const timelineStages: TimelineStage[] = [
  {
    day: 'Day 0',
    title: 'Case initialized',
    detail:
      `${brandName} maps the route, sets the evidence list, and opens the chase path before the case leaves intake.`,
    chip: 'INIT',
    steps: [
      { chip: 'FIRM', label: 'Case opened' },
      { chip: 'MODEL', label: 'Route mapped', tone: 'verified' },
      { chip: 'REQUEST', label: 'Upload request prepared', tone: 'verified' },
    ],
  },
  {
    day: 'Day 4',
    title: 'Evidence request sent',
    detail:
      'The route-aware chaser sends one structured upload request with guidance on what qualifies and what will fail.',
    chip: 'CHASE',
    steps: [
      { chip: 'CHASE', label: 'Request sent', tone: 'verified' },
      { chip: 'CLIENT', label: 'Client portal ready' },
      { chip: 'QUIET', label: 'No partner inbox traffic' },
    ],
  },
  {
    day: 'Day 10',
    title: 'Validation catches a defect',
    detail:
      'The passport fails the gate overnight. The case moves into the needs-fix loop before the team starts work the next morning.',
    chip: 'GATE',
    steps: [
      { chip: 'FAIL', label: 'Upload fails validation', tone: 'exception' },
      { chip: 'FIX', label: 'Correction request issued' },
      { chip: 'RE-UPLOAD', label: 'Client asked for corrected file' },
    ],
  },
  {
    day: 'Day 16',
    title: 'Submission-ready gate passed',
    detail:
      'The corrected evidence passes validation. The case is now explicitly submission-ready and only exception work remains visible to partners.',
    chip: 'READY',
    steps: [
      { chip: 'READY', label: 'Validation passed', tone: 'verified' },
      { chip: 'SYNC', label: 'Submission-ready state stored', tone: 'verified' },
      { chip: 'QUEUE', label: 'Partners still see exceptions only', tone: 'verified' },
    ],
  },
  {
    day: 'Day 22',
    title: 'Waiting-state update sent',
    detail:
      'The case remains in a waiting state, but the client still receives the right update without generating a partner email thread.',
    chip: 'STATUS',
    steps: [
      { chip: 'STATE', label: 'Waiting state stored', tone: 'verified' },
      { chip: 'CADENCE', label: 'Status cadence triggered', tone: 'verified' },
      { chip: 'CLIENT', label: 'Client updated automatically', tone: 'verified' },
    ],
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
  const [activeExceptionId, setActiveExceptionId] = useState<string | null>(null)

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
    setActiveExceptionId(null)
    filterTimerRef.current = setTimeout(() => {
      setFilterState('done')
      setActiveExceptionId(redQueueExceptions[0]?.id ?? null)
    }, 1350)
  }

  const resetFilter = () => {
    if (filterTimerRef.current) clearTimeout(filterTimerRef.current)
    setFilterState('idle')
    setActiveExceptionId(null)
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
  const activeException =
    redQueueExceptions.find((item) => item.id === activeExceptionId) ?? redQueueExceptions[0]

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
            <span className="brand-mark-stem" />
          </span>
          <span>{brandName}</span>
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
            How it works
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
            <div className="hero-stack">
              <motion.div
                className="hero-copy hero-copy-centered"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease: smoothEase }}
              >
                <div className="hero-kicker">
                  <span className="section-number">00</span>
                  <p className="eyebrow">For partner-led UK immigration firms</p>
                </div>
                <AnimatedHero
                  headlineStart="Stop losing fee-earner time to"
                  rotatingPhrases={heroPainPoints}
                  body={`${brandName} gives small UK immigration firms one place to chase missing evidence, block unusable uploads, and send routine client updates before they hit the partner inbox.`}
                  primaryCtaLabel="Book a demo"
                  primaryHref="#cta"
                  secondaryCtaLabel="See how it works"
                  secondaryHref="#system"
                />
              </motion.div>

              <motion.div
                className="hero-panel hero-panel-stage"
                style={reduceMotion ? undefined : { y: heroBoardY }}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              >
                <div className="hero-panel-head">
                  <div>
                    <span className="spec-label">How it works</span>
                    <h2>One workflow handles the routine work on every case.</h2>
                  </div>
                  <p>
                    Clients upload documents in one place. Bad uploads are sent
                    back automatically. Only problem cases reach the partner.
                  </p>
                </div>
                <HeroOperatingModel
                  mainSteps={heroMainSteps}
                  correctionBranch={heroCorrectionBranch}
                  exceptionBranch={heroExceptionBranch}
                  notes={heroNotes}
                />
                <div className="hero-panel-footer">
                  <div>
                    <span className="spec-label">What your team gets</span>
                    <p>A clear record of what has been requested, fixed, and approved.</p>
                  </div>
                  <div>
                    <span className="spec-label">What partners avoid</span>
                    <p>Routine chasing, file checking, and update emails.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <RevealSection className="section problem" id="problem" tone="light">
          <SectionIntro
            index="01"
            eyebrow="Why firms buy this"
            title="Most small immigration firms are still running delivery through inboxes, WhatsApp, and memory."
            body="That is why document chasing, upload checking, and client updates still keep landing on partners and senior staff."
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
                <span className="spec-label">What happens now</span>
                <p>Routine work sits with the team because no system owns the follow-up.</p>
              </div>
              <div>
                <span className="spec-label">What it costs</span>
                <p>Defects get caught late, clients keep asking for updates, and staff lose hours every week.</p>
              </div>
              <div>
                <span className="spec-label">What fixes it</span>
                <p>A system that chases, checks, and updates automatically before the case needs partner input.</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section system" id="system" tone="dark">
          <SectionIntro
            index="02"
            eyebrow="How the system works"
            title="Every case follows the same path: chase, check, fix if needed, then update the client."
            body="Routine matters keep moving without staff intervention. Cases with missing evidence or real risk are surfaced for review."
          />
          <div className="system-layout">
            <div className="system-copy">
              <div className="system-spec-list">
                <div>
                  <span className="spec-label">Case triage</span>
                  <p>Every live case goes through the same filter, so routine work does not end up in the partner inbox by default.</p>
                </div>
                <div>
                  <span className="spec-label">Upload checks</span>
                  <p>Every file is checked the same way, and failed uploads go back with a clear reason for the client.</p>
                </div>
                <div>
                  <span className="spec-label">Client updates</span>
                  <p>Once the case status changes, the case record and client update stay in sync.</p>
                </div>
              </div>
            </div>
            <div className="system-shell">
              <div className="board-module">
                <div className="board-module-head">
                  <div>
                    <span className="spec-label">Part 1</span>
                    <h3>Case triage</h3>
                  </div>
                  <p>All live cases are sorted into routine work or cases that need review.</p>
                </div>
                <SystemTriageStrip
                  sourceSteps={triageSourceSteps}
                  routineStep={triageOutputs.routine}
                  exceptionStep={triageOutputs.exception}
                  notes={triageNotes}
                />
              </div>
              <div className="board-module">
                <div className="board-module-head">
                  <div>
                    <span className="spec-label">Part 2</span>
                    <h3>Upload checking</h3>
                  </div>
                  <p>The same checks handle first upload, re-upload, and ready-to-submit status.</p>
                </div>
                <SystemValidationStrip
                  mainSteps={validationMainSteps}
                  correctionBranch={validationLoopBranch}
                  notes={['The same gate controls first upload, re-upload, and ready state.']}
                />
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section comparison" id="comparison" tone="light">
          <SectionIntro
            index="03"
            eyebrow="Before and after"
            title="Without a proper delivery layer, routine case work keeps landing on the team."
            body={`Compare the manual setup with ${brandName}. The difference is who ends up doing the routine work.`}
          />
          <div className="comparison-layout">
            <div className="comparison-copy">
              <div className="comparison-notes">
                {[
                  'The manual version depends on inboxes, memory, and spreadsheets.',
                  'The aligned version puts the gate, the sync point, and the client update cadence in one owned system.',
                  'The difference is not software complexity. It is who gets pulled into routine work.',
                ].map((item) => (
                  <div key={item} className="comparison-note-row">
                    <span className="spec-label">Spec</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="comparison-shell">
              <ComparisonStrips
                manualSteps={comparisonManualSteps}
                alignedSteps={comparisonAlignedSteps}
                manualNotes={comparisonManualNotes}
                alignedNotes={comparisonAlignedNotes}
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section outcomes" id="outcomes" tone="dark">
          <SectionIntro
            index="04"
            eyebrow="What firms get back"
            title="Less partner admin. Earlier defect catches. Fewer client update emails."
            body="The value is straightforward: less routine work for the team and a clearer path to submission-ready cases."
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
            eyebrow="One case in practice"
            title="This is what one immigration case looks like when the routine work is handled properly."
            body="From opening the case to sending updates, the system handles the repetitive steps and only surfaces issues when something is wrong."
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
            title="Partners should only see the cases that actually need judgment."
            body="The filter keeps routine cases moving and brings forward the few files that are missing evidence, failing checks, or need a decision."
          />
          <div className="queue-layout">
            <QueueSplitPanel
              filterState={filterState}
              cases={redQueuePortfolio}
              activeExceptionId={activeExceptionId}
              onSelectException={setActiveExceptionId}
            />

            <div className="queue-side">
              <div className="queue-controls">
                <button
                  className="btn primary"
                  onClick={handleFilterRun}
                  disabled={filterState === 'scanning'}
                >
                  {filterState === 'done' ? 'Run it again' : 'Run the filter'}
                </button>
                <button className="btn ghost" onClick={resetFilter}>
                  Reset
                </button>
              </div>
              <SectionSpecNote className="queue-side-note">
                Most matters never become partner-visible. The team sees the exceptions, not the whole portfolio.
              </SectionSpecNote>
              <div className="queue-review-panel">
                <div className="queue-review-head">
                  <div>
                    <span className="spec-label">Surfaced exceptions</span>
                    <strong>
                      {filterState === 'done'
                        ? 'Review why each case reached the queue'
                        : filterState === 'scanning'
                          ? 'The filter is evaluating the live portfolio'
                          : 'Run the filter to see which cases actually need review'}
                    </strong>
                  </div>
                  <p>
                    {filterState === 'done'
                      ? 'Click any surfaced case to inspect the reason and required action.'
                      : 'This section stays quiet until the filter separates routine matters from exceptions.'}
                  </p>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    className="exception-list"
                    initial={false}
                    animate={{ opacity: filterState === 'idle' ? 0.42 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {redQueueExceptions.map((item, index) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        className={`exception-card ${activeExceptionId === item.id ? 'active' : ''}`}
                        onClick={() => setActiveExceptionId(item.id)}
                        disabled={filterState !== 'done'}
                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                        animate={
                          filterState === 'done'
                            ? { opacity: 1, x: 0 }
                            : filterState === 'scanning'
                              ? { opacity: 0.5, x: 8 }
                              : { opacity: 0.22, x: 0 }
                        }
                        transition={{
                          duration: 0.34,
                          delay: filterState === 'done' ? 0.08 + index * 0.05 : 0,
                          ease: smoothEase,
                        }}
                      >
                        <div className="exception-card-head">
                          <span className="spec-label">Needs review</span>
                          <strong>{item.title}</strong>
                        </div>
                        <p>{item.reason}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
                <motion.article
                  className={`exception-detail-card ${filterState === 'done' ? 'ready' : ''}`}
                  initial={false}
                  animate={{
                    opacity: filterState === 'done' ? 1 : 0.5,
                    y: filterState === 'done' ? 0 : 6,
                  }}
                  transition={{ duration: 0.28, ease: smoothEase }}
                >
                  <div className="exception-detail-head">
                    <FlowChip tone="exception">Selected case</FlowChip>
                    <strong>{filterState === 'done' ? activeException.title : 'Waiting for surfaced cases'}</strong>
                  </div>
                  <p>
                    {filterState === 'done'
                      ? activeException.reason
                      : 'Once the filter runs, this panel shows the exact defect or risk that pushed a case into the Partner Red Queue.'}
                  </p>
                  <div className="exception-detail-action">
                    <span className="spec-label">Required action</span>
                    <p>
                      {filterState === 'done'
                        ? activeException.action
                        : 'No partner action is required until an exception is surfaced.'}
                    </p>
                  </div>
                </motion.article>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section roi" id="roi" tone="light">
          <SectionIntro
            index="07"
            eyebrow="ROI calculator"
            title="Check whether the time you are losing each week already justifies the spend."
            body="Use your own salary and time assumptions to compare manual admin work against the monthly fee."
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
                    <span>{brandName} monthly cost</span>
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
            eyebrow="Pricing"
            title="Simple pricing for small firms."
            body="GBP 395 per month covers up to 50 active cases, with a minimum 3-month contract. If you run above that, the extra cost is shown clearly."
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
                Pay monthly with a 3-month minimum, plus {formatCurrency(6)} for each active case above 50.
              </p>
              <div className="pricing-specs">
                <div>Validation gate</div>
                <div>Needs-fix loop</div>
                <div>Partner Red Queue</div>
                <div>Status cadence</div>
              </div>
              <a className="btn primary" href="#cta">
                Book monthly demo
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
              <p>Annual plan with two months saved at base level. Minimum 3-month commitment still applies at onboarding. Same overage structure.</p>
              <div className="pricing-specs">
                <div>Implementation included</div>
                <div>Rule setup included</div>
                <div>Same routing layer</div>
                <div>Same support model</div>
              </div>
              <a className="btn secondary" href="#cta">
                Book annual demo
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
            <p>No per-user fees, no per-upload fees, and a minimum 3-month contract.</p>
          </div>
        </RevealSection>

        <RevealSection className="section testimonial" id="testimonial" tone="light">
          <SectionIntro
            index="09"
            eyebrow="What a partner sees"
            title="The biggest change is that routine case admin stops landing on the partner."
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
              it as software and started treating it as <mark>extra delivery capacity</mark>.&quot;
            </p>
          </motion.blockquote>
        </RevealSection>

        <RevealSection className="section faq" id="faq" tone="dark">
          <SectionIntro
            index="10"
            eyebrow="FAQ"
            title="Straight answers for firms deciding whether this would actually reduce workload."
          />
          <FaqAccordion items={faqItems} />
        </RevealSection>

        <RevealSection className="section cta" id="cta" tone="light">
          <div className="cta-panel">
            <div>
              <span className="section-number">11</span>
              <p className="eyebrow">See if it fits your firm</p>
              <h2>See how this would work with your current caseload and team size.</h2>
              <p className="body">
                We will show you where document chasing, upload checking, and
                client updates can come off your team without changing the case
                management system you already use.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn primary" href="mailto:hello@casepilotai.com">
                Book a demo
              </a>
              <a className="btn ghost" href="#system">
                Review the workflow
              </a>
            </div>
          </div>
        </RevealSection>
      </main>
      <footer className="mini-footer">
        <p>
          Built for partner-led UK immigration firms with small teams.
          {brandName} chases evidence, checks uploads, and sends routine client
          updates alongside your existing case system.
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
      className={`flow-arrow ${vertical ? 'vertical' : 'horizontal'} tone-${getFlowTone(
        tone,
      )} ${className ?? ''}`.trim()}
    />
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

function HeroOperatingModel({
  mainSteps,
  correctionBranch,
  exceptionBranch,
  notes,
}: {
  mainSteps: FlowStep[]
  correctionBranch: FlowBranch
  exceptionBranch: FlowBranch
  notes: string[]
}) {
  return (
    <div className="spec-shell hero-operating-model">
      <div className="hero-main-strip">
        <FlowSequence steps={mainSteps} className="hero-main-sequence" />
      </div>
      <div className="hero-branch-grid">
        <section className="branch-panel tone-exception">
          <div className="branch-panel-head">
            <div>
              <FlowChip tone={correctionBranch.tone}>{correctionBranch.title}</FlowChip>
              <p>{correctionBranch.detail}</p>
            </div>
          </div>
          <FlowSequence steps={correctionBranch.steps} className="branch-sequence" />
        </section>
        <section className="branch-panel tone-exception branch-panel-compact">
          <div className="branch-panel-head">
            <div>
              <FlowChip tone={exceptionBranch.tone}>{exceptionBranch.title}</FlowChip>
              <p>{exceptionBranch.detail}</p>
            </div>
          </div>
          <div className="branch-focus-card">
            <FlowCard step={exceptionBranch.steps[0]} className="branch-single-card" />
          </div>
        </section>
      </div>
      <div className="spec-note-grid">
        {notes.map((note) => (
          <SectionSpecNote key={note}>{note}</SectionSpecNote>
        ))}
      </div>
    </div>
  )
}

function SystemTriageStrip({
  sourceSteps,
  routineStep,
  exceptionStep,
  notes,
}: {
  sourceSteps: FlowStep[]
  routineStep: FlowStep
  exceptionStep: FlowStep
  notes: string[]
}) {
  return (
    <div className="spec-shell system-strip">
      <FlowSequence steps={sourceSteps} className="system-strip-sequence" />
      <div className="system-split-grid">
        <section className="system-output-panel tone-verified">
          <FlowChip tone="verified">Routine output</FlowChip>
          <FlowArrow tone="verified" vertical />
          <FlowCard step={routineStep} className="system-output-card" />
        </section>
        <section className="system-output-panel tone-exception">
          <FlowChip tone="exception">Exception output</FlowChip>
          <FlowArrow tone="exception" vertical />
          <FlowCard step={exceptionStep} className="system-output-card" />
        </section>
      </div>
      <div className="spec-note-grid">
        {notes.map((note) => (
          <SectionSpecNote key={note}>{note}</SectionSpecNote>
        ))}
      </div>
    </div>
  )
}

function SystemValidationStrip({
  mainSteps,
  correctionBranch,
  notes,
}: {
  mainSteps: FlowStep[]
  correctionBranch: FlowBranch
  notes: string[]
}) {
  return (
    <div className="spec-shell system-strip">
      <FlowSequence steps={mainSteps} className="system-strip-sequence" />
      <section className="branch-panel tone-exception validation-branch-panel">
        <div className="branch-panel-head">
          <div>
            <FlowChip tone={correctionBranch.tone}>{correctionBranch.title}</FlowChip>
            <p>{correctionBranch.detail}</p>
          </div>
        </div>
        <FlowSequence steps={correctionBranch.steps} className="branch-sequence" />
      </section>
      <div className="spec-note-grid">
        {notes.map((note) => (
          <SectionSpecNote key={note}>{note}</SectionSpecNote>
        ))}
      </div>
    </div>
  )
}

function ComparisonStrips({
  manualSteps,
  alignedSteps,
  manualNotes,
  alignedNotes,
}: {
  manualSteps: FlowStep[]
  alignedSteps: FlowStep[]
  manualNotes: string[]
  alignedNotes: string[]
}) {
  return (
    <div className="comparison-strip-stack">
      <motion.article
        className="comparison-strip comparison-strip-manual"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.48, ease: smoothEase }}
      >
        <div className="comparison-strip-head">
          <div>
            <FlowChip tone="manual">Manual state</FlowChip>
            <h3>Routine admin lands on the firm.</h3>
          </div>
          <p>There is no owned gate, no routed intake, and no maintained update cadence.</p>
        </div>
        <FlowSequence steps={manualSteps} className="comparison-sequence" />
        <div className="spec-note-grid comparison-note-grid">
          {manualNotes.map((note) => (
            <SectionSpecNote key={note} tone="manual">
              {note}
            </SectionSpecNote>
          ))}
        </div>
      </motion.article>
      <motion.article
        className="comparison-strip comparison-strip-aligned"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.52, delay: 0.08, ease: smoothEase }}
      >
        <div className="comparison-strip-head">
          <div>
            <FlowChip tone="verified">{brandName} state</FlowChip>
            <h3>Routine admin stays in the operating layer.</h3>
          </div>
          <p>The gate, the sync point, and the client update cadence are controlled in one system.</p>
        </div>
        <FlowSequence steps={alignedSteps} className="comparison-sequence" />
        <div className="spec-note-grid comparison-note-grid">
          {alignedNotes.map((note) => (
            <SectionSpecNote key={note}>{note}</SectionSpecNote>
          ))}
        </div>
      </motion.article>
    </div>
  )
}

function QueueSplitPanel({
  filterState,
  cases,
  activeExceptionId,
  onSelectException,
}: {
  filterState: 'idle' | 'scanning' | 'done'
  cases: Array<{
    id: string
    title: string
    route: string
    status: 'routine' | 'exception'
    summary: string
  }>
  activeExceptionId: string | null
  onSelectException: (id: string) => void
}) {
  const routineCases = cases.filter((item) => item.status === 'routine')
  const exceptionCases = cases.filter((item) => item.status === 'exception')
  const routineWidth =
    filterState === 'done' ? '78%' : filterState === 'scanning' ? '66%' : '52%'
  const exceptionWidth =
    filterState === 'done' ? '22%' : filterState === 'scanning' ? '34%' : '48%'
  const statusLabel =
    filterState === 'done'
      ? '5 exceptions surfaced'
      : filterState === 'scanning'
        ? 'Filtering live portfolio'
        : '23 cases waiting for triage'

  return (
    <div className={`queue-split-panel state-${filterState}`}>
      <div className="queue-mobile-summary">
        <div className="queue-mobile-head">
          <span className="spec-label">Mobile queue view</span>
          <strong>{statusLabel}</strong>
          <p>
            Routine cases disappear from partner view. Surfaced exceptions stay selectable below.
          </p>
        </div>
        <div className="queue-mobile-stats">
          <article className="queue-mobile-stat tone-verified">
            <FlowChip tone="verified">Routine</FlowChip>
            <strong>{routineCases.length}</strong>
            <p>Cases remain auto-handled</p>
          </article>
          <article className="queue-mobile-stat tone-exception">
            <FlowChip tone="exception">Exceptions</FlowChip>
            <strong>{exceptionCases.length}</strong>
            <p>Cases stay visible for partner review</p>
          </article>
        </div>
        <div className="queue-mobile-case-list">
          {exceptionCases.map((item) => {
            const isActive = activeExceptionId === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`queue-mobile-case ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (filterState === 'done') onSelectException(item.id)
                }}
                disabled={filterState !== 'done'}
              >
                <span>{item.title}</span>
                <small>{filterState === 'done' ? 'Surfaced exception' : item.route}</small>
              </button>
            )
          })}
        </div>
      </div>

      <div className="queue-count-row">
        <div className="queue-count-copy">
          <span className="spec-label">Live queue filter</span>
          <strong>{statusLabel}</strong>
          <p>
            Every case enters the same filter. Routine matters stay in motion.
            Only exceptions remain visible for partner review.
          </p>
        </div>
        <div className="queue-count-meter" aria-hidden="true">
          {cases.map((item) => (
            <span
              key={item.id}
              className={`queue-count-segment ${item.status}`}
            />
          ))}
          <span className="queue-scan-line" />
        </div>
      </div>

      <div className="queue-case-stage">
        <div className="queue-case-stage-head">
          <span className="spec-label">Live portfolio</span>
          <p>Click a surfaced exception after the filter runs.</p>
        </div>
        <div className="queue-case-grid">
          {cases.map((item, index) => {
            const isSelectable = filterState === 'done' && item.status === 'exception'
            const isActive = activeExceptionId === item.id
            return (
              <motion.button
                key={item.id}
                type="button"
                className={`queue-case-chip tone-${item.status === 'exception' ? 'exception' : 'neutral'} ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (isSelectable) onSelectException(item.id)
                }}
                disabled={!isSelectable}
                initial={false}
                animate={{
                  opacity:
                    filterState === 'idle'
                      ? 1
                      : filterState === 'scanning'
                        ? item.status === 'exception'
                          ? 0.85
                          : 0.55
                        : item.status === 'exception'
                          ? 1
                          : 0.28,
                  scale:
                    filterState === 'done' && item.status === 'exception'
                      ? isActive
                        ? 1.02
                        : 1
                      : 1,
                  y:
                    filterState === 'done' && item.status === 'exception'
                      ? 0
                      : filterState === 'done'
                        ? -2
                        : 0,
                }}
                transition={{
                  duration: 0.26,
                  delay: filterState === 'scanning' ? index * 0.015 : 0,
                  ease: smoothEase,
                }}
              >
                <span>{item.title}</span>
                <small>{filterState === 'done' ? item.summary : item.route}</small>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="spec-shell queue-filter-strip">
        <FlowSequence steps={queueFilterSteps} className="system-strip-sequence" />
        <div className="queue-output-grid">
          <motion.article
            className="queue-output-card tone-verified"
            animate={{ flexBasis: routineWidth, opacity: filterState === 'idle' ? 0.72 : 1 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            <FlowChip tone="verified">Routine output</FlowChip>
            <strong>{routineCases.length} cases stay in flow</strong>
            <p>Document chasing, re-uploads, and client updates continue automatically.</p>
          </motion.article>
          <motion.article
            className="queue-output-card tone-exception"
            animate={{ flexBasis: exceptionWidth, opacity: filterState === 'done' ? 1 : 0.82 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            <FlowChip tone="exception">Partner output</FlowChip>
            <strong>{exceptionCases.length} cases enter the red queue</strong>
            <p>Only files with missing evidence, failed checks, or conflicts stay visible for review.</p>
          </motion.article>
        </div>
        <div className="spec-note-grid">
          <SectionSpecNote>The red queue is an output of the filter, not a second manual backlog.</SectionSpecNote>
          <SectionSpecNote>Routine cases keep moving without creating another partner inbox.</SectionSpecNote>
        </div>
      </div>
    </div>
  )
}

function TimelineSteps({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="timeline-step-strip">
      {steps.map((step, stepIndex) => (
        <div key={`${step.label}-${stepIndex}`} className="timeline-step-part">
          <div className={`timeline-step tone-${getFlowTone(step.tone)}`}>
            {step.chip ? <span className="timeline-step-chip">{step.chip}</span> : null}
            <strong>{step.label}</strong>
          </div>
          {stepIndex < steps.length - 1 ? (
            <FlowArrow tone={step.tone} className="timeline-flow-arrow" />
          ) : null}
        </div>
      ))}
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
        <TimelineSteps steps={stage.steps} />
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
