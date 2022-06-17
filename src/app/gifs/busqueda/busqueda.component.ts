import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  
})
export class BusquedaComponent   {
  @ViewChild('txt')  txt!:ElementRef <HTMLInputElement>;
  
  constructor(private GifsService: GifsService){
    
  }

  buscar(){
    const valor = this.txt.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }


    this.GifsService.buscargifs(valor);
  
    this.txt.nativeElement.value = '';

  }

}