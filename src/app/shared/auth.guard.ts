import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private toast: ToastService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.afa.user.pipe( //pipeline de execução
      take(1), //pega 1 usuário
      map(user => !!user), // mapeamento do usuário
      tap(usuarioLogado =>{ // comparação do usuário
        if(!usuarioLogado){
          this.router.navigate(['/login']);
          this.toast.savedSucessToast('warning', 'Usuario não autenticado.');
        }
      })
    )


    true;
  }

}
