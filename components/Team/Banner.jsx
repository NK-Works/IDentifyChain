import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Banner = () => {
  const { pathname } = useRouter();
  return (
    <section className="banner-section pt-120 pb-120">
      <div className="container mt-10 mt-lg-0 pt-15 pt-lg-20 pb-5 pb-lg-0">
        <div className="row">
          <div className="col-12 breadcrumb-area">
            <h2 className="mb-4">
              {pathname
                .replace("/", "")
                .split("-")
                .map((e, idx) =>
                  idx === 2 ? "" : e[0].toUpperCase() + e.substring(1)
                )
                .join(" ")}
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item ms-2 ps-7 active"
                  aria-current="page"
                >
                  <span>
                    {pathname.toLowerCase().includes("candidate")
                      ? "Candidates"
                      : "Voters"}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
