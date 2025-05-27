import "./index.css";

//  import Clear from "./assets/clear.png";
//  import Clouds from "./assets/clouds.png";
//  import Rain from "./assets/rain.png";
//  import Drizzle from "./assets/drizzle.png";
//  import Humidity from "./assets/humidity.png";

import BgVideo from "./assets/bg_video1.mp4";
import SearchBar from "./components/SearchBar";
import YourLocal from "./components/YourLocal";

// import Snow from "./assets/snow.png";
// import Wind from "./assets/wind.png";

function App() {
  return (
    <>
      <div className="main ">
        <div className=" ">
          <YourLocal />
        </div>
      </div>
    </>
  );
}

export default App;
