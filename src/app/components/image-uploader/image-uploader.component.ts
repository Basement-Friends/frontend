import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/modules/materials.module';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent {

  selectedImgFile: File | undefined

  constructor(
    private picturesSrv: PictureService
  ) { }

  onProfileImgSelected(e: any){
    console.log(e.target.files);
    if(e.target !== null)
      this.selectedImgFile = e.target.files[0]
  }

  uploadImage() {
    console.log(this.selectedImgFile);
    if(this.selectedImgFile === undefined) {
      alert("Error selecting image, please try again!")
      return
    }
    this.picturesSrv.uploadPicture(this.selectedImgFile)
  }
}
