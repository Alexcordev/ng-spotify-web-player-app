import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subscription: any = '';

  authRes: any = '';

  spotifyToken: string = '';
  category: Category = {id: '', name: '', icon: ''};
  categories: Category[] = [];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.connect();

  }

  ngAfterViewInit() {
    
}

  connect() {
    this.subscription = this.spotifyService.getToken()
    .subscribe(res => {
      console.log(res);
      this.authRes = res;
      this.spotifyToken = this.authRes.access_token;
      console.log(this.spotifyToken);
    })

  }

}
