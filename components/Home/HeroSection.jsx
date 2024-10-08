import Link from "next/link";

const HeroSection = ({ initialData, higest }) => {
  const motto = "Vote Loud, Vote Proud ";

  return (
    <section className="hero-section position-relative z-0 ">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
        <img
          src="assets/images/hero_vector.png"
          alt="vector"
          className="position-absolute d-none d-xxxl-flex bottom-0 end-0 previewShapeRevX"
        />
      </div>
      <div className="container pt-20 mt-12 mt-lg-20">
        <div className="row pt-4 pt-lg-10 gy-12 gy-lg-0 justify-content-center justify-content-lg-between align-items-center">
          <div className="col-lg-6 col-xxl-7">
            <div className="hero-card p1-xxl-bg pt-xl-20 pb-xl-20 position-relative">
              <div className="pt-xxl-10 pb-xxl-10">
                <div className="circle-text first d-center cus-z1 position-absolute end-0 top-0 d-none d-xxl-flex  me-lg-10 mt-lg-10">
                  <div className="text d-center">
                    <p className="fs-six">
                      {motto.split("").map((l, idx) => (
                        <span
                          key={idx}
                          style={{
                            transform: `rotate(${
                              (idx * 360) / motto.length
                            }deg)`,
                          }}
                        >
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                  <img
                    src="assets/images/circle_star.png"
                    alt="star"
                    className="push_animat"
                  />
                </div>
                <span className="heading p1-max-xxl nb4-xxl-color fs-five mb-3">
                  Decentralized Voting
                </span>
                <h1 className="display-two nb4-xxl-color mb-5 mb-lg-6">
                  Vote For your Favorite Candidate
                </h1>
                <p className="fs-six-up fw_500 nb4-xxl-color">
                  Now you can elect your  minister through the
                  decentralized voting system
                </p>
                {initialData?.startDateN != 0 && initialData?.endDateN != 0 && (
                  <>
                    <span className="heading mt-3 p1-max-xxl nb4-xxl-color fs-five mb-3">
                      Starting: {initialData?.startDate}
                    </span>
                    <span className="heading p1-max-xxl nb4-xxl-color fs-five mb-3">
                      Ending: {initialData?.endDate}
                    </span>
                  </>
                )}

                <div className="d-inline-flex flex-wrap gap-4 gap-lg-10 align-items-center mt-8 mt-lg-10">
                  <Link href="/approve-candidates">
                    <a className="cmn-btn alt-xxl-bg fs-five nb4-xxl-bg gap-2 gap-lg-3 align-items-center py-2 px-5 py-lg-3 px-lg-6">
                      All Candidates <i className="ti ti-trending-up"></i>
                    </a>
                  </Link>
                  {higest ? (
                    <Link
                      href={`/candidate-details?address=${higest?.address}`}
                    >
                      <a className="cmn-btn link link-xxl-color fs-five  gap-2 gap-lg-3 align-items-center ">
                        <i className="ti ti-arrow-narrow-right fs-four"></i>
                        Current Highest Voter
                      </a>
                    </Link>
                  ) : (
                    <Link href="/all-voters">
                      <a className="cmn-btn link link-xxl-color fs-five  gap-2 gap-lg-3 align-items-center ">
                        <i className="ti ti-arrow-narrow-right fs-four"></i> All
                        Voters
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10 col-lg-6 col-xxl-5">
            <div className="hero-section__thumbs pb-xxl-10">
              <img
                src="assets/images/hero-image.png"
                className="max-auto max-xxl-un"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
