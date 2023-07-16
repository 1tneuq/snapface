import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})

export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  hasSnapped!: boolean;
  textSnap!: string;

  constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}

  ngOnInit(){
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
    this.hasSnapped = false;
    this.textSnap = 'Oh Snap!';
  }

  onClickSnap(){
    if(!this.hasSnapped){
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.hasSnapped = true;
      this.textSnap = 'Oops, un snap !';
    }else{
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.hasSnapped = false;
      this.textSnap = 'Oh Snap!';
    }
  }
}
