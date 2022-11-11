import { Component, OnInit } from '@angular/core';
import {ViewService} from "../view.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.viewService.viewCloseProfile();
  }

}
