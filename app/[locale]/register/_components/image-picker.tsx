'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { forwardRef } from 'react'

import type { UseFormRegisterReturn } from 'react-hook-form'

interface ImagePickerProps extends UseFormRegisterReturn {
	previewImage: string | null
	clearPreviewImage: () => void
}

const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
	({ previewImage, clearPreviewImage, ...props }, forwardedRef) => {
		return (
			<div className='h-[96px] w-[216px] border border-dashed border-dark-blue p-1'>
				<div className='relative flex size-full items-center justify-center bg-[#E6E5E1] text-center text-xs text-dark-blue'>
					<label htmlFor='file-upload' className='cursor-pointer'>
						<div className='flex items-center justify-center'>
							<p className='text-xs text-dark-blue hover:text-light-blue'>
								<span className='font-semibold'>Click here to upload</span>
								<br /> Recommended Ratio 9:4
							</p>
						</div>

						<input
							{...props}
							ref={forwardedRef}
							id='file-upload'
							type='file'
							accept='image/png, image/jpeg, image/jpg'
							className='hidden'
						/>
					</label>

					{previewImage && (
						<>
							<button
								className='absolute right-1 top-1 z-20 text-milky-white drop-shadow-[0px_0px_1px_#000000]'
								type='button'
								onClick={() => clearPreviewImage()}
							>
								<X />
							</button>

							<Image
								fill
								objectFit='cover'
								alt='flag preview'
								src={previewImage}
							/>
						</>
					)}
				</div>
			</div>
		)
	}
)

ImagePicker.displayName = 'ImagePicker'

export default ImagePicker
