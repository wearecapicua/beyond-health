import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image'
import LoginButton from './login';

export default function Navbar() {
  const session = useSession();
  const userLoggedIn = session.status === "authenticated" && session.data?.user
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-wide py-1 px-4 xl:px-6">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      src="/images/beyond_health_logo.png"
                      alt="Beyond Health Logo"
                      width="172"
                      height="26"
                    />
                  </Link>
                </div>
              </div>
              <div className="hidden sm:gap-8 sm:ml-6 sm:flex sm:items-center">
                <div className="hidden sm:flex sm:space-x-8">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="/faqs"
                    className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue"
                  >
                    FAQs
                  </Link>
                  <LoginButton />
                </div>
                <div className="flex-shrink-0">
                  <a href={userLoggedIn ? "/form/step-one" : "/login"}>
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-full bg-main-light-blue px-5 py-2 font-semibold tracking-wide text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Now
                    </button>
                  </a>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as="link"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                How it Works
              </Disclosure.Button>
              <Disclosure.Button
                as="link"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                FAQs
              </Disclosure.Button>
              <Disclosure.Button
                as="link"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Log In
              </Disclosure.Button>
            </div>
            
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}