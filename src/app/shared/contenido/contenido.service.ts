import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Noticias } from "./contenido";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ContenidoService {

  constructor(private http: Http) { }

  loadNoticias(){

    let noticiasLink = "http://192.168.1.10/getNews";
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
    let noticiasLink = "http://192.168.1.10/getTendencia";
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
    let noticiasLink = "http://192.168.1.10/getLeftNews";
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

}
