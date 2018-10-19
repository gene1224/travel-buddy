import { Component, OnInit, Input } from '@angular/core';
import { GOOGLE_PHOTOS_API, PHOTO_API } from '../../_constants/config.constants';

@Component({
  selector: 'app-place-photos',
  templateUrl: './place-photos.component.html',
  styleUrls: ['./place-photos.component.scss']
})
export class PlacePhotosComponent implements OnInit {
  @Input()
  photos;
  isCollapsed = true;
  photoUrls = [];
  constructor() {}

  ngOnInit() {
    this.preparePhotoSource();
  }
  preparePhotoSource() {
    if (this.photos.length !== 0) {
      this.photoUrls = this.photos.map(photo => {
        return PHOTO_API(photo.photo_reference);
      });
    }
  }
  loadPhotos() {
    this.isCollapsed = !this.isCollapsed;
  }
}
