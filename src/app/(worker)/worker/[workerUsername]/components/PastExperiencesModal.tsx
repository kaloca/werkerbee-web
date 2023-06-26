import { useState, useEffect } from 'react'
import { Session } from 'next-auth'
import { KeyedMutator } from 'swr'

import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

import helpers from '@/src/utils/helpers'
import apiClient from '@/src/utils/apiClient'
import { Experience } from '@/src/interfaces/models/Worker'
import { PulseLoader } from 'react-spinners'

interface PastExperiencesModalProps {
	experiences?: Experience[]
	closeModal: () => void
	edit: boolean
	session: Session
	mutate: KeyedMutator<any>
}

const PastExperiencesModal: React.FC<PastExperiencesModalProps> = ({
	experiences,
	closeModal,
	edit,
	session,
	mutate,
}) => {
	const [editMode, setEditMode] = useState<string | null>(null)
	const [deleteMode, setDeleteMode] = useState<string | null>(null)

	const [addLoading, setAddLoading] = useState(false)
	const [editLoading, setEditLoading] = useState(false)
	const [experienceForm, setExperienceForm] = useState<Experience>({
		_id: '',
		jobType: '',
		company: '',
		startDate: '',
		endDate: '',
	})
	const [newExperienceForm, setNewExperienceForm] = useState({
		jobType: '',
		company: '',
		startDate: '',
		endDate: '',
	})

	useEffect(() => {
		if (!edit) {
			setEditMode(null)
			setDeleteMode(null) // Reset editMode when edit becomes false
		}
	}, [edit])

	const editExperience = async () => {
		try {
			const response = await apiClient({
				method: 'put',
				url: `/worker/${session.user.username}/experience=${experienceForm._id}`,
				token: session.user.token,
				data: experienceForm,
			})
			if (response?.status === 200) {
				console.log('Experience edited successfully')
				await mutate()
			} else {
				console.error(
					`Error editing experience: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error editing experience:', error.response.data.message)
			//showError(error.response.data.message)
		}
	}

	const deleteExperience = async () => {
		try {
			const response = await apiClient({
				method: 'delete',
				url: `/worker/${session.user.username}/experience=${experienceForm._id}`,
				token: session.user.token,
				data: {},
			})
			if (response?.status === 200) {
				console.log('Experience deleted successfully')
				await mutate()
			} else {
				console.error(
					`Error deleting experience: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error deleting experience:', error.response.data.message)
			//showError(error.response.data.message)
		}
	}

	const addExperience = async () => {
		if (
			newExperienceForm.company == '' ||
			newExperienceForm.jobType == '' ||
			newExperienceForm.startDate == '' ||
			newExperienceForm.endDate == ''
		)
			return
		try {
			const response = await apiClient({
				method: 'post',
				url: `/worker/${session.user.username}/experience`,
				token: session.user.token,
				data: newExperienceForm,
			})
			if (response?.status === 200) {
				console.log('Experience added successfully')
				await mutate()
				setNewExperienceForm({
					company: '',
					jobType: '',
					startDate: '',
					endDate: '',
				})
			} else {
				console.error(
					`Error adding experience: ${
						response.data.message || response.data.error
					}`
				)
			}
		} catch (error: any) {
			console.error('Error adding experience:', error.response.data.message)
			//showError(error.response.data.message)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-40'>
			<div className='bg-white rounded-lg p-4 absolute z-50 shadow-lg flex flex-col items-center'>
				<div className='w-full inline-flex justify-end'>
					<XMarkIcon
						className='h-8 hover:cursor-pointer'
						onClick={closeModal}
					/>
				</div>
				{!edit &&
					(!experiences ||
						(experiences.length == 0 && (
							<div>Worker has no past experiences</div>
						)))}
				<div className='overflow-scroll'>
					{experiences && (
						<table className='w-full text-left'>
							<thead>
								<tr>
									<th className='p-2'>Position</th>
									<th className='p-2'>Company</th>
									<th className='p-2'>Date</th>
									{edit && <th className='p-2'>Edit</th>}
								</tr>
							</thead>
							<tbody>
								{experiences.map((experience) => (
									<tr key={experience._id}>
										<td className='p-2'>
											{editMode === experience._id ? (
												<input
													type='text'
													value={experienceForm.jobType}
													className='capitalize'
													onChange={(e: any) =>
														setExperienceForm({
															...experienceForm,
															jobType: e.target.value,
														})
													}
												/>
											) : (
												experience.jobType
											)}
										</td>
										<td className='p-2'>
											{editMode === experience._id ? (
												<input
													type='text'
													value={experienceForm.company}
													onChange={(e: any) =>
														setExperienceForm({
															...experienceForm,
															company: e.target.value,
														})
													}
												/>
											) : (
												experience.company
											)}
										</td>
										<td className='p-2'>
											{editMode === experience._id ? (
												<>
													<input
														type='date'
														value={experienceForm.startDate}
														onChange={(e: any) =>
															setExperienceForm({
																...experienceForm,
																startDate: e.target.value,
															})
														}
													/>
													<input
														type='date'
														defaultValue={experienceForm.endDate}
														onChange={(e: any) =>
															setExperienceForm({
																...experienceForm,
																endDate: e.target.value,
															})
														}
													/>
												</>
											) : (
												helpers.formatDateRange(
													new Date(experience.startDate),
													new Date(experience.endDate)
												)
											)}
										</td>
										{edit && (
											<td className='p-2'>
												{editMode !== experience._id &&
													deleteMode !== experience._id && (
														<div className='inline-flex'>
															<PencilSquareIcon
																height={8}
																width={8}
																className='h-5 w-5 cursor-pointer mr-2 hover:text-gray-400'
																onClick={() => {
																	setEditMode(experience._id)
																	setExperienceForm({
																		...experience,
																		startDate: new Date(experience.startDate)
																			.toISOString()
																			.slice(0, 10),
																		endDate: new Date(experience.endDate)
																			.toISOString()
																			.slice(0, 10),
																	})
																}}
															/>
															<TrashIcon
																className='h-5 w-5 cursor-pointer hover:text-gray-400'
																onClick={() => {
																	setDeleteMode(experience._id)
																	setExperienceForm({
																		...experienceForm,
																		_id: experience._id,
																	})
																}}
															/>
														</div>
														// <svg
														// 	xmlns='http://www.w3.org/2000/svg'
														// 	viewBox='0 0 20 20'
														// 	fill='currentColor'

														// >
														// 	<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
														// </svg>
													)}
												{editMode === experience._id && (
													<button
														className={`p-2  rounded-lg ${
															editLoading
																? 'bg-gray-500'
																: 'bg-blue-400 hover:bg-blue-500 hover:cursor-pointer'
														} text-white w-16 transition-color duration-100 ease-in-out`}
														onClick={async () => {
															setEditLoading(true)
															await editExperience()
															setEditMode('')
															setEditLoading(false)
														}}
														disabled={editLoading}
													>
														{editLoading ? (
															<PulseLoader size={4} color='white' />
														) : (
															<span>Save</span>
														)}
													</button>
												)}
												{deleteMode === experience._id && (
													<button
														className={`p-2  rounded-lg ${
															editLoading
																? 'bg-gray-500'
																: 'bg-red-400 hover:bg-red-500 hover:cursor-pointer'
														} text-white w-16 transition-color duration-100 ease-in-out`}
														onClick={async () => {
															setEditLoading(true)
															await deleteExperience()
															setEditMode('')
															setEditLoading(false)
														}}
														disabled={editLoading}
													>
														{editLoading ? (
															<PulseLoader size={4} color='white' />
														) : (
															<span>Delete</span>
														)}
													</button>
												)}
											</td>
										)}
									</tr>
								))}
								{edit && (
									<tr>
										<td className='p-2'>
											<input
												type='text'
												placeholder='New Position'
												value={newExperienceForm.jobType}
												onChange={(e: any) =>
													setNewExperienceForm({
														...newExperienceForm,
														jobType: e.target.value,
													})
												}
											/>
										</td>
										<td className='p-2'>
											<input
												type='text'
												placeholder='New Company'
												value={newExperienceForm.company}
												onChange={(e: any) =>
													setNewExperienceForm({
														...newExperienceForm,
														company: e.target.value,
													})
												}
											/>
										</td>
										<td className='p-2'>
											<input
												type='date'
												placeholder='Start Date'
												value={newExperienceForm.startDate}
												onChange={(e: any) =>
													setNewExperienceForm({
														...newExperienceForm,
														startDate: e.target.value,
													})
												}
											/>
											<input
												type='date'
												placeholder='End Date'
												value={newExperienceForm.endDate}
												onChange={(e: any) =>
													setNewExperienceForm({
														...newExperienceForm,
														endDate: e.target.value,
													})
												}
											/>
										</td>
										<td className='p-2'>
											<button
												className={`p-2  rounded-lg ${
													addLoading
														? 'bg-gray-500'
														: 'bg-blue-400 hover:bg-blue-500 hover:cursor-pointer'
												} text-white w-16 transition-color duration-100 ease-in-out`}
												onClick={async () => {
													setAddLoading(true)
													await addExperience()
													setAddLoading(false)
												}}
												disabled={addLoading}
											>
												{addLoading ? (
													<PulseLoader size={4} color='white' />
												) : (
													<span>Add</span>
												)}
											</button>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	)
}

export default PastExperiencesModal
