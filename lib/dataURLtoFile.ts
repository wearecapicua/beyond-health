function dataURLtoFile(dataurl: string, filename: string) {
	const data = dataurl.split(',')
	const mimeType = data[0]?.match(/:(.*?);/)?.[1]
	const byteString = atob(data[data.length - 1])
	let bytesAmount = byteString.length
	const buffer = new Uint8Array(bytesAmount)
	while (bytesAmount--) {
		buffer[bytesAmount] = byteString.charCodeAt(bytesAmount)
	}

	return new File([buffer], filename, { type: mimeType })
}

export default dataURLtoFile
