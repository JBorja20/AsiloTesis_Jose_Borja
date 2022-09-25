import { AfterContentInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../services/auth.service';

import { DomSanitizer } from '@angular/platform-browser';

// import { Post } from '../../models/post.model';
import { SubirfotosService } from '../services/subirfotos/subirfotos.service';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from 'src/environments/environment';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidHlzb24yMSIsImEiOiJja28wZWc2eGUwY3J4Mm9udzgxZ2UyczJtIn0.EL9SXrORqd-RVmxedhJdxQ';

// uso de interface por obligacion de material design
export interface diasI {
  name: string,
  color: ThemePalette,
  completed: boolean,
  diasSemana?: diasI[]
}

declare var L: any;

@Component({
  selector: 'app-regis-asi',
  templateUrl: './regis-asi.component.html',
  styleUrls: ['./regis-asi.component.scss']
})
export class RegisAsiComponent implements OnInit, AfterContentInit {
  @ViewChild('mapaDiv') mapElement!: ElementRef;
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  misionGroup: FormGroup;
  opened: boolean = true;
  comprobarVacio: boolean =false;
  imagen: string= '';
  informacion: any;
  verificarCedulaBool: boolean = false;
  toppings: FormGroup;
  showFiller = false;
  public postForm:FormGroup;
  uuid: string = '';
  confirmar: boolean = false;
  rechazar: boolean = false;
  // modificarRechazar: boolean = false;
  mostrarFormulario: boolean = true;
  aprobado: boolean = false;
  cuentaVerificada:boolean = false;
  public registroAnterior: any = {};
  idDoc: string = '';
  mayus = 'mayus';
  mostrarImagen: any = '';
  FotoSubir: File;

  urlFotofirebase: any = '';
  rool:string='';
  nombre: string= '';

  data: any= {};

  documentoPDF: string = '';
  coordsBoolean: boolean = false;
  // variables para los checkboxes


  // ===============================================================
  // variables para las horas
  horaDesde: string='';
  horaHasta: string = '';
  mensaje: string= '';
  map: any;

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
        "label": "Seleccionar la ubicación es obligatorio",
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
];
  loading: boolean = false;
  direccion: string = '';
  coords: any;
  marcadores: any;
  dataImg: any = {};
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _fotos: SubirfotosService,
    private _sanitazer: DomSanitizer,
    private _fb: FormBuilder,
    private _post: PostService,
    private _toast: ToastrService,
    private _render: Renderer2
  ) {
    this.postForm= this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
      email:['',Validators.required],
      fono:['',Validators.required],
    });
    this.uuid = this._cookie.get('uid');
    this.registroAnterior = 'prueba de envio';
    this.crearFormulario();

  }

  ngOnInit() {
    
    
    // this.getDataFirebase(); 
    
    this.rool=this._cookie.get('tipo');
    setTimeout(() => {
      this.mapa();
    }, 400);
    this.cargarinfo();
  }
  
  ngAfterContentInit(): void {
    
    
    
    // setTimeout(() => {
    //   this.map.addEventListener("click", (e) =>{
    //     
    //     
        
    //     if(this.marcadores !== undefined){
          
    //       this.map.removeLayer(this.marcadores);
    //       this.marcadores = L.marker([e.latlng.lat, e.latlng.lng], {alt: this.firstFormGroup.get('name').value }).addTo(this.map);
    //       this.coordsBoolean = false;
    //       
    //       
    //       // 
          
          
    //       this.coords = e.latlng;
    //     }else{
    //       this.marcadores = L.marker([e.latlng.lat, e.latlng.lng], {alt: this.firstFormGroup.get('name').value}).addTo(this.map);
    //       this.coords = e.latlng;*
    //       
    //       this.coordsBoolean = false;
    //       // 
    //       
    //       

    //     }

    //     // L.remove();
        
        
    //   });

    //   this.map.addEventListener("move", () =>{
    //     navigator.geolocation.getCurrentPosition((location) =>{
    //       this.map.flyTo([location.coords.latitude, location.coords.longitude], 13);
          
          
    //     })
    //   })
    // }, 800);
    
  }

  siguienteUbicacion(){
    if(this.coords === undefined){
      this.coordsBoolean = true;
    }
    

    
    

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
          
          this.SecondFormGroup.setValue({
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
          this.SecondFormGroup.setValue({
            address: 'Cerca de ' + resp.display_name
          });
          this.loading = false;
        })
      }

      
      
      
    // map.setFog({}); // Set the default atmosphere style
});
    // this.map = L.map('mapa', {center: [latitude, longitude], zoom:12});
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    // attribution: '© OpenStreetMap'
    //   }).addTo(this.map);
      // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //   id: 'mapbox/streets-v11',
      //   accessToken: 'pk.eyJ1IjoidHlzb24yMSIsImEiOiJja28wZWc2eGUwY3J4Mm9udzgxZ2UyczJtIn0.EL9SXrORqd-RVmxedhJdxQ'
      // }).addTo(this.map);
      // this.agregarMarcadores();

      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1500);
  }

  agregarMarcador(){
    let popup:any;
    // const html = `
        
    //     <b><h5><b>${ this.posts.name }</b></h5></b>
    //     <span>${ this.posts.address }</span><br/>
    //     `;
        // let marker = L.marker([this.posts.latlong.latitude, this.posts.latlong.longitude])
        //         .addTo(this.map);
                
        // this.marcadores.push(marker);
                
        // marker.on('click', () => {
        //   popup = L.popup()
        //   .setLatLng([this.posts.latlong.latitude, this.posts.latlong.longitude])
        //   .setContent(html)
        //   .openOn(this.map);
        // });
  }
  
  
 
  getDataFirebase(){
    // 
    
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          
          this.data = f.data();
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
          this.confirmar = f.data()?.confirmacion;
          this.rechazar = f.data().rechazar;
          this.aprobado = f.data().aprobado;
          this.registroAnterior = f.data();
          this.cuentaVerificada=f.data().cuentaVerificada;
          this.idDoc = f.id;
          this.mensaje = f.data().mensaje;
        }
        
      }
    });
  }

  siguientePestania(){
    if(this.firstFormGroup.invalid){
      return Object.values(this.firstFormGroup.controls).forEach(validator => {
        validator.markAsTouched();
      })
    }
    if(this.firstFormGroup.get('cedula').value.length < 11){
      if(this.validaCedula(this.firstFormGroup.get('cedula').value.trim())){
        this._toast.error('La cédula no es valida ya que no es un formato correcto', 'Error en cedula', {
          closeButton: true,
          easeTime: 700,
          easing: 'ease',
          progressAnimation: 'increasing',
          progressBar: true,
          
        });
      }
    }

  }

  onSubmit(){
    // trear la data del usuario
    // iddoc
    
    
    
    // 
    // 
    
    

    if(this.fourthFormGroup.invalid){
      return Object.values( this.fourthFormGroup.controls ).forEach((validator) =>{
        validator.markAsTouched();
      })
    }
    
    
    // if(this.rechazar){
    //   let enviarFirebase = {
    //     name:this.firstFormGroup.get('name').value.trim(),
    //     address:this.firstFormGroup.get('address').value.trim(),
    //     email:this.firstFormGroup.get('email').value.trim(),
    //     fono:this.firstFormGroup.get('fono').value.trim(),
    //     cedula:this.firstFormGroup.get('cedula').value.trim(),
    //     foto: this.urlFotofirebase === '' ? this.data.foto : '',
    //     documento: this.documentoPDF === '' ? this.data.documento: '',
    //     // horas: this.dias,
    //     // horaDesde: this.horaDesde,
    //     // horaHasta: this.horaHasta,
    //     // transporte: this.thirdFormGroup.get('transporte').value,
    //     // aseo: this.thirdFormGroup.get('aseo').value,
    //     // alimentacion: this.thirdFormGroup.get('transporte').value,
    //     // cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
    //     // cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
    //     // cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
    //     // controlesMedicos: this.serviciosMedicos[0].children,
    //     // serviciosAdicionales: this.serviciosAdicionales,
    //     // serviciosatencion: this.serviciosatencion[0].children,
    //     // servicioscomodidad: this.serviciosComodidad[0].children,
    //     // serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
    //     // serviciosSanitarios: this.serviciosSanitarios[0].children,
    //     // mision: this.misionGroup.get('mision').value,
    //     // vision: this.misionGroup.get('vision').value
    //   }
    //   // 
      
    //   this.postService.updatePost(enviarFirebase, this.idDoc)
    //   .then((resp) =>{
        
    //     this.getDataFirebase();

    //     // this._fotos.insertImages(this.FotoSubir);

    //   })
    // }else{

      

        let enviarFirebase = {
          // ...this.firstFormGroup.value.trim(),
          name:this.firstFormGroup.get('name').value.trim(),
          address:this.SecondFormGroup.get('address').value.trim(),
          email:this.firstFormGroup.get('email').value.trim(),
          fono:this.firstFormGroup.get('fono').value.trim(),
          cedula:this.firstFormGroup.get('cedula').value.trim(),
          foto: this.urlFotofirebase,
          documento: this.documentoPDF,
          mensaje: '',
          uid: this.uuid,
          mostrarRegistroAsilo: false,
          rechazar: false,
          confirmacion: true,
          aprobado: false,
          cuentaVerificada:false,
          nomostrarImagen: false,
          correcciones: false,
          ...this.coords
          // horas: this.dias,
          // horaDesde: this.horaDesde,
          // horaHasta: this.horaHasta,
          // transporte: this.thirdFormGroup.get('transporte').value,
          // aseo: this.thirdFormGroup.get('aseo').value,
          // alimentacion: this.thirdFormGroup.get('transporte').value,
          // cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
          // cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
          // cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
          // controlesMedicos: this.serviciosMedicos[0].children,
          // serviciosAdicionales: this.serviciosAdicionales,
          // serviciosatencion: this.serviciosatencion[0].children,
          // servicioscomodidad: this.serviciosComodidad[0].children,
          // serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
          // serviciosSanitarios: this.serviciosSanitarios[0].children,
          // mision: this.misionGroup.get('mision').value,
          // vision: this.misionGroup.get('vision').value
        }
        // 
        
        this.postService.createPosts(enviarFirebase)
        .then((resp) =>{
          
          this.getDataFirebase();
  
          // this._fotos.insertImages(this.FotoSubir);
  
        })
        
    // }
    
    
    
    /* if(!this.firstFormGroup.invalid){
      return;
    } */
    // // this.router.navigate(['/home'])
    // alert("registro realizado\muchas gracias ");
  }


  llenadoFormulario(evento: any){
    
    this.getDataFirebase();
    
  }

