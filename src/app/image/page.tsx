'use client'
import { BASE_URL } from '@/src/utils/constants'
import { useState } from 'react'

function ImageUpload() {
	const [selectedFile, setSelectedFile] = useState<any>()

	const onFileChange = (event: any) => {
		setSelectedFile(event.target.files[0])
	}

	const onFileUpload = () => {
		const formData = new FormData()
		formData.append('image', selectedFile, selectedFile.name)

		// Send a POST request to your API endpoint
		fetch(BASE_URL + '/image', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error))
	}

	return (
		<div className='h-full flex flex-col justify-center items-center'>
			<input type='file' onChange={onFileChange} />
			<button onClick={onFileUpload}>Upload!</button>
		</div>
	)
}

export default ImageUpload
