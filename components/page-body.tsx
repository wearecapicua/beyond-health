import { SliceZone, SliceZoneLike } from '@prismicio/react'

import { components } from '../slices'

type PageBodyProps = {
	slices: SliceZoneLike
}

const PageBody = ({ slices }: PageBodyProps) => {
	return <SliceZone slices={slices} components={components} />
}

export default PageBody
