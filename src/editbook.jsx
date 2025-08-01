import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
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

function EditBook(props){
    const genres = props.genres

    async function submitHandler(e){
        e.preventDefault();

        const form = e.target
        const title = form.elements.title.value
        const author = form.elements.author.value
        const publishedYear = form.elements.publishedYear.value
        const availableCopies = form.elements.availableCopies.value
        const genreID = form.elements.genre.value
        const bookId = props.id 

        try{
            const response = await axiosInstance.patch(`/books/${bookId}`, {
                title: `${title}`,
                author: `${author}`,
                published_year: Number(publishedYear),
                available_copies: Number(availableCopies),
                genre_id: Number(genreID),
            })
            console.log(response)
            if (response.request.status === 200){
                window.location.href = "/books"
            }
        }
        catch(error){
            alert("Couldn't perform the requested action")
            console.error("Couldn't update the book", error)
        }
    }

    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white shadow-3xl shadow-gray-300 rounded-md">
            <h1 className="text-center font-bold text-2xl">Edit Book</h1>
            <p className="text-center">Update the book information below.</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <form onSubmit={submitHandler}>
                <div className="mt-4">
                    <label htmlFor="titleInput">Title</label><br />
                    <input required type="text" id="titleInput" name="title" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.title}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="authorInput">Author</label><br />
                    <input required type="text" id="authorInput" name="author" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.author}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="publishedYearInput">Published Year</label><br />
                    <input required type="text" id="publishedYearInput" name="publishedYear" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.publishedYear}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="availableCopiesInput">Available Copies</label><br />
                    <input required type="text" id="availableCopiesInput" name="availableCopies" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.availableCopies}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="genreSelect">Genre</label><br />
                    <select required name="genre" id="genreSelect" className="p-2  w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.genre}>
                        {genres.map((genre, index) => {
                            return (
                                <option value={genre.id} key={genre.id} >{genre.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mt-4">
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-md mb-4 hover:bg-gray-800 hover: cursor-pointer">Update Book</button>
                    <button type="reset" className="w-full py-2 rounded-md mb-4 border-1 border-gray-300 hover:bg-gray-300 hover: cursor-pointer" onClick={props.onCloseModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default EditBook