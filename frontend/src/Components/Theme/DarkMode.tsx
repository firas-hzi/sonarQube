import "./DarkMode.css";
import { ChangeEventHandler } from "react";


if(localStorage.getItem("theme")==null)
{
  localStorage.setItem("theme", "light");
}
const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme=(e: { preventDefault: () => void; }) => {
  e.preventDefault();
  let span = document.getElementById('spanMode') as HTMLInputElement;
  if(localStorage.getItem("theme")==="light")
  {
   span.textContent  =String.fromCodePoint( 127765 ); 
    setDark();
  }
    else if(localStorage.getItem("theme")==="dark")
    {
      span.textContent  =  String.fromCodePoint( 127761 );
      setLight();
    }
  
}
const DarkMode = () => {
  return (
    <span id="spanMode" onClick={toggleTheme}>&#127761;</span>
  );
};

export default DarkMode;
