import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContenidoService } from "../../shared/contenido/contenido.service";
import { Noticias } from '../../shared/contenido/contenido';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../main/main.component.css'],
  providers: [ContenidoService],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  constructor(private contenidoService: ContenidoService, private route: ActivatedRoute, private router: Router) { }

  private _sub: any;
  contenido: any;
  noticia_id: any;
  Noticia: Noticias;

  tendenciaContainer: any;

  tendencias: Array<Noticias> = [];

  @ViewChild('tendenciaContainer') tC: ElementRef;

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
			this.contenido = params;
		});

    this.noticia_id = this.contenido.id;

    this.tendenciaContainer = this.tC.nativeElement;
    
    this.loadNoticia();
    this.subscribe();
  }

  loadNoticia(){
    this.contenidoService.loadNoticia(this.noticia_id)
      .subscribe(loadedNoticia => {
        this.Noticia = loadedNoticia;
        console.log(this.Noticia);
    });
    
  }

  subscribe(){
    this.contenidoService.loadTendencias()
      .subscribe(loadedTendencias => {
        loadedTendencias.forEach((detalleTendencia)=>{
          this.tendencias.push(detalleTendencia);
        });
        this.showTendencias();
    });
  }

  showTendencias(){
    for(let i = 0; i < this.tendencias.length; i++){
      this.makeTendencias(this.tendencias[i]);
    }
  }

  makeTendencias(tendencia){
    let tinyNoticia = this.makeElement("div", "tinyNoticia", "");
    let tinyImg = this.makeElement("div", "tiny-img", "");
    let Img = document.createElement('img');
    Img.src= tendencia.imgmini;
    tinyImg.appendChild(Img);
    tinyNoticia.appendChild(tinyImg);

    let tinyText = this.makeElement("div", "tiny-text", "");
    let tText1 = this.makeElement("p", "t-text", "");
    let tText2 = this.makeElement("p", "t-text t-middle", "");
    let tText3 = this.makeElement("p", "t-text", "");
    tText1.innerHTML = tendencia.titulo;
    tText2.innerHTML = tendencia.resumen;
    tText3.innerHTML = "por "+tendencia.autor;
    tinyText.appendChild(tText1);
    tinyText.appendChild(tText2);
    tinyText.appendChild(tText3);

    tinyNoticia.appendChild(tinyText);
    this.tendenciaContainer.appendChild(tinyNoticia);
  }

  makeElement(tipo, clases, ids){
    let element = document.createElement(tipo);
    if(clases != ""){
      element.className=clases;
    }
    if(ids != ""){
      element.id=ids;
    }
    return element;
  }

}
