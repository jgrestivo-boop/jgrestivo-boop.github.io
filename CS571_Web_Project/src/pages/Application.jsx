import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';

function Application({ visits, applications, onSubmitApplication }) {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const visit = visits.find((item) => item.id === visitId);
  const applied = Boolean(applications[visitId]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [interests, setInterests] = useState('');
  const [expertise, setExpertise] = useState('');

  useEffect(() => {
    if (applied) {
      const existing = applications[visitId];
      setName(existing?.name || '');
      setEmail(existing?.email || '');
      setContact(existing?.contact || '');
      setInterests(existing?.areasOfInterest || '');
      setExpertise(existing?.areasOfExpertise || '');
    }
  }, [applied, applications, visitId]);

  if (!visit) {
    return (
      <div className="application-page">
        <div className="section mb-4">
          <h1 className="section-title">Application</h1>
          <p className="text-muted">We could not find that visit. Please select a visit from the Visit page.</p>
          <Button variant="primary" onClick={() => navigate('/visit')}>
            Back to Visits
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitApplication(visitId, {
      name,
      email,
      contact,
      areasOfInterest: interests,
      areasOfExpertise: expertise,
    });
    navigate('/visit');
  };

  return (
    <div className="application-page">
      <div className="section mb-4">
        <h1 className="section-title">Apply for {visit.title}</h1>
        <p className="text-muted">Complete this application to confirm your interest in the visit.</p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h2>{visit.title}</h2>
                  <p className="text-muted mb-1">{visit.focus}</p>
                  <Badge bg="warning" text="dark">
                    {visit.schedule}
                  </Badge>
                </div>
                <Button variant="outline-secondary" onClick={() => navigate('/visit')}>
                  Back to Visits
                </Button>
              </div>

              {applied ? (
                <div>
                  <p className="text-success">
                    You have already applied for this visit. Thank you for your interest.
                  </p>
                  <p>
                    Submitted application details are saved in your profile. Return to the Visits page to view other opportunities.
                  </p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="appName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="appEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="appContact">
                    <Form.Label>Contact information</Form.Label>
                    <Form.Control
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="appInterests">
                    <Form.Label>Areas of interest</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="appExpertise">
                    <Form.Label>Areas of expertise</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={expertise}
                      onChange={(e) => setExpertise(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success">
                      Submit application
                    </Button>
                    <Button variant="outline-secondary" onClick={() => navigate('/visit')}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Application;
