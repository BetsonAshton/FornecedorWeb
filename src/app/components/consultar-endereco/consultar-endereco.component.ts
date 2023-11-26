import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-consultar-endereco',
  templateUrl: './consultar-endereco.component.html',
  styleUrls: ['./consultar-endereco.component.css']
})
export class ConsultarEnderecoComponent {

  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();
  endereco: any[] = [];


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${dados.token}`
      })
    }


    this.onInit();
  }


  onInit(): void {
    this.spinner.show();


    this.httpClient.get(
      environment.apiFornecedor + "api/endereco",
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data) => {
          this.endereco = data as any[];
        },
        error: (e) => {
          this.mensagem = e.error.mensagem;
        }
      })
      .add(
        () => {
          this.spinner.hide();
        }
      )
  }


  onDelete(idEndereco: string): void {


    if (window.confirm('Deseja excluir esse endereço?')) {
      this.spinner.show();


      this.httpClient.delete(
        environment.apiFornecedor + "api/endereco/" + idEndereco,
        { headers: this.httpHeaders } //enviando o token..
      )
        .subscribe({
          next: (data: any) => {
            this.mensagem = data.mensagem;
            this.onInit();
          },
          error: (e) => {
            this.mensagem = e.error.mensagem;
          }
        })
        .add(
          () => {
            this.spinner.hide();
          }
        )
    }
  }
}
