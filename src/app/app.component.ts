import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;
  constructor(
    public loaderService: LoaderService,
    public ref: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(status => {
      this.loading = status;
      this.ref.detectChanges();
    });
  }
}
