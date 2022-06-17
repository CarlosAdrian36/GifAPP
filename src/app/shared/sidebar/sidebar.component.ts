import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { Gif } from '../../gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  
})
export class SidebarComponent  {
  
  //Inyectando el servicio para que se muestre
  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService ){}
  //Fin del inyectado
  buscar (termino : string){
    this.gifsService.buscargifs(termino);
  }
}