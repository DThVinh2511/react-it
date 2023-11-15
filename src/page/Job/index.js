import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetallJob } from "../../services/jobService";
import { getDetallCompany } from "../../services/companyService";
import { Button, Card, Col, Form, Input, Row, Select, Tag, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCurrenTime } from "../../helpers/Time";
import { createCv } from "../../services/cvService";
const Option = Select.Option


const Job = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [noti, contextHolder] =  notification.useNotification();
  const [form] = Form.useForm();
  const [job, setJob] = useState();
  console.log(params);
  useEffect(() => {
    const fetchApi = async () => {
      const jobDetall = await getDetallJob(params.id);
      const companyDetall = await getDetallCompany(jobDetall.idCompany);
      const data = {
        ...jobDetall,
        infoCompany: companyDetall
      }
      setJob(data);
    };
    fetchApi();
  }, []);
  const handleClick = () => {
    navigate(-1);
  }
  const hanldeSubmit = async (values) => {
    values.idJob = params.id;
    values.idCompany = job.infoCompany.id;
    values.createAt = getCurrenTime();
    const respone = await createCv(values);
    if(respone) {
      form.resetFields();
      noti.success (
        {
          message: "Gửi yêu cầu thành công",
          description: "Cảm ơn bạn đã quan tâm tới công ty. Chúng tôi sẽ phản hồi bạn sớm nhất",
          placement: "topRight",
        }
      );
    }
    else {
      noti.error (
        {
          message: "Gửi yêu cầu không thành công",
          description: "Đã xảy ra sự cố, vui lòng thử lại trong giây lát",
        }
      );
    }
  }
  console.log(job);
  return (
    <>
      {contextHolder}
      <Button onClick={handleClick}>Trở lại</Button>
      {job && (
        <>
          <h1>{job.name}</h1>
          <Button
            type="primary"
            href="#form-apply"
            size="large"
            className="mg-20"
          >ỨNG TUYỂN NGAY</Button>
          <div className="job__detall--language job__detall mg-20">
            <span>Ngôn ngữ: </span>
            {(job.tags || []).map((itemTags, index) => (
              <Tag color="blue" key={index}>{itemTags}</Tag>
            ))}
          </div>
          <div className="job__detall--city job__detall mg-20">
            <span>Thành phố: </span>
            {(job.city || []).map((itemCity, index) => (
              <Tag color="orange" key={index}>{itemCity}</Tag>
            ))}
          </div>
          <div className="job__detall--salary job__detall mg-20">
            <span>Mức lương: </span> <strong>{job.salary}$</strong>
          </div>
          <div className="job__detall--nameCompany job__detall mg-20">
            <span>Tên công ty: </span> <strong>{job?.infoCompany?.companyName}</strong>
          </div>
          <div className="job__detall--address job__detall mg-20">
            <span>Địa chỉ công ty: </span> <strong>{job?.infoCompany?.address}</strong>
          </div>
          <div className="job__detall--createAt job__detall mg-20">
            <span>Thời gian bắt đầu tuyển: </span> <strong>{job.createAt}</strong>
          </div>
          <div className="job__detall--desc job__detall mg-20">
            <div className="job__detall--inner">Mô tả công việc: </div>
            <div className="mg-20">{job.description}</div>
          </div>
          <div className="job__detall--company--desc job__detall mg-20">
            <div className="job__detall--inner">Giới thiệu công ty: </div>
            <div className="mg-20">{job?.infoCompany?.description}</div>
          </div>

          <Card
            title={"Ứng Tuyển Ngay"}
            id="form-apply"
            className="job__detall mg-30"
          >
            <Form
              name="form_apply"
              layout="vertical"
              form={form}
              onFinish={hanldeSubmit}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <Select>
                      {job.city.map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <TextArea rows={6}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Mô tả chi tiết các dự án đã làm"
                    name="project"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập thông tin!',
                      },
                    ]}
                  >
                    <TextArea rows={6}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">GỬI YÊU CẦU</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  )
}

export default Job;