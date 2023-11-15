import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCVByIdCompany } from "../../services/cvService";
import { getCookie } from "../../helpers/Cookie";
import { getDetallJob } from "../../services/jobService";
import DeleteCV from "./DeleteCV";


const ManageCV = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const fetchApi = async () => {
    const cv = await getCVByIdCompany(idCompany);
    if (cv) {
      for (let item of cv) {
        const job = await getDetallJob(item.idJob);
        item.nameJob = job.name;
      };
      setData(cv.reverse());
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
      title: "Tên job",
      dataIndex: "nameJob",
      key: "nameJob"
    },
    {
      title: "Tác giả",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "createAt",
      key: "createAt"
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (_, record) => {
        return (
          <>
            {record?.statusRead ? (
              <Tag color="green">Đã đọc</Tag>
            ) : (
              <Tag color="gray">Chưa đọc</Tag>
            )}
          </>
        )
      }
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <div className="mgb-10">
              <Link to={`/detall-cv/${record.id}`}>
                <Tooltip title="Xem chi tiết cv" placement="top">
                  <Button icon={<EyeOutlined />}></Button>
                </Tooltip>
              </Link>
            </div>
            <DeleteCV id={record.id} onReload={onReload} />
          </>
        )
      }
    }
  ]
  return (
    <>
      <h2>Danh sách CV</h2>
      <Table rowKey="id" columns={columns} dataSource={data}></Table>
    </>
  )
}

export default ManageCV;