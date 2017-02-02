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

  mainWrapper: any;

  noticias: Array<Noticias> = [];

  @ViewChild('main') mW: ElementRef;


  ngOnInit() {
    this.mainWrapper = this.mW.nativeElement;

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
    
  }

  showNoticias(){
    let newDiv;
    for(let i = 0; i < this.noticias.length; i++){
      if(this.isFive(i) && i !== 0){
        console.log("here1");
        let newbig = document.createElement('div');
        newbig.className = "row";
        let BigNotice = document.createElement('div');
        BigNotice.className = "col-md-12";
        let SecDiv = document.createElement('div');
        SecDiv.className = "col-md-8 noticia-big";
        let BigImg = document.createElement('img');
        BigImg.src = this.noticias[i].imagen;
        let textDiv = document.createElement('div');
        textDiv.className="col-md-6 noticia-text";
        let title = document.createElement('p');
        title.innerHTML=this.noticias[i].titulo;
        let content = document.createElement('p');
        content.innerHTML=this.noticias[i].contenido;

        textDiv.appendChild(title);
        textDiv.appendChild(content);

        SecDiv.appendChild(BigImg);
        SecDiv.appendChild(textDiv);

        BigNotice.appendChild(SecDiv);

        newbig.appendChild(BigNotice);
        this.mainWrapper.appendChild(newbig);
      }else if(this.isTwo(i) && i !== 0){
        console.log("here2");
        this.createSmall(newDiv, true, i);
      }else{
        console.log("here3");
        this.createSmall(newDiv, true, i);
      }
      
    }
  }

  createSmall(newDiv, first, i){
    if(first){
      newDiv = document.createElement('div');
      newDiv.className = "row";
    }
    let SmallNotice = document.createElement('div');
    SmallNotice.className = "col-md-6 noticia";
    let image = document.createElement('img');
    image.src = this.noticias[i].imagen;
    let textDiv = document.createElement('div');
    textDiv.className="col-md-6 noticia-text";
    let title = document.createElement('p');
    title.innerHTML=this.noticias[i].titulo;
    let content = document.createElement('p');
    content.innerHTML=this.noticias[i].contenido;
    textDiv.appendChild(title);
    textDiv.appendChild(content);
    SmallNotice.appendChild(image);
    SmallNotice.appendChild(textDiv);

    newDiv.appendChild(SmallNotice);
    this.mainWrapper.appendChild(newDiv);
  }

  isTwo(n){
    console.log(n % 2);
    if((n % 2) === 0){
      return true;
    }
    return false;
  }

  isFive(n){
    n = n / 5;
    return Number(n) === n && n % 1 === 0;
  }



}
