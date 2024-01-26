import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@utils/client'
import { forwardRef } from 'react'

import Button from './Button'

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
			// eslint-disable-next-line tailwindcss/no-contradicting-classname
			className={cn(
				'fixed left-[50%] top-[50%] h-[195px] w-[90vw] max-w-[595px] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-bl from-lavender from-[-9%] to-light-blue to-[109%] p-[25px] drop-shadow-lg focus:outline-none data-[state=open]:animate-overlayShow',
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
		className={cn('text-base font-bold text-milky-white sm:text-lg', className)}
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
			'py-2 text-xs font-medium text-milky-white sm:pb-5 sm:text-sm',
			className
		)}
		{...props}
	>
		{children}
	</AlertDialog.Description>
))

Description.displayName = 'Description'

const Cancel = forwardRef<
	ElementRef<typeof AlertDialog.Cancel>,
	ComponentPropsWithoutRef<typeof AlertDialog.Cancel>
>(({ className, children, ...props }, ref) => (
	<AlertDialog.Cancel ref={ref} {...props}>
		<Button variant='outline' className={className}>
			{children}
		</Button>
	</AlertDialog.Cancel>
))

Cancel.displayName = 'Cancel'

const Action = AlertDialog.Action

export { Action, Cancel, Content, Description, Root, Title, Trigger }
