import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { PetsCadastradosPage } from '../pets-cadastrados/pets-cadastrados.page';
import { PetsCadastradosPageRoutingModule } from '../pets-cadastrados/pets-cadastrados-routing.module';
import { PetsCadastradosPageModule } from '../pets-cadastrados/pets-cadastrados.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // NgModel,
    // NgModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
