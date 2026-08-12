import { Badge, Button, Card } from 'react-bootstrap';

// Reusable project card for the projects gallery. The card carries the core presentation, while
// the containing page manages the selected project and the interest state.
function ProjectCard({ project, isInterested, onLearnMore }) {
  return (
    <Card className="h-100 project-card shadow-sm border-0">
      <Card.Img src={project.image} alt={project.title} />

      <Card.Body>
        <div className="d-flex align-items-start justify-content-between mb-2">
          <Badge bg="success">{project.type}</Badge>
          {isInterested && (
            <Badge bg="info" text="dark">
              Interested
            </Badge>
          )}
        </div>

        <Card.Title>{project.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{project.location}</Card.Subtitle>
        <Card.Text>{project.summary}</Card.Text>
      </Card.Body>

      <Card.Footer className="bg-white border-top-0">
        <Button variant="outline-primary" onClick={onLearnMore}>
          Learn more
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
