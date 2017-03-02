import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { direccion } from '../../shared/config';

import { Imagen } from '../../shared/contenido/contenido';

declare var jQuery:any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }


  file1: any;
  file2: any;

  imagen1: Imagen;
  imagen2: Imagen;

  numero: any;

  @ViewChild('img1') img1: ElementRef;
  @ViewChild('img2') img2: ElementRef;

  ngOnInit() {
    this.file1 = this.img1.nativeElement;
    this.file2 = this.img2.nativeElement;

  }

  uploadImage(file, numero){
    this.numero = numero;
    document.getElementById("progress1").style.display="block";
    document.getElementById("progress2").style.display="block";
    if(file.files[0] != null){
        jQuery.ajax({
            type: "POST",
            url: direccion + '/uploadFile',
            headers: {
            'Authorization':'Bearer ' + localStorage.getItem("token")
            },
            xhr: function() {
                var myXhr = jQuery.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress', progress, false);
                }
                return myXhr;
            },
            processData: false,
            contentType: false,
            data:new FormData(jQuery("#img"+numero+"form")[0]),
            success: function(response) {
                console.log(response);
                if(numero === 1){
                  this.imagen1 = new Imagen(response.id, response.post_id, response.ruta, response.nombre);
                }else{
                  this.imagen2 = new Imagen(response.id, response.post_id, response.ruta, response.nombre);
                }
            },
            error: function( _response ){
                console.log(_response);
            }
          });
    }else{
        
    }
  }

  

}


function progress(e){
  if(e.lengthComputable){
      var max = e.total;
      var current = e.loaded;
            
      var Percentage = (current * 100)/max;
                    
      let value = Math.round(Percentage);
      
      

      let bar = document.getElementById("bar"+this.numero);
      let text = document.getElementById("percent"+this.numero);
                    
      var percentVal = value + '%';
                    
      bar.style.width=percentVal;
      text.innerHTML=percentVal;
      console.log(percentVal);
      if(Percentage >= 100){
          console.log("Termino");
      }
    }
  }