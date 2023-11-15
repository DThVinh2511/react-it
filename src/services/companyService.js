import { get, patch, post } from "../utils/request"


export const getListCompany = async () => {
  const results = await get("company");
  return results;
} 
export const getDetallCompany = async (id) => {
  const results = await get(`company/${id}`);
  return results;
}
export const checkEmailCompany = async (email) => {
  const results = await get(`company/?email=${email}`);
  return results;
} 

export const checkPhoneCompany = async (phone) => {
  const results = await get(`company/?phone=${phone}`);
  return results;
}
export const checkLogin = async (email, password) => {
  const results = await get(`company/?email=${email}&password=${password}`);
  return results;
}
export const createCompany = async (options) => {
  const results = await post("company", options);
  return results;
}

export const updateCompany = async (id, options) => {
  const results = await patch(`company/${id}`, options);
  return results;
}
