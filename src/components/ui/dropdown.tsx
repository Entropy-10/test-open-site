"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

const Dropdown = MenuPrimitive.Root

function DropdownTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-trigger"
      className={className}
      {...props}
    />
  )
}

function DropdownContent({
  className,
  children,
  side = "bottom",
  sideOffset = 0,
  align = "end",
  alignOffset = 0,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50"
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-content"
          className={cn(
            "bg-milky-white relative isolate z-50 flex w-32 flex-col text-sm drop-shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

const itemStyles =
  "text-light-blue data-highlighted:bg-light-blue data-highlighted:text-milky-white px-3 py-0.5 text-sm font-semibold select-none data-highlighted:outline-hidden"

function DropdownItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-item"
      className={cn(itemStyles, className)}
      {...props}
    />
  )
}

function DropdownLinkItem({
  className,
  closeOnClick = true,
  ...props
}: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="dropdown-link-item"
      closeOnClick={closeOnClick}
      className={cn(itemStyles, className)}
      {...props}
    />
  )
}

function DropdownSeparator({ className, ...props }: SeparatorPrimitive.Props) {
  return (
    <div className="px-2 py-0.5">
      <SeparatorPrimitive
        data-slot="dropdown-separator"
        className={cn("bg-light-blue h-px w-full", className)}
        {...props}
      />
    </div>
  )
}

export {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLinkItem,
  DropdownSeparator,
  DropdownTrigger
}
