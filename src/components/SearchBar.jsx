import Search from "../assets/search.svg";
import Cancel from "../assets/cancel.svg";
import Micro from "../assets/micro.svg";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import React, { useEffect, useRef } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const inputRef = useRef();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [search, setSearch] = React.useState("");

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: "vi-VN" });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleClear = () => {
    setSearch("");
  };

  const handleSearchClick = () => {
    if (onSearch && search.trim() !== "") {
      return onSearch(search);
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      setSearch((prev) => {
        const newText = transcript.trim();
        if (!prev?.includes(newText)) {
          return `${prev ? prev + " " : ""}${newText}`.trim();
        }
        return prev;
      });
      resetTranscript();
    }
  }, [listening, transcript, resetTranscript]);

  return (
    <div className="flex items-center justify-center mt-6 sm:mt-10 w-full px-2">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl py-3 sm:py-5 px-3 sm:px-7 flex bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-gray-300 rounded-full">
        <div className="relative rounded-full flex-1">
          <input
            ref={inputRef}
            className="border-2 border-none bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Search"
          />
          <button
            type="reset"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-none flex items-center justify-center"
          >
            <img
              className="Cancel cursor-pointer"
              title="Nhấn để xóa"
              src={Cancel}
              alt="cancel"
              width={20}
              height={20}
              onClick={handleClear}
            />
            <img
              className="Cancel cursor-pointer"
              src={Micro}
              title="Nhấn để bắt đầu nói"
              alt="micro"
              width={20}
              height={20}
              onClick={listening ? handleStop : handleStart}
            />
          </button>
        </div>
        <button type="button" onClick={handleSearchClick}>
          <img
            className="cursor-pointer w-10 rounded-full bg-white p-2 ml-2 sm:ml-5 hover:scale-125 transition-transform duration-200 ease-in-out"
            src={Search}
            title="Tìm kiếm ở đây"
            alt="search"
            width={30}
          />
        </button>
      </div>
    </div>
  );
}
