import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageasiloComponent } from 'src/app/auth/messages/messageasilo/messageasilo.component';
import { PostService } from 'src/app/models/post.service';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dialogasilos',
  templateUrl: './dialogasilos.component.html',
  styleUrls: ['./dialogasilos.component.scss']
})
export class DialogasilosComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('asilomessage') asilomensajes: MessageasiloComponent;
  @ViewChild('mapa') mapElement: ElementRef;
 

  didEnterBeforeUnload = false;
  posts: any = {};
  uid: string= '';
  fecha = new Date().getFullYear();
  serviciosMedicos: boolean = false;
  serviciosSanitarios: boolean = false;
  serviciosAtencion: boolean = false;
  serviciosTerapeuticos: boolean = false;
  serviciosAdicionales: boolean = false;
  serviciosInstalaciones: boolean = false;
  mostrarBox: boolean = false;
  marcadores: any[]= [];
  invitado: boolean = false;
  // serviciosMedicos: boolean = false;
  optionsMapa: any;
  infoWindow: any;
  idDocumento: string = '';
  map:any;
  constructor(
    private _post: PostService,
    private _activated: ActivatedRoute,
    private _router: Router,
    
  ) { 
    this.uid = this._activated.snapshot.paramMap.get('uid');
    
  }

  ngOnInit(): void {
      
      
    this.getPosts();
    
    if(this.invitado){

      window.addEventListener('beforeunload', (e) => {
        const confirmationMessage="o/";
    
        (e || window.event).returnValue = confirmationMessage;    // Gecko + IE
        return confirmationMessage;                                // Webkit, Safari, Chrome etc.
      });
      
      window.addEventListener('unload', () => {
        // await firebase.default.auth().currentUser?.delete();
        this.ngOnDestroy();
        
        
        
      });
    }

    
    
    
  }

  invitadoFun(evento: any){
    this.invitado = evento;
  }
  idDocFun(evento: any){
    this.idDocumento = evento;
  }

  

  ngAfterContentInit(): void {
    
  }

  getPosts(){
    this._post.getPostByUid(this.uid)
    .subscribe((resp: any) =>{
      
      this.posts = [];
      for(let f of resp.docs){
        
        this.posts = f.data();
        this.mapa(f.data().lat, f.data().lng);
        // this.agregarMarcador();
        const html = `
        
        <b><h5><b>${ f.data().name }</b></h5></b>
        <span>${ f.data().address }</span><br/>
        `;
        let marker = new mapboxgl.Marker().setLngLat([f.data().lng, f.data().lat]).setPopup(new mapboxgl.Popup().setHTML(html)).addTo(this.map);
        marker.togglePopup();
        // marker.togglePopup();
        
      }
      
      
    })
  }

 

  navegarSeccion(fragment: string){
    // this._router.navigateByUrl(`info-asilo/${ this.uid }#` + fragment);
    window.location.replace(`info-asilo/${ this.uid }#` + fragment);
  }

  mapa(latitude: number, longitude: number){
    // await loading.present();\
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

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(this.map);
    // this.map = L.map('mapa', {center: [latitude, longitude], zoom:12});
    //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: 'mapbox/streets-v11',
    //     accessToken: 'pk.eyJ1IjoidHlzb24yMSIsImEiOiJja28wZWc2eGUwY3J4Mm9udzgxZ2UyczJtIn0.EL9SXrORqd-RVmxedhJdxQ'
    //   }).addTo(this.map);
      // this.agregarMarcadores();

      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1500);
  }

 


  get serviciosMedicosFunc(){
    return this.posts?.controlesMedicos && this.posts?.controlesMedicos[0].children.some((valor) => valor.value === true);
  }

  get serviciosSanitariosFunc(){
    return this.posts?.servicioSanitarios && this.posts?.servicioSanitarios[this.posts?.servicioSanitarios.length - 1].children.some((valor) => valor.value === true);
  }
  get serviciosAtencionFunc(){
    return this.posts?.serviciosAtencion && this.posts?.serviciosAtencion[0].children.some((valor) => valor.value === true);
  }
  get serviciosTerapeuticosFunc(){
    return this.posts?.servisioTerapeuticos && this.posts?.servisioTerapeuticos[0].children.some((valor) => valor.value === true);
  }
  get serviciosAdicionalesFunc(){
    return this.posts?.serviciosAdicionales && (this.posts?.serviciosAdicionales.some((valor) => valor.value === true) && (this.posts.alimentacion === 'Si' || this.posts.aseo === 'si' || this.posts.transporte !== 'No'));
  }
  get serviciosComodidadFunc(){
    return this.posts?.serviciosComodidad && this.posts?.serviciosComodidad[0].children.some((valor) => valor.value === true);
  }

  get HorariosDias(){
    return this.posts?.horas?.diasSemana && this.posts.horas.diasSemana.every((dias) => dias.completed === true) ;
  }

  ngOnDestroy(): void {
    // confirm('algo por confirmar');
    this.asilomensajes.ngOnDestroy();
  }
  

}
