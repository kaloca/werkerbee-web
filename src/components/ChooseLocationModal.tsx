import { useState } from 'react'

type ChooseLocationModalProps = {
	isOpen: boolean
	onClose: () => void
	onLocationSelect: (location: string) => void
}

const ChooseLocationModal: React.FC<ChooseLocationModalProps> = ({
	isOpen,
	onClose,
	onLocationSelect,
}) => {
	const [location, setLocation] = useState<string>('')

	const handleLocationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(event.target.value)
	}

	const handleLocationConfirm = () => {
		onLocationSelect(location)
		onClose()
	}

	return isOpen ? (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='absolute inset-0 bg-black opacity-50'></div>
			<div className='bg-white p-6 rounded-lg z-50'>
				<button onClick={onClose} className='text-right w-full'>
					Close
				</button>
				<input
					type='text'
					value={location}
					onChange={handleLocationInput}
					placeholder='Enter your location'
					className='mt-4 p-2 border rounded'
				/>
				<button
					onClick={handleLocationConfirm}
					className='mt-4 py-2 px-4 bg-blue-500 text-white rounded'
				>
					Done
				</button>
			</div>
		</div>
	) : null
}

export default ChooseLocationModal
