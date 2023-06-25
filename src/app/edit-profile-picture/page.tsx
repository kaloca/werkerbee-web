'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SyncLoader } from 'react-spinners'

import apiClient from '@/src/utils/apiClient'
import { BASE_URL } from '@/src/utils/constants'

interface EditProfileModalProps {}

const EditProfileModal: React.FC<EditProfileModalProps> = ({}) => {
	const { data: session } = useSession()
	const router = useRouter()

	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewSrc, setPreviewSrc] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

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

	const formSubmitted = async (event: FormEvent) => {
		try {
			event.preventDefault()

			if (!selectedFile) {
				return
			}

			const formData = new FormData()
			formData.append('image', selectedFile, selectedFile.name)
			setLoading(true)

			await apiClient({
				method: 'post',
				url: '/profile-picture',
				token: session?.user.token || 'f',
				data: formData,
			})
				.then((response) => response)
				.then((data) => {
					console.log(data)
					// handle the response from your API here
				})
				.catch((error) => console.error('Error:', error))
			setLoading(false)
			router.push('/profile')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='h-full pt-44 flex flex-col items-center'>
			<div className='bg-white shadow sm:rounded-lg'>
				<div className='px-4 py-5 sm:p-6'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>
						Select Profile Picture
					</h3>
					<form onSubmit={formSubmitted}>
						<div className='mt-2'>
							<input type='file' accept='image/*' onChange={fileInputChanged} />
						</div>
						{previewSrc && (
							<div>
								<img src={previewSrc} alt='Preview' className=' h-64' />
							</div>
						)}
						<div
							className={`${
								loading
									? ' bg-gray-400'
									: 'text-blue-700 bg-blue-100 hover:bg-blue-200 '
							} mt-5 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm`}
						>
							{!loading ? (
								<button type='submit'>Update</button>
							) : (
								<SyncLoader className='h-4' />
							)}
						</div>
						{loading && <p>LOADING</p>}
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditProfileModal
