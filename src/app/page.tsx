'use client'
import { useState } from 'react'
import Image from 'next/image'

import {
	ArrowPathIcon,
	BanknotesIcon,
	ClockIcon,
	CogIcon,
	HandThumbUpIcon,
	ServerIcon,
} from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import AccountTypeModal from '../components/ChooseAccountTypeModal'

import WerkerBeeLogo from '@/src/assets/werkerbeelogo_new_white.png'
import JobsScreenshot from '@/src/assets/jobs_screen.png'
import MainSVG from '@/src/assets/svg_booked'

const features = [
	{
		name: 'Save Money',
		description:
			'Building your own pool of flexible workers through WerkerBee costs less than using hiring websites, temp agencies, or independent contractor platforms.',
		icon: BanknotesIcon,
	},
	{
		name: 'Save Time',
		description:
			'WerkerBee does the hiring work for you by prescreening all our employed flexible workers. You can skip the emails, phone calls, interviews, verifications, and focus on running your business!',
		icon: ClockIcon,
	},
	{
		name: 'Hire Away',
		description:
			"Hire away our WerkerBees! WerkerBee doesn't charge businesses if they want to hire away our workers. Why would we? WerkerBee is here to support the hospitality industry!",
		icon: HandThumbUpIcon,
	},
]
const blogPosts = [
	{
		id: 1,
		title: 'Boost your conversion rate',
		href: '#',
		date: 'Mar 16, 2020',
		datetime: '2020-03-16',
		category: { name: 'Article', href: '#' },
		imageUrl:
			'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
		preview:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
		author: {
			name: 'Roel Aufderehar',
			imageUrl:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			href: '#',
		},
		readingLength: '6 min',
	},
	{
		id: 2,
		title: 'How to use search engine optimization to drive sales',
		href: '#',
		date: 'Mar 10, 2020',
		datetime: '2020-03-10',
		category: { name: 'Video', href: '#' },
		imageUrl:
			'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
		preview:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
		author: {
			name: 'Brenna Goyette',
			imageUrl:
				'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			href: '#',
		},
		readingLength: '4 min',
	},
	{
		id: 3,
		title: 'Improve your customer experience',
		href: '#',
		date: 'Feb 12, 2020',
		datetime: '2020-02-12',
		category: { name: 'Case Study', href: '#' },
		imageUrl:
			'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
		preview:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
		author: {
			name: 'Daniela Metz',
			imageUrl:
				'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			href: '#',
		},
		readingLength: '11 min',
	},
]
const footerNavigation = {
	solutions: [
		{ name: 'Marketing', href: '#' },
		{ name: 'Analytics', href: '#' },
		{ name: 'Commerce', href: '#' },
		{ name: 'Insights', href: '#' },
	],
	support: [
		{ name: 'Pricing', href: '#' },
		{ name: 'Documentation', href: '#' },
		{ name: 'Guides', href: '#' },
		{ name: 'API Status', href: '#' },
	],
	company: [
		{ name: 'About', href: '#' },
		{ name: 'Blog', href: '#' },
		{ name: 'Jobs', href: '#' },
		{ name: 'Press', href: '#' },
		{ name: 'Partners', href: '#' },
	],
	legal: [
		{ name: 'Claim', href: '#' },
		{ name: 'Privacy', href: '#' },
		{ name: 'Terms', href: '#' },
	],
	social: [
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/company/werkerbee/',
			icon: (props: any) => (
				<svg
					height='24'
					viewBox='0 0 72 72'
					width='24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g fill='none' fill-rule='evenodd'>
						<path
							d='M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z'
							fill='currentColor'
						/>
						<path
							d='M59,57 L49.959375,57 L49.959375,41.6017895 C49.959375,37.3800228 48.3552083,35.0207581 45.0136719,35.0207581 C41.3785156,35.0207581 39.4792969,37.4759395 39.4792969,41.6017895 L39.4792969,57 L30.7666667,57 L30.7666667,27.6666667 L39.4792969,27.6666667 L39.4792969,31.6178624 C39.4792969,31.6178624 42.0989583,26.7704897 48.3236979,26.7704897 C54.5455729,26.7704897 59,30.5699366 59,38.4279486 L59,57 Z M20.372526,23.8257036 C17.4048177,23.8257036 15,21.4020172 15,18.4128518 C15,15.4236864 17.4048177,13 20.372526,13 C23.3402344,13 25.7436198,15.4236864 25.7436198,18.4128518 C25.7436198,21.4020172 23.3402344,23.8257036 20.372526,23.8257036 Z M15.8736979,57 L24.958724,57 L24.958724,27.6666667 L15.8736979,27.6666667 L15.8736979,57 Z'
							fill='#FFF'
						/>
					</g>
				</svg>
			),
		},
		// {
		// 	name: 'Facebook',
		// 	href: '#',
		// 	icon: (props: any) => (
		// 		<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
		// 			<path
		// 				fillRule='evenodd'
		// 				d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
		// 				clipRule='evenodd'
		// 			/>
		// 		</svg>
		// 	),
		// },
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/werkerbeeinc/',
			icon: (props: any) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/werkerbeeinc',
			icon: (props: any) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
				</svg>
			),
		},
		// {
		// 	name: 'GitHub',
		// 	href: '#',
		// 	icon: (props: any) => (
		// 		<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
		// 			<path
		// 				fillRule='evenodd'
		// 				d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		// 				clipRule='evenodd'
		// 			/>
		// 		</svg>
		// 	),
		// },
		// {
		// 	name: 'Dribbble',
		// 	href: '#',
		// 	icon: (props: any) => (
		// 		<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
		// 			<path
		// 				fillRule='evenodd'
		// 				d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
		// 				clipRule='evenodd'
		// 			/>
		// 		</svg>
		// 	),
		// },
	],
}

