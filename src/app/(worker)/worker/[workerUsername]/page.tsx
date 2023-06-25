'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import useWorker from '@/src/hooks/useWorker'

import BlankProfilePicture from '@/src/assets/blank_profile_pic.webp'

import PastExperiencesModal from './components/PastExperiencesModal'

export default function WorkerProfilePage({ params }: any) {
	const { data: session } = useSession()

	const { data: worker, isLoading } = useWorker(params.workerUsername)
	const [showJobTypes, setShowJobTypes] = useState(false)
	const [showCertifications, setShowCertifications] = useState(false)
	const [showPastExperiences, setShowPastExperiences] = useState(false)
	//console.log(data)
	return (
		<div className='w-full h-full'>
			{isLoading && <p>Loading</p>}
			{!isLoading && !worker && (
				<div className='pt-20 flex flex-col items-center'>
					This worker does not exist
				</div>
			)}
			{!isLoading && worker && (
				<div className='flex items-center justify-center justify-items-center bg-slate-500 h-full w-full'>
					{showPastExperiences && (
						<PastExperiencesModal
							experiences={worker.experiences}
							closeModal={() => setShowPastExperiences(false)}
						/>
					)}
					<div className=' max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16'>
						<div className='px-6'>
							<div className='flex flex-wrap justify-center'>
								<div className='w-full flex justify-center'>
									<div className='relative'>
										<Image
											alt='profile-pic'
											src={worker.profilePicture || BlankProfilePicture}
											className='shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]'
											width={150}
											height={150}
										/>
										{session?.user.username == params.workerUsername && (
											<a
												href='/edit-profile-picture'
												className='absolute -right-20 -bottom-20	-ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
													fill='currentColor'
													className='h-4 w-4'
												>
													<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
												</svg>
											</a>
										)}
									</div>
								</div>
							</div>
							<div className='text-center mt-24'>
								<h3 className='text-2xl text-slate-700 font-bold leading-normal'>
									{worker.name}
								</h3>
								<div className='text-xs text-slate-400 font-bold uppercase'>
									<i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
									{/* {JSON.stringify(data.location)} */}
								</div>

								<div className='w-full text-center'>
									<div className='flex justify-center '>
										<div
											onMouseEnter={() => setShowJobTypes(true)}
											onMouseLeave={() => setShowJobTypes(false)}
											className='p-3 text-center bg-slate-100 mr-2 rounded-lg hover:cursor-pointer hover:bg-slate-200'
										>
											<span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
												{worker.jobTypes.length || 0}
											</span>
											<span className='text-sm text-slate-400 '>Job Types</span>
											{showJobTypes && (
												<div className='flex flex-col rounded-md bg-white p-2 absolute z-10 border border-slate-100'>
													{worker.jobTypes.map((jobType) => (
														<span className='capitalize py-1' key={jobType}>
															{jobType}
														</span>
													))}
												</div>
											)}
										</div>

										<div className='p-3 text-center bg-slate-100 mr-2 rounded-lg hover:cursor-pointer hover:bg-slate-200'>
											<span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
												{worker.certifications?.length || 0}
											</span>
											<span className='text-sm text-slate-400 '>
												Certifications
											</span>
											{worker.certifications &&
												worker.certifications?.length > 0 &&
												showCertifications && (
													<div className='flex flex-col rounded-md bg-white p-2 absolute z-10 border border-slate-100'>
														{worker.certifications.map((c) => (
															<span
																className='capitalize py-1'
																key={c.certification}
															>
																{c.certification}
															</span>
														))}
													</div>
												)}
										</div>
										<div className='p-3 text-center bg-slate-100 mr-2 rounded-lg hover:cursor-pointer hover:bg-slate-200'>
											<span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
												{worker.completedJobs || 0}
											</span>
											<span className='text-sm text-slate-400'>
												Completed Jobs
											</span>
										</div>

										{worker.rating && (
											<div className='p-3 text-center'>
												<span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
													{worker.rating}
												</span>
												<span className='text-sm text-slate-400'>
													Avg. Rating
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className='mt-6 py-6 border-t border-slate-200 text-center'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full px-4'>
										<p className='font-light leading-relaxed text-slate-600 mb-4'>
											{worker.bio}
										</p>
										<div className='flex flex-row justify-center'>
											<a
												onClick={() => setShowPastExperiences(true)}
												className='font-normal text-slate-700 hover:text-slate-400'
											>
												Past experiences
											</a>
											{session?.user.username == params.workerUsername && (
												<a
													href='/edit-profile-picture'
													className='ml-2 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 20 20'
														fill='currentColor'
														className='h-4 w-4'
													>
														<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
													</svg>
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
