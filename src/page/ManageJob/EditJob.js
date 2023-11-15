import { Button, Col, Form, Input, Modal, Row, Select, Switch, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagService";
import { getCity } from "../../services/cityService";
import { getCurrenTime } from "../../helpers/Time";
import { updateJob } from "../../services/jobService";

const EditJob = (props) => {
  const { record, onReload } = props;
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState();
  const [city, setCity] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const hanldeCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleSubmit = async (values) => {
    values.updateAt = getCurrenTime();
    const response = await updateJob(record.id, values);
    if(response) {
      setOpen(false);
      onReload();
      messageApi.open({
        type: "success",
        duration: 2,
        content: "Cập nhật thành công!"
      })
    } else {
      messageApi.open({
        type: "error",
        duration: 1,
        content: "Cập nhật Thất bại!"
      })
    }
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTags();
      if (response) {
        setTags(response);
      }
      const results = await getCity();
      if (results) {
        setCity(results);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
    {contextHolder}
      <div className="mgb-10">
        <Tooltip placement="right" title="Chỉnh sửa job">
          <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>
        </Tooltip>
      </div>
      {record && (
        <Modal open={open} onCancel={hanldeCancel} footer={null} title="Chỉnh sửa job" style={{top: 20}} width={1000}>
          <Form layout="vertical" onFinish={handleSubmit} form={form} initialValues={record}>
            <Row gutter={[20]}>
              <Col span={24}>
                <Form.Item label={"Tên job"} name={"name"} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Tags"} name={"tags"} rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    options={tags}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} span={6}>
                <Form.Item label={"Mức lương"} name={"salary"} rules={[{ required: true }]}>
                  <Input addonAfter="$" />
                </Form.Item>
              </Col>
              <Col xl={16} lg={16} md={16} span={18}>
                <Form.Item label={"Thành phố"} name={"city"} rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    options={city}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Mô tả công việc"} name={"description"} rules={[{ required: true }]}>
                  <Input.TextArea rows={8} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Trạng thái"} name={"status"} valuePropName="checked">
                  <Switch checkedChildren="bật" unCheckedChildren="tắt" defaultChecked />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default EditJob;