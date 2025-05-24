import api from "../lib/api";
import type { PeopleListResponse, Person } from "../types/SWAPI-types/people.types";


export const getPeople = async () => {
	const res = await api.get<PeopleListResponse>("/people");

	return res.data
}

export const getPerson = async (id: number) => {
	const res = await api.get<Person>("/people/" + id)

	return res.data
}