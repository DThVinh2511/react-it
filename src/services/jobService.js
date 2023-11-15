import { del, get, patch, post } from "../utils/request"


export const getAllJobs = async () => {
  const results = await get("jobs");
  return results;
}
export const getDetallJob = async (id) => {
  const results = await get(`jobs/${id}`);
  return results;
}
export const getJobByIdCompany = async (idCompany) => {
  const results = await get(`jobs/?idCompany=${idCompany}`);
  return results;
} 
export const createJob = async (options) => {
  const results = await post("jobs", options);
  return results;
} 
export const updateJob = async (id, options) => {
  const results = await patch(`jobs/${id}`, options);
  return results;
}
export const deleteJob = async (id) => {
  const results = await del(`jobs/${id}`);
  return results;
}