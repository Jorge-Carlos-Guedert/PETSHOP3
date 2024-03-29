import { Pet } from './../models/pet.models';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { NgModule } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pets-cadastrados',
  templateUrl: './pets-cadastrados.page.html',
  styleUrls: ['./pets-cadastrados.page.scss'],
})
export class PetsCadastradosPage implements OnInit {
  //petsubject = new Subject<Pet[]>();
  //imagem = [];  descomntar 
  imagem = "http://wallpapercave.com/wp/wp12146395.jpg";
  petList: any= {};
  nomeApresentar='';
  idadeApresentar ='' ;

  constructor(
    public alerta: AlertController,
    public nav: NavController,
    public petService: PetService
  ) {}

  novo() {
    this.nav.navigateRoot('/');
  }

  ngOnInit(): void {
    this.petList = this.petService.getPets();
    if (!this.petList) {
      return;
    } 
  }

  
    
  //   var petListLenght = this.petList.length;

  //   var apiCalls = petListLenght / 50;

  //   var restApiCalls = petListLenght % 50;

  //   for (let i = 0; i < apiCalls; i++) {
  //     var qtimages = 50;
  //     if ((i + 1) / apiCalls >= 1) qtimages = 50;
  //     else {
  //       qtimages = (apiCalls - i) * 50;
  //     }
  //     this.x(qtimages, 0, 6);
  //   }
  // }
  // // y() {
  // //   return this.petsubject.asObservable();
  // // }

  // x(qtimages: number, init: number, end: number) {
  //   this.petService.buscarImagem(qtimages).subscribe((resp: any) => {
  //     for (let i = init; i < end; i++) {
  //       this.petList[i].imagem = resp.message[i];
  //     }
  //     //this.petsubject.next(petList);
  //   });
  // }

  ionViewDidEnter() {
    this.carregados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO!',
      message: 'Nenhum Pet cadastrado, cadastre um novo!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            localStorage.clear();
            this.nav.navigateBack('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  apresentarPets(){
    this.petList = this.petService.getPets();
    if (!this.petList) {
      return;
    } else {

      this.petList = this.petService.listarPet();
      
    }

  }

  deletarPet(nome: string){
    this.petService.deletar(nome);
    this.carregados();
  }

  carregados(){
    if(this.petService.listarPet()){
      this.petList = this.petService.listarPet()!;

      if (this.petList.length == 0){
        this.voltar();
      }
    }
  }









}
