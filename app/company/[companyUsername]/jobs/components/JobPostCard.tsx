import { JobPosting } from '@/app/hooks/useJobPostings'

interface JobPostCardProps {
	post: JobPosting
	onClick: (jobPostingId: string) => void
}

const JobPostCard: React.FC<JobPostCardProps> = ({ post, onClick }) => {
	return (
		<div
			key={post._id}
			className='flex flex-col bg-white p-4 border border-gray-400'
			onClick={() => onClick(post._id)}
		>
			<span>{post.name}</span>
			<span>{post.type}</span>
			<span>{post.applications.length} applications</span>
		</div>
	)
}

export default JobPostCard
