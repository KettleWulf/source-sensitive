import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"


interface SearchBarProps {
	onSearch: (query: string) => void;
	category: string;
	currentQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, category, currentQuery }) => {

	const [ searchTerm, setSearchTerm ] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchTerm.trim());
	};

	useEffect(() => {
		setSearchTerm(currentQuery);
	}, [currentQuery]);

	

  return (
	<Form onSubmit={handleSubmit} className="mb-3 search-bar-theme-sensitive">
		<Form.Label htmlFor="searchQuery" className="visually-hidden">Search Query</Form.Label>
		
		<InputGroup>
			<Form.Control
				id="searchQuery"
				placeholder={`Search the ${category}-catalogue`}
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				required
				autoFocus
			/>
			<Button type="submit" variant="light">
				Search
			</Button>
		</InputGroup>

	</Form>
	)
}

export default SearchBar