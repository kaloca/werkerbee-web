'use client'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface AccountTypeModalProps {
	isOpen: boolean
	setOpen: (value: boolean) => void
	email: string
}

const AccountTypeModal: React.FC<AccountTypeModalProps> = ({
	isOpen,
	setOpen,
	email,
}) => {
	const cancelButtonRef = useRef(null)
	const router = useRouter()

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-50 inset-0 overflow-y-auto'
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
						<div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div>
								<div className='mt-3 text-center sm:mt-5'>
									<Dialog.Title
										as='h1'
										className='text-2xl leading-6 font-semibold text-gray-900'
									>
										Get started with WerkerBee!
									</Dialog.Title>
									<div className='mt-4'>
										<p className='text-sm text-gray-500'>
											Choose Account Type:
										</p>
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
								<button
									type='button'
									className='block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
									onClick={() =>
										router.push(`/register/company?email=${email}`)
									}
								>
									Business
								</button>
								<button
									type='button'
									className='sm:mt-0 mt-2 block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
									onClick={() => router.push(`/register/worker?email=${email}`)}
									ref={cancelButtonRef}
								>
									Worker
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default AccountTypeModal
