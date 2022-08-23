import { lazy, Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main').then(module => ({default:module.Main})));
const Results = lazy(() => import('./pages/Results').then(module => ({default:module.Results})));

function App() {
  return (
    <MemoryRouter>
      <div className="App">
        <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center'>
          <div className="loading"></div>
        </div>}>
          <Routes>

            <Route path="/" element={<Main/>}/>
            <Route path="/results" element={<Results/>}/>

          </Routes>
        </Suspense>
      </div>
    </MemoryRouter>
  );
}

export default App;
