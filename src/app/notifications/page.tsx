'use client'
import { SyncLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

import useNotifications from '@/src/hooks/useNotification'

import NotificationCard from './components/NotificationCard'

const NotificationsPage = () => {
	const { data, error, isLoading, total, refetch } = useNotifications()

	if (error) {
		return <div>Error: {error.message}</div>
	}

	console.log(data)

	return (
		<div className='flex flex-col justify-center items-center pt-20 bg-slate-300 h-full w-full overflow-hidden'>
			<div
				className=' w-80 overflow-scroll h-full no-scrollbar'
				id='notificationsContainer'
			>
				{!isLoading && data && data.length > 0 && total && (
					<InfiniteScroll
						dataLength={data.length}
						next={refetch}
						hasMore={data.length < total}
						loader={<h4>Loading...</h4>}
						endMessage={
							<p style={{ textAlign: 'center' }}>
								<b>Yay! You have seen it all</b>
							</p>
						}
						scrollableTarget='notificationsContainer'
					>
						{data.map((notification) => (
							<NotificationCard
								key={notification._id}
								notification={notification}
							/>
						))}
					</InfiniteScroll>
				)}
				{!isLoading && data && data.length == 0 && (
					<div className='bg-white px-5 py-5 shadow-md text-gray-700 mt-32 rounded font-bold'>
						No new notifications
					</div>
				)}
			</div>
		</div>
	)
}

export default NotificationsPage
