import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from "../services/alertify.service";
import { DataManagerService } from '../services/data-manager.service';

@Injectable({
  providedIn: 'root'
})

export class ExamGuard implements CanActivate {
  constructor(private alertify: AlertifyService,
    private dataManager: DataManagerService,
    private router: Router) {

  }

  /*
    Tests if the user is in an exam
  */
  canActivate(): boolean  {
    // ToDo
    let examData = this.dataManager.getExamData();
    if (examData === null || examData.finished) {
      return true;
    }

    this.alertify.error("Please Finish the Exam");
    this.router.navigate(['/study/test']);
    return false;
  }

}
