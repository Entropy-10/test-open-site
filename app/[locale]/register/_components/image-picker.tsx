'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { forwardRef } from 'react'

import type { UseFormRegisterReturn } from 'react-hook-form'

interface ImagePickerProps extends UseFormRegisterReturn {
	previewImage: string | null
	clearPreviewImage: () => void
	uploadText: string
	recommendedText: string
}

const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
	(
		{ previewImage, clearPreviewImage, uploadText, recommendedText, ...props },
		forwardedRef
	) => {
		return (
			<div className='h-[96px] w-[216px] border border-dark-blue border-dashed p-1'>
				<div className='relative flex size-full items-center justify-center bg-[#E6E5E1] text-center text-dark-blue text-xs'>
					<label htmlFor='file-upload' className='cursor-pointer'>
						<div className='flex items-center justify-center'>
							<div className='text-dark-blue text-xs hover:text-light-blue'>
								<div className='font-semibold'>{uploadText}</div>
								{recommendedText}
							</div>
						</div>

						<input
							{...props}
							ref={forwardedRef}
							id='file-upload'
							type='file'
							accept='image/png, image/jpeg, image/jpg, image/gif'
							className='hidden'
						/>
					</label>

					{previewImage && (
						<>
							<button
								className='absolute top-1 right-1 z-20 text-milky-white drop-shadow-[0px_0px_1px_#000000]'
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
