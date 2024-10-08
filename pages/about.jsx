import {
  Cursor,
  ScrollToTop,
  Footer,
  Header,
  About,
} from "../components/index";

const about = () => {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Header />
      <About />
      <Footer />
    </>
  );
};

export default about;
