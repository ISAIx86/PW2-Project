import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Admin from './pages/AdminPage'
import Index from './pages/IndexPage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Add from './pages/AddPage'
import Chats from './pages/ChatsPage'
import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import Notifications from './pages/NotificationsPage'
import Profile from './pages/ProfilePage'
import Search from './pages/SearchPage'
import Settings from './pages/SettingsPage'
import UsersProfilesPage from './pages/UsersProfilesPage'

import './styles/App.css'

function App() {

	return (

		<BrowserRouter>

			<div className='app-container'>

				<Navbar/>

				<div className='content-container'>

					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/add" element={<Add />} />
						<Route path="/chats" element={<Chats/>} />
						<Route path="/home" element={<Home />} />
						<Route path="/notifications" element={<Notifications />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/search" element={<Search />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/userprofile" element={<UsersProfilesPage />} />
					</Routes>
					
				</div>

			</div>
			
		</BrowserRouter>

	)

}

export default App