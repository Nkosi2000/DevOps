import { Component, OnInit } from '@angular/core';
import { DevopsService } from '../services/devops.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentStage: string = '';
  developerActive: boolean = false;
  operatorActive: boolean = false;

  constructor(private devopsService: DevopsService) {}

  ngOnInit() {
    // Subscribe to the current stage
    this.devopsService.getStage().subscribe(stage => {
      this.currentStage = stage;
    });

    // Subscribe to the developerActive flag
    this.devopsService.isDeveloperActive().subscribe(isActive => {
      this.developerActive = isActive;
    });

    // Subscribe to the operatorActive flag
    this.devopsService.isOperatorActive().subscribe(isActive => {
      this.operatorActive = isActive;
    });
  }
}
