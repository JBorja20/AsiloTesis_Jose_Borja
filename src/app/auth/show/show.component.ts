import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//importa el modelo 
//importar servico
import { PostService } from 'src/app/models/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RechazadosComponent } from './rechazados/rechazados.component';

import { MatDialog } from '@angular/material/dialog';
import { DialogrechazarComponent } from './dialogrechazar/dialogrechazar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['cedula','Nombre', 'direcicon', 'email', 'telefono'];
  displayedColumnspendientes: string[] = ['cedula','Nombre', 'direcicon', 'email', 'telefono', 'accion'];
  
  dataSource = new MatTableDataSource;
  dataSourceAprobados = new MatTableDataSource;
  dataSourceRechazados = new MatTableDataSource;
  

  @ViewChild(MatPaginator) pagaprobados: MatPaginator;
  @ViewChild('#pendientes') pendientes: MatPaginator;

  @ViewChild('recargar', { static: false}) rechazadosComponent : RechazadosComponent;
  
  showFiller = false;
  PostAprobados: any[] = [];
  postrechazados: any[] = [];
  postPendientes: any[] = [];
  nombre: string = '';
  imagen: string = '';
  token: string= '';
  data: any;

  constructor(
    private postService: PostService,
    private _cookie: CookieService,
    private _auth: AuthService,
    private router: Router,
    private _dialog: MatDialog
    ) { }
  ngAfterViewInit() {

    // this.dataSource.paginator = this.paginator;
    this.getAsilosPendientes();
    this.cargarAsilosAprobados();
    this._auth.traerDataFirebase(this.token)
        .subscribe((resp: any) => {
          
  
          for (let f of resp.docs) {
            
            
            this.data = f.data();
          }
        })
    
  }

  ngOnInit(): void {
    this.token = this._cookie.get('uid');
    this._auth.insertName()
    .subscribe((resp) =>{
      this.nombre = resp.displayName;
      // this.imagen = resp.photoURL;
    })
    
    
    
    /* this.postService.getPosts().subscribe((res)=>{
      this.Post= res.map((e)=>{
        return {
          id:e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    }); */
    // this.cargarAsilosAprobados();
    
    
  }


 


  getAsilosPendientes(){
    this.postService.getPostId()
    .subscribe((resp:any) => {
      
      this.postPendientes = [];
      for (let f of resp.docs) {
        
        
        if(!f.data().aprobado){
          

        }
        if(!f.data().aprobado && (f.data().confirmacion)){
          
          let enviar = {
            name: f.data().name, address: f.data().address, email: f.data().email, fono: f.data().fono,
            foto: f.data().foto,
            documento: f.data().documento,
            idDoc: f.id,
            cedula: f.data().cedula
          }
          this.postPendientes.push(enviar);
        }
      }
      this.dataSource=new MatTableDataSource(this.postPendientes);
      
      
      this.dataSource.paginator = this.pendientes;

    });
  }

  cargarAsilosAprobados(){
    this.postService.getPostId()
      .subscribe((resp:any) => {
        
        this.PostAprobados = [];
        // this.postrechazados = [];
        for (let f of resp.docs) {
          

          if(f.data().aprobado && !f.data().rechazar){
            this.PostAprobados.push({ name: f.data().name, address: f.data().address, email: f.data().email, fono: f.data().fono, cedula: f.data().cedula });
            
            
          }else if(!f.data().aprobado && f.data().rechazar){
            
            
            this.postrechazados.push({ ...f.data(), idDoc: f.id });
            
            
            // this.dataSourceRechazados=new MatTableDataSource<any>(this.postrechazados);
          }
        }
        this.dataSourceAprobados=new MatTableDataSource(this.PostAprobados);
        
        this.dataSourceAprobados.paginator = this.pagaprobados;

      });
  }

  deleteRow = (post) => {
    this.postService.deletePosts(post);
    this.cargarAsilosAprobados();
    this.getAsilosPendientes();
    this.rechazadosComponent.ngAfterViewInit();
  };

  aprobar(post: any) {
    

    this.postService.actualizarAprobacion(true, false, false, post.idDoc, false)
      .then((resp) => {
        
        this.getAsilosPendientes();
        this.cargarAsilosAprobados();
        this.rechazadosComponent.ngAfterViewInit();
      });
      
    }
    
    rechazar(post: any){
      // primero ejecutas el dialog, metodos afterdidClose().subscribe()
      const dialog = this._dialog.open(DialogrechazarComponent, {
        width: '350px',
        height: 'auto',
        closeOnNavigation:false,
        disableClose: true,
        data: post.idDoc  
      });

      dialog.afterClosed()
      .subscribe((resp) =>{
        if(resp.v){
          Swal.fire('Guardando', 'Guardando registro, espere por favor...', 'info');
          Swal.showLoading();
          this.postService.actualizarRechazados(false, false, false, true, post.idDoc, resp.mensaje, true, true, resp.motivoRechazo)
          .then((resp) => {
            
            this.getAsilosPendientes();
            this.cargarAsilosAprobados();
            this.rechazadosComponent.ngAfterViewInit();
            Swal.close();
    
        });
        }
      })
  }

  bucarValor(evento: any){
    let filtro: string = evento.value;
    filtro = filtro.trim();
    filtro = filtro.toLowerCase();
    this.dataSource.filter = filtro;
  }
  
  
  bucarValorAprobados(evento: any){
    
    let filtro: string = evento.value;
    
    
    filtro = filtro.trim();
    filtro = filtro.toLowerCase();
    this.dataSourceAprobados.filter = filtro;
    
  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }



}
