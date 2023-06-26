import { Pet } from './../models/pet.models';
import { PreloadAllModules } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PetService } from './../pet.service';
import { Component, NgModule } from '@angular/core';

import { PetsCadastradosPage } from '../pets-cadastrados/pets-cadastrados.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};

  pet: Pet = {
    nome: '',
    idade: null,
  };

  LabelBotaoCadastrar = 'CADASTRAR';
  LabelBotaoConsultar = 'CONSULTAR';

 

  constructor(
    public petService: PetService,
    public toast: ToastController,
    public nav: NavController,
    // public input: NgModel,
    // public ngModule: NgModule
  ) {}

  botaoCadastrar(evento: any) {
    const clicado = evento.detail.value;
   
  }

  submitForm(e: Event){
    console.log(this.idade, this.nome);
  }

  async salvandoPet() {
    this.petService.salvarPet(this.pet);
    this.pet.nome = '';
    this.pet.idade = null;
    const toast = await this.toast.create({
      color: 'success',
      message: 'Salvo com sucesso.',
      position: 'middle',
      duration: 1000,
    });
    toast.present();
    this.nav.navigateForward('pets-cadastrados');
  }

    nome = document.getElementById("nome");
    nomeweb = localStorage.getItem.name;
    idade = document.getElementById("idade");
    idadeweb = localStorage.getItem.name;
  
    

  // if(this.pet.nome == '' || this.pet.idade == null) {
  //   this.exibeToast('Preencha os campos necessários', 'danger');
  //   }else{

  //   }

  consultarPet() {
    const pets = this.petService.getPets();
    console.log(pets);
    this.nav.navigateForward('pets-cadastrados');
  }

  // ionViewDidEnter() {
  //   this.petService.limparPets();
  // }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1500,
      position: 'top',
      animated: true,
      color: cor,
    });
  }

  
  
}
