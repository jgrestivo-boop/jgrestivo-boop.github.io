import { useState } from 'react';
import { Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import VisitCard from '../components/VisitCard';
import SectionHeader from '../components/SectionHeader';

// Mission listings page. It renders each volunteer trip card and opens a detailed modal for the
// selected trip when a user wants more information before applying.
function Visit({ visits, applications }) {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);

  return (
    <div className="visit-page">
      <SectionHeader
        title="Missions"
        subtitle="Our mission visits welcome volunteers, supporters, and medical professionals who want to make a direct impact."
      />

      <Row xs={1} md={2} className="g-4">
        {visits.map((trip) => {
          const applied = Boolean(applications[trip.id]);

          return (
            <Col key={trip.id}>
              <VisitCard
                trip={trip}
                applied={applied}
                onApply={() => navigate(`/apply/${trip.id}`)}
                onLearnMore={() => setSelectedTrip(trip)}
              />
            </Col>
          );
        })}
      </Row>

      <Modal
        show={Boolean(selectedTrip)}
        onHide={() => setSelectedTrip(null)}
        centered
        size="xl"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedTrip?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <h5>Locations</h5>
              <p>{selectedTrip?.locations?.join(', ')}</p>
              <h5>Description</h5>
              <p>{selectedTrip?.details}</p>
              <h5>Schedule & season</h5>
              <p>
                <strong>Trip time:</strong> {selectedTrip?.schedule}
                <br />
                <strong>Season:</strong> {selectedTrip?.season}
              </p>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm mb-3">
                <Card.Body>
                  <Card.Title>Trip details</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Duration:</strong> {selectedTrip?.duration}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Cost:</strong> {selectedTrip?.cost}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Interests:</strong>
                      <ul className="mb-0">
                        {selectedTrip?.interests?.map((interest) => (
                          <li key={interest}>{interest}</li>
                        ))}
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Pre-trip info</Card.Title>
                  <p>{selectedTrip?.preTrip}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr />
          <div>
            <h5>Helpful links</h5>
            <ul>
              {selectedTrip?.links?.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedTrip(null)}>
            Close
          </Button>
          {selectedTrip && !applications[selectedTrip.id] && (
            <Button variant="success" onClick={() => navigate(`/apply/${selectedTrip.id}`)}>
              Apply for this trip
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Visit;
