'use client'

import useAllWorkers, { WorkerListing } from "@/src/hooks/useAllWorkers"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import WorkerCard from "./components/WorkerCard"
import JobCardSkeleton from "./components/JobCardSkeleton"

export default function allWorkers({ params }: any){
    const {data: session, status} = useSession()
    const router = useRouter()
    
    const {data, error, isLoading} = useAllWorkers()

    /*return(
        <div>
            <ul>
            {isLoading ? (
				/*<>
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                </>
                null
            ) : (                
                data &&
                data.length > 0 &&
                data.map((worker) => (
                    <WorkerCard
                        worker={worker}
                        onClick={()=>{}}
                    />
                ))
            )}
            </ul>
            {isLoading?(null):(data.toString())}
        </div>
    )*/

    const handleClick = (username: string) => {
        router.push(`worker/${username}`)
    }

    return (
		<div className=' h-full'>
			<div>
                <div className="h-14">
                </div>
				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 pt-4'>
                        Insert Tagline For This Page Here
                    </h1>
					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Product grid */}
							<div className='lg:col-span-3'>
								<div className='bg-white shadow p-4 overflow-hidden sm:rounded-md'>
									<ul role='list' className='space-y-3 '>
										{isLoading ? (
                                            <div>
												<JobCardSkeleton />
												<JobCardSkeleton />
                                                <JobCardSkeleton />
                                                <JobCardSkeleton />
                                                <JobCardSkeleton />
                                            </div>
										) : (
											data.workers.map((worker: WorkerListing) => {
                                                return(
												<WorkerCard
													worker={worker}
                                                    onClick={handleClick}
												/>
                                                )
                                            })
										)}
										{data && data.length == 0 && (
											<div>No workers match these criteria</div>
										)}
									</ul>

									{error && <div>Error: {error.message}</div>}
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}