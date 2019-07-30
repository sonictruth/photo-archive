import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  error = null;
  albums = null;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    const url = `${environment.apiUrl}getalbums.php`;
    this.http.get(url).subscribe(
      (albums) => {
        this.albums = albums;
      },
      error =>  this.error = 'Communication error'
    );
  }

}
