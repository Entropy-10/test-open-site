import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@utils/client'
import { forwardRef } from 'react'

import { buttonVariants } from './Button'

import { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'

const Root = AlertDialog.Root

const Trigger = AlertDialog.Trigger

const Content = forwardRef<
	ElementRef<typeof AlertDialog.Content>,
	ComponentPropsWithoutRef<typeof AlertDialog.Content>
>(({ className, ...props }, ref) => (
	<AlertDialog.Portal>
		<AlertDialog.Overlay className='fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow' />
		<AlertDialog.Content
			ref={ref}
			{...props}
			className={cn(
				'fixed top-[50%] left-[50%] h-[195px] w-[90vw] max-w-[595px] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-bl from-[-9%] from-lavender to-[109%] to-light-blue p-[25px] drop-shadow-lg data-[state=open]:animate-overlayShow focus:outline-none',
				className
			)}
		/>
	</AlertDialog.Portal>
))

Content.displayName = 'Content'

const Title = forwardRef<
	ElementRef<typeof AlertDialog.Title>,
	ComponentPropsWithoutRef<typeof AlertDialog.Title>
>(({ className, children, ...props }, ref) => (
	<AlertDialog.Title
		ref={ref}
		className={cn('font-bold text-base text-milky-white sm:text-lg', className)}
		{...props}
	>
		{children}
	</AlertDialog.Title>
))

Title.displayName = 'Title'

const Description = forwardRef<
	ElementRef<typeof AlertDialog.Description>,
	ComponentPropsWithoutRef<typeof AlertDialog.Description>
>(({ className, children, ...props }, ref) => (
	<AlertDialog.Description
		ref={ref}
		className={cn(
			'py-2 font-medium text-milky-white text-xs sm:pb-5 sm:text-sm',
			className
		)}
		{...props}
	>
		{children}
	</AlertDialog.Description>
))

Description.displayName = 'Description'

interface CancelProps
	extends ComponentPropsWithoutRef<typeof AlertDialog.Cancel>,
		VariantProps<typeof buttonVariants> {}

const Cancel = forwardRef<ElementRef<typeof AlertDialog.Cancel>, CancelProps>(
	({ className, children, variant, size, ...props }, ref) => (
		<AlertDialog.Cancel
			ref={ref}
			className={cn(
				'cursor-pointer',
				buttonVariants({ variant, size, className })
			)}
			{...props}
		>
			{children}
		</AlertDialog.Cancel>
	)
)

Cancel.displayName = 'Cancel'

const Action = AlertDialog.Action

export { Action, Cancel, Content, Description, Root, Title, Trigger }
