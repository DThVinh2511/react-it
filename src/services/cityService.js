import { get } from "../utils/request"



export const getCity = async () => {
  const results = await get("city");
  return results;
}
 