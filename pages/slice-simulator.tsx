import { SliceSimulator } from '@prismicio/slice-simulator-react'
import SliceZone from 'next-slicezone'

import { components } from '../slices'

const SliceSimulatorPage = () => {
	return <SliceSimulator sliceZone={(props) => <SliceZone {...props} components={components} />} />
}

export default SliceSimulatorPage
// deprecated
