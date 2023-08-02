import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header = ({ slice }: HeaderProps): JSX.Element => {
  const title = slice.primary.title
  const subtitle = slice.primary.subtitle
  const ctaText = slice.primary.cta_button_text

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-screen-lg text-center">
            <h1 className="leading-tight">
              {title}
            </h1>
            {subtitle && 
              <p className="mx-auto mt-10 max-w-lg text-lg leading-8">
                {subtitle}
              </p>
            }
            {ctaText &&
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-full bg-main-light-blue px-16 py-3 text-xl font-semibold text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {ctaText}
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
