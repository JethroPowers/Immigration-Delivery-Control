'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type AnimatedHeroProps = {
  headlineStart: string
  rotatingPhrases: string[]
  headlineEnd?: string
  body: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  primaryHref?: string
  secondaryHref?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  className?: string
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

function HeroAction({
  href,
  label,
  onClick,
  variant,
}: {
  href?: string
  label: string
  onClick?: () => void
  variant: 'primary' | 'ghost'
}) {
  if (href) {
    return (
      <a className={`btn ${variant}`} href={href} onClick={onClick ? () => onClick() : undefined}>
        {label}
      </a>
    )
  }

  return (
    <button className={`btn ${variant}`} type="button" onClick={onClick}>
      {label}
    </button>
  )
}

export function AnimatedHero({
  headlineStart,
  rotatingPhrases,
  headlineEnd,
  body,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryHref,
  secondaryHref,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: AnimatedHeroProps) {
  const reduceMotion = useReducedMotion()
  const phrases = useMemo(
    () => (rotatingPhrases.length > 0 ? rotatingPhrases : ['routine admin']),
    [rotatingPhrases],
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const longestPhrase = useMemo(
    () =>
      phrases.reduce((longest, phrase) => {
        return phrase.length > longest.length ? phrase : longest
      }, phrases[0]),
    [phrases],
  )

  useEffect(() => {
    if (reduceMotion || phrases.length <= 1) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % phrases.length)
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [activeIndex, phrases.length, reduceMotion])

  const activePhrase = phrases[reduceMotion ? 0 : activeIndex]

  return (
    <div className={`animated-hero ${className ?? ''}`.trim()}>
      <h1 className="animated-hero-title">
        <span className="animated-hero-line">{headlineStart}</span>
        <span className="animated-hero-line animated-hero-line-rotator">
          <span className="animated-hero-rotator-shell">
            <span className="animated-hero-rotator-sizer" aria-hidden="true">
              {longestPhrase}
            </span>
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={activePhrase}
                className="animated-hero-phrase"
                initial={reduceMotion ? false : { opacity: 0, y: '0.7em' }}
                animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: '-0.5em' }}
                transition={{ duration: 0.42, ease: smoothEase }}
              >
                {activePhrase}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        {headlineEnd ? <span className="animated-hero-line">{headlineEnd}</span> : null}
      </h1>
      <p className="lead animated-hero-body">{body}</p>
      <div className="hero-actions animated-hero-actions">
        <HeroAction
          href={primaryHref}
          label={primaryCtaLabel}
          onClick={onPrimaryClick}
          variant="primary"
        />
        <HeroAction
          href={secondaryHref}
          label={secondaryCtaLabel}
          onClick={onSecondaryClick}
          variant="ghost"
        />
      </div>
    </div>
  )
}
