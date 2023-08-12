import { workerData } from "worker_threads"
import { WorkerListing } from "@/src/hooks/useAllWorkers"
import Image from 'next/image'
import Placeholder from '@/src/assets/placeholder.jpg'

interface WorkerCardProps{
    worker: WorkerListing,
    onClick: (username: string) => void
}

const WorkerCard: React.FC<WorkerCardProps> = ({
	worker,
	onClick,
}) => {
    var moreJobTypes = 0
    var moreCertifications = 0
    if (worker.jobTypes.length > 4){
        moreJobTypes = worker.jobTypes.length - 3
        worker.jobTypes = worker.jobTypes.slice(0,3)
    }
    if (worker.certifications.length > 4){
        moreCertifications = worker.jobTypes.length - 3
        worker.certifications = worker.certifications.slice(0,3)
    }
    return(
        <div className="flex flex-row border-4 rounded-2xl p-4 bg-white shadow overflow-hidden sm:rounded-xl hover:cursor-pointer hover:shadow-md hover:shadow-gray-300"
            onClick={() => {onClick(worker.username)}}>
            <div className = "items-center">
                <Image
					src={worker.profilePicture || Placeholder}
					alt='aji'
					className='w-32 h-32 object-cover rounded-2xl'
					width={300}
					height={300}
				/>
            </div>
            <div className="flex flex-col pl-4 pt-0.5 w-full">
                <div className="text-left max-w-lg">
                    <div className="w-full flex-none text-gray-800 font-bold leading-none text-xl">
                        {worker.name}
                    </div>
                    {/*worker.address.city || ""*/null}
                </div>
                <div className = "grid grid-rows-1 grid-cols-2 capitalize pt-1.5">
                    <div className="flex flex-col px-3 w-full text-base">
                        Job Types:
                        <div  className="text-sm text-gray-500">
                        {
                            worker.jobTypes.map((jt)=>(<p>{jt.type}</p>))
                        }
                        {
                            moreJobTypes ? (
                               <p className="normal-case">
                                    {`...and ${moreJobTypes} more`}
                               </p>
                            ) : (null)
                        }
                        </div>
                    </div>
                    <div className="flex flex-col px-3 w-full text-base">
                        Certifications:
                        <div  className="text-sm text-gray-600">
                        {
                            worker.certifications.map((c)=>(<p>{c.certification}</p>))
                        }
                        {
                            moreCertifications ? (
                               <p className="normal-case">
                                    {`...and ${moreCertifications} more`}
                               </p>
                            ) : (null)
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkerCard