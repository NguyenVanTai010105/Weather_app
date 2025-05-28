import "../components/YourLocal.css";
import VietNam from "../assets/iconVN.png";
import Local from "../assets/local.png/";
import Humidity from "../assets/humidity.png";
import Clear from "../assets/clear.png";
import Clouds from "../assets/cloud.png";
import Rain from "../assets/rain.png";
import Drizzle from "../assets/drizzle.png";
import Snow from "../assets/snow.png";
import Temp from "../assets/temparature.png";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function YourLocal() {
  const [weatherData, setWeatherData] = useState(false);
  const [error, setError] = useState("");
  const allIcons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Clouds,
    "02n": Clouds,
    "03d": Clouds,
    "03n": Clouds,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  const search = async (city) => {
    try {
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        setWeatherData(false);
        setError("Không tìm thấy thành phố này!");
        return;
      }
      const icon = allIcons[data.weather[0].icon] || Clear;
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setError("Có lỗi xảy ra khi tra cứu!");
      setWeatherData(false);
      console.error("Fetch weather error: ", error);
    }
  };

  // Demo: Lấy nhiệt độ của nhiều thành phố và sắp xếp bằng bubble sort
  const [cityTemps, setCityTemps] = useState([]);
  const cityList = [
    "Hanoi", "Ho Chi Minh", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue"
  ];

  const fetchAllTemps = async () => {
    setError("");
    const temps = [];
    for (let city of cityList) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          temps.push({ city, temp: Math.floor(data.main.temp) });
        }
      } catch (error) {
        console.error("Fetch weather error: ", error);
        setError("Có lỗi xảy ra khi tra cứu!");
        // Bỏ qua lỗi từng thành phố
      }
    }
    // Bubble sort nhiệt độ tăng dần (dễ hiểu, giống C)
    for (let i = 0; i < temps.length; i++) {
      for (let j = i + 1; j < temps.length; j++) {
        if (temps[j].temp < temps[i].temp) {
          // Đổi chỗ temps[i] và temps[j] bằng biến tạm
          const temp = temps[i];
          temps[i] = temps[j];
          temps[j] = temp;
        }
      }
    }
    setCityTemps(temps);
  };

  useEffect(() => {
    fetchAllTemps();
  });



  return (
    <>
      <SearchBar onSearch={search} />
      {error && (
        <div className="text-red-500 text-center font-mono font-bold mt-2">
          {error}
        </div>
      )}

      <div className="weather-container flex w-full mt-4 items-start justify-center gap-8 font-sans">
        <div className="border-4 rounded-xl border-white shadow-2xl w-11/12 sm:w-96 h-auto bg-gradient-to-r from-cyan-500 via-blue-400 to-blue-700/90 backdrop-blur-md font-mono">
          <div className="text-white font-mono p-4 font-bold flex items-center justify-center text-xl sm:text-2xl">
            Dự báo thời tiết
          </div>
          <div className="flex items-center justify-center">
            {weatherData && (
              <img
                src={weatherData.icon}
                alt="weather icon"
                className="w-28 h-28 ml-2"
              />
            )}
          </div>
          <div className="flex items-center justify-around px-10 mt-5">
            <img
              src={Temp}
              alt="weather icon"
              className="w-10 h-10 mr-2 p-1 shadow-lg bg-gradient-to-r from-blue-950 to-blue-500 rounded-full"
            />
            <p className="text-white font-mono text-2xl font-bold">
              Nhiệt độ: {weatherData?.temp} °C
            </p>
          </div>
          <div className="flex items-center justify-around px-10 mt-5">
            <img
              src={Humidity}
              alt="weather icon"
              className="w-10 h-10 p-1 mr-2 shadow-lg bg-gradient-to-r from-blue-950 to-blue-500 rounded-full "
            />
            <p className="text-white font-mono text-2xl font-bold mr-12">
              Độ ẩm: {weatherData?.humidity} %
            </p>
          </div>
          <div className="flex items-center pb-5 mt-5 justify-center">
            <img src={Local} alt="weather icon" className="w-8 h-8 mr-2" />
            <p className="text-white font-mono text-lg font-bold">
              {weatherData?.location}
            </p>
          </div>
        </div>
        {cityTemps.length > 0 && (
          <div className="mt-0 bg-white/80 rounded-lg p-4 max-w-md shadow self-start font-sans">
            <h3 className="font-bold text-blue-700 mb-2 text-lg sm:text-xl font-sans">Nhiệt độ các thành phố (tăng dần):</h3>
            <ul className="font-sans text-base sm:text-lg">
              {cityTemps.map((item, idx) => (
                <li key={item.city} className="mb-1 font-semibold">{idx + 1}. {item.city}: {item.temp}°C</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer class="bg-slate-200 text-slate-900 mt-10 ">
        <hr style={{width: "100%"}} />
        <div class=" mx-10  md:flex md:justify-between   pt-10">
          {/* <!-- Contact Section --> */}
          <div class="mb-10 md:mb-0">
            <h4 class="text-sm text-slate-900 mb-2">CONTACT US</h4>
            <h2 class="text-3xl font-semibold leading-snug mb-6">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
              <p class="text-red-600 font-bold mt-2">
                <span style={{ color: "red" }}>
                  Tôi yêu Việt Nam{" "}
                  <img
                    src={VietNam}
                    alt=""
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      height: "1em",
                    }}
                  />
                </span>
              </p>
            </h2>
            <button class="group bg-white text-black px-6 py-3 rounded-full hover:text-white font-medium flex items-center gap-2 hover:bg-black transition">
              Call me baby!!
              <span class="ml-1 transform transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
              <div class="bg-[#1A1A2E] inline-flex group-hover:bg-white group-hover:shadow-lg group-hover:text-black text-white items-center px-4 py-2 rounded-full">
                <span>033.788.4414</span>
              </div>
            </button>
            <button class="group bg-black text-white px-5 py-3 my-2 rounded-full font-medium flex items-center gap-2 hover:bg-white group-hover:text-black transition">
              <span class="group-hover:text-black transition-colors duration-200">
                My email!!
              </span>

              <span class="ml-1 transform transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black">
                →
              </span>

              <div class="bg-white group-hover:bg-black group-hover:shadow-lg inline-flex items-center px-9 py-2 rounded-full text-black group-hover:text-white transition-colors duration-200">
                <span>nvt112005@gmail.com</span>
              </div>
            </button>
          </div>

          {/* <!-- Quick Links and Info --> */}
          <div class="md:flex gap-16">
            <div class="mb-8 md:mb-0">
              <h4 class="text-sm text-slate-900 mb-4">QUICK LINKS</h4>
              <ul class="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1  block px-2 py-1 rounded"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1  block px-2 py-1 rounded"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1  block px-2 py-1 rounded"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1    block px-2 py-1 rounded"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1  block px-2 py-1 rounded"
                  >
                    About Me
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-sm text-slate-900 mb-4">INFORMATION</h4>
              <ul class="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg block px-2 py-1 rounded"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg block px-2 py-1 rounded"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:underline transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg block px-2 py-1 rounded"
                  >
                    Cookies Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
