import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input('categories') categories: Category[]= [];
  category: Category = {id: '', name: '', icon: ''};

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
}
