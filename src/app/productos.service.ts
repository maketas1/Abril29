import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Productos } from './_modelo/Productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: string ='http://localhost:8080/productos';
  productoCambio = new Subject<Productos[]>();

  constructor(private http:HttpClient) {}

  listar(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url)
    .pipe(
      map(data => {return data.sort((a,b) => a.idProducto-b.idProducto);})
    );
  }

  listarPorId(id:number) {
    return this.http.get<Productos>(`${this.url}/${id}`);
  }

  alta(p:Productos) {
    console.log(p);
    return this.http.post(this.url, p);
  }

  modificar(p:Productos) {
    console.log('datos a modificar: ' + p.idProducto + p.nombreProducto + p.precioUnitario + p.unidadesStock);
    return this.http.put(this.url, p);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
