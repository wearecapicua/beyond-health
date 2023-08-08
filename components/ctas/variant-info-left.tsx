import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>;

/**
 * Component for "CtaSection" Slices.
 */
const InfoLeftCta = ({ slice }: CtaSectionProps): JSX.Element => {
  const {
    heading,
    subheading,
    cta_button_text,
    image,
    introtext,
    info_title_one,
    info_title_two,
    info_title_three,
    info_subtitle_one,
    info_subtitle_two,
    info_subtitle_three
  } = slice.primary

  return (
    <div className="mx-auto pt-10 pb-20">
      <div className="cta-light-blue-fade pl-11 pr-9 sm:rounded-3xl lg:flex justify-between">
        <div className="mx-auto w-[40%] flex flex-col justify-center lg:mx-0 lg:text-left">
          <span className="font-bold text-white text-lg">{introtext}</span>
          <h2 className="font-sans text-accent-green leading-tight mt-4">
            {heading}
          </h2>
          <p className="mt-7 mb-7 text-lg leading-1.5">
            {subheading}
          </p>
          {info_title_one &&
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] items-center bg-accent-2 my-1.5 py-6 px-10 flex gap-6">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-xl">{info_title_one}</span>
                {info_subtitle_one && <p className="mt-1 text-white">{info_subtitle_one}</p>}
              </div>
            </div>
          }
          {info_title_two &&
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] items-center bg-accent-2 my-2 py-6 px-10 flex gap-6">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-xl">{info_title_two}</span>
                {info_subtitle_two && <p className="mt-1 text-white">{info_subtitle_two}</p>}
              </div>
            </div>
          }
          {info_title_three &&
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] items-center bg-accent-2 my-2 py-6 px-10 flex gap-6">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-xl">{info_title_three}</span>
                {info_subtitle_three && <p className="mt-1 text-white">{info_subtitle_three}</p>}
              </div>
            </div>
          }
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="rounded-full bg-accent-green px-14 py-3 text-lg font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {cta_button_text}
            </a>
          </div>
        </div>
        <div className="h-full overflow-hidden rounded-3xl mt-[35px] mb-[-35px] h-[794px] max-w-[610px]">
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

export default InfoLeftCta;
