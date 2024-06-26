import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const handleClick1 = () => {
    
  }

  const handleClick2 = () => {
    
  }

  return (
    <header>
      <div className="container">
      
          <h1>Dashboard</h1>
          <Link to="/stocks">Stocks</Link>&nbsp;&nbsp;
          {user && <div>
          <button onClick={handleClick1} className="text-black bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800">Home</button>
          <button onClick={handleClick1} className="text-black bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800">Stocks</button>
          </div>}

        <nav>
          {user && (
            <div>




              <span>{user.email}</span>
              <button onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>&nbsp;&nbsp;
              <Link to="/Signup">Signup</Link>&nbsp;&nbsp;


             
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar