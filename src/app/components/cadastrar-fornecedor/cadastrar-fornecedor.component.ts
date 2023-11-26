import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastrar-fornecedor',
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrls: ['./cadastrar-fornecedor.component.css'],
})
export class CadastrarFornecedorComponent {
  mensagem: string = '';
  endereco: any[] = [];

  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${dados.token}`,
      });
    }

    this.spinner.show();

    this.httpClient
      .get(
        environment.apiFornecedor + 'api/endereco',
        { headers: this.httpHeaders } //enviando o token..
      )
      .subscribe({
        next: (data) => {
          this.endereco = data as any[];
        },
        error: (e) => {
          this.mensagem = e.error.mensagem;
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }

  //objeto para capturar o formulário
  formCadastro = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150),
    ]),
    cnpj: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    idEndereco: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    this.spinner.show();
    this.httpClient
      .post(
        environment.apiFornecedor + 'api/fornecedor',
        this.formCadastro.value,
        { headers: this.httpHeaders } //enviando o token..
      )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
          this.formCadastro.reset();
        },
        error: (e) => {
          this.mensagem = e.error.mensagem;
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}
