import { Container, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start text-muted">
      <section className="justify-content-center p-4 border-bottom border-top">
        <div className="footer__social-links">
          <a
            href="https://www.facebook.com/razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/facebook.svg"
              alt="Go To Facebook Page"
            />
          </a>
          <a
            href="https://www.instagram.com/razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/instagram.svg"
              alt="Go To Instagram Page"
            />
          </a>
          <a
            href="https://www.twitter.com/Razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/twitter.svg"
              alt="Go To Twitter Page"
            />
          </a>
          <a
            href="https://www.youtube.com/razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/youtube.svg"
              alt="Go To You Tube Page"
            />
          </a>
          <a
            href="https://www.twitch.tv/razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/twitch.svg"
              alt="Go To Twitch Page"
            />
          </a>
          <a
            href="https://discord.com/invite/razer"
            className="footer__social-links__link text-reset"
          >
            <img
              src="../images/social-media/discord.svg"
              alt="Go To Discord Page"
            />
          </a>
        </div>
      </section>

      <section className="footer__info-section">
        <Container>
          <Col>
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="bi bi-gem"></i> FOR GAMERS. BY GAMERS.™
            </h6>
            <p>
              Discover the essence of gaming with Razer. Immerse yourself in a
              world of innovation and cutting-edge technology with our products
              designed to enhance your gaming experience. From peripherals to
              complete rigs, you'll find everything you need to achieve victory
              in our store. Join the Razer community and take your passion for
              gaming to the next level.
            </p>
          </Col>

          <Col>
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i className="bi bi-pin-map"></i> New York, NY 10012, US
            </p>
            <a
              href="mailto:info@razer.com"
              className="footer__info-section__address"
            >
              <p id="email-footer" className="bi bi-envelope"></p>
              info@razer.com
            </a>
            <p>
              <i className="bi bi-telephone"></i> + 01 234 567 88
            </p>
            <p>
              <i className="bi bi-chat-left-text"></i> + 01 234 567 89
            </p>
          </Col>
        </Container>
      </section>

      <div className="footer__copyright text-center p-4">
        Copyright © 2024 Razer Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
