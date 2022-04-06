import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, tap } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Artist } from '../interfaces/artist';
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
artistName: string = '';


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

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T)
  };
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
  return this.http.get<any>(`https://api.spotify.com/v1/browse/categories?country=US`);
}

searchArtist(term: any): Observable<Artist[]> {

  return this.http.get<Artist[]>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + term);

}

}
