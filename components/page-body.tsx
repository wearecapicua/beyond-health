import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { LandingPageDocumentDataSlicesSlice } from "prismicio-types";

type PageBodyProps = {
  slices: LandingPageDocumentDataSlicesSlice[];
};

export default function PageBody({ slices }: PageBodyProps) {
  return (
    <div>
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
