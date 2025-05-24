// import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import "./assets/scss/App.scss";
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'
import FilmsPage from './pages/FilmsPage';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import SpeciesPage from './pages/SpeciesPage';
import VehiclesPage from './pages/VehiclesPage';
import StarshipsPage from './pages/StarshipsPage';

function App() {


	return (
		
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films" element={<FilmsPage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/planets" element={<PlanetsPage />} />
					<Route path="/species" element={<SpeciesPage />} />
					<Route path="/starships" element={<StarshipsPage />} />
					<Route path="/vehicles" element={<VehiclesPage />} />


					{/* <Route path="*" element={<NotFoundPage />} /> */}
				</Routes>
			</Container>
		</div>
		
	)
}

export default App
