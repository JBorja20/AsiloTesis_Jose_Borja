import { AfterContentInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../../services/auth.service';
import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


interface medicosServicios{
  name?: string,
  value?:any,
  children?:medicosServicios[]
}

declare  var L: any

@Component({
  selector: 'app-givepass',
  templateUrl: './givepass.component.html',
  styleUrls: ['./givepass.component.scss']
})
export class GivepassComponent implements OnInit, AfterContentInit {
  @ViewChild('mapaDiv') mapElement!: ElementRef;
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  ubicacionForm: FormGroup;
  thirdFormGroup: FormGroup;
  coords: any;
  map: any;
  opened: boolean = true;
  loading: boolean = false;
  direccion: string = '';
  fourthFormGroup: FormGroup;
  misionGroup: FormGroup;
  marcadores: any;
  coordsBoolean: boolean = false;
  cantidadPersonalFormGroup: FormGroup;
  token: string = '';
  alimentacion: string = '';
  mostrarFormulario: boolean = true;
  aseo: string= '';
  transporteSelect: string= '';
  idDoc: string = '';
  horaDesde: string= '';
  mayorCeroBool: boolean = false;
horaHasta: string= ''
uid: string= '';
nombre: string = '';
aprobado: boolean = false;
verificarFalse: boolean= false;
alimentacionBool: boolean = false;
aseoBool: boolean = false;
transporteBool: boolean = false;
serviciosMedicosBool: boolean =false;
serviciosSanitariosBool: boolean =false;
serviciosAtencionBool: boolean =false;
serviciosTerapeuticosBool: boolean =false;
serviciosComodidadBool: boolean =false;
serviciosAdicionalesBool: boolean =false;
serviciosMedicosBool_1: boolean =false;
serviciosSanitariosBool_2: boolean =false;
serviciosAtencionBool_3: boolean =false;
serviciosTerapeuticosBool_4: boolean =false;
serviciosComodidadBool_5: boolean =false;
serviciosAdicionalesBool_6: boolean =false;

horainicialMayor: boolean =false;
horaiguales: boolean = false;
horamenorocho: boolean = false;
dataTree = [
  {
    "label": "Lea detenidamente las indicaciones",
    "data": "Indicaciones",
    "children": [ 
      {
      "label": "El mapa le servirá para indicar un aproximado de la dirección de su establecimiento en el mapa moviendolo con el cursor.",
      "icon": "pi pi-arrow-right",
      "data": "El mapa le servirá para indicar un aproximado de la dirección de su establecimiento en el mapa moviendolo con el cursor.",
      
    }, 
    {
      "label": "Puede hacer zoom presionando la tecla ctrl + la rueda del ratón",
      "icon": "pi pi-arrow-right",
      "data": "Puede hacer zoom presionando la tecla ctrl + la rueda del ratón",
      
    }, 
    {
      "label": "Utilizando los botones de + o - que se ecuentran en la parte superior",
      "icon": "pi pi-arrow-right",
      "data": "Utilizando los botones de + o - que se ecuentran en la parte superior",
      
    }, 
    {
      "label": "Seleccionar la ubicación del asilo",
      "icon": "pi pi-arrow-right",
      "data": "Seleccionar la ubicación es obligatorio",
      
    } ,
    {
      "label": "Al finalizar de click en el mapa para indicar la ubicación",
      "icon": "pi pi-arrow-right",
      "data": "Al finalizar de click en el mapa para indicar la ubicación",
      
    } 
  ],
  "expanded": true
  }
]

dataCantidadPersonal: any = {};

/**
 * MAT TREE servicios medicos
 * **/
treeControl  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSource = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE serviciosadicionales
 * **/
treeControlAdi  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceAdi = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios sanitarios
 * **/
treeControlSanitarios  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceSanitarios = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios terapeutirocs
 * **/
treeControltera  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourcetera = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios comodidad
 * **/
treeControlcomodidad  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourcecomodidad = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios atencion
 * **/
treeControlAtencion  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceAtencion = new MatTreeNestedDataSource<medicosServicios>();

dias: any =  {
  name: 'Todos los dias',
  completed: false,
  color: 'primary',
  diasSemana: [
    { name: 'Lunes', completed: false, color: 'primary'},
    { name: 'Martes', completed: false, color: 'primary'},
    { name: 'Miercoles', completed: false, color: 'primary'},
    { name: 'Jueves', completed: false, color: 'primary'},
    { name: 'Viernes', completed: false, color: 'primary'},
    { name: 'Sabado', completed: false, color: 'primary'},
    { name: 'Domingo', completed: false, color: 'primary'}
  ]
};

serviciosMedicos: medicosServicios[] =
  [{
    name: 'Servicios Medicos',
    children: [
      {name:'Oxigeno', value: false}, 
      {name:'Terapias Respiratorias', value: false}, 
      {name: 'Terapias Musculares', value: false}, 
      {name: 'Cuidados Postoperatorios', value: false}, 
      {name: 'Dialisis', value: false}, 
      {name: 'Sondas', value: false}, 
      {name: 'Ostomias', value: false}, 
      {name: 'Terapias Cognitivas', value: false}, 
      {name: 'Terapias Diabetes', value: false}, 
    ]
  }]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosSanitarios: medicosServicios[] = [
  {
    name: 'Servicios Sanitarios',
    children: [
      {name:'Cuidados de enfermería 24 horas', value: false}, 
      {name:'Valoración gerontológica', value: false}, 
      {name: 'Asistencia médica', value: false}, 
      {name: 'Cuidados continuados para enfermos crónicos', value: false}, 
      {name: 'Gestión farmacéutica', value: false}, 
    ]
  }
                            
]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosTerapeuticos: medicosServicios[] = [
  {
    name: 'Servicios Terapeuticos',
    children: [
      {name:'Programa de estimulación cognitiva', value: false}, 
      {name:'Programa de estimulación multisensorial', value: false}, 
      {name: 'Programa de mantenimiento y actividad física', value: false}, 
      {name: 'Programa de terapia funcional', value: false}, 
      {name: 'Programa de rehabilitación y fisioterapia', value: false}, 
      {name: 'Programa de terapia ocupacional para apoyo en las ABIVD´s*', value: false}, 
      {name: 'Programa de atención centrada en la persona', value: false}, 
      {name: 'Programa de memoria y reminiscencias', value: false}, 
      
    ]
  }
                            
]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosComodidad: medicosServicios[] = [
  {
    name: 'Servicios Comodidad',
    children: [
      {name:'Cocina propia', value: false}, 
      {name:'Comedor', value: false}, 
      {name: 'Sala de T.V.', value: false}, 
      {name: 'Sala de estar', value: false}, 
      {name: 'Rincones significativos', value: false}, 
      {name: 'Patio y terrazas', value: false}, 
      {name: 'Limpieza y lavandería', value: false}, 

    ]
  }
                            
]
/*------------------------------------------------------*/
serviciosatencion: medicosServicios[] = [
  {
    name: 'Servicios atencion',
    children: [
      {name:'Itinerario personalizado', value: false}, 
      {name:'Plan de atención integral', value: false}, 
      {name: 'Personal de referencia', value: false}, 
      {name: 'Proyecto de vida', value: false}, 
      {name: 'Escuela de familias', value: false}, 
      {name: 'Grupo de apoyo familiar', value: false}, 
     ]
  }
                            
]

controles: any[] = [
  {
    name:'Siquiatria',
    value: false
  },
  {
    name:'Fisioterapia',
    value: false
  },
  {
    name:'Sicoterapia',
    value: false
  },
  {
    name:'Terapia ocupacionales',
    value: false
  }
];

transportes: any[] = [
{
  name: 'Si',
  value: false
},
{
  name: 'No',
  value: false
}
];
serviciosAdicionales: medicosServicios[] = [
  {name:'Peluqueria',value:false},  
  {name:'Entrega de Medicamentos',value:false},  
  {name:'Acompañamiento a Citas Medicas',value:false},  
  {name:'Dieta Especial',value:false},  
  {name:'Cama Hospitalaria',value:false},  
  ]


mostrarImagen:any = '';

FotoSubir: any;

allComplete: boolean = false;

urlFotofirebase: any = '';
data: any;


  constructor(
    private _fb: FormBuilder, 
    private postService: PostService, 
    private _token: CookieService,  
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _post: PostService,
    private _fotos: SubirfotosService,
    private _sanitazer: DomSanitizer,
    private toastr: ToastrService,
    private _render: Renderer2
    ) {
    this.uid = this._token.get('uid');
    
  }
  
  
  
  
    
  ngAfterContentInit(): void {
    let adicionales: medicosServicios[] = [
      {
        name: 'Servicios Medicos',
        children: this.serviciosMedicos[0].children
      }
    ];
    let adicionaAdi = [
      {
        name: 'Serivicios Adicionales',
        children: this.serviciosAdicionales
      }
    ]
    
    this.dataSource.data = adicionales;
    this.dataSourceAdi.data= adicionaAdi;
    this.dataSourceAtencion.data = this.serviciosatencion;
    this.dataSourceSanitarios.data = this.serviciosSanitarios;
    this.dataSourcecomodidad.data = this.serviciosComodidad;
    this.dataSourcetera.data = this.serviciosTerapeuticos;

    
    // 
    
  }
  
  ngOnInit(): void {
    this.token = this._cookie.get('uid');

    
    
    this.crearFormulario();
    this.getDataFirebase();
    
    this.cargarinfo();

    
    
    
    
  }
  abrirSide(drawer: any){
    if(drawer.opened){
      this._render.addClass(this.mapElement.nativeElement, 'mapa-resize');
      this._render.removeClass(this.mapElement.nativeElement, 'mapa');
      this.map.resize();
      
      this.opened = false;
      
      
      
    }else{
      
      this._render.removeClass(this.mapElement.nativeElement, 'mapa-resize');
      this._render.addClass(this.mapElement.nativeElement, 'mapa');
      this.map.resize();
      this.opened = true;

    }
    
    // 
    // if(this.opened){
    //   this.opened = false;
    // }
    // 
    
    return drawer.toggle();
  }

  cargarinfo(){

    this.postService.getPostByUid(this.uid)
    .subscribe((resp: any) => {
      this.mostrarImagen = this._auth.insertCorreoAuth().currentUser?.photoURL != null ? this._auth.insertCorreoAuth().currentUser?.photoURL : 'assets/img/no-photo.png';
      
      for(let f of resp.docs){
        
        this.idDoc = f.id;
        this.data = f.data();
        this.direccion = 'Cerca de ' + f.data().address;
        this._auth.insertName()
        .subscribe((resp) =>{
          this.nombre = resp.displayName;
          this.firstFormGroup.setValue({
            name: f.data().name,
            
            email: f.data().email,
            fono: f.data().fono,
            cedula: f.data().cedula
          });
          this.ubicacionForm.setValue({
            address: f.data().address
          });
          
        });
        this.misionGroup.setValue({
          mision: f.data()?.mision ? f.data()?.mision : '',
          vision: f.data()?.vision ? f.data()?.vision : ''
        })
        
        if(f.data()?.horas){

          for(let i = 0; i < this.dias.diasSemana.length; i++){
            this.dias.diasSemana[i].completed = f.data().horas.diasSemana[i].completed;
          }
        }
        
        if(f.data()?.controlesMedicos){

          for(let i = 0; i < this.serviciosMedicos[0].children.length; i++){
            this.serviciosMedicos[0].children[i].value = f.data().controlesMedicos[0].children[i].value;
          }
        }
        if(f.data()?.serviciosAdicionales){

          for(let i = 0; i < this.serviciosAdicionales.length; i++){
            this.serviciosAdicionales[i].value = f.data().serviciosAdicionales[i].value;
          }
        }
        if(f.data()?.servicioSanitarios){

          for(let i = 0; i < this.serviciosSanitarios[0].children.length; i++){
            this.serviciosSanitarios[0].children[i].value = f.data().servicioSanitarios[0].children[i].value;
          }
        }
        if(f.data()?.servisioTerapeuticos){

          for(let i = 0; i < this.serviciosTerapeuticos[0].children.length; i++){
            this.serviciosTerapeuticos[0].children[i].value = f.data().servisioTerapeuticos[0].children[i].value;
          }
        }
        if(f.data()?.serviciosComodidad){

          for(let i = 0; i < this.serviciosComodidad[0].children.length; i++){
            this.serviciosComodidad[0].children[i].value = f.data().serviciosComodidad[0].children[i].value;
          }
        }
        if(f.data()?.serviciosAtencion){

          for(let i = 0; i < this.serviciosatencion[0].children.length; i++){
            this.serviciosatencion[0].children[i].value = f.data().serviciosAtencion[0].children[i].value;
          }
        }
        
        this.horaDesde = f.data()?.horaDesde ?f.data()?.horaDesde : '' ;
        this.horaHasta = f.data()?.horaHasta?f.data()?.horaHasta : '';
       
       this.fourthFormGroup.setValue({
        alimentacion: f.data()?.alimentacion ? f.data()?.alimentacion : '',
        transporte: f.data()?.transporte ?f.data()?.transporte : '', 
        aseo: f.data()?.aseo ?f.data()?.aseo : '' 
       });

       this.cantidadPersonalFormGroup.setValue({
        cantidadAlimentacion: f.data()?.cantidadAlimentacion ? f.data()?.cantidadAlimentacion: '',
        cantidadTransporte: f.data()?.cantidadTransporte ? f.data()?.cantidadTransporte: '',
        cantidadaseo: f.data()?.cantidadaseo ? f.data()?.cantidadaseo: '',
        cmedico: f.data()?.cmedico ? f.data()?.cmedico: '',
        ctera: f.data()?.ctera ? f.data()?.ctera: '',
        csanitario: f.data()?.csanitario ? f.data()?.csanitario: '',
        ccomodidad: f.data()?.ccomodidad ? f.data()?.ccomodidad: '',
        catencion: f.data()?.catencion ? f.data()?.catencion: '',
        ccomplementarios: f.data()?.ccomplementarios ? f.data()?.ccomplementarios: '',
      })
      this.coords = {
        lat: f.data().lat,
        lng: f.data().lng
      }
      setTimeout(() => {
        
        this.mapa(this.coords.lat, this.coords.lng);
        this.marcadores = new mapboxgl.Marker().setLngLat([f.data().lng, f.data().lat]).addTo(this.map);
      }, 400);
      
      // setTimeout(() => {
      //   this.marcadores = L.marker([f.data().lat, f.data().lng]).addTo(this.map);
      //   this.map.addEventListener("click", (e) =>{
      //     
      //     // 
          
      //     if(this.marcadores !== undefined){
            
      //       this.map.removeLayer(this.marcadores);
      //       this.marcadores = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      //       this.coordsBoolean = false;
      //       // 
      //       this.coords = e.latlng;
      //     }else{
      //       this.marcadores = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      //       this.coords = e.latlng;
      //       this.coordsBoolean = false;
      //       // 
  
      //     }
  
      //     // L.remove();
          
          
      //   });
      // });
       

      //  
       
       /* this.fourthFormGroup.setValue({
         alimentacion: f.data().alimentacion,
         aseo: f.data().aseo
       }) */
      }
    });
  }

  
  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  onSubmit(){

    if(this.thirdFormGroup.invalid){
      this.toastr.warning('no se puede actualizar, ya que no ha elegido una foto', 'Error', {
        progressAnimation: 'increasing',
        progressBar: true,
      })
      return Object.values( this.thirdFormGroup.controls ).forEach((validators) =>{
        validators.markAllAsTouched()
      })
    }
    let enviar = {
      foto: this.urlFotofirebase
    }
    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      this.toastr.success("imagen actualizada correctamente", 'Imagen',{
        closeButton: true,
        progressAnimation: 'increasing',
        progressBar: true
      })
      this.cargarinfo();
    })
    .catch((error) =>{

    })
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+'), Validators.maxLength(20)]],
      email: ['',[ Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      fono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{10,13}')]]
    });

    this.misionGroup = this._fb.group({
      mision: ['', [Validators.required]],
      vision: ['', [Validators.required]]
    });

    this.ubicacionForm = this._fb.group({
      address: ['', [Validators.required]]
    });
    this.SecondFormGroup = this._fb.group({
      lunes: ['', Validators.required],
      martes: ['', Validators.required],
      miercoles: ['', Validators.required],
      jueves: ['', Validators.required],
      viernes: ['', Validators.required],
      sabado: ['', Validators.required],
      domingo: ['', Validators.required]
    });
    this.thirdFormGroup = this._fb.group({
      img:['', Validators.required]
    });

    this.fourthFormGroup = this._fb.group({
      alimentacion: ['', Validators.required],
      aseo: ['', Validators.required],
      transporte: ['', Validators.required]

    });

    this.cantidadPersonalFormGroup = this._fb.group({
      cantidadAlimentacion: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      cantidadTransporte: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      cantidadaseo: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      cmedico: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      ctera: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      csanitario: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      ccomodidad: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      catencion: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
      ccomplementarios: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],

    })


  }

  
  siguienteUbicacion(){
    if(this.SecondFormGroup.invalid){
      if(this.coords === undefined){
        this.coordsBoolean = true;
      }
      return Object.values(this.SecondFormGroup.controls).forEach((validator) =>{
        validator.markAllAsTouched();
      });
    }
    
    

  }

  cambioImagen(evento: any){
    
    

   

    if(evento.target.files.length > 0){

      
      this.FotoSubir = evento.target.files[0];
      const rul =URL.createObjectURL(evento.target.files[0]);
      this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
      
      this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value)
      .then((resp)=>{
        
        
        resp.ref.getDownloadURL()
        .then((respGet)=>{
          this.urlFotofirebase = respGet;
        })
        .catch((error) =>{
  
        });
      }).catch((error)=>{
  
      });
    }else{
      this.toastr.info('La imagen seleccionada ha sido borrada, por favor seleccionar una', 'Subir imagen', {
        closeButton: true,
        easeTime: 400,
        easing: 'ease',
        progressAnimation: 'decreasing',
        progressBar: true
      })
    }
    
    
  }


  getDataFirebase(){
    // 
    
    this._auth.getPost(this.token)
    .subscribe((respData: any) =>{
      
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.aprobado = f.data().aprobado;
          
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        }
        
      }
    });
  }

  cambioImagenPdf(evento: any){

  }

  // funcion para seleccionar todas los dias
  algunasCompletadas():boolean {
    if(this.dias.diasSemana == null){
      return false;
    }
    return this.dias.diasSemana.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setearTodos(completed: boolean){
    this.allComplete = completed;
    this.dias.completed = completed;
    if(this.dias.diasSemana == null){
      return;
    }
    
    
    this.dias.diasSemana.forEach((t) => t.completed = completed);
  }

  actualizarSeleccionados(){
    
    
    this.allComplete = this.dias.diasSemana != null && this.dias.diasSemana.every((t) => t.completed);
    
  }

  serviciosmedicos(evento: any){
    
    
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosMedicos.map((t: any) =>{
        // 
        
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosMedicos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }

  }

  serviciosadicionales(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      // this.serviciosAdicionales = this.serviciosAdicionales.forEach()
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.name){
          t.value = true;
        }
        return t;
      })
      
      
      // this.serviciosAdicionalesSelected.push(evento.source.value);
    }else{
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.name){
          t.value = false;
        }
        return t;
      })
      
      
    }
  }

 

  actualizar(evento: any){
    
    
    
    

    if(this.firstFormGroup.invalid){
      return Object.values( this.firstFormGroup.controls ).forEach(validator =>{
        validator.markAllAsTouched();
      });
    }

    this._post.updatePost({...this.firstFormGroup.value.trim()}, this.idDoc)
    .then((resp) =>{
      
      this.toastr.success('datos actualizados', 'Actualizados', {
        progressAnimation: 'decreasing',
        progressBar: true,
        closeButton: true,
      })
      this.cargarinfo();
    })
    .catch((error) =>{
      
      
    })
    
  } 

  actualizarUbicaciones(evento: any){
    if(this.ubicacionForm.invalid){
      if(this.coords === undefined){
        this.coordsBoolean = true;
      }
      return Object.values(this.ubicacionForm.controls).forEach((validator) =>{
        validator.markAllAsTouched();
      });
    }

    let enviarFirebaseUpdated = {
      address: this.ubicacionForm.get('address').value,
      ...this.coords
    }
    this._post.updatePost(enviarFirebaseUpdated, this.idDoc)
    .then((resp) =>{
      
      this.toastr.success('datos actualizados', 'Actualizados', {
        progressAnimation: 'decreasing',
        progressBar: true,
        closeButton: true,
      })
      this.cargarinfo();
    })
    .catch((error) =>{
      
      
    })

  }

  cambioHoraFinal(){
    
    
    this.horainicialMayor = false;
    this.horaiguales = false;
    this.horamenorocho = false;
    if(this.horaDesde.trim() !== '' && this.horaHasta.trim() !== ''){
      let split = this.horaDesde.split(':');
      let numberDesde = Number.parseInt(split[0]);
      numberDesde += 8;
      let unirDesde = numberDesde < 10? '0'+numberDesde+':'+split[1] : numberDesde+":"+split[1]
      
      let splitHasta = this.horaHasta.split(':');
      let numberHasta = Number.parseInt(splitHasta[0]);
      let horasDiferencia = this.calculardiferencia(this.horaDesde, this.horaHasta);
      
      
      if(this.horaDesde > this.horaHasta){
        
        this.horainicialMayor = true;
        
      }else if(this.horaDesde == this.horaHasta ){
        
        this.horaiguales = true;
        this.horamenorocho = true;
      }else if( horasDiferencia < 8 ){
        this.horamenorocho = true;
      }
    }
    
    
  }
  calculardiferencia(valorincial: any, valorfinal: any){
    var hora_inicio = valorincial;
    var hora_final = valorfinal;
    
    // Expresión regular para comprobar formato
    var formatohora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    // Si algún valor no tiene formato correcto sale
    // if (!(hora_inicio.match(formatohora)
    //       && hora_final.match(formatohora))){
    //   return;
    // }
    
    // Calcula los minutos de cada hora
    var minutos_inicio = hora_inicio.split(':')
      .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
    var minutos_final = hora_final.split(':')
      .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
    
    // Si la hora final es anterior a la hora inicial sale
    // if (minutos_final < minutos_inicio){
    
    //   return;
    // } 
      
    
    // Diferencia de minutos
    var diferencia = minutos_final - minutos_inicio;
    
    // Cálculo de horas y minutos de la diferencia
    var horas = Math.floor(diferencia / 60);
    var minutos = diferencia % 60;
    
    return horas > 0 && horas;
  }

  actualizarHorarios(){
    
    
    
    this.verificarFalse = this.dias.diasSemana.every(v => v.completed === false);
    
    
    if(!this.verificarFalse && (this.horaDesde !== '' || this.horaHasta !== '')){
      let enviar = {
        horas: this.dias,
        horaDesde: this.horaDesde,
        horaHasta: this.horaHasta,
      }
      this._post.updatePost(enviar, this.idDoc)
      .then((resp) =>{
        this.toastr.success('Información actualizada', 'Horarios de atención',{
          progressAnimation: 'decreasing',
          progressBar: true,
          closeButton: true,
          easeTime: 200,
          easing: 'ease-out',
        });
        this.cargarinfo();
      })
      .catch((error) =>{
        this.toastr.error('Error al actualizar la información', 'Error Horarios de atención',{
          progressAnimation: 'decreasing',
          progressBar: true,
          closeButton: true,
          easeTime: 200,
          easing: 'ease-out',
        });
  
      })
    }
    
  }
  
  
  actualizarServicios(){
    
    
    

    if(this.fourthFormGroup.invalid){
      return Object.values( this.fourthFormGroup.controls ).forEach((validator) =>{
        validator.markAllAsTouched()
      });
    }
    
    let enviar = {
      transporte: this.fourthFormGroup.get('transporte').value,
      aseo: this.fourthFormGroup.get('aseo').value,
      alimentacion: this.fourthFormGroup.get('alimentacion').value,
      controlesMedicos: this.serviciosMedicos,
      serviciosAdicionales: this.serviciosAdicionales,
      servicioSanitarios: this.serviciosSanitarios,
      servisioTerapeuticos: this.serviciosTerapeuticos,
      serviciosAtencion: this.serviciosatencion,
      serviciosComodidad: this.serviciosComodidad,

    }

    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      
      this.toastr.success('Servicios actualizados correctamente.', 'Modificar servicios', {
        progressAnimation: 'increasing',
        progressBar: true,
      })
      this.cargarinfo();
    })
    .catch((error) =>{
      
      
    })
  }


  prueba(evento: any){
    
    
  }

  serviciosAtencion(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosatencion.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosatencion.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
  }
  serviciosTerapeuticosFun(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosTerapeuticos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosTerapeuticos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
  }
  serviciosInstlaciones(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosComodidad.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosComodidad.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
  }
  serviciosSanitariosFun(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosSanitarios.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosSanitarios.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
  }

  misionvision(){

    if(this.misionGroup.invalid){
      return Object.values(this.misionGroup.controls).forEach(validator => {
        validator.markAsTouched();
      })
    }
    this._post.updatePost(this.misionGroup.getRawValue(), this.idDoc)
    .then((resp)=>{
      this.toastr.success('Datos actualizados correctamente', 'Actualizar', {
        progressAnimation: 'increasing',
        progressBar: true,
        closeButton: true,
        easing: 'ease-in',
        tapToDismiss: true,
        timeOut: 3000,
        
      })
    })
    .catch();
  }


  cantidadPersonal(){
    
    
    if(this.cantidadPersonalFormGroup.invalid){
      return Object.values( this.cantidadPersonalFormGroup.controls ).forEach((validators) =>{
        validators.markAllAsTouched();
      });
    }
    
    let enviar = {};

    if(this.dataCantidadPersonal.alimentacion !== 'no'){
      enviar = {
        ...enviar,
        cantidadAlimentacion: this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value,
      }
    }else{
      enviar = {
        ...enviar,
        cantidadAlimentacion: 0,
      }
      
    }
    if(this.dataCantidadPersonal.transporte !== 'No'){
      enviar = {
        ...enviar,
        cantidadTransporte: this.cantidadPersonalFormGroup.get('cantidadTransporte').value,
      }
    }else{
      enviar = {
        ...enviar,
        cantidadTransporte:0
      }

    }
    if(this.dataCantidadPersonal.aseo !== 'no'){
      enviar = {
        ...enviar,
        cantidadaseo: this.cantidadPersonalFormGroup.get('cantidadaseo').value
      }
    }else{
      enviar = {
        ...enviar,
        cantidadaseo: 0
      }

    }
    
    if(this.serviciosMedicosBool){
      enviar = {
        ...enviar,
        cmedico: this.cantidadPersonalFormGroup.get('cmedico').value
      }
      
    }else{
      
      enviar = {
        ...enviar,
        cmedico: 0
      }
    }
    if(this.serviciosTerapeuticosBool){
      enviar = {
        ...enviar,
        ctera: this.cantidadPersonalFormGroup.get('ctera').value
      }
      
    }else{
      enviar = {
        ...enviar,
        ctera:0
      }

    }
    if(this.serviciosSanitariosBool){
      enviar = {
        ...enviar,
        csanitario: this.cantidadPersonalFormGroup.get('csanitario').value
      }
      
    }else{
      enviar = {
        ...enviar,
        csanitario: 0
      }

    }

    if(this.serviciosComodidadBool){
      enviar = {
        ...enviar,
        ccomodidad: this.cantidadPersonalFormGroup.get('ccomodidad').value
      }
      
    }else{
      enviar = {
        ...enviar,
        ccomodidad: 0
      }

    }
    if(this.serviciosAtencionBool){
      enviar = {
        ...enviar,
        catencion: this.cantidadPersonalFormGroup.get('catencion').value
      }
      
    }else{
      
      enviar = {
        ...enviar,
        catencion:0
      }
    }
    if(this.serviciosAdicionalesBool){
      
      enviar = {
        ...enviar,
        ccomplementarios: this.cantidadPersonalFormGroup.get('ccomplementarios').value
      }
    }else{
      enviar = {
        ...enviar,
        ccomplementarios: 0
      }
      
    }
    
    
    this._post.updatePost(enviar, this.idDoc)
    .then((resp)=>{
      this.toastr.success('Datos Guardados', 'Guardando');
      this.postService.getPostByUid(this.uid)
      .subscribe((resp: any) => {
        
        
        for(let f of resp.docs){
          this.cantidadPersonalFormGroup.setValue({
            cantidadAlimentacion: f.data().cantidadAlimentacion,
            cantidadTransporte: f.data().cantidadTransporte,
            cantidadaseo: f.data().cantidadaseo,
            cmedico: f.data().cmedico,
            ctera: f.data().ctera,
            csanitario: f.data().csanitario,
            ccomodidad: f.data().ccomodidad,
            catencion: f.data().catencion,
            ccomplementarios: f.data().ccomplementarios
          })
        }
      })
    })
    .catch()
  }

  cambioValorAlimentacion(evento: any){
    
    if(evento === '0'){
      this.alimentacionBool = true;
    }else{
      
      this.alimentacionBool = false;
    }
    
  }
  cambioValorAseo(evento: any){
    
    if(evento === '0'){
      this.aseoBool = true;
    }else{
      this.aseoBool = false;

    }

  }
  transporte(evento: any){
    
    if(evento === '0'){
      this.transporteBool = true;
    }else{
      this.transporteBool = false;
      
    }

  }
  mapa(latitude: number = -0.2580184401705081, longitude: number = -78.5413005746294){
    // await loading.present();
    mapboxgl.accessToken = environment.keymapbox;
    this.map = new mapboxgl.Map({
    container: 'mapa', // container ID
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 11, // starting zoom
    boxZoom: true,
    scrollZoom: true,
    doubleClickZoom: true
    // projection: 'globe' // display the map as a 3D globe
    }).addControl(new mapboxgl.NavigationControl());
    // this.map = L.map('mapa', {center: [latitude, longitude], zoom:12});
    //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: 'mapbox/streets-v11',
    //     accessToken: 'pk.eyJ1IjoidHlzb24yMSIsImEiOiJja28wZWc2eGUwY3J4Mm9udzgxZ2UyczJtIn0.EL9SXrORqd-RVmxedhJdxQ'
    //   }).addTo(this.map);
    //   // this.agregarMarcadores();

    //   // setTimeout(() => {
    //   //   loading.dismiss();
    //   // }, 1500);
    
    this.map.on('resize' , () =>{
      
      if(!this.opened){
        this._render.removeClass(this.mapElement.nativeElement, 'mapa-resize');
        this._render.addClass(this.mapElement.nativeElement, 'mapa');
        this.map.resize();

        
      }
    });
    this.map.on('click', (e) => {
      e.preventDefault();
      
      this.loading = true;
      if(this.marcadores !== undefined){
        this.marcadores.remove();
        this.marcadores = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(this.map);
        this.coordsBoolean = false;
        this.coords = e.lngLat;
        this._post.consultarGeocoding(e.lngLat.lng, e.lngLat.lat)
        .subscribe((resp: any) =>{
          
          this.direccion = 'Cerca de ' +resp.display_name
          
          this.ubicacionForm.setValue({
            address: 'Cerca de ' + resp.display_name
          });
          this.loading = false;
        })
      }else{
        
        this.marcadores = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(this.map);
        this.coordsBoolean = false;
        this.coords = e.lngLat;
        this._post.consultarGeocoding(e.lngLat.lng, e.lngLat.lat)
        .subscribe((resp: any) =>{
          
          this.direccion = 'Cerca de ' +resp.display_name
          this.ubicacionForm.setValue({
            address: 'Cerca de ' + resp.display_name
          });
          this.loading = false;
        })
      }

      
      
      
    // map.setFog({}); // Set the default atmosphere style
});
  }

  cambioStep(stepper: any){
    // 
    if((stepper.steps.length - 1) === 6){
      this._post.getPostByUid(this.uid)
      .subscribe((resp: any) =>{
        
        for(let f of resp.docs){
          this.dataCantidadPersonal = f.data();
          

          this.serviciosMedicosBool = (f.data()?.controlesMedicos) ? f.data()?.controlesMedicos[0].children.some( (v) => v.value === true): false;
          this.serviciosTerapeuticosBool = (f.data().servisioTerapeuticos) ?f.data().servisioTerapeuticos[0].children.some( (v) => v.value === true): false;
          this.serviciosSanitariosBool = (f.data().servicioSanitarios)?f.data().servicioSanitarios[0].children.some( (v) => v.value === true): false;
          this.serviciosComodidadBool = (f.data().serviciosComodidad)?f.data().serviciosComodidad[0].children.some( (v) => v.value === true): false;
          this.serviciosAtencionBool = (f.data().serviciosAtencion) ? f.data().serviciosAtencion[0].children.some( (v) => v.value === true): false;
          this.serviciosAdicionalesBool = (f.data().serviciosAdicionales) ? f.data().serviciosAdicionales.some( (v) => v.value === true): false;
          
          
          
        }
      })
    }
    
  }

  

  hasChild = (_: number, node: medicosServicios)      => node.children && node.children.length > 0;
  hasChildAdi = (_: number, node: medicosServicios)   => node.children && node.children.length > 0;
  hasChildSani = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
  hasChildComo = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
  hasChildTera = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
  hasChildAte = (_: number, node: medicosServicios)   => node.children && node.children.length > 0;


  get errorMision(){
    return this.misionGroup.get('mision').hasError('required') && (this.misionGroup.get('mision').touched || this.misionGroup.get('mision').touched);
  }

  get errorVision(){
    return this.misionGroup.get('vision').hasError('required') && (this.misionGroup.get('vision').touched || this.misionGroup.get('vision').touched);
  }


  /* error datos personaes */

  get errorCedula(){
    return this.firstFormGroup.get('cedula').hasError('required') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  get errorCedulaMin(){
    return this.firstFormGroup.get('cedula').hasError('pattern') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  
  get errorNombre(){
    return this.firstFormGroup.get('name').hasError('required') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }
  get errorAddress(){
    return this.ubicacionForm.get('address').hasError('required') && (this.ubicacionForm.get('address').touched || this.ubicacionForm.get('address').dirty);
  }
  get errorEmail(){
    return this.firstFormGroup.get('email').hasError('required') && (this.firstFormGroup.get('email').touched || this.firstFormGroup.get('email').dirty);
  }
  get errorEmailPattern(){
    return this.firstFormGroup.get('email').hasError('pattern') && (this.firstFormGroup.get('email').touched || this.firstFormGroup.get('email').dirty);
  }
  get errorFono(){
    return this.firstFormGroup.get('fono').hasError('required') && (this.firstFormGroup.get('fono').touched || this.firstFormGroup.get('fono').dirty);
  }
  get errorFonoPattern(){
    return this.firstFormGroup.get('fono').hasError('pattern') && (this.firstFormGroup.get('fono').touched || this.firstFormGroup.get('fono').dirty);
  }

  get errorImg(){
    return this.thirdFormGroup.get('img').hasError('required') && (this.thirdFormGroup.get('img').touched || this.thirdFormGroup.get('img').dirty)
  }


  get errorCantidadAlimentacion(){
    return (this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value === "" || this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadAlimentacion').touched ||this.cantidadPersonalFormGroup.get('cantidadAlimentacion').dirty )
  }
  get errorCantidadTransporte(){
    return (this.cantidadPersonalFormGroup.get('cantidadTransporte').value === "" || this.cantidadPersonalFormGroup.get('cantidadTransporte').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadTransporte').touched ||this.cantidadPersonalFormGroup.get('cantidadTransporte').dirty )
  }
  get errorCantidadAseo(){
    return (this.cantidadPersonalFormGroup.get('cantidadaseo').value === "" || this.cantidadPersonalFormGroup.get('cantidadaseo').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadaseo').touched ||this.cantidadPersonalFormGroup.get('cantidadaseo').dirty )
  }
  get errorCantidadMedico(){
    return (this.cantidadPersonalFormGroup.get('cmedico').value === "" || this.cantidadPersonalFormGroup.get('cmedico').value === 0) && ( this.cantidadPersonalFormGroup.get('cmedico').touched ||this.cantidadPersonalFormGroup.get('cmedico').dirty )
  }
  get errorCantidadTera(){
    return (this.cantidadPersonalFormGroup.get('ctera').value === "" || this.cantidadPersonalFormGroup.get('ctera').value === 0) && ( this.cantidadPersonalFormGroup.get('ctera').touched ||this.cantidadPersonalFormGroup.get('ctera').dirty )
  }
  get errorCantidadSanitario(){
    return (this.cantidadPersonalFormGroup.get('csanitario').value === "" || this.cantidadPersonalFormGroup.get('csanitario').value === 0) && ( this.cantidadPersonalFormGroup.get('csanitario').touched ||this.cantidadPersonalFormGroup.get('csanitario').dirty )
  }
  get errorCantidadComodidad(){
    return (this.cantidadPersonalFormGroup.get('ccomodidad').value === "" || this.cantidadPersonalFormGroup.get('ccomodidad').value === 0) && ( this.cantidadPersonalFormGroup.get('ccomodidad').touched ||this.cantidadPersonalFormGroup.get('ccomodidad').dirty )
  }
  get errorCantidadAtencion(){
    return (this.cantidadPersonalFormGroup.get('catencion').value === "" || this.cantidadPersonalFormGroup.get('catencion').value === 0) && ( this.cantidadPersonalFormGroup.get('catencion').touched ||this.cantidadPersonalFormGroup.get('catencion').dirty )
  }
  get errorCantidadAdicionales(){
    return (this.cantidadPersonalFormGroup.get('ccomplementarios').value === "" || this.cantidadPersonalFormGroup.get('ccomplementarios').value === 0) && ( this.cantidadPersonalFormGroup.get('ccomplementarios').touched ||this.cantidadPersonalFormGroup.get('ccomplementarios').dirty )
  }
  get errorAlimentacion(){
    return (this.fourthFormGroup.get('alimentacion').hasError('required')) && ( this.fourthFormGroup.get('alimentacion').touched ||this.fourthFormGroup.get('alimentacion').dirty )
  }
  get errorAseo(){
    return (this.fourthFormGroup.get('aseo').hasError('required')) && ( this.fourthFormGroup.get('aseo').touched ||this.fourthFormGroup.get('aseo').dirty )
  }
  get errorTransporte(){
    return (this.fourthFormGroup.get('transporte').hasError('required')) && ( this.fourthFormGroup.get('transporte').touched ||this.fourthFormGroup.get('transporte').dirty )
  }

  get errorNombrePattern(){
    return this.firstFormGroup.get('name').hasError('pattern') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }

  get errorNombreMax(){
    return this.firstFormGroup.get('name').hasError('maxlength') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }

  get errorDireccionMax(){
    return this.ubicacionForm.get('address').hasError('maxlength') && (this.ubicacionForm.get('address').touched || this.ubicacionForm.get('address').dirty);
  }

  // this.cantidadPersonalFormGroup = this._fb.group({
  //   cantidadAlimentacion: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   cantidadTransporte: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   cantidadaseo: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   cmedico: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   ctera: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   csanitario: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   ccomodidad: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   catencion: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]],
  //   ccomplementarios: ['',[Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]]

  // })

  // errores para personal

  get errorccomplementariosPattern(){
    return this.cantidadPersonalFormGroup.get('ccomplementarios').hasError('pattern') && (this.cantidadPersonalFormGroup.get('ccomplementarios').touched || this.cantidadPersonalFormGroup.get('ccomplementarios').invalid);
  }
  get errorccomplementariosMax(){
    return this.cantidadPersonalFormGroup.get('ccomplementarios').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('ccomplementarios').touched || this.cantidadPersonalFormGroup.get('ccomplementarios').invalid);
  }
  get errorcatencionPattern(){
    return this.cantidadPersonalFormGroup.get('catencion').hasError('pattern') && (this.cantidadPersonalFormGroup.get('catencion').touched || this.cantidadPersonalFormGroup.get('catencion').invalid);
  }
  get errorcatencionMax(){
    return this.cantidadPersonalFormGroup.get('catencion').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('catencion').touched || this.cantidadPersonalFormGroup.get('catencion').invalid);
  }
  get errorccomodidadPattern(){
    return this.cantidadPersonalFormGroup.get('ccomodidad').hasError('pattern') && (this.cantidadPersonalFormGroup.get('ccomodidad').touched || this.cantidadPersonalFormGroup.get('ccomodidad').invalid);
  }
  get errorccomodidadMax(){
    return this.cantidadPersonalFormGroup.get('ccomodidad').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('ccomodidad').touched || this.cantidadPersonalFormGroup.get('ccomodidad').invalid);
  }
  get errorcsanitarioPattern(){
    return this.cantidadPersonalFormGroup.get('csanitario').hasError('pattern') && (this.cantidadPersonalFormGroup.get('csanitario').touched || this.cantidadPersonalFormGroup.get('csanitario').invalid);
  }
  get errorcsanitarioMax(){
    return this.cantidadPersonalFormGroup.get('csanitario').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('csanitario').touched || this.cantidadPersonalFormGroup.get('csanitario').invalid);
  }

  get errorcteraPattern(){
    return this.cantidadPersonalFormGroup.get('ctera').hasError('pattern') && (this.cantidadPersonalFormGroup.get('ctera').touched || this.cantidadPersonalFormGroup.get('ctera').invalid);
  }
  get errorcteraMax(){
    return this.cantidadPersonalFormGroup.get('ctera').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('ctera').touched || this.cantidadPersonalFormGroup.get('ctera').invalid);
  }
  get errorcmedicoPattern(){
    return this.cantidadPersonalFormGroup.get('cmedico').hasError('pattern') && (this.cantidadPersonalFormGroup.get('cmedico').touched || this.cantidadPersonalFormGroup.get('cmedico').invalid);
  }
  get errorcmedicoMax(){
    return this.cantidadPersonalFormGroup.get('cmedico').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('cmedico').touched || this.cantidadPersonalFormGroup.get('cmedico').invalid);
  }
  get errorCalimentacionPattern(){
    return this.cantidadPersonalFormGroup.get('cantidadAlimentacion').hasError('pattern') && (this.cantidadPersonalFormGroup.get('cantidadAlimentacion').touched || this.cantidadPersonalFormGroup.get('cantidadAlimentacion').invalid);
  }
  get errorCalimentacionMax(){
    return this.cantidadPersonalFormGroup.get('cantidadAlimentacion').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('cantidadAlimentacion').touched || this.cantidadPersonalFormGroup.get('cantidadAlimentacion').invalid);
  }
  get errorCTransportePattern(){
    return this.cantidadPersonalFormGroup.get('cantidadTransporte').hasError('pattern') && (this.cantidadPersonalFormGroup.get('cantidadTransporte').touched || this.cantidadPersonalFormGroup.get('cantidadTransporte').invalid);
  }
  get errorCTransporteMax(){
    return this.cantidadPersonalFormGroup.get('cantidadTransporte').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('cantidadTransporte').touched || this.cantidadPersonalFormGroup.get('cantidadTransporte').invalid);
  }
  get errorcantidadaseoPattern(){
    return this.cantidadPersonalFormGroup.get('cantidadaseo').hasError('pattern') && (this.cantidadPersonalFormGroup.get('cantidadaseo').touched || this.cantidadPersonalFormGroup.get('cantidadaseo').invalid);
  }
  get errorcantidadaseoMax(){
    return this.cantidadPersonalFormGroup.get('cantidadaseo').hasError('maxlength') && (this.cantidadPersonalFormGroup.get('cantidadaseo').touched || this.cantidadPersonalFormGroup.get('cantidadaseo').invalid);
  }


  

}
