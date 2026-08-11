"use client"

import { featuresInfo } from "../features-info"
import { Feature } from "./feature"

export function Features() {
  return (
    <section className="text-milky-white flex w-full flex-col justify-end space-y-5">
      <div className="flex flex-col-reverse space-y-5 space-y-reverse px-4 md:flex-row md:justify-between md:space-y-0 md:space-x-5 md:px-12 xl:order-first xl:justify-center">
        {featuresInfo.map(({ name, link }) => (
          <Feature key={name} name={name} link={link} />
        ))}
      </div>
    </section>
  )
}
