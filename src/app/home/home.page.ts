import { NavController, ToastController } from '@ionic/angular';
import { PetService } from './../pet.service';
import { Component, NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { PetsCadastradosPage } from '../pets-cadastrados/pets-cadastrados.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};

  pet = {
    nome: '',
    idade: null,
  };
  public  mandanome = this.pet.nome;
  public mandaidade = this.pet.idade;
  LabelBotaoCadastrar = 'CADASTRAR';
  LabelBotaoConsultar = 'CONSULTAR';

 

  constructor(
    public petService: PetService,
    public toast: ToastController,
    public nav: NavController,
  ) {}

  
  async salvandoPet() {
    this.petService.salvarPet(this.pet);
    this.pet.nome = '';
    this.pet.idade = null;
    const toast = await this.toast.create({
      color: 'success',
      message: 'Salvo com sucesso.',
      position: 'bottom',
      duration: 500,
    });
    toast.present();
    // this.nav.navigateForward('pets-cadastrados');
  }

  
  // if( this.mandanome == '' || this.mandaidade == null) {


  //    this.exibeToast('Preencha os campos necessários', 'danger');

  //    }else{

  //     salvandoPet();

  //    }

  consultarPet() {
    const pets = this.petService.getPets();
    this.nav.navigateForward('pets-cadastrados');
  }

  
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
