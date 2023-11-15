import { Card, Tag } from "antd";
import { Link } from "react-router-dom";


const JobItem = (props) => {
  const { item } = props; 
  console.log(item);
  return (
    <>
      <Card title = {<Link to={`/job/${item.id}`}>{item.name}</Link>} className="mg-20">
        <div className="listJob_content--language listJob_content mg-20">
          <span>Ngôn ngữ: </span>
          {item.tags.map((itemTags, index) => (
            <Tag color="blue" key={index}>{itemTags}</Tag>
          ))}
        </div>
        <div className="listJob_content--city listJob_content mg-20">
          <span>Thành phố: </span>
          {item.city.map((itemCity, index) => (
            <Tag color="orange" key={index}>{itemCity}</Tag>
          ))}
        </div>
        <div className="listJob_content--salary listJob_content mg-20">
          <span>Lương: </span> <strong>{item.salary}$</strong>
        </div>
        <div className="listJob_content--createAt listJob_content mg-20">
          <span>Ngày tạo: </span> <strong>{item.createAt}</strong>
        </div>
      </Card>
    </>
  )
}

export default JobItem;