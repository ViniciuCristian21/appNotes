import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async savedSucessToast(color: string, text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  // async presentToastWithOptions() {
  //   const toast = await this.toastController.create({
  //     header: 'Toast header',
  //     message: 'Click to Close',
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       }, {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   await toast.present();

  //   const { role } = await toast.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }
}
