import Link from "next/link";
import React from "react";

const Company = () => {
  return (
    <section className="company-story position-relative z-0  pt-120 pb-120 ">
      <div className="animation position-absolute w-100 h-100 z-n1">
        <img
          src="assets/images/star3.png"
          alt="vector"
          className="position-absolute top-0 end-0 pt-10 pe-20 me-20 d-none d-xxl-flex previewSkew"
        />
      </div>
      <div className="container">
        <div className="row gy-15 gy-lg-0 justify-content-center align-items-center">
          <div className="col-sm-10 col-lg-6 col-xxl-5 order-2 order-lg-0">
            <div className="company-story__thumbs d-center">
              <img
                src="assets/images/faq.png"
                className="cus-rounded-1 w-100"
                alt="Imgae"
              />
            </div>
          </div>
          <div className="col-lg-6 col-xxl-7">
            <div className="row ms-xl-3 ms-xxl-10">
              <div className="col-xxl-6">
                <div className="company-story__part">
                  <span className="heading p1-color fs-five">
                    Our Team Story
                  </span>
                  <h3 className="mb-3 mt-5">What We Do</h3>
                  <p>
                    Trading is the art and science of buying and selling
                    financial instruments, such as stocks bonds currencies.
                  </p>
                </div>
              </div>
              <div className="col-xxl-12 mt-8 mt-md-10 mt-xxl-13">
                <div className="company-story__part d-flex align-items-sm-center flex-column flex-sm-row">
                  <div className="btn-area mt-8 mt-sm-0 me-2 me-sm-6 me-xxl-10 order-2 order-sm-0">
                    <Link href="/">
                      <a className="cmn-btn cmn-btn-circle d-center flex-column fw_500">
                        <i className="ti ti-arrow-up-right fs-three" />
                        Start Now
                      </a>
                    </Link>
                  </div>
                  <div className="content">
                    <h3 className="mb-3">Who We Are</h3>
                    <p>
                      Trading in financial markets involves a wide range of
                      strategies that traders employ to make informed decisions.
                      From trading to swing trading and long-term investing,
                      each strategy has its own set of principles and risk
                      factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
