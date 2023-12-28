interface MapQueryStringOptions {
	prefix?: string
	removingNull?: boolean
	removingUndefined?: boolean
	removingEmptyStrings?: boolean
}

const defaultMappedOptions: MapQueryStringOptions = {
	prefix: '?',
	removingNull: true,
	removingUndefined: true,
	removingEmptyStrings: true
}

const parseArrayValue = (array: string[] | number[]) => {
	return array.join(',')
}

const parseValue = (value: string[] | number[]) => {
	if (Array.isArray(value)) {
		return parseArrayValue(value)
	}

	return value
}

const mapToQueryString = (
	json: object,
	{
		prefix = '?',
		removingNull = true,
		removingUndefined = true,
		removingEmptyStrings = true
	}: MapQueryStringOptions = defaultMappedOptions
): string => {
	let entries = Object.entries(json)

	if (removingEmptyStrings) {
		entries = entries.filter((pair) => pair[1] !== '')
	}

	if (removingNull) {
		entries = entries.filter((pair) => pair[1] !== null)
	}

	if (removingUndefined) {
		entries = entries.filter((pair) => pair[1] !== undefined)
	}

	return entries
		.map(([attribute, value], index) => {
			return (
				`${index === 0 ? prefix : '&'}${attribute}=${parseValue(value)}`
					.replace(/\t/gm, '') // remove tabs
					.replace(/\n/gm, '') // remove new lines
					// .replaceAll(/\s+/gm, '') // removes all new lines, tabs and spaces
					.trim()
			)
		})
		.join('')
}

export default mapToQueryString
