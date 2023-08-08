import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      {/* <div className="max-w-1180 mx-auto my-10">
        <div className="flex gap-20">
          {items.map((item, index) => (
            <div key={index} className="relative w-426 h-426">
              <img src="path_to_image" alt="Image 1" className="w-full h-full object-cover" />
              <div className="absolute bottom-10 left-10 w-full h-66 bg-black flex items-center justify-center">
                <p className="text-white text-25 font-semibold">Image 1</p>
                asflasfkla
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Treatments;
