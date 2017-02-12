import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContenidoService } from "../../shared/contenido/contenido.service";
import { Noticias } from '../../shared/contenido/contenido';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ContenidoService],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  constructor(private contenidoService: ContenidoService) { }

  BigDiv: any;
  smallContainer: any;
  tendenciaContainer: any;

  noticias: Array<Noticias> = [];
  tendencias: Array<Noticias> = [];

  @ViewChild('bigDiv') mW: ElementRef;
  @ViewChild('smallContainer') sC: ElementRef;
  @ViewChild('tendenciaContainer') tC: ElementRef;


  ngOnInit() {
    this.BigDiv = this.mW.nativeElement;
    this.smallContainer = this.sC.nativeElement;
    this.tendenciaContainer = this.tC.nativeElement;

    this.subscribe();

  }

  subscribe(){
    this.contenidoService.loadNoticias()
      .subscribe(loadedNoticias => {
        loadedNoticias.forEach((detalleNoticia) => {
          this.noticias.push(detalleNoticia);
        });
        this.showNoticias();
    });

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
    let tText2 = this.makeElement("p", "t-text", "");
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

  showNoticias(){
    
    for(let i = 0; i < this.noticias.length; i++){
      if(i == 0){
        this.makeBigNews(this.noticias[i]);
      }else{
        this.makeSmallNews(this.noticias[i]);
      }
    }

  }

  makeBigNews(noticia){
    let bigrow = this.makeElement("div", "row2", "");
    //let bitimg = this.makeElement("img", "big-img", "");
    let bitimg = document.createElement('img');
    bitimg.className="big-img";
    bitimg.src = noticia.imagen;
    bigrow.appendChild(bitimg);

    let bigrow2 = this.makeElement("div", "row2", "");
    let bigtext1 = this.makeElement("p", "big-text", "");
    let bigtext2 = this.makeElement("p", "big-text", "");
    let bigtext3 = this.makeElement("p", "big-text", "");
    bigtext1.innerHTML = noticia.titulo;
    bigtext2.innerHTML = noticia.resumen;
    bigtext3.innerHTML = "por "+noticia.autor;
    bigrow2.appendChild(bigtext1);
    bigrow2.appendChild(bigtext2);
    bigrow2.appendChild(bigtext3);


    this.BigDiv.appendChild(bigrow);
    this.BigDiv.appendChild(bigrow2);
  }

  makeSmallNews(noticia){
    let smallNoticia = this.makeElement("div", "smallNoticia", "");
    let smallImg = this.makeElement("div", "small-img", "");
    let Img = document.createElement('img');
    Img.src = noticia.imgmini;
    smallImg.appendChild(Img);
    smallNoticia.appendChild(smallImg);

    let smallText = this.makeElement("div", "small-text", "");
    let sText1 = this.makeElement("p", "s-text", "");
    let sText2 = this.makeElement("p", "s-text", "");
    let sText3 = this.makeElement("p", "s-text", "");
    sText1.innerHTML = noticia.titulo;
    sText2.innerHTML = noticia.resumen;
    sText3.innerHTML = "por "+noticia.autor;
    smallText.appendChild(sText1);
    smallText.appendChild(sText2);
    smallText.appendChild(sText3);
    smallNoticia.appendChild(smallText);

    this.smallContainer.appendChild(smallNoticia);
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
