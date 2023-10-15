import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>;

/**
 * Component for "CtaSection" Slices.
 */
const LargeCta = ({ slice }: CtaSectionProps): JSX.Element => {
  const {
    heading,
    subheading,
    cta_button_text,
    image
  } = slice.primary

  return (
    <div id="variant-lg" className="mx-auto pb-10 lg:pb-20">
      <div className="cta-black-left-fade overflow-hidden rounded-3xl lg:flex mx-5 sm:mx-0">
        <div className="pb-10 pt-14 px-6 lg:py-0 mx-auto lg:max-w-md lg:pl-11 text-center flex flex-col justify-center items-center lg:items-start cta-blue-black-fade lg:mx-0 lg:text-left">
          <h1 className="font-sans text-white w-[610px] z-10 leading-tight">
            {heading}
          </h1>
          <p className="lg:w-[515px] z-10 mt-6 text-xl leading-8 text-gray-300">
            {subheading}
          </p>
          <div className="w-full mt-8 lg:mt-6 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="w-full sm:w-auto rounded-full bg-accent-green px-14 py-3 text-lg font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {cta_button_text}
            </a>
          </div>
        </div>
        <div className="h-full relative">
          <div className="cta-black-gray-fade absolute top-0 left-0 bottom-0 h-[600px] w-[175px]" />
          <img
            src={image.url || undefined}
            alt="Beyond Health Logo"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LargeCta;
