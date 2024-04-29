import { Component } from '@angular/core';
import { Productos } from '../_modelo/Productos';
import { AltaProductosComponent } from '../alta-productos/alta-productos.component';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [AltaProductosComponent, RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  constructor(private servicio:ProductosService){}

  productos:Productos[] = [];

  ngOnInit(): void {
    this.servicio.productoCambio
    .subscribe((data) => {this.productos = data});

    this.servicio.listar()
    .subscribe(datos => {
      this.productos = datos;
      console.log("entra");
    })
  }

  eliminar(id:number){
    this.servicio.eliminar(id)
    .subscribe(() =>
      {
        this.servicio.listar()
        .subscribe(data => this.servicio.productoCambio.next(data));
      }
    )
  }

  recivirAviso(listaActualizada:Observable<Productos[]>) {
    console.warn("Regresa el padre ---")

    this.servicio.listar()
    .subscribe(datos => {
      this.productos = datos;
      console.log("entra");
    })
  }
}
