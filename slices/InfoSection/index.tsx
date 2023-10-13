import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `InfoSection`.
 */
export type InfoSectionProps = SliceComponentProps<Content.InfoSectionSlice>;

/**
 * Component for "InfoSection" Slices.
 */
const InfoSection = ({ slice }: InfoSectionProps): JSX.Element => {
  const {
    title,
    subtitle,
    blurb_one_title,
    blurb_one_subtitle,
    blurb_two_title,
    blurb_two_subtitle,
    blurb_three_title,
    blurb_three_subtitle
  } = slice.primary

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mx-auto py-10 sm:px-2.5">
        <div className="cta-light-blue-fade px-11 py-[75px] sm:rounded-3xl">
          <div className="mx-auto text-center lg:mx-0">
            <h2 className="text-accent-green leading-tight">
              {title}
            </h2>
            <p className="mt-10 text-white mx-auto max-w-lg text-lg md:text-xl leading-normal">
              {subtitle}
            </p>
          </div>
          <div className="flex mt-16 gap-12 md:gap-5 justify-between flex-col md:flex-row">
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] bg-accent-2 py-10 px-6 overflow-hidden h-[370px] md:h-[498px] flex md:flex-1 flex-col justify-between gap-10 md:gap-14">
              <div className="flex flex-col">
                <span className="text-white font-medium text-2xl lg:text-[28px]">{blurb_one_title}</span>
                <p className="mt-6 text-white text-lg lg:text-[23px]">{blurb_one_subtitle}</p>
              </div>
              <div className="h-[60%] self-center">
                <img className="w-[270px]" src="/images/phone.svg" alt="phone" />
              </div>
            </div>
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] bg-accent-2 py-10 px-6 overflow-hidden h-[370px] md:h-[498px] flex md:flex-1 flex-col justify-between gap-10 md:gap-14">
              <div className="flex flex-col">
                <span className="text-white font-medium text-2xl lg:text-[28px]">{blurb_two_title}</span>
                <p className="mt-6 text-white text-lg lg:text-[23px]">{blurb_two_subtitle}</p>
              </div>
              <div className="h-[60%] self-center">
                <img src="/images/phone2.svg" alt="phone-2" />
              </div>
            </div>
            <div className="border border-solid border-white border-opacity-50 bg-white bg-opacity-10 rounded-[20px] bg-accent-2 py-10 px-6 overflow-hidden h-[370px] md:h-[498px] flex md:flex-1 flex-col justify-between gap-10 md:gap-14">
              <div className="flex flex-col">
                <span className="text-white font-medium text-2xl lg:text-[28px]">{blurb_three_title}</span>
                <p className="mt-6 text-white text-lg lg:text-[23px]">{blurb_three_subtitle}</p>
              </div>
              <div className="h-[60%] w-[470px] mt-[-28px]">
                <img src="/images/mail.svg" alt="mail"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
