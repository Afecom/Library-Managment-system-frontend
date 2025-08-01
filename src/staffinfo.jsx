import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faCircleXmark, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"

function StaffInfo(props){
    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 bg-white shadow-3xl shadow-gray-300 rounded-xl">
            <h5 className="text-2xl font-bold text-center">{props.username}</h5>
            <p className="text-xl mt-1 text-center mb-8">Staff Member Details</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <div className="flex flex-col gap-2">
                <div className="flex gap-6 mt-4">
                    <p className="text-xl font-bold">username:</p>
                    <p className="text-xl"><FontAwesomeIcon icon={faUser} /> {props.username}</p>
                </div>
                <div className="flex gap-12 mt-4">
                    <p className="text-xl font-bold">Email:</p>
                    <p className=""><FontAwesomeIcon icon={faEnvelope} /> {props.email}</p>
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl font-bold">Phone:</p>
                    <p className="text-xl"><FontAwesomeIcon icon={faPhone} /> {props.phoneNumber}</p>
                </div>
                <div className="flex gap-16 mt-4"> 
                    <p className="text-xl font-bold">Role:</p>
                    {props.role == 'librarian' && (<div className="flex gap-2 items-center"><FontAwesomeIcon icon={faUser} /> <div className="bg-black text-white rounded-2xl text-xl px-3"><p>Librarian</p></div></div>)}
                    {props.role === 'admin' && (<div className="flex gap-2 items-center"><FontAwesomeIcon icon={faUser} /> <div className="bg-red-500 text-white rounded-2xl text-xl px-3"><p>Admin</p></div></div>)}
                </div>
                <div className="flex gap-8 mt-4">
                    <p className="text-xl font-bold">Created:</p>
                    <p className="text-xl"><FontAwesomeIcon icon={faCalendar} /> {props.dateCreated}</p>
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl font-bold">Status:</p>
                     <div className="bg-black text-white rounded-2xl text-xl px-3"><p>Active</p></div>
                </div>
            </div>
        </div>
    )
}
export default StaffInfo