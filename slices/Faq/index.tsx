import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps): JSX.Element => {
  const { question, answer } = slice.primary

  return (
    <div className="mx-auto max-w-[1180px] py-5 border-t-[1px] border-main-black/40">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
              <span className="text-xl font-semibold leading-7">{question}</span>
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <MinusSmallIcon className="h-6 w-6 text-main-light-blue" aria-hidden="true" />
                ) : (
                  <PlusSmallIcon className="h-6 w-6 text-main-light-blue" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel as="dd" className="mt-2 pr-12">
              <p className="text-lg leading-7 text-gray-800">{answer}</p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Faq;
