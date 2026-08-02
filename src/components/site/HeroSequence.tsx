'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { HERO_FRAMES, SCREEN } from '../../lib/heroSequence'

// The hero replays one real drill-down: the Acute Vestibular flow → tap
// "Peripheral causes" → the peripheral lesion categories → tap "Idiopathic
// vestibular" → the disease page. Frames and tap positions come from
// scripts/capture-screens.mjs, so the indicator always lands on the element that
// was actually clicked.
//
// The frame matches AppScreen on the same page: 320px wide, showing the top
// 390×560 of each capture.
const CROP_HEIGHT = 560
const Y_SCALE = SCREEN.height / CROP_HEIGHT

const SETTLE_MS = 900 // cursor glides in, then presses
const ADVANCE_MS = 1250 // press → next screen
const LAST_FRAME_MS = 2400 // read the disease page, then start over

export function HeroSequence({ caption }: { caption?: string }) {
  const [step, setStep] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Only animate when the hero is on screen and the visitor hasn't asked for
  // reduced motion — otherwise the first frame stands on its own.
  useEffect(() => {
    const el = ref.current
    if (el === null) return
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!motionOk) return
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || paused) return
    const frame = HERO_FRAMES[step]
    const timers: ReturnType<typeof setTimeout>[] = []
    if (frame.tap !== null) {
      timers.push(setTimeout(() => setPressed(true), SETTLE_MS))
      timers.push(
        setTimeout(() => {
          setPressed(false)
          setStep((s) => (s + 1) % HERO_FRAMES.length)
        }, ADVANCE_MS),
      )
    } else {
      timers.push(setTimeout(() => setStep(0), LAST_FRAME_MS))
    }
    return () => timers.forEach(clearTimeout)
  }, [step, playing, paused])

  const tap = HERO_FRAMES[step].tap

  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div
        ref={ref}
        role="img"
        aria-label="Vetic on a phone: the Acute Vestibular flow, tapping through to the peripheral causes and then to the Idiopathic Vestibular Disease page."
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden rounded-[18px] border border-[var(--v-line)] bg-white p-1.5 shadow-[0_26px_60px_-34px_rgba(11,33,75,0.28)]"
      >
        <div className="relative aspect-[390/560] overflow-hidden rounded-[13px] bg-white">
          {HERO_FRAMES.map((frame, i) => (
            <Image
              key={frame.file}
              src={`/screens/${frame.file}.png`}
              alt=""
              width={780}
              height={1688}
              priority={i === 0}
              sizes="(max-width: 640px) 86vw, 320px"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{
                // A push, not a crossfade: the incoming screen is opaque and on
                // top, and the outgoing one only disappears once the slide has
                // finished, so two dense screenshots never blend into mush.
                zIndex: i === step ? 20 : 10,
                opacity: i === step ? 1 : 0,
                transform: i === step ? 'translateX(0)' : `translateX(${i > step ? 12 : -4}%)`,
                transition:
                  i === step
                    ? 'transform 320ms cubic-bezier(.22,.61,.36,1)'
                    : 'transform 320ms cubic-bezier(.22,.61,.36,1), opacity 0s linear 320ms',
              }}
            />
          ))}

          {playing && tap !== null && (
            <>
              {/* The element being tapped, briefly outlined. */}
              <span
                aria-hidden
                className="absolute z-30 rounded-[9px] border-2 border-[var(--v-navy)] transition-opacity duration-200"
                style={{
                  left: `${tap.x - tap.w / 2}%`,
                  top: `${(tap.y - tap.h / 2) * Y_SCALE}%`,
                  width: `${tap.w}%`,
                  height: `${tap.h * Y_SCALE}%`,
                  opacity: pressed ? 0.9 : 0,
                }}
              />
              {/* Fingertip, gliding between the two taps. */}
              <span
                aria-hidden
                className="absolute z-30 -ml-[13px] -mt-[13px] h-[26px] w-[26px] rounded-full border border-[var(--v-navy)]/45 bg-[var(--v-navy)]/20 transition-[left,top,transform] duration-500 ease-out"
                style={{
                  left: `${tap.x}%`,
                  top: `${tap.y * Y_SCALE}%`,
                  transform: pressed ? 'scale(0.82)' : 'scale(1)',
                }}
              />
              {/* Ripple on press. */}
              <span
                aria-hidden
                key={`ripple-${step}-${pressed}`}
                className={`absolute z-30 -ml-[13px] -mt-[13px] h-[26px] w-[26px] rounded-full border-2 border-[var(--v-navy)] ${
                  pressed ? 'v-tap-ripple' : 'opacity-0'
                }`}
                style={{ left: `${tap.x}%`, top: `${tap.y * Y_SCALE}%` }}
              />
            </>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-[12px] text-[var(--v-slate)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
