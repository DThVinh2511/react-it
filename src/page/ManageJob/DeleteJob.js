import { Button, Popconfirm, Tooltip, message } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteJob } from "../../services/jobService";


const DeleteJob = (props) => {
  const { id, onReload } = props;
  const [open, setOpen] = useState(false);
  const [messageApi, conTextHolder] = message.useMessage();
  const hanldeConfirm = async () => {
    const response = await deleteJob(id);
    if(response) {
      await messageApi.open({
        type: "success",
        content: "Bạn đã xóa thành công!",
        duration: 2
      });
      setOpen(false);
      onReload();
    } else {
      messageApi.open({
        type: "error",
        content: "Thất bại",
        duration: 3
      });
    }
    
  };
  const hanldeOpen = () => {
    setOpen(true);
  };
  const hanldeCancel = () => {
    setOpen(false);
  }
  return (
    <>
    {conTextHolder}
      <div className="mgb-10">
        <Tooltip placement="right" title="Xóa job">
          <Popconfirm title="Xóa job" description="Bạn có chắc chắn xóa job này không?" onConfirm={hanldeConfirm} open={open} onCancel={hanldeCancel} placement="left">
            <Button icon={<DeleteOutlined />} danger onClick={hanldeOpen}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  )
}

export default DeleteJob;