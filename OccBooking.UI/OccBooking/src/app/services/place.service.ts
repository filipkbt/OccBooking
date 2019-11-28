import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceFilterModel } from 'src/app/home/models/place-filter.model';
import { PlaceModel } from '../models/place.model';
import { AdditionalOptionModel } from '../models/additional-option.model';
import { OccasionTypeMapModel } from '../models/occasion-type-map';
import { occasionTypes } from '../shared/occasionTypes';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  createPlace(ownerId: string, model: PlaceModel): Observable<PlaceModel> {
    return this.http.post<PlaceModel>(`${environment.WEB_API_ENDPOINT}${ownerId}/places`, model);
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
      params = params.append('occasionType', filterModel.occasionType);
      return this.http.get<PlaceModel[]>(`${environment.WEB_API_ENDPOINT}places`, {params});
    } else {
      return this.http.get<PlaceModel[]>(`${environment.WEB_API_ENDPOINT}places`);
    }
  }

  getPlacesByOwner(ownerId: string): Observable<PlaceModel[]> {
    return this.http.get<PlaceModel[]>(`${environment.WEB_API_ENDPOINT}${ownerId}/places`);
  }

  getPlace(placeId: string): Observable<PlaceModel> {
    return this.http.get<PlaceModel>(`${environment.WEB_API_ENDPOINT}places/${placeId}`);
  }

  addOption(placeId: string, model: AdditionalOptionModel): Observable<any> {
    return this.http.post<any>(`${environment.WEB_API_ENDPOINT}places/${placeId}/additionalOptions`, model);
  }

  allowOccasionType(placeId: string, type: string): Observable<any> {
    return this.http.put(`${environment.WEB_API_ENDPOINT}places/${placeId}/occasionTypes/${type}/allow`, {});
  }

  disallowOccasionType(placeId: string, type: string): Observable<any> {
    return this.http.put(`${environment.WEB_API_ENDPOINT}places/${placeId}/occasionTypes/${type}/disallow`, {});
  }

  getReservedDays(placeId: string): Observable<Date[]> {
    return this.http.get<Date[]>(`${environment.WEB_API_ENDPOINT}places/${placeId}/reservedDays`);
  }

  uploadFile(placeId: string, formData: FormData) {
    const uploadReq = new HttpRequest('POST', `${environment.WEB_API_ENDPOINT}places/${placeId}/upload`, formData);
    this.http.request(uploadReq).subscribe();
  }

  mapToOccasionTypeMap(occasionTypesAsStrings: string[]): OccasionTypeMapModel[] {
    let result: OccasionTypeMapModel[] = [];

    occasionTypesAsStrings.forEach(element => {
      const occasionTypeMap = occasionTypes.filter(o => o.value === element)[0];
      result.push(occasionTypeMap);
    });
    return result;
  }
}
