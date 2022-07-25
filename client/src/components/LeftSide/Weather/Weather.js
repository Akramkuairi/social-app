import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DisplayWeather } from "./DisplayWeather/DisplayWeather";
import "./Weather.css";

export const Weather = () => {
  const { user } = useSelector((state) => state);
  const [weather, setWeather] = useState({});
  const [tempWeather, setTempWeather] = useState();

  const APIKEY = "e0b69f8b2229e4d516d67f9b3d817079";

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${user.city},${user.country}&APPID=${APIKEY}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=damascus,syria&APPID=${APIKEY}`
          )
          .then((data) => setWeather(data.data))
          .catch((err) => {
            console.log("first api is not working");
            axios
              .get(`https://geocode.xyz/${user.city}?json=1`)
              .then((data) =>
                axios
                  .get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${data.data.latt}&longitude=${data.data.longt}&current_weather=true`
                  )
                  .then((data) =>
                    setTempWeather(data.data.current_weather.temperature)
                  )
              );
          });
      });
  }, [user]);

  return (
    <div className="Weather flex">
      {tempWeather ? (
        <div>
          <h4>
            <span className="cardtitle">
              {" in " + user.city}, {user.country + " "},
            </span>{" "}
            it is
          </h4>
          <div className="flex row">
            <h1>
              {tempWeather}
              <sup>o</sup>
            </h1>
          </div>
        </div>
      ) : (
        <DisplayWeather data={weather} />
      )}
    </div>
  );
};
