import { Container, Row, Col } from "react-bootstrap";
import "./hero.scss"; // Importa tu archivo de estilos SCSS

const Hero = () => {
  return (
    <div className="hero">
      <Container>
        <Row className="justify-content-md-center">
          <Col className="hero__content text-center text-white">
            <h1 className="display-3 fw-bold mb-3">
              DISCOVER GEAR FOR GAMERS. BY GAMERS.
            </h1>
            <p className="lead">
              Check out our latest releases to secure the most up-to-date
              upgrades for your setup
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
