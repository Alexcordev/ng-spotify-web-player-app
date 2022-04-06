import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input('categories') categories :any[]  = [];

  value: any;
  response: any;
  artist: Artist = {id: '', name: '', image: '', followers: '', genres: []};
  @Output() foundArtist = new EventEmitter<Artist>();

  constructor(private spotifyService: SpotifyService) { }

  getInputValue(term: any) {
    this.value = term/*.target.value*/;
    this.spotifyService.searchArtist(this.value)
    .subscribe(singer => {
      this.response = singer;
      this.artist = {id:this.response.artists.items[0].id, name: this.response.artists.items[0].name, image: this.response.artists.items[0].images[0].url,
        followers: this.response.artists.items[0].followers.total, genres: this.response.artists.items[0].genres};
        this.foundArtist.emit(this.artist);
    });
    
  }

  ngOnInit(): void {


  }




}
