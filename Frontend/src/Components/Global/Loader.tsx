import "../../index.css";

/**
 * Loader component to display loading animation.
 */
const Loader = () => {
  return (
    <div className="loader-container">
      {/* Background overlay */}
      <div className="background-overlay"></div>
      {/* Loader animation */}
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
