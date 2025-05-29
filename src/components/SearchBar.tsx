import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	category: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, category }) => {

	const [ searchTerm, setSearchTerm ] = useState("")

	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchTerm.trim());
	};

  return (
	<Form onSubmit={handleSubmit} className="mb-3">
		<Form.Label htmlFor="searchQuery" className="visually-hidden">Search Query</Form.Label>
		
		<InputGroup>
			<Form.Control
				id="searchQuery"
				placeholder={`Enter your search query to peruse the ${category}-catalogue`}
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				required
			/>
			<Button type="submit" variant="light">
				Search
			</Button>
		</InputGroup>

	</Form>
	)
}

export default SearchBar