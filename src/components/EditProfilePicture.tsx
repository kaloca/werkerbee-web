'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface EditProfileModalProps {}

const EditProfileModal: React.FC<EditProfileModalProps> = ({}) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewSrc, setPreviewSrc] = useState<string | null>(null)

	const fileInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0]

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreviewSrc(reader.result as string)
			}
			reader.readAsDataURL(file)
			setSelectedFile(file)
		}
	}

	const formSubmitted = (event: FormEvent) => {
		event.preventDefault()

		if (!selectedFile) {
			return
		}

		const formData = new FormData()
		formData.append('profilePic', selectedFile)

		fetch('https://your-api-url', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				// handle the response from your API here
			})
			.catch((error) => console.error('Error:', error))
	}

	return (
		<form onSubmit={formSubmitted}>
			<div>
				<label>
					Select profile picture:
					<input type='file' onChange={fileInputChanged} />
				</label>
			</div>
			{previewSrc && (
				<div>
					<img src={previewSrc} alt='Preview' />
				</div>
			)}
			<button type='submit'>Update profile picture</button>
		</form>
	)
}

export default EditProfileModal
