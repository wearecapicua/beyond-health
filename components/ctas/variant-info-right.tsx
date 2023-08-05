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
const InfoRightCta = ({ slice }: CtaSectionProps): JSX.Element => {
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
      <div className="lg:flex justify-between">
        <div className="h-full overflow-hidden rounded-3xl h-[655px] max-w-[622px]">
          <img
            src={image.url}
            alt="Beyond Health Logo"
            className="object-cover"
          />
        </div>
        <div className="mx-auto w-[40%] flex flex-col lg:mx-0 lg:text-left">
          <span className="font-bold text-main-blue text-lg">{introtext}</span>
          <h2 className="font-sans leading-tight mt-4">
            {heading}
          </h2>
          <p className="mt-7 mb-10 text-lg leading-1.5">
            {subheading}
          </p>
          {info_title_one &&
            <div className="border border-solid border-accent-3 rounded-[20px] items-center bg-accent-2 my-1.5 py-6 px-10 flex gap-3">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="flex flex-col">
                <span className="text-main-blue font-medium text-xl">{info_title_one}</span>
                {info_subtitle_one && <p className="mt-1">{info_subtitle_one}</p>}
              </div>
            </div>
          }
          {info_title_two &&
            <div className="border border-solid border-accent-3 rounded-[20px] items-center bg-accent-2 my-2 py-6 px-10 flex gap-3">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="flex flex-col">
                <span className="text-main-blue font-medium text-xl">{info_title_two}</span>
                {info_subtitle_two && <p className="mt-1">{info_subtitle_two}</p>}
              </div>
            </div>
          }
          {info_title_three &&
            <div className="border border-solid border-accent-3 rounded-[20px] items-center bg-accent-2 my-2 py-6 px-10 flex gap-3">
              <div className="w-7 h-7 bg-main-blue rounded-full flex shrink-0 items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex flex-col">
                <span className="text-main-blue font-medium text-xl">{info_title_three}</span>
                {info_subtitle_three && <p className="mt-1">{info_subtitle_three}</p>}
              </div>
            </div>
          }
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="rounded-full bg-main-light-blue px-14 py-3 text-lg font-semibold text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {cta_button_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoRightCta;
