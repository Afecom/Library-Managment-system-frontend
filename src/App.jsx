import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import Login from "./login"
import HeaderAsideLayout from './header-navigatorlayout'
import Dashboard from "./pages/dashboard"
import BorrowReturn from "./pages/borrowreturn"
import Books from "./pages/books"
import Members from "./pages/members"
import Genres from "./pages/genres"
import Reports from "./pages/reports"
import Staffs from "./pages/staffs"
import Profile from './pages/profile'

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

export const totalBooksContext = createContext()
export const totalMembersContext = createContext()
export const activeBorrowsContext = createContext()
export const overdueBooksContext = createContext()
export const genresContext = createContext()
export const staffContext = createContext()
export const usersContext = createContext()
export const popularGenresContext = createContext()
export const borrowSummaryContext = createContext()

function App() {
  const [totalBooks, setTotalBooks] = useState(null);
  const [totalMembers, setTotalMembers] = useState(null)
  const [activeBorrows, setActiveBorrows]= useState(null)
  const [overdueBooks, setOverdueBooks] = useState(null)
  const [genres, setGenres] = useState(null)
  const [staff, setStaff] = useState(null)
  const [users, setUsers] = useState(null)
  const [popularGenres, setPopularGenres] = useState(null)
  const [borrowSummary, setBorrowSummary] = useState(null)

  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  useEffect(() => {
    async function getData(){
    try{
      const [booksRes, membersRes, borrowsRes, overdueRes, genresRes, staffsRes, usersRes, popularGenresRes, borrowSummaryRes] = await Promise.all([
        axiosInstance.get('/books'),
        axiosInstance.get('/members'),
        axiosInstance.get('/borrow-records'),
        axiosInstance.get('/borrow-records/reports/overdue'),
        axiosInstance.get('/genres'),
        axiosInstance.get('/auth/users'),
        axiosInstance.get('auth/profile'),
        axiosInstance.get('/borrow-records/reports/popular-genres'),
        axiosInstance.get('/borrow-records/reports/summary')
      ]);
      setTotalBooks(booksRes);
      setTotalMembers(membersRes);
      setActiveBorrows(borrowsRes);
      setOverdueBooks(overdueRes);
      setGenres(genresRes);
      setStaff(staffsRes);
      setUsers(usersRes);
      setPopularGenres(popularGenresRes);
      setBorrowSummary(borrowSummaryRes);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  }
  getData()
  }, [])

  return (
    <div>
      <totalBooksContext.Provider value={totalBooks}>
      <totalMembersContext.Provider value={totalMembers}>
      <activeBorrowsContext.Provider value={activeBorrows}>
      <overdueBooksContext.Provider value={overdueBooks}>
      <genresContext.Provider value={genres}>
      <staffContext.Provider value={staff}>
      <usersContext.Provider value={users}>
      <popularGenresContext.Provider value={popularGenres}>
      <borrowSummaryContext.Provider value={borrowSummary}>
        <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route element={<HeaderAsideLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/borrowreturn" element={<BorrowReturn />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        )}
        </Routes>
      </borrowSummaryContext.Provider>
      </popularGenresContext.Provider>
      </usersContext.Provider>
      </staffContext.Provider>
      </genresContext.Provider>
      </overdueBooksContext.Provider>
      </activeBorrowsContext.Provider>
      </totalMembersContext.Provider>
      </totalBooksContext.Provider>
    </div>
  )
}

export default App