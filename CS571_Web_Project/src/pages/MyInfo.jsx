import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function MyInfo({ profile, projects = [], visits = [], interestIds = [], applications = {}, onUpdateProfile, onRemoveInterest }) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);
  const [showContact, setShowContact] = useState(false);
  const [showMailing, setShowMailing] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactTitle, setContactTitle] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [mailingEmail, setMailingEmail] = useState('');

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  const interestProjects = Array.isArray(projects) ? projects.filter((project) => interestIds.includes(project.id)) : [];
  const visitList = Array.isArray(visits) ? visits : [];
  const appliedVisitEntries = Object.entries(applications || {}).map(([visitId, application]) => ({
    visitId,
    application,
  }));

  const handleSaveProfile = () => {
    onUpdateProfile(draftProfile);
    setEditingProfile(false);
  };

  const handleContactSubmit = () => {
    const encodedSubject = encodeURIComponent(contactTitle || 'Contact from website');
    const body = encodeURIComponent(contactSubject || 'Hello, I would like to connect with your team.');
    window.location.href = `mailto:restivo456@gmail.com?subject=${encodedSubject}&body=${body}`;
    setShowContact(false);
    setContactTitle('');
    setContactSubject('');
  };

  const handleMailingSubmit = () => {
    const subject = encodeURIComponent('Subscribe to mailing list');
    const body = encodeURIComponent(`Please add me to the mailing list: ${mailingEmail}`);
    window.location.href = `mailto:restivo456@gmail.com?subject=${subject}&body=${body}`;
    setShowMailing(false);
    setMailingEmail('');
  };

  return (
    <div className="my-info-page">
      <div className="section mb-4">
        <h1 className="section-title">My Info</h1>
        <p className="text-muted">
          A quick profile of your involvement and ways to stay connected with our nonprofit mission.
        </p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              {editingProfile ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={draftProfile.name}
                      onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={draftProfile.email}
                      onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      value={draftProfile.contact}
                      onChange={(e) => setDraftProfile({ ...draftProfile, contact: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Preferred role</Form.Label>
                    <Form.Control
                      value={draftProfile.preferredRole}
                      onChange={(e) => setDraftProfile({ ...draftProfile, preferredRole: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Volunteer status</Form.Label>
                    <Form.Select
                      value={draftProfile.status}
                      onChange={(e) => setDraftProfile({ ...draftProfile, status: e.target.value })}
                    >
                      <option value="Not Interested">Not Interested</option>
                      <option value="Interested">Interested</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Newsletter</Form.Label>
                    <Form.Select
                      value={draftProfile.newsletter}
                      onChange={(e) => setDraftProfile({ ...draftProfile, newsletter: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button variant="success" onClick={handleSaveProfile}>
                      Save profile
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setEditingProfile(false)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <Card.Text>
                    Volunteer status: <strong>{profile.status}</strong>
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Name: {profile.name}</ListGroup.Item>
                    <ListGroup.Item>Email: {profile.email}</ListGroup.Item>
                    <ListGroup.Item>Contact: {profile.contact}</ListGroup.Item>
                    <ListGroup.Item>Location: {profile.location}</ListGroup.Item>
                    <ListGroup.Item>Preferred role: {profile.preferredRole}</ListGroup.Item>
                    <ListGroup.Item>Newsletter: {profile.newsletter}</ListGroup.Item>
                  </ListGroup>
                  <div className="mt-4">
                    <Button variant="primary" onClick={() => setEditingProfile(true)}>
                      Edit profile
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>Your Projects</Card.Title>
              <Card.Text>
                Track the initiatives that align with your interests and see how you can support them.
              </Card.Text>
              {interestProjects.length === 0 ? (
                <p className="text-muted">You have not added any projects to your interests yet.</p>
              ) : (
                <Row xs={1} md={2} className="g-3">
                  {interestProjects.map((project) => (
                    <Col key={project.id}>
                      <Card
                        className="project-summary-card border-0 shadow-sm h-100"
                        role="button"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Card.Body>
                          <Card.Title>{project.title}</Card.Title>
                          <Card.Text>{project.summary}</Card.Text>
                          {editingInterests && (
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={(event) => {
                                event.stopPropagation();
                                onRemoveInterest(project.id);
                              }}
                            >
                              Remove interest
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              <div className="mt-4 d-flex flex-wrap gap-2 align-items-center">
                <Button variant="primary" onClick={() => setEditingInterests((current) => !current)}>
                  {editingInterests ? 'Done editing interests' : 'Edit my interests'}
                </Button>
                <Button variant="outline-secondary" onClick={() => setShowContact(true)}>
                  Contact team
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={12}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>Your Applications</Card.Title>
              <Card.Text>
                Review the visits you have applied to and return to our Visit page to explore more opportunities.
              </Card.Text>
              {appliedVisitEntries.length === 0 ? (
                <p className="text-muted">No applications submitted yet.</p>
              ) : (
                <ListGroup variant="flush">
                  {appliedVisitEntries.map(({ visitId, application }) => {
                    const visit = visitList.find((item) => item.id === visitId);
                    return (
                      <ListGroup.Item key={visitId}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>{visit?.title || 'Application'}</strong>
                            <div className="text-muted">
                              Applied for: {visit?.title || visitId}
                            </div>
                            <div className="text-muted">Submitted by: {application.name}</div>
                          </div>
                          <span className="badge bg-success">Submitted</span>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={Boolean(selectedProject)} onHide={() => setSelectedProject(null)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} className="img-fluid rounded mb-3" />
          <p>{selectedProject?.details}</p>
          <h6>Impact highlights</h6>
          <ul>
            {selectedProject?.outcomes?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedProject(null)}>
            Close
          </Button>
          <Button
            variant="outline-danger"
            onClick={(event) => {
              event.stopPropagation();
              if (selectedProject) {
                onRemoveInterest(selectedProject.id);
                setSelectedProject(null);
              }
            }}
          >
            Remove from interests
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title>Get involved</Card.Title>
          <p>
            Want to support our work with a donation, volunteer visit, or story share? Reach out to learn how your time and skills can help Malagasy communities thrive.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="success" onClick={() => setShowMailing(true)}>
              Join our mailing list
            </Button>
            <Button variant="outline-primary" as={NavLink} to="/visit">
              Become a volunteer
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="contactTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="Brief title for your message"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="Write the message you want to send to the team."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContact(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleContactSubmit}>
            Send email
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMailing} onHide={() => setShowMailing(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to updates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="mailingEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={mailingEmail}
                onChange={(e) => setMailingEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMailing(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleMailingSubmit} disabled={!mailingEmail.trim()}>
            Submit email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyInfo;
