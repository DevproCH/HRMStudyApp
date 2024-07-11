import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from "../services/alertify.service";
import { DataManagerService } from '../services/data-manager.service';

@Injectable({
  providedIn: 'root'
})

export class WordGuard implements CanActivate {
  constructor(private alertify: AlertifyService,
    private dataManager: DataManagerService,
    private router: Router) {

  }

  /*
    Tests if the user has any words
  */
  canActivate(): boolean  {
    // ToDo
    let vocabularyData = this.dataManager.getVocabularyData();
    if (vocabularyData === null || vocabularyData.wordPairs.length === 0) {
      this.alertify.error("You need to add some words");
      this.router.navigate(['/study/insert']);
      return false;
    }


    return true;
  }

}
