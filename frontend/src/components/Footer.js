import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <section className="developer">
        Made with <span style={{ color: "red" }}>&hearts;</span> by Fathi
        Abdelmalek
      </section>
      <section className="links">
        <a
          href="https://github.com/fathiabdelmalek"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </i>
        </a>
        <a
          href="https://facebook.com/fathiabdelmalek01"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </i>
        </a>
        <a
          href="https://twitter.com/AbdelmalekFathi"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </i>
        </a>
        <a
          href="https://linkedin.com/in/fathi-abdelmalek"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </i>
        </a>
      </section>
    </footer>
  );
}
