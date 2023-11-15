import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import JobList from "./JobList";

const ManageJob = () => {
  return (
    <>
      <div className="manage-job">
      <h1>Danh sách việc làm</h1>
      <Link to={"/create-job"}>
        <Button icon={<PlusOutlined />}>Tạo mới</Button>
      </Link>
      </div>
      <JobList />
    </>
  )
}

export default ManageJob;