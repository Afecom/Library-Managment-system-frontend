import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faCircleXmark, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"

function MemberInfo(props){
    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 bg-white shadow-3xl shadow-gray-300 rounded-xl">
            <h5 className="text-2xl font-bold text-center">{props.fullName}</h5>
            <p className="text-xl mt-1 text-center mb-8">Member Details</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <div className="flex flex-col gap-2">
                <div className="flex gap-6 mt-4">
                    <p className="text-xl font-bold">Name:</p>
                    <p className="text-xl">{props.fullName}</p>
                </div>
                <div className="flex gap-12 mt-4">
                    <p className="text-xl font-bold">Email:</p>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p className="">{props.email}</p>
                    </div>
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl font-bold">Phone:</p>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faPhone} />
                        <p className="text-xl">{props.phoneNumber}</p>
                    </div>
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl font-bold">Joined:</p>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCalendar} />
                        <p className="text-xl">{props.joined}</p>
                    </div>
                </div>
                <div className="flex gap-16 mt-4"> 
                    <p className="text-xl font-bold w-10">Active Borrows:</p>
                    {props.activeBorrows > 0 && (<div className="flex gap-2 items-center"><div className="bg-black text-white rounded-2xl text-xl px-3"><p>{props.activeBorrows} books</p></div></div>)}
                    {props.activeBorrows == '0' && (<div className="flex gap-2 items-center"><div className="bg-gray-300 rounded-2xl text-xl px-3"><p>0 books</p></div></div>)}
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl font-bold">Status:</p>
                     <div className="bg-black text-white rounded-2xl text-xl px-3"><p>Active</p></div>
                </div>
            </div>
        </div>
    )
}
export default MemberInfo