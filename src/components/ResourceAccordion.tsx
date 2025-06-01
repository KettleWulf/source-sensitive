import type { NamedReference, TitledReference } from '../types/Common-types/reference.types';
import { Link } from 'react-router';

import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";


interface Props {
  title: string;
  items: Array<NamedReference | TitledReference>;
  basePath: string;
  eventKey: string;
}

const getLabel = (item: NamedReference | TitledReference): string => {
	if ('name' in item) return item.name;
	if ('title' in item) return item.title;
	return 'Unknown';
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
						<Link className="discreet-link underscore-link" to={`/${basePath}/${item.id}`}>{getLabel(item)}</Link>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Accordion.Body>
	</Accordion.Item>
  );
};

export default ResourceAccordion;