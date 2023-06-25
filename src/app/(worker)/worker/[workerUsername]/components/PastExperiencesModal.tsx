import React from 'react'

import { Experience } from '@/src/interfaces/models/Worker'
import { XMarkIcon } from '@heroicons/react/24/outline'
import helpers from '@/src/utils/helpers'

interface PastExperiencesModalProps {
	experiences?: Experience[]
	closeModal: () => void
}

const PastExperiencesModal: React.FC<PastExperiencesModalProps> = ({
	experiences,
	closeModal,
}) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center'>
			<div className='bg-white rounded-lg p-4 absolute z-10 shadow-lg flex flex-col items-center'>
				<div className='w-full inline-flex justify-end'>
					<XMarkIcon
						className='h-8 hover:cursor-pointer'
						onClick={closeModal}
					/>
				</div>
				{!experiences ||
					(experiences.length == 0 && (
						<div>Worker has no past experiences</div>
					))}
				<div className='overflow-scroll'>
					{experiences && (
						<table className='w-full text-left'>
							<thead>
								<tr>
									<th className='p-2'>Position</th>
									<th className='p-2'>Company</th>
									<th className='p-2'>Date</th>
								</tr>
							</thead>
							<tbody>
								{experiences.map((experience) => (
									<tr key={experience._id}>
										<td className='p-2 capitalize'>{experience.jobType}</td>
										<td className='p-2'>{experience.company}</td>
										<td className='p-2'>
											{helpers.formatDateRange(
												new Date(experience.startDate),
												new Date(experience.endDate)
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	)
}

export default PastExperiencesModal
