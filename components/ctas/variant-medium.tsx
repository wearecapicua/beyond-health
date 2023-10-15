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
const MediumCta = ({ slice }: CtaSectionProps): JSX.Element => {
  const {
    heading,
    subheading,
    cta_button_text,
    image
  } = slice.primary

  return (
    <div id="variant-md" className="mx-auto sm:pt-12 sm:pb-16">
      <div className="relative isolate radial-gradient-blue-green-reverse px-11 pb-14 lg:pb-0 justify-between shadow-2xl sm:rounded-3xl lg:flex lg:gap-x-20">
        <div className="mx-auto max-w-lg sm:text-center py-12 lg:py-10 flex flex-col justify-center lg:mx-0 lg:flex-auto lg:text-left">
          <h2 className="font-sans text-white leading-tight">
            {heading}
          </h2>
          <p className="mt-10 text-lg leading-8 text-gray-300">
            {subheading}
          </p>
          <div className="mt-10 mb-6 lg:mb-0 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="w-full sm:w-auto rounded-full text-center bg-accent-green px-16 py-3 text-xl font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {cta_button_text}
            </a>
          </div>
        </div>
        <div className="relative lg:mt-[35px] lg:mb-[-35px]">
          <Image
            src={image.url!}
            alt="Beyond Health Logo"
            width="602"
            height="408"
            className="rounded-[20px] mx-auto overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MediumCta;
