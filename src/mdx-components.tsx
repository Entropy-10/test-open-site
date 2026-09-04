import type { MDXComponents } from "mdx/types"

const components: MDXComponents = {
  a: (props) => (
    <a {...props} target="_blank" className="underline">
      {props.children}
    </a>
  ),
  ul: (props) => (
    <ul
      {...props}
      className="padding list-inside list-disc [:is(ul,ol)_&]:px-7 md:[:is(ul,ol)_&]:px-9 lg:[:is(ul,ol)_&]:px-11"
    >
      {props.children}
    </ul>
  ),
  li: (props) => (
    <li
      {...props}
      className="text-sm leading-6 font-medium sm:text-base sm:leading-8"
    >
      {props.children}
    </li>
  )
}

export function useMDXComponents(): MDXComponents {
  return components
}
