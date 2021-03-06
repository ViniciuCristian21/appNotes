import { LoginService } from './login/shared/login.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home/', icon: 'cog' },
    { title: 'Login', url: '/login', icon: 'paper-plane' },
    // { title: 'Editar', url: '/update', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor(private loginService: LoginService) {}
  logout(){
    this.loginService.logout();
  }
}
