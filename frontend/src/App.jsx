import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import PageNotFound from './pages/404'

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return <div className='h-screen flex justify-center items-center bg-black'>
      <Loader className='animate-spin text-red-600  size-10' />
    </div>
  }
  console.log("auth use is here", user);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={'/login'} />} />

        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={'/login'} />} />
        {/* to handle 404 if page not found */}
        <Route path='/*' element={user ? <PageNotFound /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  )
}

export default App