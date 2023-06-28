import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Pet } from './models/pet.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  key = 'pets';
  
  url = 'https://dog.ceo/api/breeds/image/random';
  public result: any = {};

  constructor(private http: HttpClient) {}

  getPets(): Pet[] {
    var listaCachorrosSTR = localStorage.getItem(this.key);
    
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

  buscarImagem(quantidade:number) {
    return this.http.get(this.url+"/"+quantidade);
  }

  gerar() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const resp = await this.consultaApi().toPromise();
        this.result = resp;
        resolve(this.result.message);
      } catch (error) {
        reject(error);
      }
    });
  }


  consultaApi() {
    return this.http.get(this.url);
  }

}
