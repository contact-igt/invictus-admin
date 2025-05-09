import { _axios } from 'helper/axios';

export class EventApis {
  getAllEvents = async () => {
    return await _axios('get', '/upcoming-events');
  };

  getEventById = async (id: number | string) => {
    return await _axios('get', `/upcoming-event/${id}`);
  };

  addEvent = async (formData: FormData) => {
    return await _axios('post', '/upcoming-event', formData, 'multipart/form-data');
  };

  updateEvent = async (id: number | string, formData: FormData) => {
    return await _axios('put', `/upcoming-event/${id}`, formData, 'multipart/form-data');
  };

  deleteEvent = async (id: number | string) => {
    return await _axios('delete', `/upcoming-event/${id}`);
  };
}

