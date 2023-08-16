import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from '@heroicons/react/24/solid'

type PaginationProps = {
	numberPerPage: number
	totalPages: number
	currentPage: number
	setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	numberPerPage,
	totalPages,
	currentPage,
	setCurrentPage,
}) => {
	const MAX_BUTTONS = 5 // Adjust as needed

	// Generate the range of page numbers to display
	const generatePageNumbers = (): number[] => {
		let start = Math.max(1, currentPage - 2)
		let end = Math.min(totalPages, currentPage + 2)

		const range: number[] = []
		for (let i = start; i <= end; i++) {
			range.push(i)
		}
		return range
	}

	const handlePageClick = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<nav className='border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'>
			<div className='-mt-px w-0 flex-1 flex'>
				<button
					className={`border-t-2 pt-4 pr-1 inline-flex items-center text-sm font-medium ${
						currentPage === 1
							? 'text-gray-400'
							: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
					}`}
					onClick={(e) => {
						setCurrentPage(currentPage - 1)
					}}
					disabled={currentPage <= 1}
				>
					<ArrowLongLeftIcon
						className='mr-3 h-5 w-5 text-gray-400'
						aria-hidden='true'
					/>
					Previous
				</button>
			</div>

			<div className='hidden md:-mt-px md:flex'>
				{generatePageNumbers().map((page) => (
					<a
						key={page}
						href='#'
						className={`border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
							page === currentPage
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
						}`}
						aria-current={page === currentPage ? 'page' : undefined}
						onClick={(e) => {
							e.preventDefault()
							handlePageClick(page)
						}}
					>
						{page}
					</a>
				))}
				{/* Add the ellipsis if there are skipped pages */}
				{totalPages > currentPage + 2 && (
					<span className='border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
						...
					</span>
				)}
			</div>

			<div className='-mt-px w-0 flex-1 flex justify-end'>
				<button
					className={`border-t-2 pt-4 pl-1 inline-flex items-center text-sm font-medium ${
						currentPage === totalPages
							? 'text-gray-400'
							: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
					}`}
					onClick={(e) => {
						setCurrentPage(currentPage + 1)
					}}
					disabled={currentPage >= totalPages}
				>
					Next
					<ArrowLongRightIcon
						className='ml-3 h-5 w-5 text-gray-400'
						aria-hidden='true'
					/>
				</button>
			</div>
		</nav>
	)
}

export default Pagination
