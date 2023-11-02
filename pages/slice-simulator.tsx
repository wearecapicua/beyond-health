import { SliceSimulator } from "@prismicio/slice-simulator-react";
// @ts-ignore
import SliceZone from "next-slicezone";

import { components } from "../slices";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props) => <SliceZone {...props} components={components} />}
    />
  );
}
