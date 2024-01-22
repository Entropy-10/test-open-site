'use client'

import { forwardRef } from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { cn } from '@utils/client'

import type { ComponentPropsWithoutRef, ElementRef } from 'react'

const Root = Dropdown.Root

const Trigger = Dropdown.Trigger

const Content = forwardRef<
  ElementRef<typeof Dropdown.Content>,
  ComponentPropsWithoutRef<typeof Dropdown.Content>
>(({ className, ...props }, ref) => (
  <Dropdown.Portal>
    <Dropdown.Content
      ref={ref}
      align='end'
      {...props}
      className={cn(
        'z-30 flex w-32 flex-col bg-milky-white text-sm drop-shadow',
        className
      )}
    ></Dropdown.Content>
  </Dropdown.Portal>
))

Content.displayName = 'Content'

const Item = forwardRef<
  ElementRef<typeof Dropdown.Item>,
  ComponentPropsWithoutRef<typeof Dropdown.Item>
>(({ className, ...props }, ref) => (
  <Dropdown.Item
    ref={ref}
    {...props}
    className={cn(
      'px-3 py-0.5 text-sm font-semibold text-light-blue data-[highlighted]:bg-light-blue data-[highlighted]:text-milky-white data-[highlighted]:outline-none',
      className
    )}
  ></Dropdown.Item>
))

Item.displayName = 'Item'

export { Content, Item, Root, Trigger }
