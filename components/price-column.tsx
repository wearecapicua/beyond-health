import { Product } from 'lib/types'

interface PriceColumnProps {
	product: Product
}

const PriceColumn = ({ product }: PriceColumnProps) => {
	const { price } = product ?? {}
	// const [isEditing, setIsEditing] = useState(false)
	// const [priceStr, setPriceStr] = useState((initialPrice ?? '').toString())
	// const [priceNum, setPriceNum] = useState(initialPrice)

	// useEffect(() => {
	// 	setPriceStr((priceNum ?? '').toString())
	// }, [priceNum])

	// const handleEditClick = () => {
	// 	setIsEditing(true)
	// }

	// const handleSaveClick = () => {
	// 	// Parse the edited price string and update priceNum
	// 	const newPriceNum = parseFloat(priceStr)

	// 	if (!isNaN(newPriceNum)) {
	// 		setPriceNum(newPriceNum)
	// 		const updatedProduct = {
	// 			product: {
	// 				id,
	// 				name,
	// 				price: newPriceNum
	// 			}
	// 		}
	// 		adminUpdateData(updatedProduct, userId)
	// 		onPriceUpdate(userId, newPriceNum)
	// 	}
	// 	setIsEditing(false)
	// }

	// const handleCancelClick = () => {
	// 	// If the user cancels editing, reset the edited price string to match the numeric value
	// 	setPriceStr(priceNum.toString())
	// 	setIsEditing(false)
	// }

	// const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setPriceStr(event.target.value)
	// }

	// const formattedPrice = priceNum ? (priceNum / 100).toFixed(2) : '0.00'

	return (
		<td className="p-4">
			{/* {isEditing ? (
				<div className="align-items flex gap-3">
					<input
						className="w-32 rounded-md border-gray-300"
						type="text"
						value={priceStr}
						onChange={handlePriceChange}
					/>
					<button onClick={handleSaveClick}>
						<CheckIcon className="h-4 w-4 text-green-500" />
					</button>
					<button onClick={handleCancelClick}>
						<TrashIcon className="h-4 w-4 text-red-500" />
					</button>
				</div>
			) : ( */}
			<div className="align-items flex gap-2">
				{price}
				{/* <button onClick={handleEditClick}>
						<PencilIcon className="h-5 w-5 p-[3px] text-blue-500" />
					</button> */}
			</div>
			{/* )} */}
		</td>
	)
}

export default PriceColumn
