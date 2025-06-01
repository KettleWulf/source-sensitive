import { useSearchParams } from "react-router";

export const useSearchAndPagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const query = searchParams.get("query") || "";

	const handlePageChange = (newPage: number) => {
		setSearchParams({ query, page: newPage.toString() });
	};

	const handleSearch = (newQuery: string) => {
		setSearchParams({ query: newQuery, page: "1" });
	};

	return { page, query, handlePageChange, handleSearch };
};