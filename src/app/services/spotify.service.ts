import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

apiLink: string = 'https://accounts.spotify.com/api/token';
httpOptions: any = {};
sharingData = { name: " " };
client_id = environment.client_id;
client_secret = environment.client_secret;
response: any = '';
token: string = '';


constructor(private http: HttpClient) { }

getToken() {
  let body = new HttpParams().set('grant_type', 'client_credentials');
  this.httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
    })
  };
  this.http.post(this.apiLink, body, this.httpOptions)
  .subscribe(res => {
    this.response = res;
    this.token = this.response.access_token;
  })
  return this.http.post(this.apiLink, body, this.httpOptions);

}

getArtist(artistName: string) {
  return this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName);
}

getAlbums(id: any) {
  return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single`);
}

getTracks(id: any) {
  return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`);
}

getCategories() {
  return this.http.get<any>(`https://api.spotify.com/v1/browse/categories`);
}


}
