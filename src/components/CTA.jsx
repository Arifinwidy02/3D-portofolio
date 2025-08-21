import { fluidSize } from "flexivity-fluid-utils";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta">
      <p
        className="cta-text"
        style={{
          fontSize: fluidSize(18, 24),
        }}
      >
        Have a project in minds ? <br className="sm:block hidden" />
        Let's build something together !
      </p>
      <Link to="/contact" className="btn">
        Contact
      </Link>
    </section>
  );
};

export default CTA;
