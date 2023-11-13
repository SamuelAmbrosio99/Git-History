import { progressBar, statsCard } from "@/models/stats";
import { useApi } from '@/context/data';

const ProgressBar = ({ task, progress, qty }: progressBar) => (
    <div className="relative">
        <progress className="progress h-5 " value={progress} max="100"></progress>
        <div className="absolute inset-0 flex items-center h-5 mx-4 justify-between">
            <span className="text-xs text-white">{task}</span>
            <span className="text-xs text-white">{qty}</span>
        </div>
    </div>
);

const skeletonStatsCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl mb-4 mx-4 flex-1 animate-pulse">
          <div className="card-body">
            <div className="stat p-0 place-items-center">
                <div className="stat-title bg-gray-800 h-12 w-12">&nbsp;</div>
                <div className="w-56 mt-2 bg-gray-800 h-6 rounded-full "></div>
                <div className="w-56 mt-2 bg-gray-800 h-6 rounded-full "></div>
            </div>
          </div>
        </div>
    )
}

const StatsCard = ({ title, qty, results }: statsCard) => {
    if (!title || !qty || !results) return skeletonStatsCard()

    return (
        <div className="card bg-base-100 shadow-xl mb-4 mx-4 flex-1">
          <div className="card-body">
            <div className="stat p-0 place-items-center">
                <div className="stat-title">{title}</div>
                <div className="stat-value">{qty}</div>
            </div>
            {
                results?.map((result, index) => {
                    const { title, progress, qty } = result;
                    
                    return (
                        <ProgressBar key={index+title} task={title} progress={progress} qty={qty}/>
                    )
                })
            }
          </div>
        </div>
    )
}

const Stats = () => {
    const { stats } = useApi();

    return (
      <div className="grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-3 mt-2">
        {
            stats.map((data, index) => {
                const { title, qty, results } = data;
                
                return (
                    <StatsCard key={index} title={title} qty={qty} results={results}/>
                )
            })
        }
      </div>
    );
};
  
export default Stats;
  