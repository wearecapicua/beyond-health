import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

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
      <div className="max-w-[1180px] mx-auto py-10">
        <div className="flex gap-5">
          {items.map((item, index) => (
            <a key={index} href={`/${item.treatment.uid}`} className="relative flex-1 h-426">
              <img src={item.treatment?.data.image.url} alt="Image 1" className=" rounded-3xl w-full h-full object-cover" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 py-2 px-4 rounded-xl bg-black flex items-center justify-between">
                <p className="text-white text-2xl font-semibold">{item.treatment?.data.title}</p>
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
