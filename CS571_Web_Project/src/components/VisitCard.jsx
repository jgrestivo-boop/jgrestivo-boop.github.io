import { Badge, Button, Card } from 'react-bootstrap';

// Reusable card used on the Missions page. It keeps the trip details consistent across the list
// while leaving the surrounding page container responsible for layout and navigation.
function VisitCard({ trip, applied, onApply, onLearnMore }) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Img src={trip.image} alt={trip.title} className="visit-card-image" />

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title>{trip.title}</Card.Title>
            <Card.Subtitle className="text-muted">{trip.focus}</Card.Subtitle>
          </div>

          <Badge bg="warning" text="dark">
            {trip.schedule}
          </Badge>
        </div>

        <Card.Text>{trip.summary}</Card.Text>

        <div className="d-flex flex-wrap gap-2 mt-3">
          <Button
            size="sm"
            variant={applied ? 'secondary' : 'success'}
            disabled={applied}
            onClick={onApply}
          >
            {applied ? 'Applied' : 'Apply'}
          </Button>

          <Button size="sm" variant="outline-secondary" onClick={onLearnMore}>
            Learn more
          </Button>
        </div>
      </Card.Body>

      <Card.Footer className="bg-white border-top-0 text-muted">
        Estimated stay: {trip.estimate}
      </Card.Footer>
    </Card>
  );
}

export default VisitCard;
