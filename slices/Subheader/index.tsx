import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Subheader`.
 */
export type SubheaderProps = SliceComponentProps<Content.SubheaderSlice>;

/**
 * Component for "Subheader" Slices.
 */
const Subheader = ({ slice }: SubheaderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for subheader (variation: {slice.variation}) Slices
    </section>
  );
};

export default Subheader;
