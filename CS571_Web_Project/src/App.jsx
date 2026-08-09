import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Visit from './pages/Visit';
import MyInfo from './pages/MyInfo';
import Application from './pages/Application';

const initialProjects = [
  {
    id: 'clinic-renovation',
    title: 'Clinic Renovation',
    type: 'Infrastructure',
    location: 'Antananarivo',
    status: 'Ongoing',
    summary: 'Upgrading a community clinic with new exam rooms, solar power, and clean water access.',
    details:
      'Our clinic renovation project improves patient safety, reduces infection risk, and brings reliable electricity to a rural health facility. Local health workers help lead the build and train technicians for ongoing maintenance.',
    outcomes: ['New treatment rooms', 'Solar lighting installed', 'Water filtration system added'],
    image: 'https://via.placeholder.com/600x350?text=Clinic+Renovation',
  },
  {
    id: 'mobile-health-education',
    title: 'Mobile Health Education',
    type: 'Education',
    location: 'Mahajanga Region',
    status: 'Completed',
    summary: 'Mobile training teams teach families hygiene, nutrition, and maternal care in remote villages.',
    details:
      'This outreach program provided health education to more than 1,500 people, distributing hygiene kits and training local volunteers on sanitation and prenatal care. The curriculum was designed with Malagasy partners and translated into local languages.',
    outcomes: ['1,500+ people educated', '150 community volunteers trained', 'Hygiene kits distributed'],
    image: 'https://via.placeholder.com/600x350?text=Health+Education',
  },
  {
    id: 'child-nutrition',
    title: 'Child Nutrition Initiative',
    type: 'Wellness',
    location: 'Fianarantsoa',
    status: 'Active',
    summary: 'Supporting childhood nutrition through screenings, supplements, and parent education.',
    details:
      'The child nutrition initiative focuses on early screening for malnutrition, dietary counseling, and follow-up care. We partner with local clinics and schools to keep children healthy and strengthen food security in the region.',
    outcomes: ['Nutrition screening events', 'Supplement distribution', 'Parent workshops held'],
    image: 'https://via.placeholder.com/600x350?text=Child+Nutrition',
  },
];

const initialVisits = [
  {
    id: 'mission-01',
    title: 'Antananarivo Care Mission',
    schedule: 'Aug 2026',
    estimate: '7 days',
    duration: '7 days',
    locations: ['Antananarivo', 'Surrounding clinics'],
    summary: 'Visit our flagship clinic site to support patient care, staff training, and community health outreach.',
    details:
      'This mission includes hands-on support for clinical teams, patient education sessions, and leadership training for local healthcare workers. Volunteers help improve clinic flow, patient safety, and community outreach in the capital region.',
    focus: 'Clinical care, training, outreach',
    season: 'Dry season',
    preTrip:
      'Travelers should have routine vaccinations up to date, carry malaria prevention medication, bring sun protection, and prepare for warm days with occasional afternoon rain.',
    interests: ['Clinical care', 'Medical training', 'Community outreach'],
    cost: '$2,750 - $3,250',
    links: [
      { label: 'Packing checklist', url: 'https://example.com/packing-checklist' },
      { label: 'Health clearance guide', url: 'https://example.com/health-clearance' },
    ],
  },
  {
    id: 'mission-02',
    title: 'Mahajanga Hygiene Campaign',
    schedule: 'Oct 2026',
    estimate: '5 days',
    duration: '5 days',
    locations: ['Mahajanga Region', 'Village clinics'],
    summary: 'Join a mobile team to deliver hygiene education, distribute kits, and host village wellness clinics.',
    details:
      'The hygiene campaign focuses on preventive health education for families, school visits, and distributing hygiene kits. Volunteers work with mobile outreach teams to build trust and support lasting behavior change in rural communities.',
    focus: 'Hygiene education, community engagement',
    season: 'Early rainy season',
    preTrip:
      'Bring waterproof gear, mosquito protection, and be prepared for village travel. Consult a travel health provider for malaria prevention and ensure tetanus and routine immunizations are current.',
    interests: ['Public health', 'Community education', 'Field outreach'],
    cost: '$2,250 - $2,700',
    links: [
      { label: 'Volunteer orientation', url: 'https://example.com/orientation' },
      { label: 'Community outreach materials', url: 'https://example.com/outreach-materials' },
    ],
  },
  {
    id: 'mission-03',
    title: 'Fianarantsoa Nutrition Tour',
    schedule: 'Dec 2026',
    estimate: '6 days',
    duration: '6 days',
    locations: ['Fianarantsoa', 'Nutrition centers'],
    summary: 'Learn with local partners as we screen children, teach families about nutrition, and build long-term support systems.',
    details:
      'This tour involves nutrition screenings, family counseling sessions, and training local health workers to support maternal and child nutrition. Volunteers help coach parents on balanced meal planning and community-based follow-up care.',
    focus: 'Nutrition support, family education',
    season: 'Warm wet season',
    preTrip:
      'Travelers should pack lightweight clothing, malaria prevention, and any personal medications. A pre-trip visit with a health provider is recommended for recommended vaccinations and dietary preparation.',
    interests: ['Nutrition', 'Family education', 'Healthcare coaching'],
    cost: '$2,500 - $2,900',
    links: [
      { label: 'Nutrition program outline', url: 'https://example.com/nutrition-program' },
      { label: 'Volunteer health checklist', url: 'https://example.com/health-checklist' },
    ],
  },
];

function App() {
  const [profile, setProfile] = useState({
    name: 'Jordan Restivo',
    status: 'Interested',
    location: 'United States',
    preferredRole: 'Medical support',
    newsletter: 'Subscribed',
    email: 'jordan@example.com',
    contact: '+1 555 0123',
  });
  const [interests, setInterests] = useState(['clinic-renovation', 'child-nutrition']);
  const [applications, setApplications] = useState({});

  const updateProfile = (changes) => {
    setProfile((previous) => ({
      ...previous,
      ...changes,
    }));
  };

  const toggleInterest = (projectId) => {
    setInterests((previous) =>
      previous.includes(projectId)
        ? previous.filter((id) => id !== projectId)
        : [...previous, projectId]
    );
  };

  const removeInterest = (projectId) => {
    setInterests((previous) => previous.filter((id) => id !== projectId));
  };

  const submitApplication = (visitId, applicationData) => {
    setApplications((previous) => ({
      ...previous,
      [visitId]: {
        ...applicationData,
        submittedAt: new Date().toISOString(),
      },
    }));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
            <div className="logo-placeholder rounded bg-success d-flex align-items-center justify-content-center">
              <span className="text-white fw-bold">Logo</span>
            </div>
            Manasitran Madagascar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
              <Nav.Link as={NavLink} to="/visit">Visit</Nav.Link>
              <Nav.Link as={NavLink} to="/my-info">My Info</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/projects"
                element={
                  <Projects
                    projects={initialProjects}
                    interestIds={interests}
                    onToggleInterest={toggleInterest}
                  />
                }
              />
              <Route path="/visit" element={<Visit visits={initialVisits} applications={applications} />} />
              <Route
                path="/apply/:visitId"
                element={
                  <Application
                    visits={initialVisits}
                    applications={applications}
                    onSubmitApplication={submitApplication}
                  />
                }
              />
              <Route
                path="/my-info"
                element={
                  <MyInfo
                    profile={profile}
                    projects={initialProjects}
                    visits={initialVisits}
                    interestIds={interests}
                    applications={applications}
                    onUpdateProfile={updateProfile}
                    onRemoveInterest={removeInterest}
                  />
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;
