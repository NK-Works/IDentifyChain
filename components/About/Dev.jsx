import Link from "next/link";

export default function Dev({ name, description, imageUrl }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xxl-3">
      <div className="team__card nb3-bg cus-rounded-1 overflow-hidden">
        <div className="team__thumbs position-relative">
          <img src={imageUrl} alt="Image" className="w-100" />
        </div>
        <div className="team__content pseudo_element_after transition text-center py-6 py-lg-7 py-xxl-8 px-4 px-lg-5 px-xxl-6">
          <Link href="/">
            <a>
              <h5 className="team__title d-center pb-4 mb-4 pseudo_element_after">
                {name}
              </h5>
            </a>
          </Link>
          <p className="mb-3">{description}</p>
          <div className="social-area alt">
            <ul className="d-flex align-items-center justify-content-center gap-2 gap-md-3">
              <li>
                <Link href="/">
                  <a className="d-center fs-four">
                    <i className="ti ti-brand-facebook" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="d-center fs-four">
                    <i className="ti ti-brand-twitch" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="d-center fs-four">
                    <i className="ti ti-brand-instagram" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="d-center fs-four">
                    <i className="ti ti-brand-discord-filled" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
