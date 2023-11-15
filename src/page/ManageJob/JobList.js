import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/Cookie";
import { getJobByIdCompany } from "../../services/jobService";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";


const JobList = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const fetchApi = async () => {
    const response = await getJobByIdCompany(idCompany);
    if (response) {
      setData(response.reverse());
    }
  };
  const onReload = () => {
    fetchApi();
  }
  useEffect(() => {
    fetchApi();
  }, []);
  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: "tags",
      key: 'tags',
      render: (_, record) => (
        <>
          {record.tags.map((item, index) => (
            <Tag key={item} color="blue">{item}</Tag>
          ))}
        </>
      )
    },
    {
      title: 'Mức lương ($)',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => (
        <>
          <div className="time-create">
            <span>Ngày tạo: {record?.createAt}</span>
          </div>
          <div className="time-update">
            <span>Ngày cập nhật: {record?.updateAt}</span>
          </div>
        </>
      )
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        return (
          <>
            <>
              {record.status ? (
                <Tag color="green">Đang bật</Tag>
              ) : (
                <Tag color="red">Đang tắt</Tag>
              )}
            </>
          </>
        )
      }
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <div className="mgb-10">
            <Link to={`/detall-job/${record?.id}`}>
              <Tooltip placement="top" title="Xem chi tiết">
                <Button icon={<EyeOutlined />}></Button>
              </Tooltip>
            </Link>
          </div>
          <EditJob record={record} onReload={onReload} />
          <DeleteJob id={record.id} onReload={onReload} />
        </>
      )
    }
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id"></Table>
    </>
  )
}
export default JobList;