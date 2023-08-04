import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from 'next/image'
/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>;

/**
 * Component for "CtaSection" Slices.
 */
const SmallCta = ({ slice }: CtaSectionProps): JSX.Element => {
  const {
    heading,
    subheading,
    cta_button_text,
    image
  } = slice.primary

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mx-auto py-20">
        <div className="relative isolate radial-gradient-blue-green px-11 justify-between shadow-2xl sm:rounded-3xl lg:flex lg:gap-x-20">
          <div className="mx-auto max-w-md text-center py-10 lg:mx-0 lg:flex-auto lg:text-left">
            <h2 className="font-sans text-white leading-tight">
              {heading}
            </h2>
            <p className="mt-10 text-lg leading-8 text-gray-300">
              {subheading}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-full bg-accent-green px-16 py-3 text-xl font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {cta_button_text}
              </a>
            </div>
          </div>
          <div className="relative mt-[-50px] mb-[-56px]">
            <Image
              src={image.url}
              alt="Beyond Health Logo"
              width="602"
              height="408"
              className="rounded-[20px] overflow-hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallCta;
