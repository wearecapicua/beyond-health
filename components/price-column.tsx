import { Product } from 'lib/types'

interface PriceColumnProps {
	product: Product
}

const PriceColumn = ({ product }: PriceColumnProps) => {
	const { price } = product ?? {}

	return (
		<td className="p-4">
			<div className="align-items flex gap-2">{`$${price}`}</div>
		</td>
	)
}

export default PriceColumn
