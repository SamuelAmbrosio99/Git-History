import { commitList } from "@/models/commits";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const CommitList = ({ expandList }: commitList) => {

    return (
        <div className="card bg-base-100 shadow-xl mx-4 flex-1">
            <div className="card-body p-3">
                <div className="card-title flex items-center justify-center">
                    <h5 className="flex-none">Commits</h5>
                </div>
                <table className="table overflow-y-auto mt-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="/gh-logo.svg" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br/>
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
            <div className="card-footer flex justify-center p-2">
                <div className="join">
                    <button className="join-item btn">{`<`}</button>
                    <button className="join-item btn">1</button>
                    <button className="join-item btn btn-active">2</button>
                    <button className="join-item btn">3</button>
                    <button className="join-item btn">4</button>
                    <button className="join-item btn">...</button>
                    <button className="join-item btn">{`>`}</button>
                </div>
            </div>
        </div>
    )
};

export default CommitList;