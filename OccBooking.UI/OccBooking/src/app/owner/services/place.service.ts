import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { PlaceModel } from '../models/place.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlaceFilterModel } from 'src/app/home/models/place-filter.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createPlace(ownerId: string, model: PlaceModel): Observable<any> {
    return this.http.post<any>(`${environment.WEB_API_ENDPOINT}${ownerId}/places`, model);
  }

  getPlaces(filterModel: PlaceFilterModel = null): Observable<PlaceModel[]> {
    if (filterModel) {
      let params = new HttpParams();
      params = params.append('name', filterModel.name);
      params = params.append('province', filterModel.province);
      params = params.append('city', filterModel.city);
      params = params.append('minCostPerPerson', filterModel.minCostPerPerson.toString());
      params = params.append('maxCostPerPerson', filterModel.maxCostPerPerson.toString());
      params = params.append('minCapacity', filterModel.minCapacity.toString());
      params = params.append('occassionType', filterModel.occassionType.toString());
      return this.http.get<PlaceModel[]>(`${environment.WEB_API_ENDPOINT}places`, {params});
    } else {
      return this.http.get<PlaceModel[]>(`${environment.WEB_API_ENDPOINT}places`);
    }
  }
}
