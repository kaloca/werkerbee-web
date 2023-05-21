import React from 'react'

interface RatingProps {
	rating: number
}

const FullStar = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 20 20'
		fill='currentColor'
		className='h-5 w-5 text-yellow-500'
	>
		<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
	</svg>
)

const EmptyStar = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		stroke='currentColor'
		className='h-4 w-4 text-yellow-500'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
		></path>
	</svg>
)

const HalfStar = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='currentColor'
		className='h-5 w-5 text-yellow-500'
	>
		<defs>
			<linearGradient id='half-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
				<stop
					offset='50%'
					style={{ stopColor: 'currentColor', stopOpacity: 1 }}
				/>
				<stop
					offset='50%'
					style={{ stopColor: 'currentColor', stopOpacity: 0 }}
				/>
			</linearGradient>
		</defs>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
			fill='url(#half-gradient)'
		></path>
	</svg>
)

function roundToNearestHalf(rating: number) {
	return Math.round(rating * 2) / 2
}

function getStarComponents(rating: number) {
	const roundedRating = roundToNearestHalf(rating)
	const fullStars = Math.floor(roundedRating)
	const halfStars = roundedRating % 1 === 0.5 ? 1 : 0
	const emptyStars = 5 - fullStars - halfStars

	return {
		FullStar: fullStars,
		EmptyStar: emptyStars,
		HalfStar: halfStars,
	}
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
	const starComponents = getStarComponents(rating)

	return (
		<div className='flex flex-row items-center justify-start'>
			{Array(starComponents.FullStar)
				.fill(null)
				.map((_, index) => (
					<FullStar key={index} />
				))}
			{Array(starComponents.HalfStar)
				.fill(null)
				.map((_, index) => (
					<FullStar key={index} />
				))}
			<p className='ml-2 font-bold text-xl text-yellow-500'>
				{rating.toFixed(1)}
			</p>
			{/* {Array(starComponents.EmptyStar).fill(<EmptyStar />)} */}
		</div>
	)
}

export default Rating
