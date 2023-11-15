import { Card } from "antd"
import { getCookie } from "../../helpers/Cookie";
import { useEffect, useState } from "react";
import { getCVByIdCompany } from "../../services/cvService";

const DashboardCV = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await getCVByIdCompany(idCompany);
      let ans = {
        allCV: 0,
        cvStatusTrue: 0,
        cvStatusFalse: 0
      };
      ans.allCV = respone.length;
      for (let item of respone) {
        item?.statusRead ? ans.cvStatusTrue++ : ans.cvStatusFalse++;
      }
      setData(ans);
    };
    fetchApi();
  }, [])
  return (
    <>
      {data && (
        <Card title={"CV"}>
          <div className="">
            Số lượng CV: <strong>{data.allCV}</strong>
          </div>
          <div className="mgt-10">
            CV đã đọc: <strong>{data.cvStatusTrue}</strong>
          </div>
          <div className="mgt-10">
            CV chưa đọc: <strong>{data.cvStatusFalse}</strong>
          </div>
        </Card>
      )}
    </>
  )
}

export default DashboardCV;