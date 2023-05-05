import React from "react";

const Error = ({ error }) => {
  
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
        <div className="error__title">Error</div>
        <div className="error__subtitle">Hmmm...</div>
        <div className="error__description">
          It looks like the developer fell asleep.
        </div>
        <div className="error__description">
          He dreams of having a database that's free.
        </div>
        <div className="error__description">
          Seeing Firebase has a call limit thats it for today.
        </div>
        <div className="error__description">Come back tomorrow!</div>
      </div>
    </div>
  );
};

export default Error;
