import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  API_URL = 'api/status';

  constructor(private http: HttpClient) { }

  setDeviceStatus(id: number, key: string, value: any) {
    return this.http.put(this.API_URL, { id, data: { [key]: value } });
  }
}
