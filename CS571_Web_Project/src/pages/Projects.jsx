import { useState } from 'react';
import { Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap';

function Projects({ projects, interestIds, onToggleInterest }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const showModal = Boolean(selectedProject);

  const handleClose = () => setSelectedProject(null);

  return (
    <div className="projects-page">
      <div className="section mb-4">
        <h1 className="section-title">Projects</h1>
        <p className="text-muted">
          Explore our work across Madagascar, from clinic upgrades to health education and community wellness.
        </p>
      </div>

      <Row xs={1} md={2} xl={3} className="g-4">
        {projects.map((project) => {
          const isInterested = interestIds.includes(project.id);
          return (
            <Col key={project.id}>
              <Card className="h-100 project-card shadow-sm border-0">
                <Card.Img src={project.image} alt={project.title} />
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <Badge bg="success">{project.type}</Badge>
                    <div className="d-flex gap-2">
                      <Badge bg="secondary">{project.status}</Badge>
                      {isInterested && <Badge bg="info" text="dark">Interested</Badge>}
                    </div>
                  </div>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{project.location}</Card.Subtitle>
                  <Card.Text>{project.summary}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <Button variant="outline-primary" onClick={() => setSelectedProject(project)}>
                    Learn more
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProject?.image}
            alt={selectedProject?.title}
            className="img-fluid rounded mb-3"
          />
          <p>{selectedProject?.details}</p>
          <h6>Impact highlights</h6>
          <ul>
            {selectedProject?.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={interestIds.includes(selectedProject?.id) ? 'outline-danger' : 'success'}
            onClick={() => {
              if (selectedProject) {
                onToggleInterest(selectedProject.id);
              }
            }}
          >
            {interestIds.includes(selectedProject?.id) ? 'Remove from Interests' : 'Add to Interests'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Projects;
