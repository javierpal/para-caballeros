import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContenidoService } from "../../shared/contenido/contenido.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ContenidoService],
})
export class AdminComponent implements OnInit {

  public show = false;

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute, private router: Router) { }

  emailInput: any;
  passwordInput: any;
  erroresElement: any;

  @ViewChild('email') em: ElementRef;
  @ViewChild('password') passwrd: ElementRef;
  @ViewChild('errores') errs: ElementRef;

  ngOnInit() {
    this.emailInput = this.em.nativeElement;
    this.passwordInput = this.passwrd.nativeElement;
    this.erroresElement = this.errs;
  }

  sendCredentials(){
    this.erroresElement.nativeElement.style.display="none";
    this.contenidoService.sendAuth(this.emailInput.value, this.passwordInput.value)
      .subscribe(response => {
        if(typeof(response[0]) != "undefined" && response[0] != ""){
          this.erroresElement.nativeElement.innerHTML = "";
          this.erroresElement.nativeElement.appendChild(this.createError(response[0]));
          this.erroresElement.nativeElement.style.display="block";
          if(typeof(response[1]) != "undefined" && response[1] != ""){
            this.erroresElement.nativeElement.appendChild(this.createError(response[1]));
          }
        }
        if(typeof(response.token) != "undefined" && response.token != ""){
          localStorage.setItem("token", response.token);
          this.getUserType();
        }
    });
  }

  getUserType(){
    this.contenidoService.sendUserType()
      .subscribe(response => {
        if(response == "admin"){
          this.router.navigate(['/admin/panel']);
        }else{
          this.erroresElement.nativeElement.appendChild(this.createError("Su Cuenta no es de Administrador"));
          this.erroresElement.nativeElement.style.display="block";
        }
    });
  }

  createError(text){
    let mensaje = document.createElement('p');
    mensaje.innerHTML=text;
    return mensaje;
  }

}
