import "./App.css";
import countryData from './resources/countryData.json'
import { useState,useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true)
  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filteredCountries = countryData.filter((country) =>
      country.name.toLowerCase().startsWith(value)
    )

    setSuggestions(filteredCountries);
  };
  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      setShowDropdown(!showDropdown);
      console.log("escape")
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
  },[handleEsc]);
  return (
    <>
      <h1 style={{ fontSize: "30px" }}>Search</h1>
      <div style={{ position: "relative" }}>
        <form action="submit">
          <input
            type="text"
            style={{
              width: "400px",
              padding: "10px",
              fontSize: "large",
              borderRadius: "20px"
            }}
            placeholder="Search here....."
            onChange={handleInput}
          />
          {showDropdown && search && <select
            size={suggestions.length}
          >
            {suggestions.map((country) => (
              <option key={country.code}>
                {country.name}
              </option>
            ))}
          </select>}
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
}

export default App;