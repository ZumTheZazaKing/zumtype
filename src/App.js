import { lazy, Suspense, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context.js';

const Main = lazy(() => import('./pages/Main').then(module => ({default:module.Main})));
const Results = lazy(() => import('./pages/Results').then(module => ({default:module.Results})));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then(module => ({default:module.Leaderboard})));

function App() {

  let [wrong, setWrong] = useState(0);
  let [charCount, setCharCount] = useState(0);
  const [previousUrl, setPreviousUrl] = useState("/");
  const [wentToLeaderboard, setWentToLeaderboard] = useState(false);

  return (
    <MemoryRouter>
      <div className="App">
        <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center'>
          <div className="loading"></div>
        </div>}>
          <Context.Provider value={{
              wrong, setWrong,
              charCount, setCharCount,
              previousUrl, setPreviousUrl,
              wentToLeaderboard, setWentToLeaderboard
          }}>
            <Routes>

              <Route path="/" element={<Main/>}/>
              <Route path="/results" element={<Results/>}/>
              <Route path="/leaderboard" element={<Leaderboard/>}/>

            </Routes>
          </Context.Provider>
        </Suspense>
      </div>
    </MemoryRouter>
  );
}

export default App;
