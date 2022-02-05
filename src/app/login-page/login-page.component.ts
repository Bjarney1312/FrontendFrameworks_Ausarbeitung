import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  hide = true;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToDashboard(){
    this._router.navigate(['dashboard'])
  }

}
