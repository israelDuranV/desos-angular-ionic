import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild( IonList) lista: IonList;

  constructor(public deseosService: DeseosService,
    private router:Router,
    private alertCtr: AlertController) { }

  ngOnInit() {}
  listaSeleccionada( lista:Lista ){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }
  borrarLista( lista:Lista){
    this.deseosService.borrarLista(lista);
  }
  async editarLista(lista:Lista){
    const alert = await this.alertCtr.create({
      header: 'Editar Lista',
      inputs:[
        {
        name: 'titulo',
        value: lista.titulo,
        type: 'text'
      }
    ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log("cancelar");
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Aceptar',
          handler: (data)=>{
            if(data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
             this.deseosService.guardarStorage();
             this.lista.closeSlidingItems();
          }
        }
      ]
      
    });

    alert.present();
  }
}