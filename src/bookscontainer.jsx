import { faCircleXmark, faEye, faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BookInfo from "./bookinfo"
import EditBook from "./editbook"
import DeleteBook from "./deletebook"

function BooksContainer(props){
    const modalBase = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white border-1 border-gray-300 shadow-lg rounded transition-all duration-300";
    const modalOpen = "opacity-100 scale-100 pointer-events-auto";
    const modalClosed = "opacity-0 scale-95 pointer-events-none";

    return(
        <div className="p-4 border-1 mt-8 border-gray-300 bg-white rounded-md">
            <div className={`${modalBase} ${props.isSeen ? modalOpen : modalClosed}`}>
                {props.isSeen && (
                    <>
                        <BookInfo
                            title={props.title}
                            author={props.author}
                            publishedYear={props.publishedYear}
                            availableCopies={props.availableCopies}
                            genre={props.genre}
                            status={props.availability}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isEditable ? modalOpen : modalClosed}`}>
                {props.isEditable && (
                    <>
                        <EditBook
                            title={props.title}
                            id={props.id}
                            author={props.author}
                            publishedYear={props.publishedYear}
                            availableCopies={props.availableCopies}
                            genre={props.genre}
                            onCloseModal={props.onCloseModal}
                            genres={props.genres}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isRemovable ? modalOpen : modalClosed}`}>
                {props.isRemovable && (
                    <>
                        <DeleteBook
                            title={props.title}
                            id={props.id}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className="flex justify-between gap-8 w-82 m-auto max-w-82">
                <div>
                    <h3 className="font-bold text-xl text-wrap">{props.title}</h3>
                    <p className="text-md mb-2">by {props.author}</p>
                </div>
                {props.availability === false && (
                    <div className="bg-red-500 rounded-2xl max-h-7 px-4 text-white"><p>Out of stock</p></div>
                )}
                {props.availability && (
                    <div className="bg-black rounded-2xl max-h-7 px-4 text-white"><p>Available</p></div>
                )}
            </div>
            <p className="text-md mt-3">Genre: {props.genre}</p>
            <p className="text-md mt-3">Published {props.publishedYear}</p>
            <p className="text-md mt-3">Available Copies: {props.availableCopies}</p>
            <div className="flex justify-end self-end mt-4 gap-4">
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onSee}><FontAwesomeIcon icon={faEye} /></div>
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onEdit}><FontAwesomeIcon icon={faPencilSquare} /></div>
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onRemove}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
        </div>
    )
}
export default BooksContainer