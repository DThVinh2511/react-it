import { Button, Col, Form, Input, Row, Select, Tag } from 'antd';
import { useEffect, useState } from 'react';
import Company from './company';
import { useNavigate } from 'react-router-dom';
import { getCity } from '../../services/cityService';
import { getListTags } from '../../services/tagService';


const ContentLayout = () => {
  const naviagte = useNavigate();
  const [city, setCity] = useState([]);
  const [tag, setTag] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getCity();
      const resTag = await getListTags();
      setTag(resTag);
      if(respone) {
        const opject = {
          key: 0,
          value: "All",
        }; 
        setCity([opject, ...respone]);
      }
    }
    fetchApi();
  }, [])
  const onSearch = (e) => {
    let citySearch = e.city || "";
    citySearch = e.city === "All" ? "" : e.city;
    naviagte(`/search?city=${citySearch}&keyword=${e.keyword || ""}`);
  }
  return (
    <>
      <h1>1000+ IT Jobs For Developers </h1>
      {city && (
        <Form onFinish={onSearch}>
          <Row gutter={[12, 12]}>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city">
                <Select
                  showSearch
                  placeholder="Chọn thành phố"
                  options={city}
                />
              </Form.Item>
            </Col>
            <Col xxl={15} xl={15} lg={15}>
              <Form.Item name="keyword">
                <Input
                  placeholder="Nhập từ khóa"
                />
              </Form.Item>
            </Col>
            <Col xxl={3} xl={3} lg={3}>
              <Button type='primary' htmlType="submit">Tìm Kiếm</Button>
            </Col>
          </Row>
        </Form>
      )}
      {tag && (tag.map((item) => (
        <span key={item.key}>
          <Tag color='blue'>
            {item.value}
          </Tag>
        </span>
      )))}
      <h2>Danh sách một số công ty</h2>
      <Company />
    </>
  )
}

export default ContentLayout;