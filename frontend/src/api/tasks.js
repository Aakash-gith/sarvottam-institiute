import API from './axios';

// Task API functions
export const createTask = async (taskData) => {
  const response = await API.post('/task/createTask', taskData);
  return response.data;
};

export const getTasks = async () => {
  const response = await API.get('/task/getTasks');
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await API.put(`/task/updateTask/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/task/deleteTask/${id}`);
  return response.data;
};

// Event API functions
export const createEvent = async (eventData) => {
  const response = await API.post('/event/createEvent', eventData);
  return response.data;
};

export const getEvents = async () => {
  const response = await API.get('/event/getEvents');
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await API.put(`/event/updateEvent/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await API.delete(`/event/deleteEvent/${id}`);
  return response.data;
};