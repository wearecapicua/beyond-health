import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HowItWorks`.
 */
export type HowItWorksProps = SliceComponentProps<Content.HowItWorksSlice>;

/**
 * Component for "HowItWorks" Slices.
 */
const HowItWorks = ({ slice }: HowItWorksProps): JSX.Element => {
  const {
    step_one_title,
    step_two_title,
    step_three_title,
    step_one_text,
    step_two_text,
    step_three_text,
  } = slice.primary
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       <div className="mx-auto max-w-[1190px] pt-14 pb-20">
        <div className="lg:flex justify-between gap-20 pb-28">
          <div className="mx-auto w-[50%] flex flex-col justify-center lg:mx-0 lg:text-left">
            <span className="font-bold text-main-blue text-lg">STEP ONE</span>
            <h2 className="font-sans leading-tight mt-4">
              {step_one_title}
            </h2>
            <p className="mt-10 text-lg leading-1.5">
              {step_one_text}
            </p>
          </div>
          <div className="h-full bg-main-blue overflow-hidden rounded-3xl w-[57%] h-96 flex justify-center">
            <img
              src={"/images/phone.svg"}
              alt="phone"
              className="h-[704px] mt-14"
            />
          </div>
        </div>
        <div className="lg:flex justify-between gap-20 pt-2 pb-28">
          <div className="h-full bg-accent-green-800 overflow-hidden rounded-3xl w-[57%] h-96 flex justify-center">
            <img
              src={"/images/phone2.svg"}
              alt="phone"
              className="h-[704px] mt-14"
            />
          </div>
          <div className="mx-auto w-[50%] flex flex-col justify-center lg:mx-0 lg:text-left">
            <span className="font-bold text-main-blue text-lg">STEP TWO</span>
            <h2 className="font-sans leading-tight mt-4">
              {step_two_title}
            </h2>
            <p className="mt-10 text-lg leading-1.5">
              {step_two_text}
            </p>
          </div>
        </div>
        <div className="lg:flex justify-between gap-20 pt-2 pb-28">
          <div className="mx-auto w-[50%] flex flex-col justify-center lg:mx-0 lg:text-left">
            <span className="font-bold text-main-blue text-lg">STEP THREE</span>
            <h2 className="font-sans leading-tight mt-4">
              {step_three_title}
            </h2>
            <p className="mt-10 text-lg leading-1.5">
              {step_three_text}
            </p>
          </div>
          <div className="h-full bg-main-blue overflow-hidden rounded-3xl w-[57%] h-96 flex justify-center">
            <img
              src={"/images/mail.svg"}
              alt="phone"
              className="h-[565px] mt-6 ml-28"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