/* 
  TODO: falta de hacer algo
*/
  // funciona para una imagen
  cambioImagen(evento: any){
    if(evento.target.files.length > 0){

      
      this.FotoSubir = evento.target.files[0];
      const rul =URL.createObjectURL(evento.target.files[0]);
      this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
      
      this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value.trim())
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
      this._toast.info('La imagen seleccionada ha sido borrada, por favor seleccionar una', 'Subir imagen', {
        closeButton: true,
        easeTime: 4000,
        easing: 'ease',
        progressAnimation: 'decreasing',
        progressBar: true
      })
    }
    
  }


  cambioImagenPdf(evento: any){
    
    this._fotos.insertarPDF(evento.target.files[0])
    .then((respPDF) =>{
      // 
      respPDF.task.then((resp) =>{
        resp.ref.getDownloadURL().then((r) =>{
          

          this.documentoPDF = r;
          
        })
        .catch((err) =>{})
        
      })
      
    })
    .catch((error) =>{
      
      
    })
    
  }

  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{1,254}'), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      fono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{10,13}')]]
    });

    this.SecondFormGroup = this._fb.group({
      address: ['', [Validators.required]]
    });
    this.fourthFormGroup = this._fb.group({
      img: ['', Validators.required],
      doc: ['', Validators.required]
    });

  }

  // funcion para seleccionar todas los dias
  

  
  cargarinfo(){

    this.postService.getPostByUid(this.uuid)
    .subscribe((resp: any) => {
      
      if(resp.empty){
        
        
        this.dataImg = this._auth.insertCorreoAuth().currentUser;
        
      }
      
    });
  }

  modificarRegistro(){
    
  }

  /* validar cedula */

  validaCedula(cedula: string){
    
    
    let cedula_valida = false;
    let total = 0;
    let longitud = cedula.length;
    let longCheck = longitud - 1;
    if(cedula !== "" && longitud === 10){
      // 
      
      for (let index = 0; index < longCheck; index++) {
        if(index%2 === 0){
          let aux = Number.parseInt(cedula.charAt(index)) * 2;
          if(aux > 9) aux = aux - 9;
          total = total + aux;
        }else{
          total = total + Number.parseInt(cedula.charAt(index))
        }
        
      }

      total = total % 10 ? 10 - total % 10 : 0;
      // 
      

      if(Number.parseInt(cedula.charAt(longitud - 1)) === total){
        // 
        
        cedula_valida = false;
      }else{
        // 
        cedula_valida = true;
        
      }
      
    }else if(cedula.length > 10){
      cedula_valida = true;
    }else{
      cedula_valida = true;
    }
    
    
    return cedula_valida;
  }

  verificarCedula(evento: any){
    this.verificarCedulaBool = false;
    if(evento.target.value.trim().length === 10 || evento.target.value.trim().length === 13){
      this._auth.getAllPost()
      .subscribe((resp: any) =>{
        for(let f of resp.docs){
          if(f.data().cedula.trim() === evento.target.value.trim()){
            
            this.verificarCedulaBool = true;
            return;
          }else{
            this.verificarCedulaBool = false;
          }
        }
      })
    }
  }


  /* errores */
  get errorCedula(){
    return this.firstFormGroup.get('cedula').hasError('required') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  get errorCedulaPattern(){
    return this.firstFormGroup.get('cedula').hasError('pattern') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  get errorNombre(){
    return this.firstFormGroup.get('name').hasError('required') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }
  get errorAddress(){
    return this.SecondFormGroup.get('address').hasError('required') && (this.SecondFormGroup.get('address').touched || this.SecondFormGroup.get('address').dirty);
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

  /* error img, documento */
  get errorImg(){
    return this.fourthFormGroup.get('img').hasError('required') && (this.fourthFormGroup.get('img').touched || this.fourthFormGroup.get('img').dirty);
  }
  get errorDoc(){
    return this.fourthFormGroup.get('doc').hasError('required') && (this.fourthFormGroup.get('doc').touched || this.fourthFormGroup.get('doc').dirty);
  }

  get errorNamePattern(){
    return this.firstFormGroup.get('name').hasError('pattern') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
    
  }

  get errorDireccionMax(){
    return this.SecondFormGroup.get('address').hasError('maxlength') && (this.SecondFormGroup.get('address').touched || this.SecondFormGroup.get('address').dirty);
  }
  get errorNombreMax(){
    return this.firstFormGroup.get('name').hasError('maxlength') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }
}
