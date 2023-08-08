import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { LandingPageDocument } from "prismicio-types";

type PageBodyProps = {
  slices: LandingPageDocument["data"]["slices"];
};

export default function PageBody({ slices }: PageBodyProps) {
  return (
    <div>
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
