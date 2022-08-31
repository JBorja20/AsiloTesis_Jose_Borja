import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import * as moment from 'moment';

import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";



interface medicosServicios{
  name: string,
  value?:any,
  children?:medicosServicios[]
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {
  //vnetos generales
  selectedDay: string = '';
  selectedDa: string = '';
  selectedDays: string = '';
  sumaseccionHijos: number= 0;
  treeControl  = new NestedTreeControl<medicosServicios>(node => node.children);
  dataSource = new MatTreeNestedDataSource<medicosServicios>();
  treeControlAdi  = new NestedTreeControl<medicosServicios>(node => node.children);
  dataSourceAdi = new MatTreeNestedDataSource<medicosServicios>();

  fecha: any = moment().format('DD-MM-YYYY');

  ubicacionObj: any = {};
  tipoHabitacionObj: any = {};
  amobladoObj: any = {};
  cuidadoFisicoObj : any  = {};
  cuidadoCogObj: any = {};
  sumaTotalServMedicos: number = 0;
  sumaTotalServAdicionales: number = 0;

  sumaTotalProforma: number = 0;

  tipoHabitacionBool: boolean = false;
  ubicacionBool: boolean = false;
  amobladoBool: boolean = false;
  cuidadoFisicoBool: boolean = false;
  cambioCognitivoBool: boolean = false;
  numhijos:number=0;
  numhijosObj:number=0;

  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;

  suma:number=0;

  sumaTotalSteps: any = {};
                    
  serviciosMedicos: medicosServicios[] = [
    {
      name: 'Servicios Médicos',
      children: [
        {name:'Asistencia médica',value:20}, 
        {name:'Grupo de apoyo familiar',value:30}, 
        {name: 'Terapias Musculares',value:25}, 
        {name: 'Estimulación cognitiva',value:35}, 
        {name: 'Rehabilitación y fisioterapia',value:35}, 
        {name: 'Peluquería y estética',value:25}, 
        {name: 'Limpieza y lavandería',value:35}, 
        {name: 'Comida  y transporte',value:30}, 
        {name: 'Sala de estar',value:15}, 
      ]
    }
                              
]
  servicioMedAux:any[] = [];
  //
  serviciosAdicionales: medicosServicios[] = [
    {
      name:' Servicios adicionales',
      children: [
        
        {name:'Peluquería',value:8},  
        {name:'Entrega de Medicamentos',value:7},  
        {name:'Acompañamiento a Citas Médicas',value:20},  
        {name:'Dieta Especial',value:30},  
        {name:'Cama Hospitalaria',value:50},  
      ]
    }
                                ]
  
  servicioAdiAux:any[] = [];

  tipoHabitacion: any[] = [
    {tipo: 'Individual', value:350 },
    {tipo: 'Compartida', value: 325},
    {tipo: 'Individual con baño privado', value: 375}
  ]
  cuidadoFisico: any[] = [
    {tipo: 'Es independiente', value:0 },
    {tipo: 'Se le Dificulta', value: 25},
    {tipo: 'Acompañamiento Permanente', value: 50}
  ];

  cuidadoCog: any[] = [
    { cuidado: 'Capacidad Mental Plena', value: 0},
    { cuidado: 'Deterioro Mental Moderado', value: 25},
    { cuidado: 'Demencia Severa', value: 50}
  ];

  amoblado: any[] = [
    { amoblado: 'Sí', value: 30 },
    { amoblado: 'No', value: 0 }
  ]
  
  ubicaciones: any[] = [
    { ubi: 'Norte', value: 50 },
    { ubi: 'Sur', value: 25 },
    { ubi: 'Valle', value: 100 },
    { ubi: 'Centro', value: 75 }
  ]
  
  
    //eventos imput


  habitacion: string = '';
  fisico: string = '';
  servicio: string[] = [];
  cognitivo: string = '';
  medico: string = '';

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  

  

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      selectUbi: ['', Validators.required],
      habitaciones: ['', Validators.required]
    });

    this.SecondFormGroup = this._fb.group({
      amobladoType: ['', Validators.required],
      cuidadoFisicoForm: ['', Validators.required]
    });
    this.thirdFormGroup = this._fb.group({
      servMed: ['', Validators.required],
      servCogni: ['', Validators.required]
    });

    this.FourthFormGroup = this._fb.group({
      servAdicionales: ['', Validators.required],
      hijos: ['', Validators.required]
    });
  }


  //eventos generales
  selectChangeHandler (event: any) {
    //update the ui
    
    this.ubicacionBool = true;
    
    this.ubicacionObj = this.ubicaciones.find((v, index) => {
      if(index == parseInt(event.value)){
        return v;
      }
      
    });
    
    
    
    
    // this.selectedDay = event.target.value;
  }
  selectChangeHandle (event: any) {
    //update the ui
    this.amobladoBool = true;
    this.selectedDa = event.target.value;
    this.amobladoObj = this.amoblado.find((v, index) => index == parseInt(event.target.value) && v);
    // (condicion) ? valor_verdadero : valor_false`
    if(this.selectedDa == '0'){
      this.sumaTotalProforma += this.amobladoObj.value;
    }else{
      this.sumaTotalProforma -= 30;
      // this.sumaTotalProforma -=this.amobladoObj.value;
    }
  }
  selectChangeHandlr (event: any) {
    //update the ui
    this.selectedDays = event.target.value;
  }

  inputTipoHabitacion(){
    // 
    this.tipoHabitacionBool = true;
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index==parseInt(this.habitacion) && v);
    if(this.ubicacionBool && this.amobladoBool && this.cuidadoFisicoBool){
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma = this.tipoHabitacionObj.value + this.ubicacionObj.value + this.amobladoObj.value + this.cuidadoFisicoObj.value;
    }else{
      // this.sumaTotalProforma = 0;
      this.sumaTotalProforma += this.tipoHabitacionObj.value;
    }
  }
  //eventos del imput
  // funciona paraobtener el valor de los ervicios medicos
  serviciosmedicos(evento :any){
    
    
    
    
    
    if(evento.checked){
      let findObj = this.serviciosMedicos.map((valor)=>{
        return valor.children.find((v) =>{
          return (v.name === evento.source.value) && v
        })
      })
      
      
      this.servicioMedAux.push(...findObj);

    }else{
      // let findObj = this.serviciosMedicos.find((v, index) => v === evento.source.value && v)
      let index = this.servicioMedAux.findIndex((v, index) => v.name == evento.source.value);
      this.servicioMedAux.splice(index, 1);
    }

    
    

    let servicios: medicosServicios[] = [
      {
        name: 'Servicios Medicos ' + '('+ this.servicioMedAux.length +')',
        children: this.servicioMedAux
      }
    ];
    this.dataSource.data = servicios;
    this.sumaTotalServMedicos = 0; 
    for(let i=0; i<this.servicioMedAux.length; i++){
      this.sumaTotalServMedicos += this.servicioMedAux[i].value;
    }

    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaServiciosMedicos: this.sumaTotalServMedicos
    }
    
    /* this.serviciosMedicos.forEach((v, index) => {
      
      
      
    }); */
    /* if(evento.target.checked){
      // 
      
      this.servicioMedAux.push(this.serviciosMedicos.find((v, index) => index===parseInt(evento.target.value) && v));
      
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos += this.servicioMedAux[i].value;
      }
    }else{
      
      let findObj = this.serviciosMedicos.find((v, index) => index === parseInt(evento.target.value) && v)
      let index = this.servicioMedAux.findIndex((v, index) => v == findObj);
      
      
      this.servicioMedAux.splice(index, 1);
      this.sumaTotalServMedicos = 0;
      for(let i = 0; i < this.servicioMedAux.length; i++){
        this.sumaTotalServMedicos -= this.servicioMedAux[i].value;
      }
      
      
      this.sumaTotalProforma +=this.sumaTotalServMedicos;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }
  serviciosadicionales(evento :any){
    
    
    if(evento.checked){
      let findObj = this.serviciosAdicionales.map((valor)=>{
        return valor.children.find((v) =>{
          return (v.name === evento.source.value) && v
        })
      })
      
      
      this.servicioAdiAux.push(...findObj);

    }else{
      // let findObj = this.serviciosMedicos.find((v, index) => v === evento.source.value && v)
      let index = this.servicioAdiAux.findIndex((v, index) => v.name == evento.source.value);
      this.servicioAdiAux.splice(index, 1);
    }
    this.sumaTotalServAdicionales = 0;
    for(let i=0; i<this.servicioAdiAux.length; i++){
      this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
    }


    let adicionales: medicosServicios[] = [
      {
        name: 'Servicios adicionales ' + '('+ this.servicioAdiAux.length +')',
        children: this.servicioAdiAux
      }
    ];

    this.dataSourceAdi.data= adicionales;

    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaAdicional: this.sumaTotalServAdicionales
    }

    /* this.serviciosMedicos.forEach((v, index) => {
      
      
      
    }); */
    /* if(evento.checked){
      // 
      this.servicioAdiAux.push(this.serviciosAdicionales.find((v,index) => v===evento.source.value.value && v));
      
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
      }
    }else{
      
      let findObj = this.serviciosAdicionales.find((v, index) => v === (evento.source.value.value) && v)
      let index = this.servicioAdiAux.findIndex(v => v == findObj);
      this.servicioAdiAux.splice(index, 1);
      this.sumaTotalServAdicionales = 0;
      for(let i = 0; i < this.servicioAdiAux.length; i++){
        this.sumaTotalServAdicionales -= this.servicioAdiAux[i].value;
      }
      
      this.sumaTotalProforma += this.sumaTotalServAdicionales;
      
    }

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    } */
    
    
  }

  cuidadoFisicofunction(){
    this.cuidadoFisicoBool=true;
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index=== parseInt(this.fisico) && v);

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool ) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=   this.cuidadoFisicoObj.value +this.tipoHabitacionObj.value + this.amobladoObj.value + this.ubicacionObj.value;
      
    } else {
      this.sumaTotalProforma += this.cuidadoFisicoObj.value;

    }
  }

  cambioCognitivo(){
    this.cambioCognitivoBool=true;
    this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index=== parseInt(this.cognitivo) && v);
    

    if (this.ubicacionBool  && this.tipoHabitacionBool && this.amobladoBool  && this.cuidadoFisicoBool) {
      this.sumaTotalProforma = 0;
      this.sumaTotalProforma=this.cuidadoCogObj.value +this.tipoHabitacionObj.value+this.amobladoObj.value+ this.ubicacionObj.value+this.cuidadoFisicoObj.value;
      
    } else {
      this.sumaTotalProforma +=this.cuidadoCogObj.value;
  }
  }

  calcular(){
    
    let sumaTotalMedicos: number = 0;
    let sumaTotalAdi: number = 0;
    let sumaAuxMed: number = 0;
    let sumaAuxAdi: number = 0;
     this.ubicacionObj = this.ubicaciones.find((v, index) => (index === this.firstFormGroup.value.selectUbi) && v);
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index === this.firstFormGroup.value.habitaciones && v);
    this.amobladoObj = this.amoblado.find((v, index) => index === this.SecondFormGroup.value.amobladoType && v);
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index === this.SecondFormGroup.value.cuidadoFisicoForm && v);
     this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index === this.thirdFormGroup.value.servCogni && v);
    
    
    this.sumaTotalServMedicos = 0;
    this.sumaTotalServAdicionales = 0;
    for(let i=0; i<this.servicioMedAux.length; i++){
      this.sumaTotalServMedicos += this.servicioMedAux[i].value;
    }
    for(let i=0; i<this.servicioAdiAux.length; i++){
      this.sumaTotalServAdicionales += this.servicioAdiAux[i].value;
    }

    this.suma = this.ubicacionObj.value + this.tipoHabitacionObj.value + this.amobladoObj.value +this.cuidadoFisicoObj.value + this.cuidadoCogObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;

    
    

    
    let servicios: medicosServicios[] = [
      {
        name: 'Servicios Medicos ' + '('+ this.servicioMedAux.length +')',
        children: this.servicioMedAux
      }
    ];
    let adicionales: medicosServicios[] = [
      {
        name: 'Servicios adicionales ' + '('+ this.servicioAdiAux.length +')',
        children: this.servicioAdiAux
      }
    ];
    
    
    
    this.numhijos   =this.FourthFormGroup.get('hijos').value;
    
    
    this.dataSource.data = servicios;
    this.dataSourceAdi.data= adicionales;
    
 
    
    
    
    
    
    
    
    
  }
  hasChild = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildAdi = (_: number, node: medicosServicios) => node.children && node.children.length > 0;

  cambioStep(step: any){
    
    
    if((step.steps.length -1) === 4 && this.FourthFormGroup.get('hijos')?.value){
      this.calcular();
    }
    
  }

  async descargar(){
    
    
    // return;
    
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Proforma'
    
    });
    pdf.info({
 
      title: 'Casa Esperanza'
    });
    pdf.add(new  Txt('\n').end);
    
    pdf.add((await new Img('../../../assets/img/logo.png').relativePosition(350, 60).height('40').width('40').build()));

    pdf.add(new Table([
      [
        {
          text: 'Proforma', bold: true, fontSize: 20
        },
        ''
      ]
    ]).layout('noBorders').alignment('center').fontSize(10).widths(['50%', '50%']).margin([15,25,100,-35]).end);
    pdf.add(new  Txt('\n\n\n\n\n\n\n').end);

    pdf.add( new Table([
      [
        {
          text: 'Datos', bold: true, fillColor: '#1d1d24', color: '#fff'
        },
      ]
    ]).layout('noBorders').alignment('center').fontSize(12).widths(['100%']).end);

    pdf.add(new Table([
      [
        {
          text: 'Nombre ', bold: true
        },
        'Casa Esperanza',
        {
          text: 'Fecha', bold: true
        },
        `${ this.fecha }`
      ]
    ]).layout('noBorders').fontSize(11).widths(['25%', '25%', '20%', '25%']).end)
    pdf.add(new Table([
      [
        {
          text: 'Provincia', bold: true
        },
        'Pichincha',
        {
          text: 'Cuidad', bold: true
        },
        'Quito'
      ]
    ]).layout('noBorders').fontSize(11).widths(['25%', '25%', '20%', '25%']).end)
    pdf.add(new Table([
      [
        {
          text: 'Cédula', bold: true
        },
        '1726749056',
        {
          text: 'Correo', bold: true
        },
        {
          text: 'casaesperanza@gmail.com'
        }
      ]
    ]).layout('noBorders').fontSize(11).widths(['25%', '25%', '20%', '30%']).end);
    pdf.add(new  Txt('\n\n\n\n\n').end);
    pdf.add(new Table([
      [
        {
          text: 'Detalles de la proforma', bold: true, fillColor: '#1d1d24', color: '#fff'
        }
      ]
    ]).layout('noBorders').widths(['100%']).alignment('center').end);

    pdf.add(new Table([
      [
        {
          text: 'Descripcion', bold: true, fillColor: '#1d1d24', color: '#fff'
        },
        {
          text: 'Valor', bold: true, fillColor: '#1d1d24', color: '#fff'
        }
      ]
    ]).layout('noBorders').widths(['50%', '50%']).alignment('center').end);
    pdf.add(new Table([
      [
        {
          text: `Tipo de Habitacion - ${ this.tipoHabitacionObj.tipo }`, 
        },
        {
          text: '$ ' + this.tipoHabitacionObj.value,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    pdf.add(new Table([
      [
        {
          text: `Zona/Ubicacion - ${ this.ubicacionObj.ubi }`, 
        },
        {
          text: '$ ' + this.ubicacionObj.value,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    pdf.add(new Table([
      [
        {
          text: `Amoblado - ${ this.amobladoObj.amoblado }`, 
        },
        {
          text: '$ ' + this.amobladoObj.value,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);

    pdf.add(new Table([
      [
        {
          text: `Cuidado fisico - ${ this.cuidadoFisicoObj.tipo }`, 
        },
        {
          text: '$ ' + this.cuidadoFisicoObj.value,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    pdf.add(new Table([
      [
        {
          text: `Cuidado cognitivo - ${ this.cuidadoCogObj.cuidado }`, 
        },
        {
          text: '$ ' + this.cuidadoCogObj.value,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);

    pdf.add(new Table([
      [
        {
          text: `Servicios Medicos - ${ this.servicioMedAux.length }`, 
        },
        {
          text: '$ ' + this.sumaTotalServMedicos,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    for(let i =0; i < this.servicioMedAux.length; i++){
      
      pdf.add(new Table([
        [
          {
            text: `${ this.servicioMedAux[i].name }`, 
          },
          {
            text: '$ ' + this.servicioMedAux[i].value,
          }
        ]
      ]).layout('noBorders').widths(['70%', '30%']).end);
    }
    pdf.add(new Table([
      [
        {
          text: `Servicios Adicionales - ${ this.servicioAdiAux.length }`, 
        },
        {
          text: '$ ' + this.sumaTotalServAdicionales,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    for(let i=0; i < this.servicioAdiAux.length; i++){
      
      pdf.add(new Table([
        [
          {
            text: `${ this.servicioAdiAux[i].name }`, 
          },
          {
            text: `$ ${this.servicioAdiAux[i].value} `,
          }
        ]
      ]).layout('noBorders').widths(['70%', '30%']).end);
    }
    
    pdf.add(new Txt('\n\n\n').end);
    pdf.add(new Table([
      [
        {
          text: 'Total', 
        },
        {
          text: '$ ' + this.suma,
        }
      ]
    ]).layout('lightHorizontalLines').widths(['70%', '30%']).layout({hLineWidth: (i,n, c) => (i==0 || c==0) ? 1: 0, vLineWidth: i=> 0 }).end);
    pdf.add(new Table([
      [
        {
          text: 'Valor total por hijo', 
        },
        {
          text: '$ ' + this.suma/this.numhijos,
        }
      ]
    ]).layout('noBorders').widths(['70%', '30%']).end);
    pdf.add(new Table([
      [
        {
          text: '', 
        }
      ]
    ]).layout('noBorders').widths(['100%']).layout({hLineWidth: (i,n, c) => (i==0 || c==0) ? 1: 0, vLineWidth: i=> 0 }).end);

    pdf.add(new Txt('\n\n').end);

    pdf.add((await new Img('../../../assets/img/firma.png').relativePosition(350, 50).height('80').width('60').build()));


    pdf.add(new Table([
      [{text: 'nombre del sitio', bold: true, alignment: 'center'}]
    ]).fontSize(11).widths(['40%']).relativePosition(300, 50).alignment('center').layout({hLineWidth: (i,n, c) => (i==0 || c==0) ? 1: 0, vLineWidth: i=> 0 }).end);
  

    pdf.add(new Txt('\n\n\n\n').end);
    
    pdf.add(new Table([
      [{text: 'Condiciones y formas de pago', bold: true, alignment: 'center'}]
    ]).fontSize(11).widths(['40%']).relativePosition(0, 50).alignment('center').layout('noBorders').end);
    pdf.add(new Txt('\n').end);

    pdf.add(new Table([
      [{text: 'El pago se realiza al instante de realizar el convenio con el asilo.  Este documento no tiene valor tributario.', bold: true, alignment: 'center'}]
    ]).fontSize(11).widths(['40%']).relativePosition(0, 50).alignment('center').layout('noBorders').end);
    

    pdf.create().open();
    
  }

  reset(stepper: any){
    stepper.reset();
    this.ubicacionObj = {};
    this.amobladoObj = {};
    this.cuidadoCogObj = {};
    this.numhijosObj = 0;
    this.tipoHabitacionObj = {};
    this.cuidadoFisicoObj = {};
    this.sumaTotalServAdicionales = 0;
    this.sumaTotalServMedicos = 0;
    this.dataSource.data = [{name: 'Servicios Medicos'}];
    this.dataSourceAdi.data = [{name:"Servicios adicionales"}]
    this.servicioMedAux = [];
    this.servicioAdiAux = [];
    // this.servicioAdiAux.push([]);

  }

  cambiarUbicacion(evento : any){
    
    
    
    this.ubicacionObj = this.ubicaciones.find((v, index) => (index === this.firstFormGroup.value.selectUbi) && v);

    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaUbicacion: this.ubicacionObj.value
    }
  }

  cambiarHabitacion(){
    this.tipoHabitacionObj = this.tipoHabitacion.find((v, index) => index === this.firstFormGroup.value.habitaciones && v);
    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaHabitacion: this.tipoHabitacionObj.value
    }
  }
  cambiarAmobalda(){
    this.amobladoObj = this.amoblado.find((v, index) => index === this.SecondFormGroup.value.amobladoType && v);
    
    
    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaAmoblado: this.amobladoObj.value
    }
    
  }
  cambiarCuidado(){
    this.cuidadoFisicoObj = this.cuidadoFisico.find((v, index) => index === this.SecondFormGroup.value.cuidadoFisicoForm && v);

    
    
    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaCuidadoFisico: this.cuidadoFisicoObj.value
    }
  }

  cambiarCongnitivo(){
    this.cuidadoCogObj = this.cuidadoCog.find((v, index) => index === this.thirdFormGroup.value.servCogni && v);
    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      sumaCognitivo: this.cuidadoCogObj.value
    }
  }

  sumaTotalHijos(){
    // this.suma = this.ubicacionObj.value + this.tipoHabitacionObj.value + this.amobladoObj.value +this.cuidadoFisicoObj.value + this.cuidadoCogObj.value + this.sumaTotalServMedicos + this.sumaTotalServAdicionales;
    // this.sumaseccionHijos = this.suma / parseInt(this.FourthFormGroup.get('hijos').value);
    this.sumaTotalSteps = {
      ...this.sumaTotalSteps,
      hijos: Number.parseInt(this.FourthFormGroup.get('hijos').value)
    }
  }

}
