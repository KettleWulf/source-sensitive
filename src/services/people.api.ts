import api from "../lib/api";
import type { PeopleListResponse, Person } from "../types/SWAPI-types/people.types";


export const getPeople = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<PeopleListResponse>(`/people?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 1000));

	return res.data;
}

export const getPerson = async (id: number) => {
	const res = await api.get<Person>("/people/" + id)

	return res.data
}