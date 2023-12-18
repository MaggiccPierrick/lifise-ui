import Footer from '../footer';

const Layout = (props) => (
  <>
    <main>
      <div className="layout">{props.children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
