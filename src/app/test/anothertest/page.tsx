// 'use client'
// import React from 'react'

// import List from './components/List'
// import TopBar from './components/TopBar'
// import useApplications from '@/src/hooks/useApplications'

// const ApplicationManager = () => {
// 	const { data, error, isLoading } = useApplications()

// 	if (isLoading) {
// 		return <div>Loading...</div>
// 	}

// 	if (error) {
// 		return <div>Error: {error.message}</div>
// 	}

// 	if (data && data.length == 0) {
// 		return <div>No current job applications</div>
// 	}

// 	console.log(data)

// 	return (
// 		<div className='py-20 w-screen bg-slate-100 px-64 h-full'>
// 			<TopBar />
// 			{data && <List />}
// 		</div>
// 	)
// }
// export default ApplicationManager
