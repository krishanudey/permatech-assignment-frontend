import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiRoot: string = `http://${window.location.hostname}:8080/api/v1`;
  constructor(private http: HttpClient) {}
}
