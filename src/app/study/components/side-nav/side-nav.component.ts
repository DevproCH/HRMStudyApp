import { Component, OnInit, NgZone } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../core/services/alertify.service';
import { DataManagerService } from './../../../core/services/data-manager.service';
const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  links : any[] = [];
  studyLinks: any[] = [];
  activeLinkIndex = -1;
  mobileScreen = false;



  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private alertify: AlertifyService,
    private dataManager: DataManagerService) {
      this.links = [
        {
            name: 'Home',
            url: '/study'
        },
        {
          name: 'Impressum',
          url: 'impressum'
        }];


      this.studyLinks = [
        {
          label: 'Insert',
          link: './insert',
          index: 0
        },
        {
          label: 'Train',
          link: './train',
          index: 1
        },
        {
          label: 'Test',
          link: './test',
          index: 2
        }
      ]
  }



  ngOnInit() {
    this.breakpointObserver
    .observe([`(min-width: ${MAX_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) =>{
      this.mobileScreen = state.matches;
      console.log(state.matches);
    });


    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.studyLinks.indexOf(this.studyLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

  isMobileScreen() : boolean {
    return this.mobileScreen;
  }

  /*
    This function will delete everything that is in the localstorrage.
  */
  deleteData() : void {
    this.alertify.confirm("Would you like to delete everything?", () => { this.dataManager.deleteData(); location.reload();});
  }
}
