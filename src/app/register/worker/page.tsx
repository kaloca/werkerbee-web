'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoadScript } from '@react-google-maps/api'

import {
	ArrowLeftIcon,
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import apiClient from '@/src/utils/apiClient'
import helpers from '@/src/utils/helpers'
import { useSnackbar } from '@/src/app/context/snackbarContext'

import JobTypesInput from '../components/JobTypesInput'
import CertifiicationsInput from '../components/CertificationsInput'
import AddressAutocomplete from '../components/mapsEmbedding/newMapsEmbedding'

const libraries: (
	| 'places'
	| 'drawing'
	| 'geometry'
	| 'localContext'
	| 'visualization'
)[] = ['places']

export interface CreateWorkerForm {
	firstName: string
	lastName: string
	email: string
	country: string
	streetAddress: string
	city: string
	state: string
	zip: string
	jobTypes: string[]
	upskillingTypes: string[]
	username: string
	birthday: string
	phoneNumber: string
	certifications: string[]
	password: string
	location?: {
		type: string
		coordinates: [number, number]
	}
}

export default function NewWorkerPage() {
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const searchParams = useSearchParams()

	const formRef = useRef<HTMLFormElement>(null)

	const [formData, setFormData] = useState<CreateWorkerForm>({
		firstName: '',
		lastName: '',
		email: searchParams?.get('email') || '',
		country: 'United States',
		streetAddress: '',
		city: '',
		state: '',
		zip: '',
		jobTypes: [],
		upskillingTypes: [],
		username: '',
		birthday: '',
		phoneNumber: '',
		certifications: [],
		password: '',
	})

	const [confirmPassword, setConfirmPassword] = useState('')
	const [showConfirmPasswordError, setShowConfirmPasswordError] =
		useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (confirmPassword.length > 0 && confirmPassword != formData.password) {
			setShowConfirmPasswordError(true)
		} else {
			setShowConfirmPasswordError(false)
		}
	}, [confirmPassword, formData.password])

	const handleAddressSelect = (
		address: string,
		coordinates: { lat: number; lng: number },
		addressComponents: google.maps.GeocoderAddressComponent[]
	) => {
		console.log(addressComponents)

		const street =
			addressComponents.find((component) =>
				component.types.includes('street_number')
			)?.short_name +
			' ' +
			addressComponents.find((component) => component.types.includes('route'))
				?.short_name
		const city = addressComponents.find((component) =>
			component.types.includes('locality')
		)?.long_name
		const state = addressComponents.find((component) =>
			component.types.includes('administrative_area_level_1')
		)?.short_name
		const country = addressComponents.find((component) =>
			component.types.includes('country')
		)?.long_name
		const zip = addressComponents.find((component) =>
			component.types.includes('postal_code')
		)?.long_name

		setFormData({
			...formData,
			streetAddress: street as string,
			city: city as string,
			state: state as string,
			country: country as string,
			zip: zip as string,
			location: {
				type: 'Point',
				coordinates: [coordinates.lng, coordinates.lat],
			},
		})
	}

	const handleSubmit = async () => {
		const workerObj = {
			name: formData.firstName + ' ' + formData.lastName,
			username: formData.username,
			email: formData.email,
			//ssn: formData.ssn,
			birthday: formData.birthday,
			phoneNumber: formData.phoneNumber,
			jobTypesIds: formData.jobTypes,
			address: {
				country: formData.country,
				state: formData.state,
				city: formData.city,
				street: formData.streetAddress,
				zip: formData.zip,
			},
			certifications: formData.certifications,
			...(formData.location ? { location: formData.location } : {}),
			password: formData.password,
		}

		try {
			const response = await apiClient({
				method: 'post',
				url: '/register/worker',
				token: '',
				data: workerObj,
			})

			if (response?.status === 200) {
				console.log('Worker profile created successfuly')
				window.location.href = '/register/success'
			} else {
				console.error(`Error creating worker profile: ${response.data.message}`)
			}
		} catch (error: any) {
			console.error(
				'Error creating worker profile:',
				error.response.data.message
			)
			showSnackbar('error', error.response.data.message)
		}
	}

	return (
		<div className='px-4 sm:px-6 lg:px-44 xl:px-72 pt-10'>
			<div className='inline-flex items-center justify-between w-full'>
				<div className='inline-flex'>
					<ArrowLeftIcon
						onClick={() => router.push('/')}
						className='h-12 mr-5 p-2 rounded hover:cursor-pointer hover:bg-gray-200'
					/>
					<div>
						<h1 className='text-xl font-semibold text-gray-900'>
							Sign up to WerkerBee
						</h1>
						<p className='mt-2 text-sm text-gray-700'>
							Manually register a worker profile
						</p>
					</div>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					{/* <button
						onClick={() => {}}
						type='button'
						className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
					>
						Add Worker
					</button> */}
				</div>
			</div>
			<div className='bg-white px-12 py-10 rounded-lg'>
				<form ref={formRef}>
					<div className='space-y-12'>
						<div className='border-b border-gray-900/10 pb-12'>
							{/* <h2 className='text-base font-semibold leading-7 text-gray-900'>
								Personal Information
							</h2>
							<p className='mt-1 text-sm leading-6 text-gray-600'>
								Use a permanent address where you can receive mail.
							</p> */}

							<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='first-name'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										First name
									</label>
									<div className='mt-2'>
										<input
											required
											type='text'
											name='first-name'
											id='first-name'
											autoComplete='given-name'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.firstName}
											onChange={(e) =>
												setFormData({ ...formData, firstName: e.target.value })
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='last-name'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Last name
									</label>
									<div className='mt-2'>
										<input
											required
											type='text'
											name='last-name'
											id='last-name'
											autoComplete='family-name'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.lastName}
											onChange={(e) =>
												setFormData({ ...formData, lastName: e.target.value })
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-4'>
									<label
										htmlFor='birthday'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Birthday
									</label>
									<div className='mt-2'>
										<input
											required
											id='birthday'
											name='birthday'
											type='date'
											autoComplete='birthday'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.birthday}
											onChange={(e) =>
												setFormData({ ...formData, birthday: e.target.value })
											}
										/>
									</div>
								</div>
								<div className='sm:col-span-4'>
									<label
										htmlFor='email'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Email address
									</label>
									<div className='mt-2'>
										<input
											required
											id='email'
											name='email'
											type='email'
											autoComplete='email'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
										/>
									</div>
								</div>
								<div className='sm:col-span-2'>
									<label
										htmlFor='email'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Phone Number
									</label>
									<div className='mt-2'>
										<input
											required
											id='phone-number'
											name='phone-number'
											type='text'
											autoComplete='phonenumber'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.phoneNumber}
											onChange={(e) =>
												setFormData({
													...formData,
													phoneNumber: helpers.autoFormatPhoneNumber(
														e.target.value
													),
												})
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='country'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Country
									</label>
									<div className='mt-2'>
										<select
											id='country'
											name='country'
											autoComplete='country-name'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
											value={formData.country}
											onChange={(e) =>
												setFormData({ ...formData, country: e.target.value })
											}
										>
											<option>United States</option>
											{/* <option>Canada</option>
											<option>Mexico</option> */}
										</select>
									</div>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='street-address'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Street address
									</label>
									<div className='mt-2'>
										<LoadScript
											googleMapsApiKey={
												process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY as string
											}
											libraries={libraries}
										>
											<AddressAutocomplete
												onSelect={handleAddressSelect}
												value={formData.streetAddress}
												onChangeValue={(value) => {
													setFormData({
														...formData,
														streetAddress: value,
													})
												}}
											/>
										</LoadScript>
										{/* <input
											required
											type='text'
											name='street-address'
											id='street-address'
											autoComplete='street-address'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.streetAddress}
											onChange={(e) =>
												setFormData({
													...formData,
													streetAddress: e.target.value,
												})
											}
										/> */}
									</div>
								</div>

								<div className='sm:col-span-2 sm:col-start-1'>
									<label
										htmlFor='city'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										City
									</label>
									<div className='mt-2'>
										<input
											required
											type='text'
											name='city'
											id='city'
											autoComplete='address-level2'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.city}
											onChange={(e) =>
												setFormData({ ...formData, city: e.target.value })
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-2'>
									<label
										htmlFor='region'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										State / Province
									</label>
									<div className='mt-2'>
										<input
											required
											type='text'
											name='region'
											id='region'
											autoComplete='address-level1'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.state}
											onChange={(e) =>
												setFormData({ ...formData, state: e.target.value })
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-2'>
									<label
										htmlFor='postal-code'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										ZIP / Postal code
									</label>
									<div className='mt-2'>
										<input
											required
											type='text'
											name='postal-code'
											id='postal-code'
											autoComplete='postal-code'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.zip}
											onChange={(e) =>
												setFormData({ ...formData, zip: e.target.value })
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='border-b border-gray-900/10 pb-12'>
							{/* <h2 className='text-base font-semibold leading-7 text-gray-900'>
								Profile
							</h2> */}
							{/* <p className='mt-1 text-sm leading-6 text-gray-600'>
								This information will be displayed publicly so be careful what
								you share.
							</p> */}

							<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-4'>
									<label
										htmlFor='username'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Username
									</label>
									<div className='mt-2'>
										<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
											<span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
												werkerbee.com/worker/
											</span>
											<input
												required
												type='text'
												name='username'
												id='username'
												autoComplete='username'
												className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
												placeholder='janesmith'
												value={formData.username}
												onChange={(e) =>
													setFormData({
														...formData,
														username: e.target.value.toLowerCase(),
													})
												}
											/>
										</div>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<div className='inline-flex items-center'>
										<label
											htmlFor='first-name'
											className='block text-sm font-medium leading-6 text-gray-900'
										>
											Password
										</label>
										{showPassword ? (
											<EyeIcon
												onClick={() => setShowPassword(false)}
												className='h-5 ml-2 hover:cursor-pointer'
											/>
										) : (
											<EyeSlashIcon
												onClick={() => setShowPassword(true)}
												className='h-5 ml-2 hover:cursor-pointer'
											/>
										)}
									</div>
									<div className='mt-2'>
										<input
											required
											type={showPassword ? 'text' : 'password'}
											name='password'
											id='password'
											autoComplete='new-password'
											placeholder='Choose a secure password'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={formData.password}
											onChange={(e) =>
												setFormData({ ...formData, password: e.target.value })
											}
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='last-name'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Confirm Password
									</label>
									<div className='mt-2'>
										<input
											required
											type={showPassword ? 'text' : 'password'}
											name='confirm-password'
											id='confirm-password'
											autoComplete='new-password'
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										{showConfirmPasswordError && (
											<span className='text-xs text-red-500'>
												Passwords do not match
											</span>
										)}
									</div>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='about'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										About
									</label>
									<div className='mt-2'>
										<textarea
											id='about'
											name='about'
											rows={3}
											className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											defaultValue={''}
										/>
									</div>
									<p className='mt-3 text-sm leading-6 text-gray-600'>
										Write a few sentences about yourself.
									</p>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='photo'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Profile Picture
									</label>
									<div className='mt-2 flex items-center gap-x-3'>
										<UserCircleIcon
											className='h-12 w-12 text-gray-300'
											aria-hidden='true'
										/>
										<button
											type='button'
											className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
										>
											Change
										</button>
									</div>
								</div>

								{/* <div className='col-span-full'>
									<label
										htmlFor='cover-photo'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Cover photo
									</label>
									<div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
										<div className='text-center'>
											<PhotoIcon
												className='mx-auto h-12 w-12 text-gray-300'
												aria-hidden='true'
											/>
											<div className='mt-4 flex text-sm leading-6 text-gray-600'>
												<label
													htmlFor='file-upload'
													className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
												>
													<span>Upload a file</span>
													<input
required
														id='file-upload'
														name='file-upload'
														type='file'
														className='sr-only'
													/>
												</label>
												<p className='pl-1'>or drag and drop</p>
											</div>
											<p className='text-xs leading-5 text-gray-600'>
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						<div className='border-b border-gray-900/10 pb-12'>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>
								Job Qualifications
							</h2>
							<div className='mt-10 space-y-10'>
								<fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										Qualified Jobs
									</legend>
									<JobTypesInput
										onChange={(value) => {
											let currentTypes = formData.jobTypes
											if (currentTypes.includes(value)) {
												currentTypes = currentTypes.filter(
													(type) => type != value
												)
											} else {
												currentTypes.push(value)
											}
											setFormData({
												...formData,
												jobTypes: currentTypes,
											})
										}}
										placeholder='Select '
										inputName='jobTypes'
										showError={{}}
										error='Test'
										// label={'Job Types'}
										value={formData.jobTypes}
									/>
								</fieldset>
								<fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										Upskilling Jobs
									</legend>
									<JobTypesInput
										onChange={(value) => {
											let currentTypes = formData.upskillingTypes
											if (currentTypes.includes(value)) {
												currentTypes = currentTypes.filter(
													(type) => type != value
												)
											} else {
												currentTypes.push(value)
											}
											setFormData({
												...formData,
												upskillingTypes: currentTypes,
											})
										}}
										placeholder='Select '
										inputName='upskillingTypes'
										showError={{}}
										error='Test'
										value={formData.upskillingTypes}
									/>
								</fieldset>
								<fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										Certifications
									</legend>
									<CertifiicationsInput
										formData={formData}
										setFormData={setFormData}
										showLabel={false}
									/>
								</fieldset>
								{/* <fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										Push Notifications
									</legend>
									<p className='mt-1 text-sm leading-6 text-gray-600'>
										These are delivered via SMS to your mobile phone.
									</p>
									<div className='mt-6 space-y-6'>
										<div className='flex items-center gap-x-3'>
											<input
												required
												id='push-everything'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-everything'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Everything
											</label>
										</div>
										<div className='flex items-center gap-x-3'>
											<input
												required
												id='push-email'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-email'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Same as email
											</label>
										</div>
										<div className='flex items-center gap-x-3'>
											<input
												required
												id='push-nothing'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-nothing'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												No push notifications
											</label>
										</div>
									</div>
								</fieldset> */}
							</div>
						</div>
						{/* <div className='border-b border-gray-900/10 pb-12'>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>
								Notifications
							</h2>
							<p className='mt-1 text-sm leading-6 text-gray-600'>
								We'll always let you know about important changes, but you pick
								what else you want to hear about.
							</p>

							<div className='mt-10 space-y-10'>
								<fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										By Email
									</legend>
									<div className='mt-6 space-y-6'>
										<div className='relative flex gap-x-3'>
											<div className='flex h-6 items-center'>
												<input
required
													id='comments'
													name='comments'
													type='checkbox'
													className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
												/>
											</div>
											<div className='text-sm leading-6'>
												<label
													htmlFor='comments'
													className='font-medium text-gray-900'
												>
													Comments
												</label>
												<p className='text-gray-500'>
													Get notified when someones posts a comment on a
													posting.
												</p>
											</div>
										</div>
										<div className='relative flex gap-x-3'>
											<div className='flex h-6 items-center'>
												<input
required
													id='candidates'
													name='candidates'
													type='checkbox'
													className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
												/>
											</div>
											<div className='text-sm leading-6'>
												<label
													htmlFor='candidates'
													className='font-medium text-gray-900'
												>
													Candidates
												</label>
												<p className='text-gray-500'>
													Get notified when a candidate applies for a job.
												</p>
											</div>
										</div>
										<div className='relative flex gap-x-3'>
											<div className='flex h-6 items-center'>
												<input
required
													id='offers'
													name='offers'
													type='checkbox'
													className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
												/>
											</div>
											<div className='text-sm leading-6'>
												<label
													htmlFor='offers'
													className='font-medium text-gray-900'
												>
													Offers
												</label>
												<p className='text-gray-500'>
													Get notified when a candidate accepts or rejects an
													offer.
												</p>
											</div>
										</div>
									</div>
								</fieldset>
								<fieldset>
									<legend className='text-sm font-semibold leading-6 text-gray-900'>
										Push Notifications
									</legend>
									<p className='mt-1 text-sm leading-6 text-gray-600'>
										These are delivered via SMS to your mobile phone.
									</p>
									<div className='mt-6 space-y-6'>
										<div className='flex items-center gap-x-3'>
											<input
required
												id='push-everything'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-everything'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Everything
											</label>
										</div>
										<div className='flex items-center gap-x-3'>
											<input
required
												id='push-email'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-email'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												Same as email
											</label>
										</div>
										<div className='flex items-center gap-x-3'>
											<input
required
												id='push-nothing'
												name='push-notifications'
												type='radio'
												className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
											/>
											<label
												htmlFor='push-nothing'
												className='block text-sm font-medium leading-6 text-gray-900'
											>
												No push notifications
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div> */}
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						{/* <button
							type='button'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Cancel
						</button> */}
						<button
							onClick={(e) => {
								if (formRef.current?.checkValidity()) {
									e.preventDefault()
									handleSubmit()
								}
							}}
							type='submit'
							className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Create Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
