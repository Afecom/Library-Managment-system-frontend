import { useContext } from "react"
import { usersContext } from "../App"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faEnvelope, faPhone, faShield, faUser } from "@fortawesome/free-solid-svg-icons"

function Profile(){
    const user = useContext(usersContext)?.data ?? []
    return(
        <div className="py-5 px-5">
            <h1 className="font-bold text-3xl">Profile</h1>
            <p className="text-lg text-gray-700 mt-2">View your account information and permissions</p>
            <div className="px-4 py-6 bg-white rounded-md border-1 border-gray-300 mt-6 md:w-[60%]">
                <div className="flex items-center gap-6 mb-4">
                    <div className="rounded-full px-5 py-4 bg-blue-200"><FontAwesomeIcon icon={faUser} className="text-blue-700 text-4xl"/></div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-2xl">{user.username}</p>
                        {user.role === 'admin' && <div className="rounded-2xl py-1 px-2 bg-red-500 text-white text-center">ADMIN</div>}
                        {user.role === 'librarian' && <div className="rounded-2xl py-1 px-2 text-center bg-black text-white">LIBRARIAN</div>}
                    </div>
                </div>
                <div className="w-full m-auto">
                    <h1 className="font-bold text-2xl">Basic Information</h1>
                    <div className="flex items-center gap-6 mt-4 bg-gray-100 py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faUser} className="text-xl"/>
                        <div>
                            <p>Username</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 bg-gray-100 py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faEnvelope} className="text-xl"/>
                        <div className="overflow-hidden overflow-ellipsis">
                            <p>Email Address</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 bg-gray-100 py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faPhone} className="text-xl"/>
                        <div>
                            <p>Phone Number</p>
                            <p>{user.phone_number}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 bg-gray-100 py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faShield} className="text-xl"/>
                        <div>
                            <p>Role</p>
                            <p>{user.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-6 bg-gray-100 py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faCalendar} className="text-xl"/>
                        <div>
                            <p>Member Since</p>
                            <p>{user?.created_at?.split('T')[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 bg-white rounded-md border-1 border-gray-300 mt-6 md:w-[60%]">
                <h1 className="text-3xl font-bold">Permissions & Access</h1>
                <p>Your current role permissions</p>
                {user.role === 'admin' && (<div className="mt-4">
                    <div className="flex items-center gap-2 text-green-400">
                        <FontAwesomeIcon icon={faShield}/>
                        <p>Full system administration access</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 mt-2">
                        <FontAwesomeIcon icon={faShield}/>
                        <p>Manage all books, members, and genres</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 mt-2">
                        <FontAwesomeIcon icon={faShield}/>
                        <p>Delete records and manage staff</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 mt-2">
                        <FontAwesomeIcon icon={faShield}/>
                        <p>Access all reports and analytics</p>
                    </div>
                </div>)}
                {user.role === 'librarian' && (<div className="mt-4">
                    <div className="flex items-center gap-3 text-blue-700">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>Manage books and members</p>
                    </div>
                    <div className="flex items-center gap-3 text-blue-700 mt-2">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>Handle borrow/return operations</p>
                    </div>
                    <div className="flex items-center gap-3 text-blue-700 mt-2">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>View basic reports</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 mt-2">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>Cannot delete records or manage genres</p>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
export default Profile