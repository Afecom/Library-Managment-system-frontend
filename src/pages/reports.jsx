import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { overdueBooksContext } from "../App"
import { popularGenresContext } from "../App"
import { borrowSummaryContext } from "../App"
import { useContext } from "react"
import { faArrowTrendUp, faChartColumn, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

function Reports(){
    const overdueBooks = useContext(overdueBooksContext)?.data ?? []
    const popularGenres = useContext(popularGenresContext)?.data ?? []
    const borrowSummary = useContext(borrowSummaryContext)?.data ?? []
    console.log(borrowSummary)
    const maxCount = Math.max(...popularGenres?.map(genre => genre.borrow_count))
    const currentDate = new Date()
    return(
        <div className="px-4 py-8">
            <div>
                <h1 className="text-4xl font-bold">Reports</h1>
                <p className="text-xl text-gray-400">Library analytics and reports.</p>
            </div>
            <div className="md:flex md:gap-8">
                <div className="bg-white rounded-md shadow-sm shadow-gray-400 mt-8 px-4 py-6 md:w-1/2">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-2xl"/>
                        <h1 className="text-2xl font-bold">Overdue Books</h1>
                    </div>
                    <p className="text-gray-500 mt-1 mb-6">Books that are past their due date</p>
                    {overdueBooks.map((oB, index) => {
                        const dueDate = new Date(oB.due_date)
                        const overdueMs = currentDate - dueDate
                        const msDay = 1000 * 60 * 60 * 24
                        const overdueDays = Math.floor(overdueMs / msDay)
                        return(
                            <div className="p-3 bg-red-50 rounded-md mt-4" key={oB.id}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{oB.book.title}</p>
                                        <p className="text-gray-500">Member: {oB.member.name}</p>
                                        <p className="text-gray-500">Due: {oB.due_date}</p>
                                    </div>
                                    <div className="bg-red-500 rounded-2xl text-white px-3">{overdueDays} days overdue</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-white rounded-md shadow-sm shadow-gray-400 mt-8 px-4 py-6 md:w-1/2">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="text-green-400 text-2xl"/>
                        <h1 className="text-2xl font-bold">Popular Genres</h1>
                    </div>
                    <p className="text-gray-500 mt-1 mb-6">Most borrowed book genres</p>
                    <div>
                        {popularGenres.map((genre, index) => {
                            const barWidth = (genre.borrow_count / maxCount) * 100
                            return(
                                <div key={index + 1} className="mt-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 w-[60%]">
                                            <p>#{index + 1}</p>
                                            <p>{genre.genre_name}</p>
                                        </div>
                                        <div className="flex items-center gap-2 w-[40%] md:w-[25%]">
                                            <div className="w-full rounded-full bg-gray-200 h-2">
                                                <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: `${barWidth}%`}}></div>
                                            </div>
                                            <p>{genre.borrow_count}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-8 md:flex md:gap-4">
                <div className="flex justify-between border-1 border-gray-300 p-6 bg-white rounded-md mt-6 md:w-1/3">
                    <div>
                        <p className="">Total Borrows This Month</p>
                        <p className="mt-2 text-2xl font-bold">{borrowSummary.totalBorrowsThisMonth}</p>
                        <p className="mt-1 text-sm text-gray-500">+12% from last month</p>
                    </div>
                    <FontAwesomeIcon icon={faChartColumn}/>
                </div>
                <div className="flex justify-between border-1 border-gray-300 p-6 bg-white rounded-md mt-6 md:w-1/3">
                    <div>
                        <p className="">Average Borrow Duration</p>
                        <p className="mt-2 text-2xl font-bold">{borrowSummary.averageBorrowDuration} days</p>
                        <p className="mt-1 text-sm text-gray-500">-2 days from last month</p>
                    </div>
                    <FontAwesomeIcon icon={faChartColumn}/>
                </div>
                <div className="flex justify-between border-1 border-gray-300 p-6 bg-white rounded-md mt-6 md:w-1/3">
                    <div>
                        <p className="">Return Rate</p>
                        <p className="mt-2 text-2xl font-bold">{borrowSummary.returnRate}%</p>
                        <p className="mt-1 text-sm text-gray-500">+1.2% from last month</p>
                    </div>
                    <FontAwesomeIcon icon={faChartColumn}/>
                </div>
            </div>
        </div>
    )
}
export default Reports