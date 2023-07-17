import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import axios from 'axios'


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
	const [open, setOpen] = useState(true)

	const [location, setLocation] = useState<string>('')

	const [searchText, setSearchText] = useState('')

	const [selectedLocation, setSelectedLocation] = useState({
		lat: 37.8,
		lng: -122.3
	})

	const handleLocationInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(event.target.value)
	}

	const handleLocationConfirm = () => {
		onLocationSelect(location)
		onClose()
	}

	const handleMapClick = (e) => {
		setSelectedLocation({
			lat: e.latLng.lat(),
			lng: e.latLng.lng()
		})
	}

	const handleCurrentLocation = (pos: GeolocationPosition) => {
		setSelectedLocation({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		})
	}

	const handleSearch = () => {
		var query = "https://nominatim.openstreetmap.org/search?q="
					+ searchText + "&countrycodes=us" + "&limit=1"
					+ "&format=json&viewbox=-122.6,38.2,-121.6,37.2"//Bias results to bay area
		console.log(query)
		axios.get(query)
			.then(response => setSelectedLocation({
				lat: parseFloat(response.data[0].lat),
				lng: parseFloat(response.data[0].lon)
			}))
	}

	const {isLoaded} = useJsApiLoader({
		id: 'worker-location-picker',
		googleMapsApiKey: (process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY ?? "")
	})

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={() => {
					onClose()
					setOpen(false)
				}}
			>
				<div className='flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6'>
							<div>
								{/* <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
									<CheckIcon
										className='h-6 w-6 text-green-600'
										aria-hidden='true'
									/>
								</div> */}
								<div className='text-center sm:mt-2'>
									<Dialog.Title
										as='h3'
										className='text-lg leading-6 font-medium text-gray-900'
									>
										Choose Your Location
									</Dialog.Title>
									
									<div className='mt-2'/>
									<div className="flex rounded-md border border-gray-200">
									<input 
											type="text" 
											className="rounded-l-md py-2 px-4 border-none text-gray-800 bg-white w-full" 
											placeholder="Enter Address"
											onChange={(e) => {setSearchText(e.target.value)}}
										/>
										<button 
											className="rounded-r-md bg-gray-100 text-base font-medium text-indigo-700 hover:bg-gray-200 px-4"
											onClick={handleSearch}
										>
											<MagnifyingGlassIcon className='h-6 w-6'/>
										</button>					
									</div>

									<div className='mb-10 rounded-lg border mt-2'>
										{ isLoaded ? (
											<GoogleMap
												mapContainerClassName='rounded-lg'
												mapContainerStyle = {{
													width: "100%",
													height: "300px"
												}}
												zoom = {10}
												center = {selectedLocation}
												onClick = {handleMapClick}
												>
												<Marker
													position={selectedLocation}
												/>
											</GoogleMap>)
											: (<div></div>)
										}
									</div>
									<button
										type='button'
										className='inline-flex justify-center w-full mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-indigo-700 hover:bg-gray-200 sm:text-sm'
										onClick={() => {
											navigator.geolocation.getCurrentPosition(handleCurrentLocation)
										}}
										>
										Use current location
									</button>
								</div>
							</div>
							<div className='mt-5 sm:mt-6 grid grid-cols-2 gap-2'>
								<button
									type='button'
									className='inline-flex justify-center w-full mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-indigo-700 hover:bg-gray-200 sm:text-sm'
									onClick={() => {
										setOpen(false)
										onClose()
									}}
								>
									Cancel
								</button>
								<button
									type='button'
									className='inline-flex justify-center w-full ml-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700	 sm:text-sm'
									onClick={() => {
										setOpen(false)
										onClose()
									}}
								>
									Confirm
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default ChooseLocationModal
