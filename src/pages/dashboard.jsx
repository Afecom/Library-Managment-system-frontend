import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faShieldHalved, faUsers, faArrowsTurnToDots, 
    faTriangleExclamation, faAdd, faGear, faChartColumn,} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { jwtDecode } from "jwt-decode";
import RecentActivity from "../recentactivity";
import StatCard from "../statcard";
import QuickActions from "../quickactions";
import { useContext } from "react";
import { totalBooksContext, totalMembersContext, activeBorrowsContext, overdueBooksContext } from "../App";

function Dashboard(){
    const token = localStorage.getItem('token')
    const role = jwtDecode(token).role;
    const totalBooks = useContext(totalBooksContext)?.data?.length
    const totalMembers = useContext(totalMembersContext)?.data?.length
    const activeBorrows = useContext(activeBorrowsContext)?.data?.length
    const overdueBooks = useContext(overdueBooksContext)?.data?.length

    return(
        <div>
                <main className="px-4 py-4">
                    {role === 'admin' && <div>
                                            <div>
                                                <div className="flex gap-4 mt-6">
                                                    <h1 className="font-bold text-4xl">Admin Dashboard</h1>
                                                    <div className="px-6 pt-2 rounded-3xl bg-red-500 text-white min-w-42 max-h-10 font-bold text-nowrap"><FontAwesomeIcon icon={faShieldHalved} className="text-white"/> Administrator</div>
                                                </div>
                                                <p className="text-xl text-gray-500">Full system access - Manage all library operations.</p>
                                            </div>
                                            <div className="flex gap-4 mt-10 bg-red-200/30 px-8 py-4 border-1 border-red-600 rounded-md">
                                                <FontAwesomeIcon icon={faShieldHalved} className="self-center text-red-400 md:text-3xl"/>
                                                <div>
                                                    <h1 className="font-bold text-xl text-red-950">Administrator Access</h1>
                                                    <p className="text-red-700">You have full system privileges including delete operation, 
                                                        genre management and staff administration</p>
                                                </div>
                                            </div>
                                        </div>}
                    {role === 'librarian' && <div>
                                            <div>
                                                <div className="flex gap-4 mt-6">
                                                    <h1 className="font-bold text-4xl">Librarian Dashboard</h1>
                                                    <div className="px-6 pt-2 rounded-3xl bg-black text-white min-w-42 max-h-10 font-bold text-nowrap"><FontAwesomeIcon icon={faShieldHalved} className="text-white"/> Librarian</div>
                                                </div>
                                                <p className="text-xl text-gray-500">Standard library operations - Books, members and borrowing</p>
                                            </div>
                                            <div className="flex gap-4 mt-10 bg-green-200/30 px-8 py-4 border-1 border-green-600 rounded-md">
                                                <FontAwesomeIcon icon={faUser} className="self-center text-green-500 md:text-3xl"/>
                                                <div>
                                                    <h1 className="font-bold text-xl text-green-950">Librarian Access</h1>
                                                    <p className="text-green-700 text-xl">You can manage books and members, handle borrowing operations, and view reports. 
                                                        Contact admin for advanced operations.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>}
                    <div className="md:flex flex-wrap md:gap-12">
                        {role === 'admin' && <StatCard icon={faBookOpen} title={"Total Books"} data={totalBooks} meta={"All books in system"}/>}
                        {role === 'librarian' && <StatCard icon={faBookOpen} title={"Total Books"} data={totalBooks} />}
                        <StatCard title={"Total Members"} data={totalMembers} icon={faUsers}/>
                        <StatCard title={"Active Borrows"} data={activeBorrows} icon={faArrowsTurnToDots}/>
                        {role === 'admin' && <StatCard title={"Overdue Books"} data={overdueBooks} icon={faTriangleExclamation} overdue={true} />}
                        {role === 'librarian' && <StatCard title={"Overdue Books"} data={overdueBooks} icon={faTriangleExclamation} overdue={true} meta={"Your assigned books"}/>}
                    </div>
                    <div className="w-full m-auto px-8 py-4 bg-white">
                        <h1 className="text-2xl font-bold">Quick Actions</h1>
                        {role === 'admin' && <p>Administrative and library operations</p>}
                        {role === 'librarian' && <p>Common library operations</p>}
                        <div className="flex flex-wrap gap-6 w-full">
                            <QuickActions navigate={'/borrowreturn'} button={'Borrow Book'} icon={faArrowsTurnToDots} color={'black'}/>
                            <QuickActions navigate={'/borrowreturn'} button={'Return Book'} icon={faArrowsTurnToDots}/>
                            <QuickActions navigate={'/members'} button={'Add Member'} icon={faAdd}/>
                            <QuickActions navigate={'/books'} button={'Add Book'} icon={faAdd}/>
                            {role === 'admin' && <QuickActions navigate={'/genres'} button={'Manage Genres'} icon={faGear} color={'red'}/>}
                            {role === 'admin' && <QuickActions navigate={'/reports'} button={'Admin Reports'} icon={faChartColumn} color={'red'}/>}
                        </div>
                    </div>
                    <div className="p-8 shadow-md shadow-gray-500 bg-white rounded-md w-full m-auto mt-8">
                        <h1 className="text-4xl font-bold md:text-2xl">Recent Activity</h1>
                        {role === 'admin' && <p className="text-xl mt-1 mb-2 md:text-lg">System wide borrow and return operations</p>}
                        {role === 'librarian' && <p className="text-xl mt-1 mb-2 md:text-lg">Recent borrow and return operations</p>}
                        <RecentActivity icon={faArrowsTurnToDots} action={'Borrowed'} title={'The great gatsby'} member={'Nuru'} date={'1/5/2016'}/>
                        <RecentActivity icon={faArrowsTurnToDots} action={'Returned'} title={'The great gatsby'} member={'Nuru'} date={'1/5/2016'}/>
                        <RecentActivity icon={faArrowsTurnToDots} action={'Borrowed'} title={'The great gatsby'} member={'Nuru'} date={'1/5/2016'}/>
                        <RecentActivity icon={faArrowsTurnToDots} action={'Returned'} title={'The great gatsby'} member={'Nuru'} date={'1/5/2016'}/>
                        <RecentActivity icon={faArrowsTurnToDots} action={'Borrowed'} title={'The great gatsby'} member={'Nuru'} date={'1/5/2016'}/>
                    </div>
                </main>
        </div>
    )
}
export default Dashboard