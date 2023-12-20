import { useTranslations } from 'next-intl'
import { cn } from '@utils'

import Link from '~/components/ui/Link'
import ClickArrowIcon from '~/components/icons/ClickArrowIcon'
import FormatIcon from '~/components/icons/FormatIcon'
import ScheduleIcon from '~/components/icons/ScheduleIcon'

import type { Feature } from '@types'

export default function Feature({ name, link, className }: Feature) {
  const titlesT = useTranslations('HomePage.Features.Titles')
  const descriptionsT = useTranslations('HomePage.Features.Descriptions')

  return (
    <div
      className={cn(
        'relative flex w-full space-x-5 bg-[#5E72EB] py-5 pl-5 md:h-28 md:items-center md:px-5 md:py-0 xl:min-w-[250px]',
        className
      )}
    >
      {name === 'format' ? (
        <FormatIcon classList='size-12 md:size-14' />
      ) : name === 'schedule' ? (
        <ScheduleIcon classList='size-12 md:size-14' />
      ) : name === 'mappool' ? (
        <FormatIcon classList='size-12 md:size-14' />
      ) : null}

      <div className='max-w-[168px]'>
        <h2 className='text-sm font-bold tracking-wider'>{titlesT(name)}</h2>
        <p className='text-xs'>{descriptionsT(name)}</p>
      </div>

      <Link
        href={link}
        aria-label={titlesT(name).toLowerCase().replace('.', '')}
      >
        <ClickArrowIcon classList='absolute right-3 md:hidden' />
      </Link>
    </div>
  )
}
