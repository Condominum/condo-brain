import axios from 'axios';
import {
  AdminApi,
  Amenity,
  ParkingRegistration,
  Question,
  Reservation,
  User,
} from '../services/admin-api';

export class AdminManager implements AdminApi {
  private _isAdmin: boolean;

  constructor() {
    this._isAdmin = true;
  }

  public async getUsers(): Promise<User[]> {
    if (!this._isAdmin) {
      return [];
    }
    const users: User[] = await axios.get('/api/users').then((result) => result.data);
    return users;
  }

  public async getQuestions(): Promise<Question[]> {
    if (!this._isAdmin) {
      return [];
    }
    const questions: Question[] = await axios.get('/api/questions').then((result) => result.data);
    return questions;
  }

  public async getReservations(): Promise<Reservation[]> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const reservations: Reservation[] = await axios.get('/api/reservations').then((result) => (
      result.data
    ));

    return reservations;
  }

  public async getParkingRegistrations(when = 'today'): Promise<ParkingRegistration[]> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const registration: ParkingRegistration[] = await axios.get(`/api/parking/${when}`).then((result) => (
      result.data
    ));

    return registration;
  }

  public async createQuestion(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const addResult: boolean = await axios.post('/api/questions/create', formData)
      .then((_result) => (true))
      .catch((_error) => (false));

    return addResult;
  }

  public async deleteQuestion(id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const deleteResult: boolean = await axios.delete(`/api/questions/destroy/${id}`)
      .then((_result) => (true))
      .catch((_error) => (false));

    return deleteResult;
  }

  public async getAmenities(): Promise<Amenity[]> {
    if (!this._isAdmin) {
      return [];
    }
    const amenities: Amenity[] = await axios.get('/api/resources').then((result) => result.data);
    return amenities;
  }

  public async createAmenity(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const addResult: boolean = await axios.post('/api/resources/create', formData)
      .then((_result) => (true))
      .catch((_error) => (false));

    return addResult;
  }

  public async deleteAmenity(id: number): Promise<boolean> {
    if (!this._isAdmin) {
      return Promise.reject(Error('Not authorized'));
    }

    const deleteResult: boolean = await axios.delete(`/api/resources/destroy/${id}`)
      .then((_result) => (true))
      .catch((_error) => (false));

    return deleteResult;
  }

  public async upload(formData: FormData): Promise<boolean> {
    if (!this._isAdmin) {
      return false;
    }

    const uploadResult: boolean = await axios.post(
      '/api/users/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then((_result) => (true))
      .catch((_error) => (false));
    return uploadResult;
  }
}
export default AdminManager;
