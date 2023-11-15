import { get } from "../utils/request"


export const getListTags = async () => {
  const results = await get("tags");
  return results; 
}