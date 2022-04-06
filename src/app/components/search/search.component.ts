import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Artist } from 'src/app/interfaces/artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input('categories') categories: Category[]= [];
  category: Category = {id: '', name: '', icon: ''};

  artist: Artist = {id: '', name: '', image: '', followers: '', genres: []}
  artists: Artist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getCategories();
   }

  getCategories() {
   this.spotifyService.getCategories()
   .subscribe(response => {
     console.log(response);
     response.categories.items.forEach((categ: any) => {
       this.category = {id: categ.id, name: categ.name, icon: categ.icons[0].url};
       this.categories.push(this.category);
     });
     console.log(this.categories);
   })
  }

  onFoundArtist(artist: Artist) {
    this.artist = {id:artist.id, name: artist.name, image: artist.image, followers: artist.followers, genres: artist.genres};
    this.artists.push(this.artist);
  }
  }


