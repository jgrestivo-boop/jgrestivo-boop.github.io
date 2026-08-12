import { Button, Card, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import heroImage from '../../assets/home-hero-eye.jpeg';

// Landing page for the nonprofit. It introduces the mission, pushes users toward key actions,
// and highlights the three main community roles visitors can take on.
function Home() {
  return (
    <div className="home-page">
      <section className="hero section p-4 p-md-5 mb-3 home-hero">
        <div className="hero-title-block">
          <h1 className="display-3 hero-heading">Manasitrana Madagascar</h1>
          <p className="lead text-muted hero-subtitle">
            /mah-na-see-TRA-na/ — “to free from illness, mend, or restore to health.”
          </p>
        </div>

        <div className="hero-actions-block">
          <p className="eyebrow text-success">Explore, Make a Difference, Change the World</p>
          <div className="hero-buttons d-flex flex-column flex-sm-row gap-3 mt-4">
            <Button as={NavLink} to="/visit" size="lg" variant="success">
              Volunteer with Us
            </Button>
            <Button as={NavLink} to="/projects" size="lg" variant="outline-primary">
              Explore our projects
            </Button>
            <Button as={NavLink} to="/about" size="lg" variant="outline-dark">
              Learn the story
            </Button>
          </div>
        </div>

        <div className="hero-visual mb-4">
          <img src={heroImage} alt="A striking Madagascar landscape and community scene" className="hero-image" />
        </div>

        <div className="hero-summary-card shadow-sm mt-0 p-4">
          <h2>Why Madagascar?</h2>
          <p>
            Madagascar is home to communities with powerful resilience and urgent healthcare needs. Your support connects real people to medical care, training, and sustainable change.
          </p>
        </div>
      </section>

      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card className="shadow-sm border-0 home-card">
            <Card.Body>
              <Card.Title>Volunteers</Card.Title>
              <Card.Text>
                Help deliver care, build clinic capacity, and experience the impact of mission travel.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0 home-card">
            <Card.Body>
              <Card.Title>Donors</Card.Title>
              <Card.Text>
                Fund sustainable healthcare projects that reach the most remote Malagasy communities.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm border-0 home-card">
            <Card.Body>
              <Card.Title>Travelers</Card.Title>
              <Card.Text>
                Discover meaningful travel that supports community wellness and local culture.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
