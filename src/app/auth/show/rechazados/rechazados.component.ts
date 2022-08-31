import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-rechazados',
  templateUrl: './rechazados.component.html',
  styleUrls: ['./rechazados.component.scss']
})
export class RechazadosComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['nombre','cedula', 'direcicon', 'email', 'telefono', 'motivo'];
  
  dataSource = new MatTableDataSource;

  // @Input() datarechazdos: MatTableDataSource<any>
  

  @ViewChild(MatPaginator) pagaprobados: MatPaginator;

  postrechazados: any[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // 
    
  }

  ngAfterViewInit(): void {
    // this.dataSource = this.datarechazdos
    // 
    
    this.cargarAsilosAprobados();
  }

  cargarAsilosAprobados(){
    this.postService.getPostId()
      .subscribe((resp:any) => {
        
        // this.PostAprobados = [];
        this.postrechazados = [];
        for (let f of resp.docs) {
          

           if(!f.data().aprobado && f.data().rechazar){
            
            
            
            this.postrechazados.push({name: f.data().name, address: f.data().address, email: f.data().email, fono: f.data().fono, mensaje: f.data().mensaje, cedula: f.data().cedula});

            
            
          }
        }
        this.dataSource=new MatTableDataSource(this.postrechazados);
        this.dataSource.paginator = this.pagaprobados;

      });
  }


  bucarValor(evento: any){
    let filtro: string = evento.value;
    filtro = filtro.trim();
    filtro = filtro.toLowerCase();
    this.dataSource.filter = filtro;
  }

}
