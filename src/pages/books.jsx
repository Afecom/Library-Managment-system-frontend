import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faSearch, faX } from "@fortawesome/free-solid-svg-icons"
import BooksContainer from "../bookscontainer"
import { useState, useContext } from "react"
import { totalBooksContext } from "../App"
import { genresContext } from "../App"
import Search from "../searchcomponent"
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

function Books(){
    const [isAddBookOpen, setIsAddBookOpen] = useState(false)
    const genres = useContext(genresContext)?.data ?? []

    function addBook(){
        setIsAddBookOpen(true)
    }

    const showOverlay = isAddBookOpen

    async function submitHandler(e){
        e.preventDefault();

        const form = e.target
        const title = form.elements.title.value
        const author = form.elements.author.value
        const publishedYear = form.elements.publishedYear.value
        const availableCopies = form.elements.availableCopies.value
        const genreID = form.elements.genres.value
        
        try{
            const response = await axiosInstance.post('/books', {
                                title: title,
                                author: author,
                                published_year: Number(publishedYear),
                                available_copies: Number(availableCopies),
                                genre_id: Number(genreID),
                            });
            if (response.request.status === 201){
                window.location.href = "/books"
            }
            else{
                alert("Couldn't perform the requested action")
            }
        }
        catch (error){
            console.error("there was an error posting the data", error)
        }
    }

    return(
        <div className="p-4 px-5 relative">
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setIsAddBookOpen(false)
                    }}
                />
            )}

            {isAddBookOpen && (
                <form className="p-4 bg-white fixed top-30 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300" onSubmit={submitHandler}>
                    <h1 className="text-center">Add New Book</h1>
                    <p className="text-center">Enter the details for the new book.</p>
                    <FontAwesomeIcon icon={faX} className="absolute right-6 top-6 hover:cursor-pointer hover:bg-black px-2 py-2 rounded-md hover:text-white" onClick={() => setIsAddBookOpen(false)}/>
                    <div className="mt-6">
                        <label htmlFor="titleInput">Title</label><br />
                        <input type="text" id="titleInput" name="title" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required/><br />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="authorInput">Author</label><br />
                        <input type="text" id="authorInput" name="author" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required/><br />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="publishInput">Published Year</label><br />
                        <input type="number" id="publishInput" name="publishedYear" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" defaultValue={new Date().getFullYear()} required/>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="copiesInput">Available Copies</label><br />
                        <input type="number" id="copiesInput" name="availableCopies" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" defaultValue={'1'} required/><br />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="genreSelect">Genre</label><br />
                        <select name="genres" id="genreSelect" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required>
                            {genres.map((genre, index) => {
                                return(
                                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer">Create Book</button>
                        <button type="reset" className="w-full py-2 border-1 border-gray-200 rounded-md mt-4 hover:bg-gray-200 hover:cursor-pointer" onClick={() => setIsAddBookOpen(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="flex gap-4 justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Books</h1>
                    <p className="text-md">Manage your library's book collection</p>
                </div>
                <button className="flex gap-4 bg-black text-white px-4 py-2 self-center rounded-md hover:bg-gray-900 hover:cursor-pointer" onClick={addBook}>
                    <FontAwesomeIcon icon={faAdd} className="self-center" />
                    Add Book
                </button>
            </div>
            <Search searchFor={'books'} placeHolder={'search books by title, author or genre...'} />
        </div>
    )
}
export default Books