import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from './IndexPage'
import Login from './Login'
import Register from './Register'

import './App.css'

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