export default function HomePage() {
	const [registerModalOpen, setRegisterModalOpen] = useState(false)
	const [registerEmail, setRegisterEmail] = useState('')

	return (
		<div className='bg-white pt-16'>
			<AccountTypeModal
				isOpen={registerModalOpen}
				setOpen={setRegisterModalOpen}
				email={registerEmail}
			/>
			<div className='relative overflow-hidden'>
				<main>
					<div className='pt-10 bg-white sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
						<div className='mx-auto max-w-7xl lg:px-8'>
							<div className='lg:grid lg:grid-cols-2 lg:gap-8'>
								<div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center'>
									<div className='lg:py-24'>
										<a
											href='/jobs'
											className='inline-flex items-center text-black bg-gray-200 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-400'
										>
											<span className='px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full'>
												Currently testing in the Berkeley area
											</span>
											<span className='ml-4 text-sm'>Visit our jobs page</span>
											<ChevronRightIcon
												className='ml-2 w-5 h-5 text-gray-500'
												aria-hidden='true'
											/>
										</a>
										<h1 className='mt-4 text-4xl tracking-tight font-extrabold text-black sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl'>
											<span className='block'>The Next Generation</span>
											<span className='pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5'>
												of flexible work
											</span>
										</h1>
										<p className='text-base text-gray-600 sm:text-xl lg:text-lg xl:text-xl'>
											WerkerBee is the first employed, flexible worker platform
											built for the hospitality industry.
										</p>
										<div className='mt-10 sm:mt-12'>
											<form
												onSubmit={(e) => {
													e.preventDefault()
													setRegisterModalOpen(true)
												}}
												className='sm:max-w-xl sm:mx-auto lg:mx-0'
											>
												<div className='sm:flex'>
													<div className='min-w-0 flex-1'>
														<label htmlFor='email' className='sr-only'>
															Email address
														</label>
														<input
															id='email'
															type='email'
															placeholder='Enter your email'
															value={registerEmail}
															onChange={(e) => setRegisterEmail(e.target.value)}
															className='bg-slate-100 block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
														/>
													</div>
													<div className='mt-3 sm:mt-0 sm:ml-3'>
														<button
															type='submit'
															className='block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
														>
															Create account
														</button>
													</div>
												</div>
												{/* <p className='mt-3 text-sm text-gray-300 sm:mt-4'>
													Create your free account, no credit card necessary. By
													providing your email, you agree to our{' '}
													<a href='#' className='font-medium text-blue-400'>
														terms of service
													</a>
													.
												</p> */}
											</form>
										</div>
									</div>
								</div>
								<div className='mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative'>
									<div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 '>
										{/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
										<div className='p-2 w-full'>{MainSVG}</div>
										{/* <img
											className=' bg-slate-500 w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
											src='https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg'
											alt=''
										/> */}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Feature section with screenshot */}
					<div className='relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32'>
						<div className='mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl'>
							<div>
								<h2 className='text-base font-semibold tracking-wider text-cyan-600 uppercase'>
									Job search
								</h2>
								<p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
									Want to work in hospitality, but need a flexible schedule?
								</p>
								<p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
									When hired by WerkerBee, you will be trained at hospitality
									businesses that need your skills and match your availability.
									You&apos;ll also have the chance to advance your career
									through WerkerBee&apos;s upskilling program!
								</p>
							</div>
							<div className='mt-12 -mb-10 sm:-mb-24 '>
								<a href='/jobs'>
									<Image
										className='rounded-lg shadow-xl ring-1 ring-black ring-opacity-5'
										src={JobsScreenshot}
										alt='jobs-screenshot'
										// width={1000}
										// height={700}
									/>
								</a>
							</div>
						</div>
					</div>

					{/* Feature section with grid */}
					<div className='relative bg-white py-16 sm:py-24 lg:py-32'>
						<div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
							<h2 className='text-base font-semibold tracking-wider text-cyan-600 uppercase'>
								For Businessess
							</h2>
							<p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
								Say goodbye to your worker shortage issues
							</p>
							<p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
								Run your hospitality business seamlessly using your own
								dedicated pools of flexible workers. WerkerBee&apos;s employed
								flexible workers are trained by you at your business so you have
								a reliable solution for all your planned and unplanned labor
								shortages.
							</p>
							<div className='mt-12'>
								<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
									{features.map((feature) => (
										<div key={feature.name} className='pt-6'>
											<div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
												<div className='-mt-6'>
													<div>
														<span className='inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg'>
															<feature.icon
																className='h-6 w-6 text-white'
																aria-hidden='true'
															/>
														</span>
													</div>
													<h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
														{feature.name}
													</h3>
													<p className='mt-5 text-base text-gray-500'>
														{feature.description}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Testimonial section */}
					{/* <div className='pb-16 bg-gradient-to-r from-teal-500 to-cyan-600 lg:pb-0 lg:z-10 lg:relative'>
						<div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8'>
							<div className='relative lg:-my-8'>
								<div
									aria-hidden='true'
									className='absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden'
								/>
								<div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full'>
									<div className='aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full'>
										<img
											className='object-cover lg:h-full lg:w-full'
											src='https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80'
											alt=''
										/>
									</div>
								</div>
							</div>
							<div className='mt-12 lg:m-0 lg:col-span-2 lg:pl-8'>
								<div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none'>
									<blockquote>
										<div>
											<svg
												className='h-12 w-12 text-white opacity-25'
												fill='currentColor'
												viewBox='0 0 32 32'
												aria-hidden='true'
											>
												<path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
											</svg>
											<p className='mt-6 text-2xl font-medium text-white'>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Sed urna nulla vitae laoreet augue. Amet feugiat est
												integer dolor auctor adipiscing nunc urna, sit.
											</p>
										</div>
										<footer className='mt-6'>
											<p className='text-base font-medium text-white'>
												Judith Black
											</p>
											<p className='text-base font-medium text-cyan-100'>
												CEO at PureInsights
											</p>
										</footer>
									</blockquote>
								</div>
							</div>
						</div>
					</div> */}

					{/* Blog section */}
					{/* <div className='relative bg-gray-50 py-16 sm:py-24 lg:py-32'>
						<div className='relative'>
							<div className='text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
								<h2 className='text-base font-semibold tracking-wider text-cyan-600 uppercase'>
									Learn
								</h2>
								<p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
									Helpful Resources
								</p>
								<p className='mt-5 mx-auto max-w-prose text-xl text-gray-500'>
									Phasellus lorem quam molestie id quisque diam aenean nulla in.
									Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
									condimentum id viverra nulla.
								</p>
							</div>
							<div className='mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
								{blogPosts.map((post) => (
									<div
										key={post.id}
										className='flex flex-col rounded-lg shadow-lg overflow-hidden'
									>
										<div className='flex-shrink-0'>
											<img
												className='h-48 w-full object-cover'
												src={post.imageUrl}
												alt=''
											/>
										</div>
										<div className='flex-1 bg-white p-6 flex flex-col justify-between'>
											<div className='flex-1'>
												<p className='text-sm font-medium text-cyan-600'>
													<a
														href={post.category.href}
														className='hover:underline'
													>
														{post.category.name}
													</a>
												</p>
												<a href={post.href} className='block mt-2'>
													<p className='text-xl font-semibold text-gray-900'>
														{post.title}
													</p>
													<p className='mt-3 text-base text-gray-500'>
														{post.preview}
													</p>
												</a>
											</div>
											<div className='mt-6 flex items-center'>
												<div className='flex-shrink-0'>
													<a href={post.author.href}>
														<img
															className='h-10 w-10 rounded-full'
															src={post.author.imageUrl}
															alt={post.author.name}
														/>
													</a>
												</div>
												<div className='ml-3'>
													<p className='text-sm font-medium text-gray-900'>
														<a
															href={post.author.href}
															className='hover:underline'
														>
															{post.author.name}
														</a>
													</p>
													<div className='flex space-x-1 text-sm text-gray-500'>
														<time dateTime={post.datetime}>{post.date}</time>
														<span aria-hidden='true'>&middot;</span>
														<span>{post.readingLength} read</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div> */}

					{/* CTA Section */}
					{/* <div className='relative bg-gray-900'>
						<div className='relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2'>
							<img
								className='w-full h-full object-cover'
								src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100'
								alt=''
							/>
							<div
								aria-hidden='true'
								className='absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply'
							/>
						</div>
						<div className='relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32'>
							<div className='md:ml-auto md:w-1/2 md:pl-10'>
								<h2 className='text-base font-semibold uppercase tracking-wider text-gray-300'>
									Award winning support
								</h2>
								<p className='mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl'>
									We’re here to help
								</p>
								<p className='mt-3 text-lg text-gray-300'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
									egestas tempus tellus etiam sed. Quam a scelerisque amet
									ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
									quisque ut interdum tincidunt duis.
								</p>
								<div className='mt-8'>
									<div className='inline-flex rounded-md shadow'>
										<a
											href='#'
											className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50'
										>
											Visit the help center
											<LinkIcon
												className='-mr-1 ml-3 h-5 w-5 text-gray-400'
												aria-hidden='true'
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</main>
				<footer className='bg-gray-50' aria-labelledby='footer-heading'>
					<h2 id='footer-heading' className='sr-only'>
						Footer
					</h2>
					<div className='max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8'>
						<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
							<div className='space-y-8 xl:col-span-1'>
								<Image
									src={WerkerBeeLogo}
									alt='werkerbee-logo-footer'
									className='w-52'
								/>
								<p className='text-gray-500 text-base'>
									The future of flexible work means leaving the independent
									contractor model behind
								</p>
								<div className='flex space-x-6'>
									{footerNavigation.social.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className='text-gray-400 hover:text-gray-500'
										>
											<span className='sr-only'>{item.name}</span>
											<item.icon className='h-6 w-6' aria-hidden='true' />
										</a>
									))}
								</div>
							</div>
							{/* <div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
								<div className='md:grid md:grid-cols-2 md:gap-8'>
									<div>
										<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
											Solutions
										</h3>
										<ul role='list' className='mt-4 space-y-4'>
											{footerNavigation.solutions.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className='text-base text-gray-500 hover:text-gray-900'
													>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
									<div className='mt-12 md:mt-0'>
										<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
											Support
										</h3>
										<ul role='list' className='mt-4 space-y-4'>
											{footerNavigation.support.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className='text-base text-gray-500 hover:text-gray-900'
													>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className='md:grid md:grid-cols-2 md:gap-8'>
									<div>
										<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
											Company
										</h3>
										<ul role='list' className='mt-4 space-y-4'>
											{footerNavigation.company.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className='text-base text-gray-500 hover:text-gray-900'
													>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
									<div className='mt-12 md:mt-0'>
										<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
											Legal
										</h3>
										<ul role='list' className='mt-4 space-y-4'>
											{footerNavigation.legal.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className='text-base text-gray-500 hover:text-gray-900'
													>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div> */}
						</div>
						<div className='mt-12 border-t border-gray-200 py-8'>
							<p className='text-base text-gray-400 xl:text-center'>
								&copy; 2023 WerkerBee, Inc. All rights reserved.
							</p>
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}
