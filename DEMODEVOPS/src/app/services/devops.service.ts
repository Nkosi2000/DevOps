import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevopsService {
  // Define the stages for the developer and operator
  private stages = ['plan', 'code', 'build', 'test', 'release', 'deploy', 'operate', 'monitor'];
  private developerStages = ['plan', 'code', 'build', 'test'];
  private operatorStages = ['release', 'deploy', 'operate', 'monitor'];

  private currentStageIndex = 0;
  private stage$ = new BehaviorSubject<string>(this.stages[this.currentStageIndex]);
  private developerActive = new BehaviorSubject<boolean>(true);  // To indicate if developer is active
  private operatorActive = new BehaviorSubject<boolean>(false);  // To indicate if operator is active

  constructor() {
    // Start the looping animation
    this.loopStages();
  }

  // Getter to subscribe to stage changes
  getStage() {
    return this.stage$.asObservable();
  }

  // Getter to check if developer is active
  isDeveloperActive() {
    return this.developerActive.asObservable();
  }

  // Getter to check if operator is active
  isOperatorActive() {
    return this.operatorActive.asObservable();
  }

  // Logic to move to the next stage and loop between developer and operator
  private nextStage() {
    if (this.currentStageIndex < this.stages.length - 1) {
      this.currentStageIndex++;
    } else {
      this.currentStageIndex = 0;  // Reset to the first stage
    }

    const currentStage = this.stages[this.currentStageIndex];
    
    // Update the stage
    this.stage$.next(currentStage);
    
    // Switch character activation based on stage
    if (this.developerStages.includes(currentStage)) {
      this.developerActive.next(true);
      this.operatorActive.next(false);
    } else if (this.operatorStages.includes(currentStage)) {
      this.developerActive.next(false);
      this.operatorActive.next(true);
    }
  }

  // Loop the stages every 3 seconds (adjust the interval as needed)
  private loopStages() {
    setInterval(() => {
      this.nextStage();
    }, 3000);  // Change every 3 seconds
  }
}
