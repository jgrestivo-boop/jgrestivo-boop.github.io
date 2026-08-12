import { useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import aboutPeopleImage from '../../assets/about-people.jpeg';
import aboutCountryImage from '../../assets/about-country.jpeg';
import aboutCultureImage from '../../assets/about-culture.jpeg';
import aboutMissionImage from '../../assets/about-mission.jpeg';
import aboutAidImage from '../../assets/about-aid.jpeg';
import aboutWorkImage from '../../assets/about-work.jpeg';
import missionCardImage from '../../assets/mission-card-image.jpeg';
import hopitalybeambulance from '../../assets/hopitaly-be-ambulance.jpeg';

// The About page is mostly content-driven. These arrays centralize the story copy so future content
// edits are easy to maintain without touching the page layout logic.
const aboutItems = [
  {
    id: 'People',
    title: 'People',
    image: aboutPeopleImage,
    blurb: 'Local Malagasy partners and community leaders are central to every project.',
    details:
      'Madagascar is home to warm and resilient communities. Local leaders guide our work so that volunteers support lasting healthcare improvements and culturally appropriate care.',
    more:
      'Our programs build hospital capacity, strengthen partnerships with local health workers, and ensure that each volunteer visit supports community-owned solutions. Malagasy people bring deep knowledge of the land, language, and care pathways to every project.',
    links: [
      { label: 'World Health Organization: Madagascar', url: 'https://www.who.int/countries/mad/' },
      { label: 'UNICEF Madagascar', url: 'https://www.unicef.org/madagascar' },
    ],
  },
  {
    id: 'Country',
    title: 'Country',
    image: aboutCultureImage,
    blurb: 'Madagascar’s landscapes and biodiversity shape our mission and programs.',
    details:
      'Madagascar is the world’s biggest producer of vanilla and home to more unique species than anywhere else in the world. The island’s landscape supports rainforest, dry forests, and extraordinary biodiversity that inspires our conservation-aware mission.',
    more:
      'The country is also a place of extraordinary cultural diversity and fragile ecosystems. We work with partners who protect endemic species, support sustainable agriculture, and celebrate the unique beauty of Malagasy environments.',
    links: [
      { label: 'National Geographic: Madagascar', url: 'https://www.nationalgeographic.com/travel/article/madagascar' },
      { label: 'WWF Madagascar', url: 'https://www.wwf.mg/' },
    ],
  },
  {
    id: 'Culture',
    title: 'Culture',
    image: aboutCountryImage,
    blurb: 'Respecting Malagasy culture is central to our volunteer and health programs.',
    details:
      'Malagasy culture is rich with music, craftsmanship, and community rituals. Our programs celebrate local traditions while supporting healthcare access and respectful cultural exchange.',
    more:
      'Volunteers learn from traditional healers, local educators, and community leaders. We emphasize listening, reciprocity, and creating partnerships that honor Malagasy values and strengthen long-term wellbeing.',
    links: [
      { label: 'Culture Trip: Madagascar', url: 'https://theculturetrip.com/africa/madagascar/' },
      { label: 'Britannica: Madagascar', url: 'https://www.britannica.com/place/Madagascar' },
    ],
  },
];

const healthcareItems = [
  {
    id: 'Mission',
    title: 'Mission',
    image: missionCardImage,
    blurb:
      'Volunteer missions are designed to leave local teams stronger and better equipped long after the visit ends.',
    details:
      'Our mission work brings volunteer teams to strengthen local clinics, provide training, and improve access to essential care.',
    more:
      'We focus on sustainable health outcomes by investing in local staff, hygiene protocols, and patient-centered services. Each mission is designed in collaboration with Malagasy health partners to ensure it supports existing systems.',
    links: [
      { label: 'Doctors Without Borders in Madagascar', url: 'https://www.doctorswithoutborders.org/what-we-do/where-we-work/madagascar' },
      { label: 'Global Health: Madagascar', url: 'https://www.cdc.gov/globalhealth/countries/madagascar/' },
    ],
  },
  {
    id: 'Aid',
    title: 'Aid',
    image: hopitalybeambulance,
    blurb: 'Aid is delivered in ways that support both immediate care and long-term community resilience.',
    details:
      'Aid is delivered through clinic upgrades, supply distribution, and community-driven education programs.',
    more:
      'We prioritize essential medicines, clean water access, and reliable facility improvements. Volunteers also support health education, maternal care, and preventive services that reduce long-term illness. We are very involved with local maternity clinics in the Toamasina region, where obsetric and neonatal care is a critical need. Our work includes training local midwives, providing essential supplies, and improving clinic infrastructure to ensure safe deliveries and healthy outcomes for mothers and babies.',
    links: [
      { label: 'UNICEF - Health and nutrition in Madagascar', url: 'https://www.unicef.org/madagascar/health-and-nutrition' },
      { label: 'World Food Programme Madagascar', url: 'https://www.wfp.org/countries/madagascar' },
    ],
  },
  {
    id: 'Work',
    title: 'Work',
    image: aboutWorkImage,
    blurb: 'Our work is collaborative, community-led, and built to last beyond each volunteer stay.',
    details: 'Our work is grounded in listening to local needs and building trust over time.',
    more:
      'Volunteer efforts are paired with local leadership to create programs that stay in place after the visit ends. This includes follow-up training, monitoring progress, and growing community resilience.',
    links: [
      { label: 'UNDP Madagascar', url: 'https://www.undp.org/madagascar' },
      { label: 'World Bank Madagascar', url: 'https://www.worldbank.org/en/country/madagascar' },
    ],
  },
];

// Small presentation helper used to render each large story tile in the About page.
function TopicCard({ item, onSelect }) {
  return (
    <Col key={item.id}>
      <Card
        className="feature-link-card h-100 shadow-sm border-0"
        onClick={() => onSelect(item.id)}
        role="button"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.2)), url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card.Body className="d-flex align-items-center justify-content-center text-center text-white">
          <Card.Title>{item.title}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

// A section-level panel for one of the About page's content groups.
function TopicSection({ title, description, items, onSelect }) {
  return (
    <Card className="feature-panel shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="feature-panel-title text-start">{title}</Card.Title>
        <Card.Text className="text-start mb-4">{description}</Card.Text>
        <Row xs={1} md={3} className="g-3">
          {items.map((item) => (
            <TopicCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

// Modal content for each selected topic; it keeps the detail logic separate from the page shell.
function AboutDetailModal({ selectedItem, onClose }) {
  if (!selectedItem) return null;

  return (
    <Modal show={Boolean(selectedItem)} onHide={onClose} centered size="xl" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{selectedItem.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="theme-card-accent mb-4 p-3">
          <p className="mb-2 text-accent fw-semibold">{selectedItem.blurb}</p>
          <p className="mb-0">These stories and programs reflect the importance of this topic to our work in Madagascar.</p>
        </Card>

        <div className="mb-4">
          <h6>Learn more</h6>
          <ul className="modal-links list-unstyled mb-0">
            {selectedItem.links?.map((link) => (
              <li key={link.url} className="mb-2">
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {selectedItem.id === 'Mission' && (
            <>
              <p>To support sustainable health outcomes in Madagascar by empowering local health workers, improving clinic infrastructure, and teaching preventive care.</p>
              <p>We focus on measurable outcomes like safer patient environments, trained community volunteers, and stronger maternal and child health programs.</p>
            </>
          )}
          {selectedItem.id === 'Aid' && (
            <>
              <p>We deliver aid through clinic upgrades, supply distribution, and community-driven education programs that strengthen both immediate care and long-term resilience.</p>
              <p>Our work prioritizes essential medicines, clean water access, and reliable facility improvements for families and health workers.</p>
            </>
          )}
          {selectedItem.id === 'Work' && (
            <>
              <p>Our teams partner closely with local leaders to build programs that remain effective long after each volunteer visit ends.</p>
              <p>This collaborative approach helps local organizations strengthen services, improve training, and sustain community wellness over time.</p>
            </>
          )}
          {selectedItem.id !== 'Mission' && selectedItem.id !== 'Aid' && selectedItem.id !== 'Work' && (
            <>
              <p>{selectedItem.details}</p>
              <p>{selectedItem.more}</p>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// The About page presents a compact, editorial overview of the region and mission.
// Clicking a topic opens a modal with extra detail and resource links.
function About() {
  const [activeItem, setActiveItem] = useState(null);
  const selectedItem = [...aboutItems, ...healthcareItems].find((item) => item.id === activeItem);

  return (
    <div className="about-page">
      <div className="section mb-4">
        <h1 className="section-title">About Manasitrana Madagascar</h1>
        <p className="text-muted lead">
          We partner with Malagasy communities to strengthen local healthcare through clinic upgrades, nutrition services, and health education tailored to rural needs.
        </p>
      </div>

      <div className="feature-stack">
        <TopicSection
          title="Madagascar"
          description="Discover the people, culture, and country that make our mission meaningful."
          items={aboutItems}
          onSelect={setActiveItem}
        />

        <TopicSection
          title="Healthcare"
          description="Learn about our mission, the aid we provide, and the work we do in communities across Madagascar."
          items={healthcareItems}
          onSelect={setActiveItem}
        />
      </div>

      <AboutDetailModal selectedItem={selectedItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}

export default About;
