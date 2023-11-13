import { commitList, pages, commitTable } from "@/models/commits";
import { useApi } from "@/context/data";
import dayjs from "dayjs";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { commit } from "@/models/commits";

const Pages = ({ pages, currentPage, lastPage, setCurrentPage }: pages) => {

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <div className="join">
            <button className="join-item btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{`<`}</button>
            {
                pages && pages.map((page, index) => {
                    return (
                        <button key={index} className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`} onClick={() => handlePageChange(page)}>{page}</button>
                    )
                })
            }
            <button className="join-item btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>{`>`}</button>
        </div>
    )

}

const verifiedBadge = (verified: boolean) => {
    return (
        <div className={`badge badge-outline ${verified ? 'badge-success' : 'badge-error'}`}>
            {verified ? 'Verified' : 'Unverified'}
        </div>
    )

}

const CommitTable = ({ commits }: commitTable) => {
    return (
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
                {
                    commits?.map((thisCommit: commit, index: number) => {
                        const { author, commit } = thisCommit;

                        const truncatedMessage = commit?.message.length > 95 ? `${commit?.message.substring(0, 95)}...` : commit.message;
                        const verified = commit?.verification.verified

                        return (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={author?.avatar_url} alt={commit?.author.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{commit?.author.name}</div>
                                            <div className="text-sm opacity-50">{dayjs(commit?.author.date).format('DD/MM/YYYY HH:mm')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {truncatedMessage}
                                </td>
                                <td>
                                    {verifiedBadge(verified)}
                                </td>
                                <th>
                                    <a href={thisCommit.html_url} target="_blank" rel="noreferrer">
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-500" />
                                    </a>
                                </th>
                            </tr>
                        )
                    })
                }
            </tbody>
            
        </table>
    )
}

const CommitList = () => {
    const { commits, setCurrentPage, pages, lastPage, currentPage } = useApi();

    return (
        <div className="card bg-base-100 shadow-xl mx-4 flex-1">
            <div className="card-body p-3">
                <div className="card-title flex items-center justify-center">
                    <h5 className="flex-none">Commits</h5>
                </div>
                {
                    commits && commits.length !== 0 ? (
                        <CommitTable commits={commits} />
                    ) : (
                        <div className="flex justify-center h-20">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    )
                }
            </div>
            <div className="card-footer flex justify-center p-2">
                <Pages pages={pages} currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
};

export default CommitList;