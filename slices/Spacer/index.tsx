import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Spacer`.
 */
export type SpacerProps = SliceComponentProps<Content.SpacerSlice>

/**
 * Component for "Spacer" Slices.
 */
const Spacer = ({ slice }: SpacerProps): JSX.Element => {
	const large = slice.primary.spacer
	return large ? <div className="py-9 hidden sm:block" /> : <div className="py-4 hidden sm:block" />
}

export default Spacer
