import { progressBar, statsCard } from "@/models/stats";

const ProgressBar = ({ task, progress, qty }: progressBar) => (
    <div className="relative">
        <progress className="progress h-5 " value={progress} max="100"></progress>
        <div className="absolute inset-0 flex items-center h-5 mx-4 justify-between">
            <span className="text-xs text-white">{task}</span>
            <span className="text-xs text-white">{qty}</span>
        </div>
    </div>
);

const StatsCard = ({ title, qty, results }: statsCard) => {
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

    const testData: statsCard[] = [
        {
            title: 'Pull Requests',
            qty: 0,
            results: [
                {
                    title: 'Open',
                    progress: 0,
                    qty: 0
                },
                {
                    title: 'Closed',
                    progress: 0,
                    qty: 0
                }
            ]
        },
        {
            title: 'Issues',
            qty: 0,
            results: [
                {
                    title: 'Open',
                    progress: 0,
                    qty: 0
                },
                {
                    title: 'Closed',
                    progress: 0,
                    qty: 0
                }
            ]
        },
        {
            title: 'Discussions',
            qty: 0,
            results: [
                {
                    title: 'Open',
                    progress: 0,
                    qty: 0
                },
                {
                    title: 'Closed',
                    progress: 0,
                    qty: 0
                }
            ]
        }
    ]

    return (
      <div className="grid md:grid-cols-3 md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-3 mt-2">
        {
            testData.map((data, index) => {
                const { title, qty, results } = data;
                
                return (
                    <StatsCard key={index+title} title={title} qty={qty} results={results}/>
                )
            })
        }
      </div>
    );
};
  
export default Stats;
  