import { Card } from "antd"
import { getCookie } from "../../helpers/Cookie";
import { useEffect, useState } from "react";
import { getDetallCompany } from "../../services/companyService";

const DashboardCompany = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getDetallCompany(idCompany);
      if(respone) {
        setData(respone);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {data && (
        <Card title={"Company"}>
        <div className="mg-10">
          Tên công ty: <strong>{data.companyName}</strong>
        </div>
        <div className="mgt-10">
          Email: <strong>{data.email}</strong>
        </div>
        <div className="mgt-10">
          Số điện thoại: <strong>{data.phone}</strong>
        </div>
      </Card>
      )}
    </>
  )
}

export default DashboardCompany;