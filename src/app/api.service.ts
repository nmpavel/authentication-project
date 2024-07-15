import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000/api/v1';

  constructor() {}

  async getData(endpoint: string): Promise<any> {
    try {
      let config = {
        method: 'GET',
        url: `${this.baseUrl}/${endpoint}`,
        headers: {
            'Authorization': authHeader()
        }
    };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postProtectedData(endpoint:string, data:any) {
    try {
        let config = {
            method: 'POST',
            url: `${this.baseUrl}/${endpoint}`,
            data: data,
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/json',
            }
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
}

function authHeader() {
  const token = localStorage.getItem('token');
  if (token) {
      return `Bearer ${token}`;
  }
  return '';
}