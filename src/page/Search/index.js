import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { getAllJobs } from "../../services/jobService";
import { Tag } from "antd";
import SearchList from "./SearchList";


const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [data, setData] = useState([]);
  const searchCity = searchParam.get("city");
  const searchKeyword = searchParam.get("keyword");

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getAllJobs();
      if (respone) {
        const newData = respone.filter((item) => {
          // let city = searchCity ? item.city?.includes(searchCity);
          let city;
          if (searchCity && item.city && item.city.includes(searchCity)) {
            city = true;
          } else {
            city = true;
          }
          let keyword;
          if (searchKeyword && item.tags && item.tags.includes(searchKeyword)) {
            keyword = true;
          }
          else {
            keyword = false;
          }
          let status = item.status;
          return city && keyword && status;
        })
        setData(newData.reverse());
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="title_Tags">
        <strong>Kết quả tìm kiếm: </strong>
        {searchCity && (<Tag color="orange">{searchCity}</Tag>)}
        {searchKeyword && (<Tag color="orange">{searchKeyword}</Tag>)}
      </div>
      {data.length > 0 && (
        <SearchList data={data} />
      )}
    </>
  )
}

export default Search;