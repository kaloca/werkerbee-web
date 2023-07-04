'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import useWorker from '@/src/hooks/useWorker'

import BlankProfilePicture from '@/src/assets/blank_profile_pic.webp'

interface WorkerProfileCardProps {
	username: string
}

const WorkerProfileCard: React.FC<WorkerProfileCardProps> = ({ username }) => {
	const { data: session } = useSession()

	const { data: worker, isLoading, mutate } = useWorker(username)
	const [showJobTypes, setShowJobTypes] = useState(false)
	const [showCertifications, setShowCertifications] = useState(false)

	return (
		<div>
			{isLoading && <p>Loading</p>}
			{!isLoading && !worker && (
				<div className='pt-20 flex flex-col items-center'>
					This worker does not exist
				</div>
			)}
			{!isLoading && worker && session && (
				<div className='px-2 pt-4 max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full rounded-xl'>
					<div className='px-6'>
						<div className='text-center'>
							<div className='flex flex-row items-center mb-3'>
								<div className='mr-4 rounded-full overflow-hidden w-14 h-14 shadow-xl align-middle border-none'>
									<Image
										alt='profile-pic'
										src={worker.profilePicture || BlankProfilePicture}
										className=''
										style={{ objectFit: 'cover' }}
										width={150}
										height={150}
									/>
								</div>
								<h3 className='text-2xl text-slate-700 font-bold leading-normal'>
									{worker.name}
								</h3>
								<div className='text-xs text-slate-400 font-bold uppercase '>
									{/* <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i> */}
									{/* {worker.address.city}, {worker.address.country} */}
								</div>
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
					</div>
				</div>
			)}
		</div>
	)
}

export default WorkerProfileCard
