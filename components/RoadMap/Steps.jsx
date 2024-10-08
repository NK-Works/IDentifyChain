import React from "react";

const Steps = () => {
  return (
    <section className="roadmap pt-120 pb-120" id="roadmap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xxl-7">
            <div className="heading__content mb-10 mb-lg-15 text-center">
              <h1 className="display-four mb-5 mb-lg-6">Roadmap</h1>
              <p className="fs-six-up mx-ch mx-auto">
                We're constantly updating our roadmap to bring transparency for
                our users and to get your feedback - please tell us what is
                important for you!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="roadmap__content">
              <span className="roadmap__line"></span>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">2010</span>
                  <h4>Introduction to Forex</h4>
                  <p className="mt-4">
                    The Forex market is incredibly liquid ensuring that you can
                    enter and exit positions easily even with large amounts of
                    capital.
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">2012</span>
                  <h4>Trading Strategies</h4>
                  <p className="mt-4">
                    The world of finance offers a multitude of opportunities for
                    individuals seeking to build their wealth and explore new
                    horizons. Forex trading,{" "}
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">2014</span>
                  <h4>Trading Psychology</h4>
                  <p className="mt-4">
                    In this article, we'll take you on a journey through the
                    fundamentals of Forex trading, helping you how it works, and
                    why it's worth exploring.
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">2016</span>
                  <h4>Economic Indicators</h4>
                  <p className="mt-4">
                    Currencies on the foreign exchange market with the aim of
                    making a profit. It's the largest and most liquid financial
                    market in the world,
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">2018</span>
                  <h4>Risk Management</h4>
                  <p className="mt-4">
                    {" "}
                    With a daily trading volume that exceeds $6 trillion. Unlike
                    traditional stock markets, where you buy and sell shares of
                    companies,
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">2020</span>
                  <h4>Building Your Trading Plan</h4>
                  <p className="mt-4">
                    Unlike traditional stock markets, where you buy and sell
                    shares of companies, Forex trading involves the exchange of
                    one currency for another.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
