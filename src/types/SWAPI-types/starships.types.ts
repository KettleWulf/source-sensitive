import type { PaginatedResponse } from "../Common-types/paginated-response.types";
import type { NamedReference, TitledReference } from "../Common-types/reference.types";


export interface Starship {
	id: number;
	name: string;
	model: string;
	starship_class: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	hyperdrive_rating: string;
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	created: string;
	edited: string;

	pilots: NamedReference[];
	films: TitledReference[];
}

export interface StarshipsListItem {
	id: number;
	name: string;
	model: string;
	starship_class: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	hyperdrive_rating: string;
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	created: string;
	edited: string;

	pilots_count: number;
	films_count: number;
}

export type StarshipsListResponse = PaginatedResponse<StarshipsListItem>;