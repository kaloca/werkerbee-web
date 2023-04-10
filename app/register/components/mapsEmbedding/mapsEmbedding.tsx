import React, { ChangeEvent } from 'react'
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

interface AddressAutocompleteProps {
	onSelect: (
		address: string,
		coordinates: { lat: number; lng: number },
		addressComponents: google.maps.GeocoderAddressComponent[]
	) => void
	value: string
	onChangeValue: (value: string) => void
	showError: Record<string, any>
	error: string
	// onSelect: (address: string, coordinates: { lat: number; lng: number }) => void
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
	onSelect,
	value: savedValue,
	onChangeValue,
	showError,
	error,
}) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete()

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		onChangeValue(e.target.value)
		setValue(e.target.value)
	}

	const handleSelect = async (description: string) => {
		setValue(description, false)
		onChangeValue(description)
		clearSuggestions()

		try {
			const results = await getGeocode({ address: description })
			const { lat, lng } = await getLatLng(results[0])
			onSelect(description, { lat, lng }, results[0].address_components)
		} catch (error) {
			console.log('Error:', error)
		}
	}

	const renderSuggestions = () =>
		data.map((suggestion: any) => (
			<li
				key={suggestion.place_id}
				onClick={() => handleSelect(suggestion.description)}
			>
				{suggestion.description}
			</li>
		))

	return (
		<div className=' w-96'>
			<label className='text-sm leading-none text-gray-800' id='securityCode'>
				Address
			</label>
			<div>
				<input
					value={savedValue}
					onChange={handleInput}
					disabled={!ready}
					placeholder='Search Address'
					className='w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
				/>
				{status === 'OK' && <ul>{renderSuggestions()}</ul>}
			</div>
			<div className='h-8 mt-2'>
				{showError['address'] && (
					<p className='text-red-600 text-xs'>{error}</p>
				)}
			</div>
		</div>
	)
}

export default AddressAutocomplete
