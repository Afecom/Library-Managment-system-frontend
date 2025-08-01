import { faArrowsTurnToDots, faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BorrowsReturns from "../borrowsreturnscont"
import { useContext, useState, createContext } from "react"
import { totalMembersContext } from "../App"
import { totalBooksContext } from "../App"
import { activeBorrowsContext } from "../App"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'https://library-managment-system-api.onrender.com'
})

axiosInstance.interceptors.request.use((config) =>{
  const token = localStorage.getItem('token')
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export const returnBk = createContext();

function BorrowReturn(){
    const borrowsReturns = useContext(activeBorrowsContext)?.data ?? []
    const [isBorrowBookOpen, setisBorrowBookOpen] = useState(null)
    const [isReturnBookOpen, setisReturnBookOpen] = useState(null)
    const members = useContext(totalMembersContext)?.data ?? []
    const books = useContext(totalBooksContext)?.data ?? []
    const currenDate = new Date().toISOString().split('T')[0]
    const dateAfter = new Date(currenDate)
    dateAfter.setDate(dateAfter.getDate() + 14)
    const fullDateAfter = dateAfter.toISOString().split('T')[0] 
    // console.log(members)
    // console.log(books)

    const showOverlay = isBorrowBookOpen || isReturnBookOpen

    async function borrowHandler(e){
        const form = e.target
        const bookId = form.elements.selectBook.value
        const memberID = form.elements.selectMember.value
        const dueDate = fullDateAfter
        e.preventDefault()

        try{
            const response = await axiosInstance.post('/borrow-records/borrow', {
                book_id: Number(bookId),
                member_id: Number(memberID),
                due_date: `${dueDate}`
            })
            console.log(response)
            if (response.status === 201){
                window.location.href = '/borrowreturn'
            }
            else{
                alert("Couldn't post the data to the database")
            }
        }
        catch (error){
            console.error("Couldn't post the data to the database", error)
        }
    }

    async function returnHandler(e){
        e.preventDefault()

        const form = e.target
        const boorrowId = form.elements.selectBorrow.value

        try{
            const response = await axiosInstance.post('/borrow-records/return', {
                borrow_record_id: Number(boorrowId),
            })
            console.log(response)
            if (response.status === 201){
                window.location.href = '/borrowreturn'
            }
            else{
                alert("Couldn't post the data to the database")
            }
        }
        catch (error){
            console.error("Couldn't post the data to the database", error)
        }
    }

    return(
        <div className="p-4 md:p-8">
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setisBorrowBookOpen(false)
                        setisReturnBookOpen(false)
                    }}
                />
            )}
            {isBorrowBookOpen && (<form className="p-4 bg-white fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300" onSubmit={borrowHandler}>
                <FontAwesomeIcon icon={faXmark} className="absolute top-4 right-6 bg-black rounded-full py-2 px-2 text-white hover:cursor-pointer hover:bg-white hover:text-black" onClick={() => setisBorrowBookOpen(false)}/>
                <div className="mb-4">
                    <h1 className="text-center font-bold text-2xl">Borrow Book</h1>
                    <p className="text-center text-gray-400">Select a book and member to create a new borrow record.</p>
                </div>
                <div className="mt-8">
                    <div className="w-full m-auto">
                        <label htmlFor="bookSelect" className="mb-2 text-lg font-bold">Select Book</label>
                        <select name="selectBook" id="bookSelect" defaultValue={'choose a book to borrow'} className="w-full p-2 border-1 border-gray-400 rounded-md" required>
                            {books.map((book, index) => {
                                return(
                                    <option value={book.id} key={book.id}>
                                       {book.title} --
                                       by {book.author} -- {book.available_copies} available
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="w-full m-auto mt-4">
                        <label htmlFor="memberSelect" className="mb-2 text-lg font-bold">Select Member</label>
                        <select name="selectMember" id="memberSelect" defaultValue={'choose a member'} className="w-full p-2 border-1 border-gray-400 rounded-md" required>
                            {members.map((member, index) => {
                                return(
                                    <option value={member.id} key={member.id}>
                                       {member.name} -- {member.email}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <hr className="border-gray-400 mt-8"/>
                    <div className="flex justify-between mt-10">
                        <div className="flex flex-col gap-1">
                            <p>Borrow Date</p>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendar} /><p>{currenDate}</p></div>
                        </div>
                        <div className="flex flex-col gap-1 mr-8">
                            <p>Due Date</p>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendar} /><p>{fullDateAfter}</p></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="py-2 w-full bg-black text-white text-xl rounded-md hover:cursor-pointer hover:bg-gray-800">Borrow Book</button>
                        <button className="py-2 w-full text-xl rounded-md hover:cursor-pointer hover:bg-gray-300 border-1 border-gray-400 mt-2" onClick={() => setisBorrowBookOpen(false)}>Cancel</button>
                    </div>
                </div>
            </form>)}
            {isReturnBookOpen && (<form className="p-4 bg-white fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300" onSubmit={returnHandler}>
                <FontAwesomeIcon icon={faXmark} className="absolute top-4 right-6 bg-black rounded-full py-2 px-2 text-white hover:cursor-pointer hover:bg-white hover:text-black" onClick={() => setisReturnBookOpen(false)}/>
                <div className="mb-4">
                    <h1 className="text-center font-bold text-2xl">Return Book</h1>
                    <p className="text-center text-gray-400">Select a borrowed book to mark as returned</p>
                </div>
                <div className="mt-8">
                    <div className="w-full m-auto">
                        <label htmlFor="borrowSelect" className="mb-2 text-lg font-bold">Select Book to return</label>
                        <select name="selectBorrow" id="borrowSelect" defaultValue={'choose a book to return'} className="w-full p-2 border-1 border-gray-400 rounded-md" required>
                            {borrowsReturns.map((bR, index) => {
                                if (!bR.return_date){
                                    return(
                                    <option value={bR.id} key={bR.id}>
                                      {bR.book.title} -- by: {bR.book.author} -- borrowed by: {bR.member.name} -- Due: {bR.due_date} 
                                    </option>
                                )
                                }
                            })}
                        </select>
                    </div>
                    <hr className="border-gray-400 mt-8"/>
                    <div className="flex flex-col gap-1 mt-8">
                        <p>Return Date</p>
                        <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendar} /><p>{currenDate}</p></div>
                    </div>
                    <div className="mt-4">
                        <button className="py-2 w-full bg-black text-white text-xl rounded-md hover:cursor-pointer hover:bg-gray-800">Return Book</button>
                        <button className="py-2 w-full text-xl rounded-md hover:cursor-pointer hover:bg-gray-300 border-1 border-gray-400 mt-2" onClick={() => setisReturnBookOpen(false)}>Cancel</button>
                    </div>
                </div>
            </form>)}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-4xl">Borrow & Return</h1>
                    <p className="md:text-2xl text-gray-500">Manage book borrowing and return operations</p>
                </div>
                <div className="flex gap-2 md:gap-4">
                    <button className="bg-black text-white py-2 px-3 rounded-md flex items-center gap-4 text-sm md:text-xl md:px-6 md:py-6 hover:bg-gray-900 hover:cursor-pointer h-10 text-nowrap" onClick={() => setisBorrowBookOpen(true)}>
                        <FontAwesomeIcon icon={faArrowsTurnToDots} />
                        Borrow Book
                    </button>
                    <button className="py-2 px-3 rounded-md flex items-center gap-4 text-md md:text-xl md:px-6 md:py-6 bg-white hover:cursor-pointer hover:bg-gray-200 h-10 text-nowrap border-1 border-gray-300" onClick={() => setisReturnBookOpen(true)}>
                        <FontAwesomeIcon icon={faArrowsTurnToDots} />
                        Return Book
                    </button>
                </div>
            </div>
            <returnBk.Provider value={setisReturnBookOpen}>
                {borrowsReturns.map((bR, index) => {
                    return(
                            <BorrowsReturns 
                                key={bR.id}
                                title={bR.book.title}
                                member={bR.member.name}
                                borrowed={bR.borrow_date}
                                due={bR.due_date}
                                returned={bR.return_date ? true : false}
                                status={new Date().toISOString().split('T')[0] > bR.due_date ? "overdue" : "active"}
                            />
                    )
                })}
            </returnBk.Provider>
        </div>
    )
}
export default BorrowReturn