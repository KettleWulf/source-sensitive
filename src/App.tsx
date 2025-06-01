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
import FilmDetailsPage from './pages/FilmDetailsPage';
import PersonDetailsPage from './pages/PersonDetailsPage';
import PlanetDetailsPage from './pages/PlanetDetailsPage';
import SpeciesDetailsPage from './pages/SpeciesDetailsPage';
import StarshipDetailsPage from './pages/StarshipDetailsPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films" element={<FilmsPage />} />
					<Route path="/films/:id" element={<FilmDetailsPage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/people/:id" element={<PersonDetailsPage/>} />
					<Route path="/planets" element={<PlanetsPage />} />
					<Route path="/planets/:id" element={<PlanetDetailsPage />} />
					<Route path="/species" element={<SpeciesPage />} />
					<Route path="/species/:id" element={<SpeciesDetailsPage />} />
					<Route path="/starships" element={<StarshipsPage />} />
					<Route path="/starships/:id" element={<StarshipDetailsPage />} />
					<Route path="/vehicles" element={<VehiclesPage />} />
					<Route path="/vehicles/:id" element={<VehicleDetailsPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
		
	)
}

export default App
