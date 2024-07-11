import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  confirm(message: string, okCallback: () => any){
    alertify.confirm('Are you sure?', message, () => { okCallback(); }, () => alertify.error('Cancelled')

    );

  }

  success(message: string){
    alertify.success(message);
  }

  error(message: string){
    alertify.error(message);
  }

  warning(message: string){
    alertify.warning(message);
  }

  message(message: string){
    alertify.message(message);
  }
}
