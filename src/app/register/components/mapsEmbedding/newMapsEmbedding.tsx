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
	showError?: Record<string, any>
	error?: string
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
		<div>
			<input
				required
				type='text'
				name='street-address'
				id='street-address'
				autoComplete='street-address'
				className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				onChange={handleInput}
				value={savedValue}
				disabled={!ready}
				placeholder='Search Address'
			/>
			{status === 'OK' && <ul>{renderSuggestions()}</ul>}
		</div>
	)
}

export default AddressAutocomplete
