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

	return large ? <div className="hidden py-9 sm:block" /> : <div className="hidden py-4 sm:block" />
}

export default Spacer
