import { Container, Row, Col } from "react-bootstrap";
import "./info-cards.scss";

const InfoCards = () => {
  return (
    <>
      <h2 id="info-title" className="mb-5 mt-4">
        WHY BUY FROM RAZER.COM
      </h2>
      <Container id="info-container" className="mb-4">
        <Row>
          <Col xs={12} md={6} lg={3}>
            <div className="info-cards mb-4">
              <img
                className="info-cards__image"
                src="../images/icons/notes.svg"
                alt="icon"
                aria-label="icon"
              />
              <h2 className="info-cards__header">Play Now, Pay Later</h2>
              <p className="info-cards__description">
                With our 0% installment plan, spend more time gaming with your
                sweet new gear and less time fussing over payment.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="info-cards">
              <img
                className="info-cards__image"
                src="../images/icons/bag.svg"
                alt="icon"
                aria-label="icon"
              />
              <h2 className="info-cards__header">
                The Largest Array Of Razer Gear
              </h2>
              <p className="info-cards__description">
                As Razer’s official online store, we hold a massive collection
                of products that can’t be matched anywhere else.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="info-cards">
              <img
                className="info-cards__image"
                src="../images/icons/star.svg"
                alt="icon"
                aria-label="icon"
              />
              <h2 className="info-cards__header">
                Exclusive Razer Gear And Swag
              </h2>
              <p className="info-cards__description">
                Get access to limited edition Razer gear that’s only available
                on Razer.com.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="info-cards">
              <img
                className="info-cards__image"
                src="../images/icons/thunder.svg"
                alt="icon"
                aria-label="icon"
              />
              <h2 className="info-cards__header">Get First Dibs</h2>
              <p className="info-cards__description">
                Razer.com is the only place where you can buy our most
                anticipated Razer gear immediately upon release.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InfoCards;
