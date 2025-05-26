// import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import "./assets/scss/App.scss";
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router'
import FilmsPage from './pages/FilmsPage';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import SpeciesPage from './pages/SpeciesPage';
import VehiclesPage from './pages/VehiclesPage';
import StarshipsPage from './pages/StarshipsPage';
import FilmPage from './pages/FilmPage';
import PersonPage from './pages/PersonPage';
import PlanetPage from './pages/PlanetPage';
import SingleSpeciesPage from './pages/SingleSpeciesPage';
import StarshipPage from './pages/StarshipPage';
import VehiclePage from './pages/VehiclePage';

function App() {
	const navigate = useNavigate();
	const [, setSearchParams] = useSearchParams();

	const handleNavigation = (destination: string) => {
		setSearchParams({ page: "1", query: "" });

		navigate("/" + destination);
	}


	return (
		
		<div id="App">
			<Navigation onNavigate={handleNavigation}/>

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films" element={<FilmsPage />} />
					<Route path="/films/:id" element={<FilmPage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/people/:id" element={<PersonPage/>} />
					<Route path="/planets" element={<PlanetsPage />} />
					<Route path="/planets/:id" element={<PlanetPage />} />
					<Route path="/species" element={<SpeciesPage />} />
					<Route path="/species/:id" element={<SingleSpeciesPage />} />
					<Route path="/starships" element={<StarshipsPage />} />
					<Route path="/starships/:id" element={<StarshipPage />} />
					<Route path="/vehicles" element={<VehiclesPage />} />
					<Route path="/vehicles/:id" element={<VehiclePage />} />


					{/* <Route path="*" element={<NotFoundPage />} /> */}
				</Routes>
			</Container>
		</div>
		
	)
}

export default App
