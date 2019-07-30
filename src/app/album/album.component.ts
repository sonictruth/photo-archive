import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  private sub: any;
  error = null;
  photos = null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.albumId) {
        this.error = false;
        const url = `${environment.apiUrl}getmedia.php`;
        this.http.get(url, { params }).subscribe(
          (albums) => {
            this.photos = albums;
          },
          error => this.error = 'Communication error'
        );
      } else {
        this.error = 'Missing id';
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
