import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router';
import type { NamedReference } from '../types/Common-types/reference.types';


interface Props {
  title: string;
  items: NamedReference[];
  basePath: string;
  eventKey: string;
}

const ResourceAccordion = ({ title, items, basePath, eventKey }: Props) => {
	if (!items.length) return null;

	return (
	<Accordion.Item eventKey={eventKey}>
		<Accordion.Header>{title}</Accordion.Header>
		<Accordion.Body>
			<ListGroup variant="flush">
				{items.map((item) => (
					<ListGroup.Item key={item.id}>
						<Link to={`/${basePath}/${item.id}`}>{item.name}</Link>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Accordion.Body>
	</Accordion.Item>
  );
};

export default ResourceAccordion;