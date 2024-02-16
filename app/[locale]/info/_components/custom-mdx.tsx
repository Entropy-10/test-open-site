import { MDXProvider } from '@mdx-js/react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

const components = {
	h1: props => (
		<h1 {...props} className='text-red-500'>
			{props.children}
		</h1>
	),
	a: props => (
		<a {...props} className='underline focus:outline-none'>
			{props.children}
		</a>
	),
	ul: props => (
		<ul
			{...props}
			className='padding list-inside list-disc font-medium text-sm leading-6 sm:text-base sm:leading-8'
		>
			{props.children}
		</ul>
	),
	ol: props => (
		<ol
			{...props}
			className='padding list-inside list-disc font-medium text-sm leading-6 sm:text-base sm:leading-8'
		>
			<div className='px-7 lg:px-11 md:px-9'>{props.children}</div>
		</ol>
	)
} satisfies React.ComponentProps<typeof MDXProvider>['components']

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
		/>
	)
}
