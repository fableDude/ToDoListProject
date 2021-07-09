import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    ) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
