import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { links, songs } from '@siteConfig'

import Button from '~/components/ui/Button'
import Songs from './songs'

export default function Originals() {
  const t = useTranslations('HomePage.Originals')

  return (
    <section className='flex flex-col items-center pb-10 text-light-blue xl:flex-row xl:justify-between xl:pb-0'>
      <div className='flex flex-col px-4 md:mr-10 md:flex-row md:justify-between md:pl-12 lg:justify-normal lg:space-x-12 xl:pl-24'>
        <article className='md:min-w-[400px] lg:min-w-[450px]'>
          <h3 className='mb-2 text-center text-4xl font-extrabold sm:text-5xl md:text-left lg:text-6xl'>
            TEST Originals
          </h3>
          <div className='text-md text-center font-medium sm:text-lg md:text-left lg:text-xl'>
            {t('subtitle')}
          </div>

          <div className='mt-7 flex flex-col items-center border-light-blue md:ml-10 md:items-baseline md:border-l-2 md:py-1 md:pl-4'>
            <p className='mb-3 w-[330px] text-center text-sm font-medium leading-6 text-blue max-sm:text-xs md:text-left'>
              {t('description')}
            </p>

            <Button variant='invertedOutline' href={links.album}>
              {t('listenButton')}
            </Button>
          </div>
        </article>

        <article className='hidden min-w-[320px] md:block'>
          <h3 className='mt-10 font-medium sm:text-xl lg:text-2xl'>
            {t('tracksTitle')}
          </h3>

          <ol className='ml-10 mt-4 list-inside list-[decimal-leading-zero] space-y-3 border-l-2 border-light-blue py-1 pl-4 text-sm font-medium text-blue marker:font-bold'>
            {songs.map(({ name, artist, link }, i) => (
              <li key={name + i}>
                {name === 'Coming Soon' ? (
                  <span className='italic opacity-65'>{name}</span>
                ) : (
                  <Link
                    href={link}
                    target='_blank'
                    className='hover:underline focus:outline-none'
                  >
                    {name} by {artist}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </article>
      </div>

      <Songs />
    </section>
  )
}
