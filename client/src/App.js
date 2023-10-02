import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from './pages/IndexPage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'

import './styles/App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App