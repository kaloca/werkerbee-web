'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { Rating } from '@mui/material'
import { BeatLoader, SyncLoader } from 'react-spinners'

import apiClient from '@/src/utils/apiClient'
import { KeyedMutator } from 'swr'

export interface RatingOptions {
	rateeId: string
	jobId: string
	jobPostingId: string
	ratingType: 'worker' | 'company'
	currentReview?: string
	currentRating?: number
	ratingId?: string
	name: string
}

interface RatingModalProps {
	isOpen: boolean
	setOpen: (value: boolean) => void
	ratingData: RatingOptions
	mutate: KeyedMutator<any>
}

const RatingModal: React.FC<RatingModalProps> = ({
	isOpen,
	setOpen,
	ratingData,
	mutate,
}) => {
	const { data: session } = useSession()

	const {
		rateeId,
		jobId,
		jobPostingId,
		ratingType,
		currentRating,
		currentReview,
		ratingId,
		name,
	} = ratingData

	const [loading, setLoading] = useState(false)
	const [ratingValue, setRatingValue] = useState<number>(currentRating ?? 0)
	const [ratingComment, setRatingComment] = useState(currentReview ?? '')

	useEffect(() => {
		setRatingValue(currentRating ?? 0)
		setRatingComment(currentReview ?? '')
	}, [currentRating, currentReview])

	const cancelButtonRef = useRef(null)

	const createRating = async () => {
		if (ratingValue < 1 || ratingValue > 6) return
		setLoading(true)
		if (session)
			try {
				const response = await apiClient({
					method: 'post',
					url: `/ratings`,
					token: session.user.token,
					data: {
						rating: ratingValue,
						review: ratingComment,
						raterId: session.user.id,
						rateeId,
						jobId,
						jobPostingId,
						ratingType,
					},
				})
				if (response?.status === 201) {
					console.log('Rating created successfully')
					mutate()
					setOpen(false)
				} else {
					console.error(
						`Error creating rating: ${
							response.data.message || response.data.error
						}`
					)
				}
			} catch (error: any) {
				console.error('Error creating rating:', error.response.data.message)
				//showSnackbar('error', error.response.data.message)
			}
		setLoading(false)
	}

	const updateRating = async () => {
		if (ratingValue < 1 || ratingValue > 6) return
		setLoading(true)
		if (session)
			try {
				const response = await apiClient({
					method: 'put',
					url: `/ratings/${ratingId}`,
					token: session.user.token,
					data: {
						rating: ratingValue,
						review: ratingComment,
					},
				})
				if (response?.status === 200) {
					console.log('Rating updated successfully')
					mutate()
					setOpen(false)
				} else {
					console.error(
						`Error updating rating: ${
							response.data.message || response.data.error
						}`
					)
				}
			} catch (error: any) {
				console.error('Error updating rating:', error.response.data.message)
				//showSnackbar('error', error.response.data.message)
			}
		setLoading(false)
	}

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className='flex items-center justify-center min-h-screen pt-3 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-3 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div>
								<div className='mt-3 text-center '>
									<Dialog.Title
										as='h3'
										className='text-lg leading-6 mb-2 font-medium text-gray-900'
									>
										Choose rating for {name}
									</Dialog.Title>
									<Rating
										className='mb-2'
										name='simple-controlled'
										value={ratingValue}
										onChange={(event, newValue) => {
											if (newValue && newValue > 0 && newValue < 6)
												setRatingValue(newValue)
										}}
									/>
									{/* <div className='mt-2'>
										<p className='text-sm text-gray-500'>Subtitle goes here</p>
									</div> */}
									<div>
										<label
											htmlFor='comment'
											className='block text-left text-sm font-medium text-gray-700'
										>
											Add a comment (optional)
										</label>
										<div className='mt-1'>
											<textarea
												rows={4}
												name='comment'
												id='comment'
												className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
												value={ratingComment}
												onChange={(e: any) => setRatingComment(e.target.value)}
												maxLength={200}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
								<button
									type='button'
									className='w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
									onClick={async () => {
										if (!ratingId) createRating()
										else updateRating()
									}}
								>
									{!loading ? (
										<span>Save</span>
									) : (
										<BeatLoader color='white' size={5} />
									)}
								</button>
								<button
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
									onClick={async () => {
										setOpen(false)
									}}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default RatingModal
