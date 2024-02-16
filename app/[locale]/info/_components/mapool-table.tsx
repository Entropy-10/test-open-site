import { cn } from '@utils/client'
import { useTranslations } from 'next-intl'

interface MappoolTableProps {
	className?: string
}

export default function MappoolTable({ className }: MappoolTableProps) {
	const t = useTranslations('InfoPage.MappoolInfo.Table')
	return (
		<table className={cn('table-auto', className)}>
			<tbody>
				<tr className='border-light-blue border-b-2'>
					<td className='font-bold'>{t('round')}</td>
					<td className='px-2.5 text-center font-bold'>{t('starRating')}</td>
					<td className='text-nowrap px-2 text-center font-bold'>
						{t('bestOf')}
					</td>
					<td className='px-2 text-center font-bold'>{t('bans')}</td>
					<td className='px-2 text-center font-bold'>{t('protects')}</td>
					<td className='px-1.5 font-bold text-[#ff9190]'>LM</td>
					<td className='px-1.5 font-bold text-[#6d9eeb]'>NM</td>
					<td className='px-1.5 font-bold text-[#f6b26b]'>HD</td>
					<td className='px-1.5 font-bold text-[#e06666]'>HR</td>
					<td className='px-1.5 font-bold text-[#8e7cc3]'>DT</td>
					<td className='px-1.5 font-bold text-[#93c47d]'>TB</td>
					<td className='px-1 font-bold'>{t('total')}</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('qaulifiers')}
					</td>
					<td className='text-center text-blue'>6.8</td>
					<td className='text-center text-blue'>-</td>
					<td className='text-center text-blue'>-</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						-
					</td>
					<td className='text-center text-[#ff9190]'>2</td>
					<td className='text-center text-[#6d9eeb]'>3</td>
					<td className='text-center text-[#f6b26b]'>2</td>
					<td className='text-center text-[#e06666]'>2</td>
					<td className='text-center text-[#8e7cc3]'>2</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						-
					</td>
					<td className='text-center text-blue'>11</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('roundOf32')}
					</td>
					<td className='text-center text-blue'>6.2</td>
					<td className='text-center text-blue'>9</td>
					<td className='text-center text-blue'>1</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>3</td>
					<td className='text-center text-[#6d9eeb]'>3</td>
					<td className='text-center text-[#f6b26b]'>2</td>
					<td className='text-center text-[#e06666]'>2</td>
					<td className='text-center text-[#8e7cc3]'>2</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>13</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('roundOf16')}
					</td>
					<td className='text-center text-blue'>6.4</td>
					<td className='text-center text-blue'>9</td>
					<td className='text-center text-blue'>1</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>3</td>
					<td className='text-center text-[#6d9eeb]'>3</td>
					<td className='text-center text-[#f6b26b]'>2</td>
					<td className='text-center text-[#e06666]'>2</td>
					<td className='text-center text-[#8e7cc3]'>2</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>13</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('quarterfinals')}
					</td>
					<td className='text-center text-blue'>6.7</td>
					<td className='text-center text-blue'>11</td>
					<td className='text-center text-blue'>1</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>4</td>
					<td className='text-center text-[#6d9eeb]'>4</td>
					<td className='text-center text-[#f6b26b]'>2</td>
					<td className='text-center text-[#e06666]'>2</td>
					<td className='text-center text-[#8e7cc3]'>2</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>15</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('semifinals')}
					</td>
					<td className='text-center text-blue'>6.9</td>
					<td className='text-center text-blue'>11</td>
					<td className='text-center text-blue'>2</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>5</td>
					<td className='text-center text-[#6d9eeb]'>4</td>
					<td className='text-center text-[#f6b26b]'>2</td>
					<td className='text-center text-[#e06666]'>2</td>
					<td className='text-center text-[#8e7cc3]'>3</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>17</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('finals')}
					</td>
					<td className='text-center text-blue'>7.2</td>
					<td className='text-center text-blue'>13</td>
					<td className='text-center text-blue'>2</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>5</td>
					<td className='text-center text-[#6d9eeb]'>4</td>
					<td className='text-center text-[#f6b26b]'>3</td>
					<td className='text-center text-[#e06666]'>3</td>
					<td className='text-center text-[#8e7cc3]'>3</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>19</td>
				</tr>
				<tr>
					<td className='border-light-blue border-r-2 pr-5 text-blue'>
						{t('grandFinals')}
					</td>
					<td className='text-center text-blue'>7.5</td>
					<td className='text-center text-blue'>13</td>
					<td className='text-center text-blue'>2</td>
					<td className='border-light-blue border-r-2 text-center text-blue'>
						1
					</td>
					<td className='text-center text-[#ff9190]'>5</td>
					<td className='text-center text-[#6d9eeb]'>4</td>
					<td className='text-center text-[#f6b26b]'>3</td>
					<td className='text-center text-[#e06666]'>3</td>
					<td className='text-center text-[#8e7cc3]'>3</td>
					<td className='border-light-blue border-r-2 text-center text-[#93c47d]'>
						1
					</td>
					<td className='text-center text-blue'>19</td>
				</tr>
			</tbody>
		</table>
	)
}
