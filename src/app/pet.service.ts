import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Pet } from './models/pet.models';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  key = 'pets';

  constructor() {}

  getPets(): Pet[] {
    var listaCachorrosSTR = localStorage.getItem(this.key);
    console.log(this.key);
    var listaCachorros: Pet[] = [];
    if (listaCachorrosSTR) {
      listaCachorros = JSON.parse(listaCachorrosSTR!);
    }
    return listaCachorros;
    console.log(listaCachorros);
  }

  salvarPet(pet: Pet) {
    var pets = this.getPets();
    pets.push(pet);
    localStorage.setItem(this.key, JSON.stringify(pets));
  }

  limparPets() {
    localStorage.removeItem(this.key);
  }
}
