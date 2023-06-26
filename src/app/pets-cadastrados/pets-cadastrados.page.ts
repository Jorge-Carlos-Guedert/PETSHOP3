import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-pets-cadastrados',
  templateUrl: './pets-cadastrados.page.html',
  styleUrls: ['./pets-cadastrados.page.scss'],
})
export class PetsCadastradosPage implements OnInit {
  constructor(
    public alerta: AlertController,
    public nav: NavController,
    public PetService: PetService
  ) {}

  novo() {
    this.nav.navigateRoot('/');
  }

  ngOnInit(): void {}
}
