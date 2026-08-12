import { useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';

// Project gallery page. It shows the current work underway and lets users save projects to
// their profile for later follow-up.
function Projects({ projects, interestIds, onToggleInterest }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const showModal = Boolean(selectedProject);

  const handleClose = () => setSelectedProject(null);

  return (
    <div className="projects-page">
      <SectionHeader
        title="Projects"
        subtitle="Explore our work across Madagascar, from clinic upgrades to health education and community wellness."
      />

      <Row xs={1} md={2} xl={3} className="g-4">
        {projects.map((project) => {
          const isInterested = interestIds.includes(project.id);

          return (
            <Col key={project.id}>
              <ProjectCard
                project={project}
                isInterested={isInterested}
                onLearnMore={() => setSelectedProject(project)}
              />
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
