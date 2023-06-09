import { useRouter } from 'next/navigation'

import { Notification } from '@/src/hooks/useNotification'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

interface NotificationCardProps {
	notification: Notification
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	notification,
}) => {
	const router = useRouter()

	const { action, message, readStatus } = notification

	return (
		<div
			className={`${
				readStatus ? ' bg-white' : 'bg-white'
			} max-w-sm w-full  hover:bg-gray-50 shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5`}
			onClick={() => (action ? router.push(action) : null)}
		>
			<div className='p-4'>
				<div className='flex items-start'>
					<div className='flex-shrink-0'>
						<CheckCircleIcon className='h-6 w-6 text-green-400' />
						{/* <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" /> */}
					</div>
					<div className='ml-3 w-0 flex-1 pt-0.5'>
						<p className='text-sm font-medium text-gray-900'>{message}</p>
						<p className='mt-1 text-sm text-gray-500'>
							Anyone with a link can now view this file.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotificationCard
