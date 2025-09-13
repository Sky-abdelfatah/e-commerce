import { AuthService } from './../../../core/auth/service/auth.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly AuthService = inject(AuthService);
  constructor(private FlowbiteService: FlowbiteService) {}
  @Input({ required: true }) islogin!: boolean;
  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  signout(): void {
    this.AuthService.logout();
  }
}
