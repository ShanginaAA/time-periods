import React from 'react';
import Circle from '../features/Circle';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="vector vector_vertical vector_vertical-one"></div>
      <div className="vector vector_vertical vector_vertical-two"></div>
      <div className="vector vector_vertical vector_vertical-three"></div>
      <div className="vector vector_horizontal"></div>
      <div className="vector-shot"></div>

      <div className="title">
        <h1>Исторические даты</h1>
      </div>

      <div className="year">
        <span className="year-one">2015&nbsp;&nbsp;</span>
        <span className="year-two">2022</span>
      </div>

      <Circle />
      {/* <div className="ellipse-dot ellipse-dot-one"></div>
        <div className="ellipse-dot ellipse-dot-two"></div>
        <div className="ellipse-dot ellipse-dot-three"></div>
        <div className="ellipse-dot ellipse-dot-four"></div>
        <div className="ellipse-dot ellipse-dot-five"></div>
        <div className="ellipse-dot ellipse-dot-six"></div>

        <div className="ellipse-select ellipse-select-three"></div> */}
    </div>
  );
};

export default App;
