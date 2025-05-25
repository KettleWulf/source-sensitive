import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { VehiclesListItem } from '../../types/SWAPI-types/vehicles.types';


interface VehicleCardProps {
	vehicle: VehiclesListItem;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{vehicle.name}</Card.Title>
			<Card.Text>
				<strong>Language:</strong> {vehicle.manufacturer}
			</Card.Text>
			<Card.Text>
				<strong>Designation:</strong> {vehicle.model}
			</Card.Text>
			<Card.Text>
				<strong>Vehicle Class:</strong> {vehicle.vehicle_class}
			</Card.Text>
			
			<Link to={`/vehicles/${vehicle.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default VehicleCard;