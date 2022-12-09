import React, {useCallback, useEffect, useState} from 'react';
import {ApiPagesList} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";


const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageInfo, setPageInfo] = useState({
    title: '',
    content: '',
  });
  const [pageSelect, setPageSelect] = useState([{
    id: '',
    title: '',
    content: '',
  }]);

  const fetchPageInfo = useCallback(async () => {
    try {
      setLoading(true);
      const pageResponse = await axiosApi.get<ApiPagesList>('/pages.json');
      const array = Object.keys(pageResponse.data).map(id => {
        const page = pageResponse.data[id];
        return {
          ...page,
          id: id
        }
      });
      setPageSelect(array)
    } finally {
      setLoading(false);
    }
  }, []);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const obj = pageSelect.filter(item => item.id === value)[0]
    setPageName(obj.id);
    setPageInfo({title: obj.title, content: obj.content});
  };

  const onPageChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPageInfo(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pageName.length > 0) {
      await axiosApi.put('/pages/' + pageName + '.json', pageInfo);
      navigate('/pages/' + pageName);
    } else {
      alert('Do not push the Edit button unless you change not the page information');
    }
  };

  useEffect(() => {
    void fetchPageInfo();
  }, [fetchPageInfo]);

  let form = (
    <form onSubmit={onFormSubmit}>
      <h4>Admin</h4>
      <div className="form-group">
        <label htmlFor="page">Page</label>
        <select
          name="id" id="page"
          className="form-select"
          value={pageName}
          onChange={changeValue}
        >
          <option disabled value=''>Choose page</option>
          {pageSelect.map(page => (
            <option key={Math.random()} value={page.id}>{page.id}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title" name="title" type="text"
          className="form-control"
          value={pageInfo.title}
          onChange={onPageChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          name="content" id="content"
          className="form-control"
          cols={30} rows={10}
          value={pageInfo.content}
          onChange={onPageChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success mt-2">Edit</button>
    </form>
  );

  return (
    <div>
      {loading ? <Spinner/> : form}
    </div>
  );
};

export default Admin;