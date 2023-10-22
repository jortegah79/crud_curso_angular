import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  ngOnInit(): void {
    console.log('Llama a init LIstados')
    this.obtenerProductos();
  }

  private productoService = inject(ProductoService);
  private toastr: ToastrService = inject(ToastrService)

  productos: Producto[] = [];

  obtenerProductos() {
    this.productoService.getProductos().subscribe(productos =>   this.productos = productos);
  }

  deleteProduct(id: string | undefined): void {
    if (!id) return;
    this.productoService.deleteProduct(id).subscribe(data=>{

      this.toastr.error("EL producto fué eliminado con éxito", "Atención")
      this.obtenerProductos();

    });
  }

}
