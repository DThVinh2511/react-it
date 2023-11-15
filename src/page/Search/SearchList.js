import { Col, Row } from "antd";
import { getListCompany } from "../../services/companyService";
import { useEffect, useState } from "react"
import JobItem from "./itemJob";



const SearchList = (props) => {
  const { data } = props;
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getListCompany();
      // console.log(props);
      const cardJob = data.map((item) => {
        const infoCompany = respone.find((itemCompany) => itemCompany.id == item.idCompany && itemCompany);
        return {
          infoCompany: infoCompany,
          ...item
        };
      });
      setNewData(cardJob);
    };
    fetchApi();
  }, [data]);
  console.log(newData);
  return (
    <>
      {newData.length > 0 ? (
        <div className="listJob">
          <Row gutter={[20, 20]}>
            {newData.map((item) => (
              <Col span={8} key={item.id}>
                <JobItem item = {item}/>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="listJob">
          Không Có công việc nào phù hợp!
        </div>
      )}
    </>
  )
}

export default SearchList;