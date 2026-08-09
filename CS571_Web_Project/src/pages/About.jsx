import { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';

const aboutItems = [
  {
    id: 'People',
    title: 'People',
    details:
      'Madagascar is home to warm and resilient communities. Local leaders guide our work so that volunteers support lasting healthcare improvements and culturally appropriate care.',
    more:
      'Our programs build hospital capacity, strengthen partnerships with local health workers, and ensure that each volunteer visit supports community-owned solutions. Malagasy people bring deep knowledge of the land, language, and care pathways to every project.',
  },
  {
    id: 'Country',
    title: 'Country',
    details:
      'Madagascar is the world’s biggest producer of vanilla and home to more unique species than anywhere else in the world. The island’s landscape supports rainforest, dry forests, and extraordinary biodiversity that inspires our conservation-aware mission.',
    more:
      'The country is also a place of extraordinary cultural diversity and fragile ecosystems. We work with partners who protect endemic species, support sustainable agriculture, and celebrate the unique beauty of Malagasy environments.',
  },
  {
    id: 'Culture',
    title: 'Culture',
    details:
      'Malagasy culture is rich with music, craftsmanship, and community rituals. Our programs celebrate local traditions while supporting healthcare access and respectful cultural exchange.',
    more:
      'Volunteers learn from traditional healers, local educators, and community leaders. We emphasize listening, reciprocity, and creating partnerships that honor Malagasy values and strengthen long-term wellbeing.',
  },
];

const healthcareItems = [
  {
    id: 'Mission',
    title: 'Mission',
    details:
      'Our mission work brings volunteer teams to strengthen local clinics, provide training, and improve access to essential care.',
    more:
      'We focus on sustainable health outcomes by investing in local staff, hygiene protocols, and patient-centered services. Each mission is designed in collaboration with Malagasy health partners to ensure it supports existing systems.',
  },
  {
    id: 'Aid',
    title: 'Aid',
    details:
      'Aid is delivered through clinic upgrades, supply distribution, and community-driven education programs.',
    more:
      'We prioritize essential medicines, clean water access, and reliable facility improvements. Volunteers also support health education, maternal care, and preventive services that reduce long-term illness.',
  },
  {
    id: 'Work',
    title: 'Work',
    details:
      'Our work is grounded in listening to local needs and building trust over time.',
    more:
      'Volunteer efforts are paired with local leadership to create programs that stay in place after the visit ends. This includes follow-up training, monitoring progress, and growing community resilience.',
  },
];

function About() {
  const [activeItem, setActiveItem] = useState(null);
  const selectedItem = [...aboutItems, ...healthcareItems].find((item) => item.id === activeItem);

  return (
    <div className="about-page">
      <div className="section mb-4">
        <h1 className="section-title">About Manasitran Madagascar</h1>
        <p className="text-muted lead">
          We partner with Malagasy communities to strengthen local healthcare through clinic upgrades, nutrition services, and health education tailored to rural needs.
        </p>
      </div>

      <div className="mb-4">
        <h3>Our mission</h3>
        <p>
          To support sustainable health outcomes in Madagascar by empowering local health workers, improving clinic infrastructure, and teaching preventive care.
        </p>
      </div>

      <div className="mb-4">
        <h3>What we do</h3>
        <ul>
          <li>Clinic renovation and clean water access</li>
          <li>Nutrition screening and family education</li>
          <li>Volunteer mission visits and training partnerships</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3>Our impact</h3>
        <p>
          We focus on measurable outcomes like safer patient environments, trained community volunteers, and stronger maternal and child health programs.
        </p>
      </div>

      <div className="feature-stack">
        <Card className="feature-panel shadow-sm border-0 mb-4">
          <Card.Body>
            <Card.Title className="feature-panel-title text-center">Madagascar</Card.Title>
            <Card.Text className="text-center mb-4">
              Discover the people, culture, and country that make our mission meaningful.
            </Card.Text>
            <Row xs={1} md={3} className="g-3">
              {aboutItems.map((item) => (
                <Col key={item.id}>
                  <Card
                    className="feature-link-card h-100 shadow-sm border-0"
                    onClick={() => setActiveItem(item.id)}
                    role="button"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center text-center">
                      <Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        <Card className="feature-panel shadow-sm border-0">
          <Card.Body>
            <Card.Title className="feature-panel-title text-center">Healthcare</Card.Title>
            <Card.Text className="text-center mb-4">
              Learn about our mission, the aid we provide, and the work we do in communities across Madagascar.
            </Card.Text>
            <Row xs={1} md={3} className="g-3">
              {healthcareItems.map((item) => (
                <Col key={item.id}>
                  <Card
                    className="feature-link-card h-100 shadow-sm border-0"
                    onClick={() => setActiveItem(item.id)}
                    role="button"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-center text-center">
                      <Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </div>

      <Modal show={Boolean(activeItem)} onHide={() => setActiveItem(null)} centered size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedItem?.details}</p>
          <p>{selectedItem?.more}</p>
          <hr />
          <p>
            These details show how our programs connect shared care, responsible aid, and community-led impact in Madagascar. Each section explains why we work where we work and how volunteers contribute to lasting improvements.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setActiveItem(null)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default About;
