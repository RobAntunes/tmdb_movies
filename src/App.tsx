import React, {
  createContext,
  useEffect,
  useState
} from 'react';

import './App.scss';

import Movies from "./components/Movies/Movies";
import Sidebar from "./components/Sidebar/Sidebar";

import { IMovieContext } from "./components/Movies/common/Movies.types";

// Initialize MovieContext to avoid "Object is possibly null"
export const MovieContext = createContext<IMovieContext>({} as IMovieContext);

function App() {
  const [globalState, setGlobalState] = useState<IMovieContext | null>(null)
  useEffect(() => {
    (async () => {
      if (!globalState) {
        const allGenres = (await getGenres()).genres
        const imageInfo = (await getImageInfo());
        const nowPlaying = (await getMovies()).results

        setGlobalState({
          allGenres, imageInfo, nowPlaying, filters: {
            selectedGenres: [],
            minimumRating: 3,
          },
          setGlobalState
        })
      }
    })();
  })

  // Ensure populated context is provided
  return (
    (globalState)
      ?
      (<div className="App">
        <MovieContext.Provider value={globalState}>
          <Sidebar />
          <Movies />
        </MovieContext.Provider>
      </div>)
      :
      <div className="loading">LOADING</div>
  )
}

// Would move calls into HOC but I need to delve into Typescript a bit more
// before I would feel comfortable implementing

async function getMovies() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.REACT_APP_BEARER_TOKEN as string)
      }
    });
    const data = await res.json();
    return data
  }
  catch (e) {
    //TODO:
  }
};

async function getGenres() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.REACT_APP_BEARER_TOKEN as string)
      }
    });
    const data = await res.json();
    return data;
  }
  catch (e) {
    //TODO:
  }
}

async function getImageInfo() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/configuration", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.REACT_APP_BEARER_TOKEN as string),
      }
    });
    const data = await res.json();
    return data;
  }
  catch (e) {
    //TODO:
  }
}

export default App;
