import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  /*..  Versión moderna ..*/
  //private fb:FormBuilder=inject(FormBuilder);

  title: string = 'Crear producto';
  myForm: FormGroup = this.fb.group({
    producto: ['', Validators.required],
    categoria: ['', Validators.required],
    ubicacion: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0)]],
  });

  id: string = '';
  edit = false;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private productoService: ProductoService, private arouter: ActivatedRoute) { }


  ngOnInit(): void {
    this.id= this.arouter.snapshot.paramMap.get('id')||"";
    this.isEdit();
  }

  onNewProduct() {
    if (!this.myForm.valid) {
      console.log("EL formulario no es válido.")
    } else {
      const { producto, ubicacion, precio, categoria } = this.myForm.value;
      const product = new Producto(producto, categoria, ubicacion, precio);

      if (this.edit) {
        this.title = "editar producto";
        this.productoService.updateProduct(product, this.id).subscribe(data=>{

          this.toastr.info('EL producto se ha editado satisfactoriamente', 'Registro correctamente editado');
          this.edit=false;
          this.productoService.getProductos().subscribe();
          this.router.navigateByUrl("/");

        });

      } else {
        this.productoService.newProducto(product).subscribe(data=>{
          this.toastr.info('EL producto se ha guardado satisfactoriamente', 'Registro correcto');
          this.productoService.getProductos().subscribe();
          this.router.navigateByUrl("/");

        });
      }

    }
  }
  getProductoById(id: string) {

    this.productoService.getProductoById(id).subscribe(data => {
      this.myForm.get("producto")?.setValue(data.nombre);
      this.myForm.get("categoria")?.setValue(data.categoria);
      this.myForm.get("ubicacion")?.setValue(data.ubicacion);
      this.myForm.get("precio")?.setValue(data.precio);
    })
  }
  isEdit():void{
    if(!this.id)return;
    this.edit=true;
    this.title="Editar registro";
    this.getProductoById(this.id);
  }

}
