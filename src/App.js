import { lazy, Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context.js';

const Main = lazy(() => import('./pages/Main').then(module => ({default:module.Main})));
const Results = lazy(() => import('./pages/Results').then(module => ({default:module.Results})));

function App() {

  let wrong = 0;
  let charCount = 0;
  let wordCount = 0;

  return (
    <MemoryRouter>
      <div className="App">
        <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center'>
          <div className="loading"></div>
        </div>}>
          <Context.Provider value={{wrong,charCount,wordCount}}>
            <Routes>

              <Route path="/" element={<Main/>}/>
              <Route path="/results" element={<Results/>}/>

            </Routes>
          </Context.Provider>
        </Suspense>
      </div>
    </MemoryRouter>
  );
}

export default App;
