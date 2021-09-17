import { ToastService } from './../shared/toast.service';
import { Router } from '@angular/router';
import { User } from './shared/user';
import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users: User;
  load: any;
  constructor(
              private loginService: LoginService,
              private router: Router,
              private toast: ToastService,
              private loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.users = new User();
  }

  async login() {
    await this.presentLoading();
    try {
      await this.loginService.login(this.users);
      this.router.navigate(['home']);
      this.toast.savedSucessToast('success', 'Usuario Logado!.');
    } catch (err) {
      console.log(err);
      this.toast.savedSucessToast('warning','Senha/Email incorreto!.');
    }finally{
      this.load.dismiss()
    }
  }

  async presentLoading(){
    this.load = await this.loadingCtrl.create({ message: 'Aguarde...'});
    return this.load.present();
  }

  logout() {
    this.loginService.logout();
  }

}
