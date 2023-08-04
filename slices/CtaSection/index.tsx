import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import InfoLeftCta from "components/ctas/variant-info-left";
import InfoRightCta from "components/ctas/variant-info-right";
import LargeCta from "components/ctas/variant-large";
import MediumCta from "components/ctas/variant-medium";
import SmallCta from "components/ctas/variant-small";

/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>;

/**
 * Component for "CtaSection" Slices.
 */
const CtaSection = ({ slice }: CtaSectionProps): JSX.Element => {
  const { type } = slice.primary

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {type === "Small" ?
      <SmallCta slice={slice} />
      : type === "Medium" ? 
      <MediumCta slice={slice} />
      : type === "Large" ? 
      <LargeCta slice={slice} />
      : type === "withInfoRight" ? 
      <InfoRightCta slice={slice} />
      : type === "withInfoLeft" ? 
      <InfoLeftCta slice={slice} />
       : null
    }
    </section>
  );
};

export default CtaSection;
