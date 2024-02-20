import { cn } from '@utils/client'

import type { SVGProps } from 'react'

interface ChallongeIconProps extends SVGProps<SVGSVGElement> {
	className?: string
}

export default function ChallongeIcon({
	className,
	...props
}: ChallongeIconProps) {
	return (
		<svg
			width='29'
			height='29'
			viewBox='0 0 77.53594 84.504372'
			xmlns='http://www.w3.org/2000/svg'
			className={cn(
				'fill-milky-white transition-all duration-200 ease-in-out',
				className
			)}
			{...props}
		>
			<title>Challonge</title>
			<g transform='translate(-15.823149,-87.866034)'>
				<g transform='matrix(0.26458333,0,0,0.26458333,15.823147,87.866034)'>
					<g transform='matrix(3.8911325,0,0,3.8911325,-843.68405,0)'>
						<g>
							<path
								d='m 291.496,17.625 c -21.852,5.605 -41.235,15.521 -56.801,32.248 3.926,4.251 8.416,5.555 13.744,6.55 11.443,-11.805 25.47,-19.303 41.265,-23.855 3.881,-1.12 1.923,-11.453 1.792,-14.943 z'
								clipRule='evenodd'
							/>
							<path
								d='m 233.925,18.311 c -16.354,9.442 -21.958,30.361 -12.517,46.714 4.875,8.443 12.81,14.021 21.594,16.141 26.505,6.385 48.655,-21.885 47.718,-46.69 -15.059,4.472 -28.147,11.792 -38.855,22.549 31.46,5.422 3.104,27.607 -17.051,13.984 -14.457,-9.772 -16.144,-28.107 -7.929,-41.825 5.047,-8.429 12.112,-11.646 20.633,-15.281 -4.652,0.476 -9.282,1.918 -13.593,4.408 z'
								clipRule='evenodd'
							/>
							<path
								d='m 291.387,0 c -29.036,8.964 -60.413,17.076 -62.222,35.94 -0.402,2.803 0.189,5.862 2.14,9.24 0.625,1.081 1.263,2.048 1.917,2.919 14.912,-16.892 33.967,-26.92 56.605,-32.691 3.915,-0.998 1.692,-11.919 1.56,-15.408 z'
								clipRule='evenodd'
							/>
						</g>
					</g>
				</g>
			</g>
		</svg>
	)
}
