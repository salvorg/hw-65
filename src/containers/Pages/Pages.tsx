import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Page} from "../../types";
import axiosApi from "../../axiosApi";

const Pages = () => {
  const {pageName} = useParams();
  const [page, setPage] = useState<Page | null>(null);

  const fetchOnePage = useCallback(async () => {
    const pageResponse = await axiosApi.get<Page>('/pages/' + pageName + '.json');
    setPage(pageResponse.data);
  }, [pageName]);

  useEffect(() => {
    void fetchOnePage();
  }, [fetchOnePage]);

  return (
    <div>
      <h2 className='mt-2'>{page?.title}</h2>
      <p className='mt-2'>{page?.content}</p>
    </div>
  );
};

export default Pages;