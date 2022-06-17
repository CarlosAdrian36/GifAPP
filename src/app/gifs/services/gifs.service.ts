import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikey: string = 'jApTwpi6Whsdx3YfjqTiY5mHvwnguGXH'
  private servicioUrl = 'https://api.giphy.com/v1/gifs'
  private _historial: string [] = [];
  
  //Todd: cambiar any por su tipo
  public resultados: Gif [] = [];
  
  get historial() {
    return [...this._historial];
  }
  

  constructor(private http : HttpClient) {

    if (localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! );
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')! );
  }

  buscargifs ( query: string = ''){
    query = query.trim().toLocaleLowerCase(); //Convierte en minusculas
    
    if( !this._historial.includes(query)){//Comprobar que no haya repetidos include
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);//Limita a 10
      
      //JSON.Stringify cambia al tipo string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key',this.apikey)
      .set('limit','10')
      .set('q',query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
          .subscribe(( resp )=>{
            console.log( resp.data);
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          });

  }
}
