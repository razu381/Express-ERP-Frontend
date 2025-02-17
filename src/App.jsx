import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 class="text-3xl font-bold text-green-800">
        Hello world! This is Employee management system
      </h1>
      <img
        src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Nature-Wallpaper.jpg"
        alt=""
      />
      <img
        src="https://wallpaperheart.com/wp-content/uploads/2018/03/beautiful-nature-wallpaper-Garden-HD-Wallpaper.jpg"
        alt=""
      />
    </div>
  );
}

export default App;
