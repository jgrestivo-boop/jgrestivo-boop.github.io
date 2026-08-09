import { useState } from 'react';
import { Badge, Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Visit({ visits, applications }) {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState(null);

  return (
    <div className="visit-page">
      <div className="section mb-4">
        <h1 className="section-title">Visit Madagascar</h1>
        <p className="text-muted">
          Our mission visits welcome volunteers, supporters, and medical professionals who want to make a direct impact.
        </p>
      </div>

      <Row xs={1} md={2} className="g-4">
        {visits.map((trip) => {
          const applied = Boolean(applications[trip.id]);
          return (
            <Col key={trip.id}>
              <Card className="shadow-sm border-0">
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
                      onClick={() => navigate(`/apply/${trip.id}`)}
                    >
                      {applied ? 'Applied' : 'Apply'}
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => setSelectedTrip(trip)}>
                      Learn more
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0 text-muted">
                  Estimated stay: {trip.estimate}
                </Card.Footer>
              </Card>
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
              <h5>Description</h5>
              <p>{selectedTrip?.details}</p>
              <h5>Schedule & season</h5>
              <p>
                <strong>Trip time:</strong> {selectedTrip?.schedule}
                <br />
                <strong>Season:</strong> {selectedTrip?.season}
              </p>
              <h5>Locations</h5>
              <p>{selectedTrip?.locations?.join(', ')}</p>
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
