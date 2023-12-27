'use client'

import { useEffect, useState } from 'react'
import { pad } from '@utils/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Confetti from 'react-confetti-boom'

import Countdown from './countdown'

import type { CountdownTime } from '@types'

const start = Number(process.env.NEXT_PUBLIC_START_DATE)
const hour = 1000 * 60 * 60

export default function CountdownContainer() {
  const t = useTranslations('HomePage.Features')
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const counter = setInterval(() => {
      const now = new Date().getTime()
      const diff = start - now

      if (diff <= 0) {
        clearInterval(counter)
        return setCompleted(true)
      }

      setTimeLeft({
        days: pad(Math.floor(diff / (hour * 24))),
        hours: pad(Math.floor((diff % (hour * 24)) / hour)),
        minutes: pad(Math.floor((diff % hour) / (1000 * 60))),
        seconds: pad(Math.floor((diff % (1000 * 60)) / 1000))
      })
    }, 1000)

    return () => clearInterval(counter)
  }, [timeLeft])

  return (
    <>
      <AnimatePresence mode='wait'>
        {!completed && (
          <motion.div
            className='flex h-28 w-full flex-col items-center justify-center bg-feature4 text-milky-white xl:min-w-[450px] xl:flex-row xl:space-x-5 xl:pl-5'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
          >
            <span className='text-lg font-bold'>
              {t('Countdown.titleSectionOne')}
              <br className='hidden xl:block' />{' '}
              {t('Countdown.titleSectionTwo')}
            </span>
            <Countdown timeLeft={timeLeft} />
          </motion.div>
        )}
      </AnimatePresence>

      {completed && (
        <Confetti
          x={0.5}
          y={0.5}
          particleCount={250}
          deg={270}
          shapeSize={13}
          spreadDeg={100}
          effectInterval={1}
          effectCount={1}
          colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#3498db']}
        />
      )}
    </>
  )
}
