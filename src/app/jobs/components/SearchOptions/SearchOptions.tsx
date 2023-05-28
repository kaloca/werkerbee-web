import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import { JobPostingsOptions } from '@/src/hooks/useJobPostings'

import { sortOptions, subCategories, filters } from './options'

import FilterTextInput from './FilterTextInput'
import SearchButton from './SearchButton'

interface SearchOptionsProps {
	options: JobPostingsOptions
	handleToggleOption: (
		filter: 'keyof JobPostingsOptions',
		option: string
	) => void
}

const SearchOptions: React.FC<SearchOptionsProps> = ({
	options,
	handleToggleOption,
}) => {
	return (
		<form className='hidden lg:block'>
			<h3 className='sr-only'>Categories</h3>
			{/* <ul
				role='list'
				className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 mb-3'
			>
				{subCategories.map((category) => (
					<li key={category.name}>
						<a href={category.href}>{category.name}</a>
					</li>
				))}
			</ul> */}
			<FilterTextInput
				label={'Max Distance From You (miles)'}
				type='number'
				id='max-distance'
			/>
			{filters.map((filter) => (
				<Disclosure
					as='div'
					key={filter.id}
					className='border-b border-gray-200 py-6 mb-3'
				>
					{({ open }) => (
						<>
							<h3 className='-my-3 flow-root'>
								<Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
									<span className='font-medium text-gray-900'>
										{filter.name}
									</span>
									<span className='ml-6 flex items-center'>
										{open ? (
											<MinusIcon className='h-5 w-5' aria-hidden='true' />
										) : (
											<PlusIcon className='h-5 w-5' aria-hidden='true' />
										)}
									</span>
								</Disclosure.Button>
							</h3>
							<Disclosure.Panel className='pt-6'>
								<div className='space-y-4'>
									{filter.options.map((option, optionIdx) => (
										<div key={option.value} className='flex items-center'>
											<input
												onChange={() =>
													handleToggleOption(filter.id, option.value)
												}
												id={`filter-${filter.id}-${optionIdx}`}
												name={`${filter.id}[]`}
												defaultValue={option.value}
												type='checkbox'
												checked={options[filter.id]?.includes(option.value)}
												className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											/>
											<label
												htmlFor={`filter-${filter.id}-${optionIdx}`}
												className='ml-3 text-sm text-gray-600'
											>
												{option.label}
											</label>
										</div>
									))}
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			))}
			<SearchButton />
		</form>
	)
}

export default SearchOptions
