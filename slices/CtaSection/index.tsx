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
const CtaSection = ( props : CtaSectionProps): JSX.Element => {
  const { type } = props.slice.primary

  return (
    <section
      data-slice-type={props.slice.slice_type}
      data-slice-variation={props.slice.variation}
    >
      {type === "Small" ?
      <SmallCta {...props} />
      : type === "Medium" ? 
      <MediumCta {...props} />
      : type === "Large" ? 
      <LargeCta {...props} />
      : type === "withInfoRight" ? 
      <InfoRightCta {...props} />
      : type === "withInfoLeft" ? 
      <InfoLeftCta {...props} />
       : null
    }
    </section>
  );
};

export default CtaSection;
