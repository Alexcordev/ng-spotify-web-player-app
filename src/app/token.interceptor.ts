import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyService } from './services/spotify.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private spotifyService: SpotifyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('In interceptor ' + request.url);
    let url: URL = new URL(request.url);
    console.log(url);
    if(request.url !== 'https://accounts.spotify.com/api/token') {
      console.log('Modification de l\'entête');
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.spotifyService.token
      }
      })
    }
    return next.handle(request);
  }
}
