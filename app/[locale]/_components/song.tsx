import Image from 'next/image'

interface Props {
	song?: 'album' | 'fermion'
	temp?: boolean
}

const songs = {
	fermion: '/images/fermion-cover.png',
	album: '/images/album-cover.png'
}

export default function Song({ song, temp }: Props) {
	return !temp && song ? (
		<div className='min-h-[120px] min-w-[120px] md:min-h-[180px] md:min-w-[180px]'>
			<Image
				width={180}
				height={180}
				sizes='(max-width: 640px) 120px, 180px'
				className='size-auto select-none'
				src={songs[song]}
				alt={`${song} cover`}
			/>
		</div>
	) : (
		<div className='min-h-[120px] min-w-[120px] select-none bg-light-blue/60 md:min-h-[180px] md:min-w-[180px]' />
	)
}
