'use client'

import { cn } from '@utils/client'
import { cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import Link from './Link'

import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const buttonVariants = cva(
  'group relative flex select-none items-center justify-center text-xs font-black transition-all duration-200 ease-in-out focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-milky-white text-blue hover:bg-medium-blue hover:text-milky-white disabled:pointer-events-none disabled:opacity-80',
        invertedDefault:
          'bg-medium-blue text-milky-white hover:border-[2px] hover:border-medium-blue hover:bg-milky-white hover:text-medium-blue disabled:pointer-events-none disabled:opacity-80',
        outline:
          'box-border border-[2px] border-milky-white text-milky-white hover:bg-milky-white hover:text-medium-blue disabled:pointer-events-none disabled:border-slate-300 disabled:text-slate-300',
        invertedOutline:
          'box-border border-light-blue bg-light-blue text-milky-white hover:border-[2px] hover:bg-transparent hover:text-light-blue disabled:pointer-events-none disabled:opacity-80',
        primary:
          'text-milky-white disabled:pointer-events-none disabled:opacity-80'
      },
      size: {
        default: 'h-8 w-40'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
  children: ReactNode
  loading?: boolean
}

type LinkAttributes = typeof Link

interface ButtonLinkProps extends LinkAttributes, ButtonProps {
  href: string
}

// @ts-expect-error will fix later
interface ButtonClickProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export default function Button({
  children,
  variant,
  size,
  className,
  loading = false,
  ...props
}: ButtonLinkProps | ButtonClickProps) {
  return 'href' in props ? (
    <Link
      {...props}
      className={cn(
        'cursor-pointer',
        buttonVariants({ variant, size, className })
      )}
    >
      {createInner({ children, variant })}
    </Link>
  ) : (
    <button
      {...props}
      disabled={loading ? loading : props.disabled}
      className={cn(
        'cursor-pointer',
        buttonVariants({ variant, size, className })
      )}
    >
      {createInner({ children, variant, loading })}
    </button>
  )
}

function createInner({
  children,
  variant,
  loading
}: Omit<ButtonProps, 'asLink'>) {
  return variant === 'primary' ? (
    <>
      <div className='z-20 flex items-center space-x-2'>
        {children}
        <span className='pl-1'>
          {loading && (
            <Loader2 size={15} strokeWidth={4} className='animate-spin' />
          )}
        </span>
      </div>
      <div className='absolute z-10 size-full bg-gradient-to-r from-[#807EE1] to-[#D987A6] transition-all duration-200 ease-in-out group-hover:opacity-0' />
      <div className='absolute z-0 size-full bg-light-blue' />
    </>
  ) : (
    <div className='flex items-center space-x-2'>
      {children}
      <span className='pl-1'>
        {loading && (
          <Loader2 size={15} strokeWidth={4} className='animate-spin' />
        )}
      </span>
    </div>
  )
}
