import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

/**
 * Props for `Faqs`.
 */
/* @ts-ignore */
export type FaqsProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faqs" Slices.
 */
const Faqs = ({ slice }: FaqsProps): JSX.Element => {
  const { items } = slice
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-0 pb-10 md:py-10 px-5 md:px-0"
    >
      <div className="px-0 mx-auto max-w-[1180px] sm:border-b-[1px] sm:border-main-black/40">
        {items.map((item: any, index: number) => (
          <div key={`faq-${index}`} className="py-5 border-t-[1px] border-main-black/40">
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-xl font-semibold leading-7">{item.faq.data?.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusSmallIcon className="h-6 w-6 text-main-light-blue" aria-hidden="true" />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6 text-main-light-blue" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-lg leading-7 text-gray-800">{item.faq.data?.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
