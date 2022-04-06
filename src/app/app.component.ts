import { SpotifyService } from './services/spotify.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-spotify-app';
  bg:any;


  constructor(private sanitizer: DomSanitizer, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.bg = this.sanitizer.bypassSecurityTrustStyle('linear-gradient(#333333, #000000)');
  }


}


