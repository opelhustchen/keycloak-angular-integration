import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = '';

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.initialilzeUserOptions();
  }

  private initialilzeUserOptions(): void {
    this.user = this.keycloakService.getUsername();
    //this.roles = this.keycloakService.getUserRoles();
    //this.token = this.keycloakService.getToken();

  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }
}
