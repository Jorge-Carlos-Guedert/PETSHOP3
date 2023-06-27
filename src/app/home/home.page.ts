import { NavController, ToastController } from '@ionic/angular';
import { PetService } from './../pet.service';
import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
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
  // public imagem = '';
  public result:any = {};
  dados: any = {};

  pet: Pet = {
    nome: '',
    idade: null,
    imagem:'',
    
  };
  // public  mandanome = this.pet.nome;
  // public mandaidade = this.pet.idade;
  LabelBotaoCadastrar = 'CADASTRAR';
  LabelBotaoConsultar = 'CONSULTAR';

 

  constructor(
    public petService: PetService,
    public toast: ToastController,
    public nav: NavController,
    private http: HttpClient
  ) {}
  
  gerar() {
    this.consultaApi().subscribe(
      (resp) => {
        this.result = resp;
        this.pet.imagem = this.result.message;
      },
      (error) => {}
    );
  }

  consultaApi() {
    return this.http.get(this.url);
    console.log(this.http);
  }
  
  async salvandoPet() {
    
        this.petService.salvarPet(this.pet);
    this.pet.nome = '';
    this.pet.idade = null;
    this.pet.imagem = '';
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
