import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  maxCount: number;
  data: Usuario[] = [];
  limit: number = 10;
  pageIndex: number = 1;
  offset: number = 0;
  loading: boolean = false;
  keys: string[] = [
    'idusuario', 'idtipodocumento', 'alias', 'apellidosnombres', 'nrodocumento'
  ];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  getUsuariosCount() {
    this.loading = true;
    this.usuarioService.getUsuariosCount()
      .subscribe(
        res => {
          this.maxCount = res as number;
          this.changePagination();
        }
      );
  }

  buscar() {
    this.getUsuariosCount();
  }

  changePagination(page: number = 1) {
    this.loading = true;
    this.pageIndex = page;
    this.usuarioService.getUsuariosByLimitAndOffset(this.limit, this.offset * (this.pageIndex-1))
      .subscribe(
        res => {
          this.loading = false;
          this.data = res as Usuario[];
          this.data = [...this.data];
        }
      );
  }


}
