import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState, createContext } from "react"
import { staffContext } from "./App"
import { totalBooksContext } from "./App"
import { genresContext } from "./App"
import { totalMembersContext } from "./App"
import BooksContainer from "./bookscontainer"
import MemberContainer from "./membercontainer"
import GenresContainer from "./genrescontainer"
import StaffContainer from "./staffcontainer"



function Search(props){
    const books = useContext(totalBooksContext)?.data ?? []
    const members = useContext(totalMembersContext)?.data ?? []
    const genres = useContext(genresContext)?.data ?? []
    const staffs = useContext(staffContext)?.data?.users ?? []
    const [searchTerm, setSearchTerm]= useState('')
    const placeHolder = props.placeHolder
    const searchFor = props.searchFor
    const [activeModal, setActiveModal] = useState({ type: null, Id: null })
    const showOverlay = !!activeModal.type

    if (searchFor === 'books'){
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return(
        <div>
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setActiveModal({ type: null, Id: null })
                    }}
                />
            )}
            <div className="relative">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-7"/>
                <input type="text" id="searchInput" className="pl-10 py-2 border-1 border-gray-300 my-4 w-full bg-white focus:outline-black focus:outline-2 rounded-md" placeholder={placeHolder} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="md:flex md:gap-4 md:flex-wrap">
                {filteredBooks.map((book, index) => (
                    <BooksContainer
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        genre={book.genre.name}
                        genres={genres}
                        publishedYear={book.published_year}
                        availableCopies={book.available_copies}
                        availability={book.available_copies > 0}
                        isSeen={activeModal.type === "seen" && activeModal.Id === book.id}
                        isEditable={activeModal.type === "editable" && activeModal.Id === book.id}
                        isRemovable={activeModal.type === "removable" && activeModal.Id === book.id}
                        onSee={() => setActiveModal({ type: "seen", Id: book.id })}
                        onEdit={() => setActiveModal({ type: "editable", Id: book.id })}
                        onRemove={() => setActiveModal({ type: "removable", Id: book.id })}
                        onCloseModal={() => setActiveModal({ type: null, Id: null })}
                    />
                ))}
            </div>
        </div>
    )
    }
    else if (searchFor === 'members'){
        const filteredMembers = members.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.includes(searchTerm) 
        )
        console.log(filteredMembers)
        return(
            <div>
                {showOverlay && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                        onClick={() => {
                            setActiveModal({ type: null, Id: null })
                    }}
                    />
                )}
                <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-7"/>
                    <input type="text" id="searchInput" className="pl-10 py-2 border-1 border-gray-300 my-4 w-full bg-white focus:outline-black focus:outline-2 rounded-md" placeholder={placeHolder} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <div className="md:flex md:gap-4 md:flex-wrap">
                            {filteredMembers.map((member, index) => {
                                return(
                                    <MemberContainer
                                    key={member.id}
                                    id={member.id}
                                    fullName={member.name}
                                    email={member.email}
                                    phoneNumber={member.phone}
                                    dateCreated={member.join_date}
                                    isSeen={activeModal.type === "seen" && activeModal.Id === member.id}
                                    isEditable={activeModal.type === "editable" && activeModal.Id === member.id}
                                    isRemovable={activeModal.type === "removable" && activeModal.Id === member.id}
                                    onSee={() => setActiveModal({ type: "seen", Id: member.id })}
                                    onEdit={() => setActiveModal({ type: "editable", Id: member.id })}
                                    onRemove={() => setActiveModal({ type: "removable", Id: member.id })}
                                    onCloseModal={() => setActiveModal({ type: null, Id: null })}
                                />
                                )
                            })}
                        </div>
            </div>
        )
    }
    else if (searchFor === 'genres'){
        const filteredGenres = genres.filter(genre =>
            genre.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return (
            <div>
                <div className="relative my-8">
                    <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3" />
                    <input type="text" name="search" id="searchBar" placeholder={placeHolder} className="w-full px-3 py-2 pl-12 rounded-md bg-white border-1 border-gray-400 focus:outline-2 focus:outline-black" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                {filteredGenres.map((genre, idx) => {
                    return (
                        <GenresContainer
                            key={genre.id}
                            id={genre.id}
                            name={genre.name}
                            isEditable={activeModal.type === "editable" && activeModal.genreId === genre.id}
                            isRemovable={activeModal.type === "removable" && activeModal.genreId === genre.id}
                            onEdit={() => setActiveModal({ type: "editable", genreId: genre.id })}
                            onRemove={() => setActiveModal({ type: "removable", genreId: genre.id })}
                            onCloseModal={() => setActiveModal({ type: null, bookId: null })}
                        />
                    )
                })}
            </div>
        )
    }
    else if (searchFor === 'staffs'){

        const filteredStaffs = staffs.filter(staff => 
            staff.username.toLowerCase().includes(searchTerm.toLowerCase) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return(
            <div>
                {showOverlay && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                        onClick={() => {
                            setActiveModal({ type: null, Id: null })
                    }}
                    />
                )}
                <div className="relative my-8">
                    <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3" />
                    <input type="text" name="search" id="searchBar" placeholder={placeHolder} className="w-full px-3 py-2 pl-12 rounded-md bg-white border-1 border-gray-400 focus:outline-2 focus:outline-black" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <div className="md:flex md:flex-wrap gap-8 w-full">
                            {filteredStaffs.map((staff, index) => {
                                return(
                                    <StaffContainer
                                    key={staff.id}
                                    id={staff.id}
                                    username={staff.username}
                                    email={staff.email}
                                    role={staff.role}
                                    phoneNumber={staff.phone_number}
                                    dateCreated={staff.created_at.split('T')[0]}
                                    isSeen={activeModal.type === "seen" && activeModal.staffId === staff.id}
                                    isEditable={activeModal.type === "editable" && activeModal.staffId === staff.id}
                                    isRemovable={activeModal.type === "removable" && activeModal.staffId === staff.id}
                                    onSee={() => setActiveModal({ type: "seen", staffId: staff.id })}
                                    onEdit={() => setActiveModal({ type: "editable", staffId: staff.id })}
                                    onRemove={() => setActiveModal({ type: "removable", staffId: staff.id })}
                                    onCloseModal={() => setActiveModal({ type: null, staffId: null })}
                                />
                                )
                            })}
                </div>
            </div>
        )
    }

}
export default Search