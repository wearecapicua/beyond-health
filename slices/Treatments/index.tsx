import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ClockIcon } from '@heroicons/react/24/outline';

/**
 * Props for `Treatments`.
 */
export type TreatmentsProps = SliceComponentProps<Content.TreatmentsSlice>;

/**
 * Component for "Treatments" Slices.
 */
const Treatments = ({ slice }: TreatmentsProps): JSX.Element => {
  const { items } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-[1180px] mx-auto py-10 px-5 sm:px-0">
        <div className="flex gap-10 md:gap-5 flex-col md:flex-row">
          {items.map((item: any, index) => (
            <a key={index} href={item.treatment.data.available ? `/${item.treatment.uid}` : undefined} className="relative flex-1 h-426">
              <img src={item.treatment.data?.image.url} alt="Image 1" className=" rounded-3xl w-full h-full object-cover" />
              {!item.treatment.data.available &&
                <div className="absolute top-2.5 right-3 flex items-center bg-main-black bg-opacity-20 py-2 px-6 rounded-xl">
                  <ClockIcon className="h-6 w-6 text-main-black" />
                  <div className="ml-2">
                    <p className="text-white font-semibold text-base">Soon</p>
                  </div>
                </div>
              }
              <div className="absolute bottom-2.5 left-3 right-3 py-2 px-4 rounded-xl bg-black flex items-center justify-between">
                <p className="text-white text-2xl font-semibold">{item.treatment.data?.title}</p>
                <ChevronRightIcon className="text-accent-green w-12" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments;
