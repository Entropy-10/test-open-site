'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Music, Star, Timer } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { buildUrl } from 'osu-web.js'

import { cn } from '@utils/client'

import type { Tables } from '~/types/supabase'
import FallbackImage from './fallback-image'

interface MappoolMapProps {
	map: Tables<'maps'>
}

enum ModColor {
	LM = '#F9A0BE',
	NM = '#5E72EB',
	HD = '#FCC164',
	HR = '#F27F85',
	DT = '#8874ED',
	TB = '#5D5048'
}

enum LazerMods {
	TR = 'Transform',
	WG = 'Wiggle',
	GR = 'Grow',
	TC = 'Traceable',
	BR = 'Barrel Roll',
	RP = 'Repel',
	BU = 'Bubbles',
	DP = 'Depth',
	AD = 'Approach Different',
	DF = 'Deflate',
	SY = 'Synesthesia',
	SI = 'Spin In',
	NS = 'No Scope',
	MG = 'Magnetized',
	FR = 'Freeze Frame',
	AS = 'Adaptive Speed',
	WU = 'Wind Up',
	WD = 'Wind Down'
}

export default function MappoolMap({ map }: MappoolMapProps) {
	const [showModInfo, setShowModInfo] = useState(false)

	return (
		<div
			style={{ color: ModColor[map.mod] }}
			className='group relative h-[187px] w-[400px] shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]'
		>
			<div className='absolute top-2 right-2 z-20 bg-milky-white px-1 font-extrabold text-sm shadow-sm'>
				{map.beatmap_id}
			</div>

			<FallbackImage
				height={112}
				width={400}
				src={buildUrl.beatmapsetCover(map.beatmapset_id)}
				fallbackSrc='https://osu.ppy.sh/assets/images/default-bg@2x.4043b8f4.png'
				alt='map bg'
				className='h-[112px] w-[400px] select-none'
			/>
			<div className='absolute bottom-[74px] h-[112px] w-full bg-linear-to-t from-15% from-milky-white to-65% to-transparent opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100'>
				<div className='relative h-full'>
					<div className='absolute bottom-0 flex w-full justify-between px-3 font-extrabold text-sm'>
						<div>MAPPER: {map.mapper}</div>
						<div>
							CS: {map.cs} | AR: {map.ar} | OD: {map.od}
						</div>
					</div>
				</div>
			</div>

			<div className='flex h-[75px] items-center justify-between bg-milky-white p-3'>
				<div className='flex items-center gap-3 truncate'>
					<button
						type='button'
						onClick={() => setShowModInfo(!showModInfo)}
						className='text-milky-white focus:outline-hidden'
						disabled={map.mod !== 'LM'}
					>
						<div
							style={{ background: ModColor[map.mod] }}
							className={cn(
								'flex size-12 items-center justify-center font-extrabold text-sm',
								(map.dt_rate || map.sub_mod) && 'h-8 w-12'
							)}
						>
							{map.slot}
						</div>
						{(map.dt_rate || map.sub_mod) && (
							<div
								style={{ background: `${ModColor[map.mod]}CC` }}
								className='text-center font-semibold text-xs'
							>
								{map.dt_rate
									? `${map.dt_rate}x`
									: map.sub_mod
										? map.sub_mod
										: ''}
							</div>
						)}
					</button>

					<AnimatePresence initial={false}>
						{!showModInfo && (
							<motion.div
								key={map.name}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ opacity: 0 }}
								className='max-w-[230px] text-sm/5'
							>
								<Link
									href={buildUrl.beatmap(map.beatmap_id)}
									target='_blank'
									className='font-extrabold text-lg/6 hover:underline focus:outline-hidden'
								>
									<p className='truncate'>{map.name}</p>
								</Link>
								<p className='truncate'>{map.difficulty}</p>
							</motion.div>
						)}
						{showModInfo && (
							<motion.div
								key={`${map.name}-exit`}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								<div className='font-extrabold uppercase'>
									{map.sub_mod && LazerMods[map.sub_mod]}
								</div>
								{map.mod_settings?.map(setting => {
									const { name, value } = setting as {
										name: string
										value: string
									}
									return (
										<div key={name} className='text-sm/5'>
											<span className='font-semibold'>
												{name.toUpperCase()}:{' '}
											</span>
											{value}
										</div>
									)
								})}
								{!map.mod_settings && (
									<div className='text-sm/5'>default settings</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className='text-right font-extrabold text-sm'>
					<div className='flex items-center justify-end gap-1'>
						{map.bpm} <Music size={16} strokeWidth={3} />
					</div>
					<div className='flex items-center justify-end gap-1'>
						{map.sr} <Star size={16} strokeWidth={3} />
					</div>
					<div className='flex items-center justify-end gap-1'>
						{map.length} <Timer size={16} strokeWidth={3} />
					</div>
				</div>
			</div>
		</div>
	)
}
