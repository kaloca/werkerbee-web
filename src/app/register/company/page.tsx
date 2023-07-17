'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

import { BASE_URL } from '@/src/utils/constants'
import helpers from '@/src/utils/helpers'
import useJobTypes from '@/src/hooks/useJobTypes'

import RegisterTabs from '../components/registerTabs'
import RegisterInput from '../components/registerInput'
import AddressAutocomplete from '../components/mapsEmbedding/mapsEmbedding'
import RegisterDropdownInput from '../components/registerDropdownInput'
import RegisterChecklistInput from '../components/jobTypesInput'
import { signIn } from 'next-auth/react'

const libraries: (
	| 'places'
	| 'drawing'
	| 'geometry'
	| 'localContext'
	| 'visualization'
)[] = ['places']

export default function RegisterCompanyPage({ params }: any) {
	const [currentStep, setCurrentStep] = useState(1)
	const [reenterPassword, setReenterPassword] = useState('')
	const [address, setAddress] = useState('')
	const [error, setError] = useState({
		name: false,
		username: false,
		email: false,
		phoneNumber: false,
		location: false,
		type: false,
		jobTypes: false,
		address: {
			street: false,
			city: false,
			state: false,
			country: false,
			zip: false,
		},
		password: false,
		reenterPassword: false,
	})
	const [formData, setFormData] = useState({
		name: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		username: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		email: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		phoneNumber: {
			value: '',
			required: false,
			step: 1,
			hasChanged: false,
		},
		location: {
			value: {
				type: 'Point',
				coordinates: [0, 0],
			},
			required: true,
			step: 2,
			hasChanged: false,
		},
		type: {
			value: '',
			required: true,
			step: 2,
			hasChanged: false,
		},
		jobTypes: {
			value: [''],
			required: true,
			step: 2,
			hasChanged: false,
		},
		address: {
			value: {
				street: '',
				city: '',
				state: '',
				country: '',
				zip: '',
			},
			required: true,
			step: 2,
			hasChanged: false,
		},
		password: { value: '', required: true, step: 1, hasChanged: false },
	})

	const handleAddressSelect = (
		address: string,
		coordinates: { lat: number; lng: number },
		addressComponents: google.maps.GeocoderAddressComponent[]
	) => {
		const street =
			addressComponents.find((component) =>
				component.types.includes('street_number')
			)?.long_name ||
			'' +
				addressComponents.find((component) => component.types.includes('route'))
					?.long_name
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
			address: {
				value: {
					street: street as string,
					city: city as string,
					state: state as string,
					country: country as string,
					zip: zip as string,
				},
				required: true,
				step: 2,
				hasChanged: true,
			},
			location: {
				value: {
					type: 'Point',
					coordinates: [coordinates.lng, coordinates.lat],
				},
				required: true,
				step: 2,
				hasChanged: true,
			},
		})
	}

	const setShowError = (errorName: string, value: boolean) => {
		setError((prevState) => ({ ...prevState, [errorName]: value }))
	}

	useEffect(() => {
		if (
			formData.email.hasChanged &&
			(formData.email.value == '' ||
				!helpers.validateEmail(formData.email.value))
		) {
			setShowError('email', true)
		} else {
			setShowError('email', false)
		}
	}, [formData.email])

	useEffect(() => {
		if (
			formData.username.hasChanged &&
			(formData.username.value == '' ||
				!helpers.validateUsername(formData.username.value))
		) {
			setShowError('username', true)
		} else {
			setShowError('username', false)
		}
	}, [formData.username])

	useEffect(() => {
		if (formData.address.hasChanged && address == '') {
			setShowError('address', true)
		} else {
			setShowError('address', false)
		}
	}, [address, formData.address.hasChanged])

	useEffect(() => {
		if (
			formData.phoneNumber.hasChanged &&
			(formData.phoneNumber.value == '' ||
				!helpers.validatePhoneNumber(formData.phoneNumber.value))
		) {
			setShowError('phoneNumber', true)
		} else {
			setShowError('phoneNumber', false)
		}
	}, [formData.phoneNumber])

	useEffect(() => {
		if (formData.name.hasChanged && formData.name.value == '') {
			setShowError('name', true)
		} else {
			setShowError('name', false)
		}
	}, [formData.name])

	useEffect(() => {
		if (
			formData.password.hasChanged &&
			(reenterPassword == '' || reenterPassword != formData.password.value)
		) {
			setShowError('reenterPassword', true)
		} else {
			setShowError('reenterPassword', false)
		}
	}, [reenterPassword, formData.password])

	useEffect(() => {
		if (
			formData.password.hasChanged &&
			(formData.password.value == '' || formData.password.value.length < 8)
		) {
			setShowError('password', true)
		} else {
			setShowError('password', false)
		}
	}, [formData.password])

	const handleChange = (e: any) => {
		const { name: fieldName, value } = e.target
		setFormData({
			...formData,
			[fieldName]: { value: value, hasChanged: true },
		})
	}

	const handlePhoneNumberChange = (e: any) => {
		const { value } = e.target
		setFormData({
			...formData,
			phoneNumber: {
				value: helpers.autoFormatPhoneNumber(value),
				required: false,
				step: 1,
				hasChanged: true,
			},
		})
	}

	const handleSubmit = async () => {
		// e.preventDefault()

		const outputJobTypes = formData.jobTypes.value.map((item: string) => {
			if (item != '') return { type: item }
		})

		const userObj = {
			name: formData.name.value,
			username: formData.username.value,
			email: formData.email.value,
			location: formData.location.value,
			type: formData.type.value,
			jobTypes: outputJobTypes,
			address: formData.address.value,
			password: formData.password.value,
		}

		const response = await fetch(`${BASE_URL}/register/company`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userObj),
		})

		if (response.ok) {
			const { email, password } = userObj
			signIn('credentials', { email, password, callbackUrl: '/' }).catch(
				(error) => console.error('Failed to sign in:', error)
			)
		} else {
			// Handle error
			console.error('Registration failed:', await response.text())
		}
	}

	const handleCheckUsernameEmail = async () => {
		const response = await fetch(`${BASE_URL}/check-email-username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: formData.email.value,
				username: formData.username.value,
			}),
		})
		if (response.ok) {
			const { emailExists, usernameExists } = await response.json()
			console.log(emailExists, usernameExists)
			if (emailExists != null) {
				setShowError('email', true)
			}
			if (usernameExists != null) {
				setShowError('username', true)
			}

			if (!emailExists && !usernameExists) {
				return true
			}
		}
	}

	const handleNextStep = async () => {
		let newError: any = { ...error } // Create a copy of the error object to update
		let shouldReturn = false

		Object.entries(formData).forEach(([key, field]) => {
			if (
				(field.required === true &&
					field.value === '' &&
					field.step == currentStep) ||
				(key == 'address' &&
					currentStep == 2 &&
					Object.values(formData.address.value).some((param) => param === ''))
			) {
				console.log('hello papa')
				newError[key] = true
				shouldReturn = true
			} else {
				newError[key] = false
			}
		})

		setError(newError)

		if (shouldReturn) return

		if (
			Object.entries(error).some(
				([key, value]) =>
					value === true && (formData as any)[key].step === currentStep
			)
		) {
		} else if (currentStep == 1) {
			if (await handleCheckUsernameEmail()) setCurrentStep(currentStep + 1)
			else return
		} else handleSubmit()
	}

	return (
		<>
			<div className='flex items-start justify-center h-full'>
				<div className='xl:w-8/12 w-full px-16 pt-7'>
					<div className='flex flex-row w-full justify-between items-center h-20'>
						{currentStep > 1 ? (
							<button
								role='button'
								onClick={() => setCurrentStep(currentStep - 1)}
								aria-label='Next step'
								className='flex items-center justify-center py-2 px-7 focus:outline-none bg-white border rounded border-gray-400 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								<svg
									className='mr-3'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1'></path>
								</svg>
								<span className='text-sm font-medium text-center text-gray-800 capitalize'>
									Previous Step
								</span>
							</button>
						) : (
							<div className=' w-28'></div>
						)}
						{/* <RegisterTabs currentStep={currentStep} /> */}
						{currentStep < 2 && (
							<button
								role='button'
								onClick={handleNextStep}
								aria-label='Next step'
								className='flex items-center justify-center py-2 px-7 focus:outline-none bg-white border rounded border-gray-400 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								<span className='text-sm font-medium text-center text-gray-800 capitalize'>
									Next Step
								</span>
								<svg
									className='ml-3'
									width={12}
									height={8}
									viewBox='0 0 12 8'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z' fill='#242731' />
								</svg>
							</button>
						)}
						{currentStep == 2 && (
							<button
								role='button'
								onClick={handleNextStep}
								aria-label='Next step'
								className='flex items-center justify-center py-2 px-7 focus:outline-none bg-blue-600 border rounded border-gray-400 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								<span className='text-sm font-medium text-center text-white capitalize'>
									Submit
								</span>
							</button>
						)}
					</div>
					<form onSubmit={handleSubmit}>
						{currentStep == 1 ? (
							<div className='xl:px-24'>
								<div className='mt-16 lg:flex justify-between border-b border-gray-200 pb-16'>
									<div className='w-80'>
										<div className='flex items-center'>
											<h1 className='text-xl font-medium pr-2 leading-5 text-gray-800'>
												Login Information
											</h1>
										</div>
										<p className='mt-4 text-sm leading-5 text-gray-600'>
											If registering a franchised brand, make sure to include
											the branch name. (ex: Wendy&apos;s Redwood City)
										</p>
									</div>
									<div>
										<div className='md:flex items-center lg:ml-24 lg:mt-0 mt-4'>
											<div className='md:w-64'>
												<RegisterInput
													label='Company Name'
													type='name'
													onChange={handleChange}
													placeholder='Chick-fil-a'
													showError={error}
													error='Enter a valid name'
													inputName='name'
													value={formData.name.value}
												/>
											</div>
											<div className='md:w-64 md:ml-12 md:mt-0 mt-4'>
												<RegisterInput
													label='Username'
													type='name'
													onChange={handleChange}
													placeholder='Choose a username'
													showError={error}
													error={
														formData.username.value == ''
															? 'Username is required'
															: 'Username not valid'
													}
													inputName='username'
													value={formData.username.value}
												/>
											</div>
										</div>
										<div className='md:flex items-center lg:ml-24 mt-8'>
											<div className='md:w-64'>
												<RegisterInput
													label='Email address'
													type='email'
													onChange={handleChange}
													placeholder='youremail@example.com'
													showError={error}
													error='Enter a valid email address'
													inputName='email'
													value={formData.email.value}
												/>
											</div>
											<div className='md:w-64 md:ml-12 md:mt-0 mt-4'>
												<RegisterInput
													label='Phone number'
													type='name'
													onChange={handlePhoneNumberChange}
													placeholder='123-1234567'
													value={formData.phoneNumber.value}
													showError={error}
													error='Enter a valid phone number'
													inputName='phoneNumber'
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4'>
									<div className='w-80'>
										<div className='flex items-center'>
											<h1 className='text-xl font-medium pr-2 leading-5 text-gray-800'>
												Security
											</h1>
										</div>
										<p className='mt-4 text-sm leading-5 text-gray-600'>
											Your password needs to be at least 8 digits long. Make
											sure to write it down somewhere so you don&apos;t forget
											it!
										</p>
									</div>
									<div className='flex flex-col  p-1'>
										<div className='flex flex-row '>
											<div className='md:flex items-center lg:ml-24 lg:mt-0 mt-4'>
												<div className='md:w-64'>
													<RegisterInput
														label='Password'
														type='password'
														onChange={handleChange}
														placeholder='Enter your password'
														showError={error}
														error={
															formData.password.value.length == 0
																? 'Password is required'
																: 'Invalid Password'
														}
														inputName='password'
														value={formData.password.value}
													/>
												</div>
												<div className='md:w-64 md:ml-12 md:mt-0 mt-4'>
													<RegisterInput
														label='Re-enter Your Password'
														type='password'
														onChange={(e: any) =>
															setReenterPassword(e.target.value)
														}
														placeholder='Re-enter your password'
														showError={error}
														error='Passwords do not match'
														inputName='reenterPassword'
														value={reenterPassword}
													/>
												</div>
											</div>
											{/* <div className='md:flex items-center lg:ml-24 mt-8'>
        										<div className='md:w-64'>
        											<label
        												className='text-sm leading-none text-gray-800'
        												id='recoverEmail'
        											>
        												Recovery Email address
        											</label>
        											<input
        												type='name'
        												tabIndex={0}
        												className='w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
        												aria-labelledby='recoveryEmail'
        												placeholder='Your recovery email'
        											/>
        										</div>
        										<div className='md:w-64 md:ml-12 md:mt-0 mt-4'>
        											<label
        												className='text-sm leading-none text-gray-800'
        												id='altPhone'
        											>
        												Alternate phone number
        											</label>
        											<input
        												type='name'
        												tabIndex={0}
        												className='w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
        												aria-labelledby='altPhone'
        												placeholder='Your alternate phone number'
        											/>
        										</div>
        									</div> */}
										</div>
									</div>
								</div>
							</div>
						) : null}
						{currentStep == 2 ? (
							<div className='xl:px-24'>
								<div className='mt-16 lg:flex justify-between border-b border-gray-200 pb-16'>
									<div className='w-80'>
										<div className='flex items-center'>
											<h1 className='text-xl font-medium pr-2 leading-5 text-gray-800'>
												Address
											</h1>
										</div>
										<p className='mt-4 text-sm leading-5 text-gray-600'>
											Choose the address where the workers will go to. Feel free
											to type the name of your business directly in the seach
											bar.
										</p>
									</div>
									<div>
										<div className='md:flex items-center lg:ml-24 lg:mt-0 mt-4'>
											<div className=''>
												<LoadScript
													googleMapsApiKey={
														process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY as string
													}
													libraries={libraries}
												>
													<AddressAutocomplete
														onSelect={handleAddressSelect}
														value={address}
														onChangeValue={(value) => {
															setFormData({
																...formData,
																address: {
																	...formData.address,
																	hasChanged: true,
																},
															})
															setAddress(value)
														}}
														showError={error}
														error='Please add valid address'
													/>
												</LoadScript>
											</div>
										</div>
										<div className='md:flex items-start lg:ml-24 mt-8'>
											<div className='md:w-64'>
												<RegisterDropdownInput
													label='Business Type'
													onChange={(value) =>
														setFormData({
															...formData,
															type: {
																value,
																required: true,
																step: 2,
																hasChanged: true,
															},
														})
													}
													placeholder='Select'
													showError={error}
													error='Enter a business type'
													inputName='type'
													value={formData.type.value}
													dropdownItems={['Restaurant', 'Hotel']}
												/>
											</div>
											<div className='md:w-64 md:ml-12 md:mt-0 mt-4'>
												<RegisterChecklistInput
													label='Jobs Offered'
													onChange={(value) => {
														let currentTypes
														if (!formData.jobTypes.hasChanged) {
															currentTypes = [value]
														} else {
															currentTypes = formData.jobTypes.value
															if (currentTypes.includes(value)) {
																currentTypes = currentTypes.filter(
																	(type) => type != value
																)
															} else {
																currentTypes.push(value)
															}
														}

														setFormData({
															...formData,
															jobTypes: {
																value: currentTypes,
																required: true,
																step: 2,
																hasChanged: true,
															},
														})
													}}
													placeholder='Select job types'
													showError={error}
													error='Enter a valid job type'
													inputName='type'
													value={formData.jobTypes.value}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4'>
									<div className='w-80'>
										<div className='flex items-center'>
											<h1 className='text-xl font-medium pr-2 leading-5 text-gray-800'>
												Upload Photo
											</h1>
										</div>
										<p className='mt-4 text-sm leading-5 text-gray-600'>Soon</p>
									</div>
								</div>
							</div>
						) : null}
						{currentStep == 3 ? <div></div> : null}
					</form>
					<div className='px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7'>
						<div className='flex items-center'>
							<div className='flex-shrink-0'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z'
										fill='#4B5563'
									/>
								</svg>
							</div>

							<p className='text-sm text-gray-800 pl-3'>
								We take privacy issues seriously. You can be sure that your
								personal data is securely protected.
							</p>
						</div>
						<button className='md:block hidden focus:outline-none focus:ring-2 focus:ring-gray-700 rounded'>
							<svg
								aria-label='Close this banner'
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M15.8337 5.34166L14.6587 4.16666L10.0003 8.825L5.34199 4.16666L4.16699 5.34166L8.82533 10L4.16699 14.6583L5.34199 15.8333L10.0003 11.175L14.6587 15.8333L15.8337 14.6583L11.1753 10L15.8337 5.34166Z'
									fill='#79808F'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
