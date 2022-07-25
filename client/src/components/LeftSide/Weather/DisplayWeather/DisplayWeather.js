import React, { useEffect, useState } from "react";
import "./DisplayWeather.css";

export const DisplayWeather = (props) => {
  const { data } = props;
  const [iconURL, setIconURL] = useState("");
  console.log(data.temperature);
  useEffect(() => {
    if (data.weather) {
      setIconURL(
        "http://openweathermap.org/img/wn/" +
          `${data.weather ? data.weather[0].icon : ""}` +
          ".png"
      );
    }
  }, [data]);
  return data.weather ? (
    <div className="DisplayWeather flex">
      <React.Fragment>
        <div className="maincard">
          <h4>
            it is
            <span className="weather-description">
              {" " + data.weather[0].description}
            </span>
            <span className="cardtitle">
              {" in " + data.name} , {data.sys.country}
            </span>
          </h4>
          <div className="flex row">
            <h1>
              {data.temperature || Math.floor(data.main.temp - 273.15)}
              <sup>o</sup>
            </h1>
            <img className="weather-icon" src={iconURL} alt="" srcSet="" />
          </div>
        </div>
      </React.Fragment>
    </div>
  ) : (
    <></>
  );
};
