import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Productos } from '../_modelo/Productos';

@Component({
  selector: 'app-alta-productos',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css'
})
export class AltaProductosComponent implements OnInit {
  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private servicio: ProductosService
  ){this.form = new FormGroup({
    'idProducto': new FormControl(0),
    'nombreProducto': new FormControl(''),
    'precioUnitario': new FormControl(0.0),
    'unidadesStock': new FormControl(0)
  });}
  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}

formaFormulario() {
  if(this.edicion){
    this.servicio.listarPorId(this.id)
      .subscribe(data => {
        this.form = new FormGroup({
          'idProducto': new FormControl(data.idProducto),
          'nombreProducto': new FormControl(data.nombreProducto),
          'precioUnitario': new FormControl(data.precioUnitario),
          'unidadesStock':new FormControl(data.unidadesStock)
        });
      })
  }

}

operar(){
  let e:Productos = {
    'idProducto': this.form.value['idProducto'],
    'nombreProducto' : this.form.value['nombreProducto'],
    'precioUnitario': this.form.value['precioUnitario'],
    'unidadesStock':this.form.value['unidadesStock']
  }
  if(this.edicion){
   
    this.servicio.modificar(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data=>{
            this.servicio.productoCambio.next(data);
          });
      });
  }else{
    this.servicio.alta(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.productoCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}


}
