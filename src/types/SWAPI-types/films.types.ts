import type { PaginatedResponse } from "../Common-types/paginated-response.types";
import type { NamedReference } from "../Common-types/reference.types";


export interface Film {
	id: number;
	title: string;
	episode_id: string;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	image_url: string;
	created: string;
	edited: string;

	characters: NamedReference[];
	planets: NamedReference[];
	starships: NamedReference[];
	vehicles: NamedReference[];
	species: NamedReference[];
}

export interface FilmListItem {
	id: number;
	title: string;
	episode_id: string;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	image_url: string;
	created: string;
	edited: string;

	characters_count: number;
	planets_count: number;
	starships_count: number;
	vehicles_count: number;
	species_count: number;
}

export type FilmListResponse = PaginatedResponse<FilmListItem>
