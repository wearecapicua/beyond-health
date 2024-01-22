import { NAV_LINKS } from "../constants/navigation"
import React from "react"

export default function Footer() {
  return (
    <footer className="bg-main-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-wide px-4 pb-8 pt-12 xl:px-6 sm:pt-24 lg:pt-20 lg:pb-20">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="mt-10 xl:mt-0 col-span-2 max-w-[505px]">
            <p className="mt-2 text-2xl font-semibold leading-6 text-white">
              The World's Healthiest Newsletter! Delivered weekly
            </p>
            <form className="mt-6 sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-full border-0 bg-white px-6 py-3 text-base text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center bg-accent-green rounded-full px-6 py-3 text-sm font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-9 mb-12 text-xs leading-6 text-white xl:mb-0">
              By subscribing you agree to with our Privacy Policy and provide
              consent to receive updates from our company.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <ul role="list" className="space-y-4">
                  {NAV_LINKS.colTwo.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <p className="font-semibold leading-6 text-white">
                  Join the conversation, Let’s get social!
                </p>
                <ul role="list" className="mt-6 space-y-4">
                  {NAV_LINKS.social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-sm leading-6 text-gray-300 hover:text-white flex gap-3"
                      >
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-accent-green pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-32">
          <div className="flex space-x-6 md:order-2">
            {NAV_LINKS.bottomRow.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white underline decoration-solid text-sm hover:text-gray-400"
              >
                <span>{item.name}</span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-white md:order-1 md:mt-0">
            &copy; 2023 Beyond Pharmacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
