import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { VehiclesListItem } from '../../types/SWAPI-types/vehicles.types';
import { getFallbackImage } from '../../utils/getFallbackImage';

interface VehicleCardProps {
	vehicle: VehiclesListItem;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
	return (
		<Link to={`/vehicles/${vehicle.id}`} className="text-decoration-none text-dark">
			<Card className="shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">
				<Card.Img
					className="image-ratio"
					variant="top"
					src={getFallbackImage(vehicle.name, "Vehicles")}
					alt={vehicle.name}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

				<Card.Body className="card-body-relative d-flex flex-column">
					<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{vehicle.name}</Card.Title>
					<Card.Text className="mb-1">
						<strong>Manufacturer:</strong> {vehicle.manufacturer}
					</Card.Text>
					<Card.Text className="mb-1">
						<strong>Model:</strong> {vehicle.model}
					</Card.Text>
					<Card.Text className="mb-5">
						<strong>Class:</strong> {vehicle.vehicle_class}
					</Card.Text>

					<div className="card-button-bottom-right mt-3">
						<Button variant="light" size="sm">Read More</Button>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default VehicleCard;