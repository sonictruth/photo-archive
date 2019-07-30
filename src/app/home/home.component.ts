import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  error = null;
  albums = null;
  public filterTerm = '';


  constructor(
    private http: HttpClient
  ) { }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const results = this.albums.filter(album => album.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
        return results.map(album => album.title);
      })
    )
  filter(albums) {
    return albums.filter(album =>  album.title.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1);
  }
  ngOnInit() {
    const url = `${environment.apiUrl}getalbums.php`;
    this.http.get(url).subscribe(
      (albums) => {
        this.albums = albums;
      },
      error => this.error = 'Communication error'
    );
  }

}
