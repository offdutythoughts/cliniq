'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SCREEN, SEQUENCES, VISIBLE_HEIGHT, type SequenceName } from '../../lib/screenSequences'

// Every product visual on the homepage is a replayed drill-down rather than a
// still: the real screens, in the real order, with the tap that led from one to
// the next shown where it actually landed. Frames and tap positions come from
// scripts/capture-screens.mjs, so re-running the capture after a format change
// updates the pictures AND the indicator together — there is nothing to line up
// by hand.
//
// The frame shows the top VISIBLE_HEIGHT of each 390×844 capture, so a tap's y
// has to be rescaled into that crop.
const Y_SCALE = SCREEN.height / VISIBLE_HEIGHT

const SETTLE_MS = 900 // cursor glides in, then presses
const ADVANCE_MS = 1250 // press → next screen
const LAST_FRAME_MS = 2600 // read the payoff screen, then start over

export function AppSequence({
  sequence,
  caption,
  priority = false,
}: {
  sequence: SequenceName
  caption?: string
  /** Set on the hero only — it is the one sequence above the fold. */
  priority?: boolean
}) {
  const { label, frames } = SEQUENCES[sequence]
  const [step, setStep] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Only animate while the figure is on screen and the visitor hasn't asked for
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
    const timers: ReturnType<typeof setTimeout>[] = []
    if (frames[step].tap !== null) {
      timers.push(setTimeout(() => setPressed(true), SETTLE_MS))
      timers.push(
        setTimeout(() => {
          setPressed(false)
          setStep((s) => (s + 1) % frames.length)
        }, ADVANCE_MS),
      )
    } else {
      timers.push(setTimeout(() => setStep(0), LAST_FRAME_MS))
    }
    return () => timers.forEach(clearTimeout)
  }, [step, playing, paused, frames])

  const tap = frames[step].tap

  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div
        ref={ref}
        role="img"
        aria-label={label}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden rounded-[18px] border border-[var(--v-line)] bg-white p-1.5 shadow-[0_26px_60px_-34px_rgba(11,33,75,0.28)]"
      >
        <div
          className="relative overflow-hidden rounded-[13px] bg-white"
          style={{ aspectRatio: `${SCREEN.width} / ${VISIBLE_HEIGHT}` }}
        >
          {frames.map((frame, i) => (
            <Image
              key={frame.file}
              src={`/screens/${frame.file}.png`}
              alt=""
              width={SCREEN.width * 2}
              height={SCREEN.height * 2}
              priority={priority && i === 0}
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
                className="absolute z-30 -mt-[13px] -ml-[13px] h-[26px] w-[26px] rounded-full border border-[var(--v-navy)]/45 bg-[var(--v-navy)]/20 transition-[left,top,transform] duration-500 ease-out"
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
                className={`absolute z-30 -mt-[13px] -ml-[13px] h-[26px] w-[26px] rounded-full border-2 border-[var(--v-navy)] ${
                  pressed ? 'v-tap-ripple' : 'opacity-0'
                }`}
                style={{ left: `${tap.x}%`, top: `${tap.y * Y_SCALE}%` }}
              />
            </>
          )}
        </div>
      </div>

      {/* Where the replay has got to. Outside the frame, not over it — these
          screens are dense enough without a dot sitting on a table row. */}
      <div aria-hidden className="mt-3 flex justify-center gap-1.5">
        {frames.map((frame, i) => (
          <span
            key={frame.file}
            className={`h-[5px] rounded-full transition-all duration-300 ${
              i === step ? 'w-[14px] bg-[var(--v-navy)]/65' : 'w-[5px] bg-[var(--v-navy)]/22'
            }`}
          />
        ))}
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-center text-[12px] text-[var(--v-slate)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
