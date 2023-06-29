import { NavController, ToastController } from '@ionic/angular';
import { PetService } from './../pet.service';
import { Component, NgModule } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { PetsCadastradosPage } from '../pets-cadastrados/pets-cadastrados.page';
import { Pet } from '../models/pet.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public url = 'https://dog.ceo/api/breeds/image/random';
  
  public result: any = {};
  dados: any = {};

  pet: Pet = {
    nome: '',
    idade: null,
    imagem: '',
  };
  // public  mandanome = this.pet.nome;
  // public mandaidade = this.pet.idade;
  LabelBotaoCadastrar = 'CADASTRAR';
  LabelBotaoConsultar = 'CONSULTAR';
  imagem = '';

  constructor(
    public petService: PetService,
    public toast: ToastController,
    public nav: NavController,
    private http: HttpClient
  ) {}

    async ngOnInit(){
   this.imagem = await  this.petService.gerar();
    }
  

  async salvandoPet() {
    if (this.pet.nome == '' || this.pet.idade == null) {
      // localStorage.setItem(this.petService.key, JSON.stringify(this.petService));
      
      this.exibeToast('Preencha os campos necesssários.', 'danger');
    } else {
      this.petService.salvarPet(this.pet.nome, this.pet.idade);
      this.pet.nome = '';
      this.pet.idade = null;
      this.pet.imagem = '';

      this.exibeToast('Cadastrado com sucesso', 'success');
    }

    this.nav.navigateForward('pets-cadastrados');
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
      duration: 1000,
      position: 'middle',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
