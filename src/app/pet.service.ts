import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Pet } from './models/pet.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  key = 'pets';
  colecaoCachorros:any [] = [];
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

  async salvarPet(nomes: string, idades: number) {
    const pets = {
      nome:nomes,
      idade:idades,
      img: await this.gerar()
    }
    // pets.push(pet);
    // localStorage.setItem(this.key, JSON.stringify(pets));
    const values = localStorage.getItem(this.key);

    if(!values) {
      this.colecaoCachorros.push(pets)
      localStorage.setItem(this.key, JSON.stringify(this.colecaoCachorros));

    } else {
      const colecao: any[] = this.listarPet()!;
      colecao.push(pets);
      localStorage.setItem(this.key, JSON.stringify(colecao))
    }
  }

  listarPet(){
    const values =localStorage.getItem(this.key);

    if(!values) return;

    const colecao:any[] = JSON.parse(values);
    console.log(colecao)
    return colecao;
  }





  deletar(param: any) {
    const values = this.listarPet();
    const result = values?.filter((pets) => pets.nome !== param);
    localStorage.setItem(this.key, JSON.stringify(result));
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



//funcional

