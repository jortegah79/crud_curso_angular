import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private http: HttpClient = inject(HttpClient);

  URL = "http://localhost:4000/api/productos";

  constructor() { }

  getProductos(): Observable<Producto[]> {

    return this.http.get<Producto[]>(this.URL);
  }

  newProducto(producto: Producto): Observable<any> {
    const body = {
      "nombre": producto.nombre,
      "categoria": producto.categoria,
      "ubicacion": producto.ubicacion,
      "precio": producto.precio
    }

   return this.http.post(this.URL, body);
  }

  deleteProduct(id: string):Observable<any>{
    return this.http.delete(`${this.URL}/${id}`);
  }
  getProductoById(id: string):Observable<Producto>{
    return this.http.get<Producto>(`${this.URL}/${id}`);
  }
  updateProduct(producto: Producto,id:string):Observable<any>  {

    const body = {
      "nombre": producto.nombre,
      "categoria": producto.categoria,
      "ubicacion": producto.ubicacion,
      "precio": producto.precio
    }
    return this.http.put<Producto>(`${this.URL}/${id}`,body);
  }
}
