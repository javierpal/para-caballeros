import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { Noticias } from "./contenido";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { direccion } from "../config";

@Injectable()
export class ContenidoService {

  constructor(private http: Http) { }

  loadNoticias(){

    let noticiasLink = direccion+"/getNews";
    let headers = new Headers();
    //headers.append("Access-Control-Allow-Headers", "X-CSRF-Token");

    return this.http.get( noticiasLink, {
      headers: headers
    }).map( res => res.json())
      .map(data =>{
        let noticias = [];
        data.forEach((noticia) =>{
          noticias.push(new Noticias(noticia.id, noticia.titulo, noticia.hora, noticia.autor, noticia.resumen, noticia.contenido, noticia.imagen, noticia.imgmini, noticia.visitas));
        });
        return noticias;
      });
  }

  loadTendencias(){
    let noticiasLink = direccion +"/getTendencia";
    let headers = new Headers();

    return this.http.get( noticiasLink, {
      headers: headers
    }).map( res => res.json())
      .map(data =>{
        let tendencias = [];
        data.forEach((noticia) =>{
          tendencias.push(new Noticias(noticia.id, noticia.titulo, noticia.hora, noticia.autor, noticia.resumen, noticia.contenido, noticia.imagen, noticia.imgmini, noticia.visitas));
        });
        return tendencias;
      });
  }

  loadLeftNews(){
    let noticiasLink = direccion+"/getLeftNews";
    let headers = new Headers();

    return this.http.get( noticiasLink, {
      headers: headers
    }).map( res => res.json())
      .map(data =>{
        let leftnews = [];
        data.forEach((noticia) =>{
          leftnews.push(new Noticias(noticia.id, noticia.titulo, noticia.hora, noticia.autor, noticia.resumen, noticia.contenido, noticia.imagen, noticia.imgmini, noticia.visitas));
        });
        return leftnews;
      });
  }

  loadNoticia(id){
    let noticiasLink = direccion+"/getNoticia";
    /*let headers = new Headers();*/

    let params: URLSearchParams = new URLSearchParams();
    params.append("id", id);

    return this.http.get( noticiasLink, {
      search: params
    }).map( res => res.json())
      .map(data =>{
        let noticia = new Noticias(data[0].id, data[0].titulo, data[0].hora, data[0].autor, data[0].resumen, data[0].contenido, data[0].imagen, data[0].imgmini, data[0].visitas);
        return noticia;
    });
  }

  sendAuth(email, password){
    let noticiasLink = direccion+"/Autenticate";

    let params: URLSearchParams = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    return this.http.get( noticiasLink, {
      search: params
    }).map( res => res.json())
      .map(data =>{
        return data;
    });
  }

  sendUserType(){
    let noticiasLink = direccion+"/findAdmin";
    let headers = new Headers();
    headers.append("Authorization", "Bearer "+localStorage.getItem("token"));

    return this.http.get( noticiasLink, {
      headers: headers
    }).map( res => res.json())
      .map(data =>{
        return data;
    });
  }

}
