import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CheckCircleIcon } from '@heroicons/react/20/solid';

/**
 * Props for `Pricing`.
 */
export type PricingProps = SliceComponentProps<Content.PricingSlice>;

interface ListItemProps {
  text: string | null;
}
/**
 * Component for "Pricing" Slices.
 */
 const ListItem = ({ text }: ListItemProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-6 h-6">
        <CheckCircleIcon className="w-full h-full text-accent-green" />
      </div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

const Pricing = ({ slice }: PricingProps): JSX.Element => {
  const {
    title,
    subtitle,
    description,
    bullet_one,
    bullet_two,
    bullet_three
  } = slice.primary

  const bulletsArray = [bullet_one, bullet_two, bullet_three]

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="px-6 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl px-10 py-24 text-center bg-white">
          <h2 className="leading-tight">
            {title}
          </h2>
          {subtitle && 
            <p className="mx-auto mt-6 max-w-[820px] text-lg leading-8">
              {subtitle}
            </p>
          }
          <div className="flex mt-10 justify-center items-center gap-20">
            <div>
              <PrismicRichText
                field={description}
                components={{
                  paragraph: ({ children }) => <p className="font-raleway font-bold text-3xl text-left">{children}</p>,
                  strong: ({ children }) => <strong className="text-main-light-blue block">{children}</strong>
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {bulletsArray.map((item, index) => (
                <ListItem key={index} text={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
