import { useContext } from "react";
import Link from "next/link";

// IMPORTING CONTRACT DATA
import { VOTING_DAPP_CONTEXT } from "../../../context/context";

const Header = () => {
  const { connectWallet, address, setAddress, OWNER_ADDRESS } =
    useContext(VOTING_DAPP_CONTEXT);

  const clickConnect = async () => {
    const userAddress = await connectWallet();
    setAddress(userAddress);
  };

  return (
    <header className="header-section a2-bg-0 header-section--secondary header-menu w-100">
      <div className="container d-center">
        <nav className="navbar a2-lg-bg py-5 p-lg-5 rounded-3 navbar-expand-lg w-100 justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler ms-4"
              type="button"
              data-bs-toggle="collapse"
              aria-label="Navbar Toggler"
              data-bs-target="#navbar-content"
              aria-expanded="true"
              id="nav-icon3"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Link href="/">
              <a className="navbar-brand m-0 p-0 d-flex align-items-center gap-5 gap-xl-5 me-2">
                <img
                  style={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  src="assets/images/logo.png"
                  className="logo small_logo d-sm-none"
                  alt="logo"
                />
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16,
                  }}
                  className="d-none d-sm-flex"
                >
                  <img
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                    src="assets/images/logo.png"
                    className="logo"
                    alt="logo"
                  />
                  <h1
                    style={{
                      fontSize: "2.1rem",
                      fontFamily: "Tiny5",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    IDentifyChain
                  </h1>
                </div>
              </a>
            </Link>
          </div>
          <div className="nav_alt">
            <div className="right-area position-relative ms-0 d-center gap-1 gap-xl-4 d-lg-none">
              {address ? (
                <>
                  <div className="single-item">
                    <Link href="/voter">
                      <a className="rotate_eff flex-nowrap py-1 px-2 px-xl-3 d-center gap-1 fw-bold nw1-color">
                        Voter <i className="ti ti-arrow-right fs-six-up"></i>
                      </a>
                    </Link>
                  </div>
                  <div className="single-item">
                    <Link href="/candidate">
                      <a className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1">
                        Candidate{" "}
                        <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="single-item">
                  <button
                    onClick={() => clickConnect()}
                    className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                  >
                    Connect Wallet{" "}
                    <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbar-content"
          >
            <ul className="navbar-nav gap-2 gap-lg-3 gap-xxl-8 align-self-center mx-auto mt-4 mt-lg-0">
              <li className="dropdown show-dropdown">
                <Link href="/">
                  <a className="dropdown-nav header-hover-link">Home</a>
                </Link>
              </li>
              <li className="dropdown show-dropdown">
                <button
                  type="button"
                  aria-label="Navbar Dropdown Button"
                  className="dropdown-nav header-hover-link"
                >
                  Candidate
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/all-candidates">
                      <a className="dropdown-item header-hover-link">
                        All Candidates
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/approve-candidates">
                      <a className="dropdown-item header-hover-link">
                        Approved Candidates
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown show-dropdown">
                <button
                  type="button"
                  aria-label="Navbar Dropdown Button"
                  className="dropdown-nav header-hover-link"
                >
                  Voter
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/all-voters">
                      <a className="dropdown-item header-hover-link">
                        All Voters
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/approve-voters">
                      <a className="dropdown-item header-hover-link">
                        Approve Voters
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/voted-voters">
                      <a className="dropdown-item header-hover-link">
                        Voted Voters
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              {address === OWNER_ADDRESS?.toLowerCase() && (
                <li style={{
                  marginRight: 20
                }}>
                  <Link href="/owner">
                    <a className="dropdown-item header-hover-link">Owner</a>
                  </Link>
                </li>
              )}
              <li className="dropdown show-dropdown">
                <button
                  type="button"
                  aria-label="Navbar Dropdown Button"
                  className="dropdown-nav header-hover-link"
                >
                  Resources
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/about">
                      <a className="dropdown-item header-hover-link">
                        About Us
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/contact">
                      <a className="dropdown-item header-hover-link">
                        Contact Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/roadmap">
                      <a className="dropdown-item header-hover-link">Roadmap</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="right-area position-relative ms-0 d-center gap-1 gap-xl-4 d-none d-lg-flex">
            {address ? (
              <>
                <div className="single-item">
                  <Link href="/voter">
                    <a className="rotate_eff flex-nowrap py-1 px-2 px-xl-3 d-center gap-1 fw-bold nw1-color">
                      Voter <i className="ti ti-arrow-right fs-six-up"></i>
                    </a>
                  </Link>
                </div>
                <div className="single-item">
                  <Link href="/candidate">
                    <a className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1">
                      Candidate{" "}
                      <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <div className="single-item">
                <button
                  onClick={() => clickConnect()}
                  className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                >
                  Connect Wallet{" "}
                  <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
