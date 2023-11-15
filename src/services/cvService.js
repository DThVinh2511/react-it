import { del, get, patch, post } from "../utils/request"

export const getCV = async (id) => {
  const results = await get(`cv/${id}`);
  return results;
}
export const createCv = async (options) => {
  const results = post("cv", options);
  return results;
}
export const getCVByIdCompany = async (id) => {
  const results = get(`cv?idCompany=${id}`);
  return results;
}
export const deleteCV = async (id) => {
  const results = await del(`cv/${id}`);
  return results;
}
export const changeStatusCV = async (id, options) => {
  const results = await patch(`cv/${id}`, options);
  return results;
}