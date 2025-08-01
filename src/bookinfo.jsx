import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

function BookInfo(props){
    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 bg-white shadow-3xl shadow-gray-300 rounded-xl">
            <h5 className="text-2xl font-bold">{props.title}</h5>
            <p className="text-xl mt-1">Book details</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <div className="flex flex-col gap-2">
                <div className="flex gap-18 mt-4">
                    <p className="text-xl">Author:</p>
                    <p className="text-xl">{props.author}</p>
                </div>
                <div className="flex gap-18 mt-4">
                    <p className="text-xl">Genre:</p>
                    <p className="text-xl">{props.genre}</p>
                </div>
                <div className="flex gap-10 mt-4">
                    <p className="text-xl">Published:</p>
                    <p className="text-xl">{props.publishedYear}</p>
                </div>
                <div className="flex gap-14 mt-4"> 
                    <p className="text-xl">Available:</p>
                    {props.status && (<div className="bg-black text-white rounded-2xl text-xl px-3"><p>{props.availableCopies} copies</p></div>)}
                    {!props.status && (<div className="bg-red-500 text-white rounded-2xl text-xl px-3"><p>0 copies</p></div>)}
                </div>
                <div className="flex gap-22 mt-4">
                    <p>Status:</p>
                    {props.status && (<div className="bg-black text-white rounded-2xl text-xl px-3"><p>Available</p></div>)}
                    {!props.status && (<div className="bg-black text-white rounded-2xl text-xl px-3"><p>Out of stock</p></div>)}
                </div>
            </div>
        </div>
    )
}
export default BookInfo