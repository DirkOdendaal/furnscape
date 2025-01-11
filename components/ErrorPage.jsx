import React from "react";

const ErrorPage = ({ error: { errorTitle, p1, p2, p3, p4 } }) => {
  return (
    <div>
      <div className="moon"></div>
      <div className="moon__crater moon__crater1"></div>
      <div className="moon__crater moon__crater2"></div>
      <div className="moon__crater moon__crater3"></div>
      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="star star4"></div>
      <div className="star star5"></div>
      <div className="error">
        <div className="error__title">{errorTitle}</div>
        <div className="error__subtitle">Hmmm...</div>
        <div className="error__description">
          {/*  */}
          {p1}
        </div>
        <div className="error__description">
          {/* */}
          {p2}
        </div>
        <div className="error__description">
          {/* */}
          {p3}
        </div>
        <div className="error__description">{p4}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
