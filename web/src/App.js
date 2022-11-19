import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const [Data, setData] = useState([]);


  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("keyword") || "";

  const handleSearch = (e) => {
    const keyword = e.target.value;
    if (keyword) {
      setSearchParams({ keyword });
    } else {
      setSearchParams({});
    }
    setQuery(searchTerm);
  };

  const handletag = (keyword) => {
    setQuery(keyword);
    setSearchParams({ keyword });
  };

  useEffect(() => {
    setQuery(searchTerm);
    const fetchData = async () => {
      const res = await Axios.get(
        `http://localhost:8000/api/trips?keyword=${query}`
      );
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, [query, searchTerm]);

  return (
    <>
      <div className="result">
        <div className="Link">
          <a href="/">
            <div className="head">เที่ยวไหนดี</div>
          </a>
        </div>
        <div className="searchP">
          <input
            type="text"
            className="search"
            placeholder="หาที่แล้วไปกัน..."
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        {Data.map((data) => {
          return (
            <div className="grid-container">
              <div className="photoM">
                <img src={data.photos[0]} class="photoR" />
              </div>
              <div class="Link">
                <a href={data.url}>
                  <div className="title">{data.title}</div>
                </a>
              </div>
              <div className="description">{data.description}</div>
              <a className="readmore" href={data.url}>
                อ่านต่อ
              </a>
              <div className="tags">
                {data.tags.map((tag, Id) => {
                  return (
                    <button onClick={handletag.bind(this, tag)} class="tag">
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="item5">
                {data.photos.slice(1).map((photo) => {
                  return <img src={photo} className="photoS"></img>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
