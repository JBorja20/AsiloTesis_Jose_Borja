import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../models/post.service';
import { A11y, Autoplay, EffectCube, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
// para neviar correos
import emailjs from '@emailjs/browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/effect-cube';
import 'swiper/scss/autoplay';
import { environment } from 'src/environments/environment';
import mapboxgl from 'mapbox-gl';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  subscriptions: Subscription[] = [];
  sugerenciasForm!:FormGroup;
  enviarSugerencia: boolean = false;
  map: any;
  fotos: any[] = [
    {
      alt: '1',
      path: '../../assets/img/1.jpg' 
    },
    {
      alt: '2',
      path: '../../assets/img/2.jpg' 
    },
    {
      alt: '3',
      path: '../../assets/img/3.jpg' 
    },
    {
      alt: '3',
      path: '../../assets/img/servicios1.jpg' 
    }
  ]
  config: SwiperOptions  = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: {delay:2500},
    fadeEffect: {crossFade: true },
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube]
  };

  posts: any[] = [];
  marcadores: any[] = [];
  fecha = new Date().getFullYear();
  dataAsilo:any = {};
  constructor(
    private _post: PostService,
    private _route: Router,
    private _fb: FormBuilder,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.crearFormulario();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      navigator.permissions.query({name: 'geolocation'})
      .then((permiso) => {
        if(permiso.state == 'granted'){
          navigator.geolocation.getCurrentPosition((location) =>{
            this.mapa(location.coords.latitude, location.coords.longitude);
            this.getPosts();
            this.map.flyTo([location.coords.latitude, location.coords.longitude], 9);
          })
        }else if(permiso.state == 'prompt'){
          navigator.geolocation.getCurrentPosition((location) =>{
            this.mapa(location.coords.latitude, location.coords.longitude);
            
            this.getPosts();
            this.map.flyTo([location.coords.latitude, location.coords.longitude], 9);
            
          })
        }else{
          this.mapa();
          this.getPosts();
          // this.map.flyTo([location.coords.latitude, location.coords.longitude], 9);
          this.mensajeToast('No tenemos permiso para acceder a la ubicación, si desea tener una mayor precisión debe activar los permisos en la configuraciones del navegador', 'Permisos de ubicación')
        }
      })
      .catch((error) =>{
        this.mensajeToast('No tiene activado la ubicación', 'Permisos de ubicación');
      })
    }, 600);

    setTimeout(() => {
      for(let i = 0; i < this.posts?.length; i++){
        this.agregarMarcador(this.posts[i]);
      }
    }, 1000);
  }

  getPosts(){
    this.subscriptions.push(

      this._post.getPostIdLimit()
      .subscribe((resp: any) =>{
        this.posts = [];
        for(let f of resp.docs){
          if(f.data().tipo != ' admin' && f.data().aprobado){
            this.posts.push(f.data());
            
          }
        } 
      })
    );
  }

  mensajeToast(message: string, title: string){
    this._toastr.warning(message, title,{
      closeButton: true,
      easeTime: 1000,
      easing: 'ease-in',
      progressAnimation: 'increasing',
      progressBar: true
    })
  }

  abrirDialog(uid: any){
    this._route.navigateByUrl(`/info-asilo/${uid}`);
  }

  crearFormulario(){
    this.sugerenciasForm = this._fb.group({
      from_name: ['', [Validators.required]],
      reply_to: ['', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      message: ['', [Validators.required]]
    })
  }

  enviarSugerenciaCorreo(){

    if(this.sugerenciasForm.invalid){
      return Object.values( this.sugerenciasForm.controls ).forEach((validator) => {
        validator.markAllAsTouched()
      });
    }
    let templateParams = {
      ...this.sugerenciasForm.getRawValue(),
      to_name: 'Jose borja'
    }
    this.enviarSugerencia = true;
    

    emailjs.send(environment.serviceID, environment.templateID, templateParams, environment.publicKey)
    .then((resp) =>{
      
      this.enviarSugerencia = false;
      this.sugerenciasForm.reset();
    })
    .catch((err) =>{
      
      
    })
    
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
    
    }).addControl(new mapboxgl.NavigationControl());
    
  }

  agregarMarcador(dataAsilo: any){
    // let popup:any;
    if(dataAsilo?.lng && dataAsilo?.lat){
      const html = `
        
        <b><h5><b>${ dataAsilo.name }</b></h5></b>
        <span>${ dataAsilo.address }</span><br/>
        `;
        let marker = new mapboxgl.Marker().setLngLat([dataAsilo.lng, dataAsilo.lat]).setPopup(new mapboxgl.Popup().setHTML(html)).addTo(this.map);
        // marker.togglePopup();
        this.marcadores.push(marker);
    }
                
        // marker.on('click', () => {
        //   popup = L.popup()
        //   .setLatLng([dataAsilo.lat, dataAsilo.lng])
        //   .setContent(html)
        //   .openOn(this.map);
        // });
  }
  /* errores */
  get nombreError(){
    return this.sugerenciasForm.get('from_name').hasError('required') && (this.sugerenciasForm.get('from_name').touched || this.sugerenciasForm.get('from_name').dirty);
  }
  get correoError(){
    return this.sugerenciasForm.get('reply_to').hasError('required') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }
  get correoErrorPattern(){
    return this.sugerenciasForm.get('reply_to').hasError('pattern') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }
  get mensajeError(){
    return this.sugerenciasForm.get('message').hasError('required') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((eliminar) =>{
      eliminar.unsubscribe();
    });
    this.marcadores = [];
    this.map.remove();
  }

}

