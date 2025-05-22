// import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import "./assets/scss/App.scss";
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'

function App() {


	return (
		
		<div id="App">
			<Navigation />
S
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />


					{/* <Route path="*" element={<NotFoundPage />} /> */}
				</Routes>
			</Container>
		</div>
		
	)
}

export default App
