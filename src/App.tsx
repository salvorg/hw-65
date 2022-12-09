import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import Pages from "./containers/Pages/Pages";
import Admin from "./containers/Admin/Admin";
import {ApiPage, ApiPagesList} from "./types";
import axiosApi from "./axiosApi";

function App() {
  const [pages, setPages] = useState<ApiPage[]>([]);

  const fetchPages = useCallback(async () => {
    try {
      const pagesResponse = await axiosApi.get<ApiPagesList | null>('/pages.json');
      const pagesApi = pagesResponse.data;

      if (!pagesApi) {
        return;
      }

      const newPages = Object.keys(pagesApi).map(pageName => {
        const page = pagesApi[pageName];
        return {
          ...page,
          pageName,
        }
      });
      setPages(newPages);
    } finally {
    }
  }, []);

  useEffect(() => {
      void fetchPages();
  }, [fetchPages]);

  return (
    <>
      <header>
        <Navbar pages={pages}/>
      </header>
      <main className='container-fluid'>
        <Routes>
          <Route path='/' element={(<Home/>)}/>
          <Route path='/pages/:pageName' element={(<Pages/>)}/>
          <Route path='/pages/admin' element={(<Admin/>)}/>
          <Route path="*" element={(
            <h1>Not found!</h1>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
