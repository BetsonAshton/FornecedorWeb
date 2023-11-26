import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-endereco',
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.css'],
})
export class EditarEnderecoComponent {
  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${dados.token}`,
      });
    }

    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.spinner.show();

    this.httpClient
      .get(
        environment.apiFornecedor + 'api/endereco/' + id,
        { headers: this.httpHeaders } //enviando o token..
      )
      .subscribe({
        next: (data: any) => {
          this.formEdicao.patchValue(data);
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
  formEdicao = new FormGroup({
    idEndereco: new FormControl('', []),

    logradouro: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150),
    ]),

    complemento: new FormControl('', [Validators.required]),

    numero: new FormControl('', [Validators.required]),

    bairro: new FormControl('', [Validators.required]),

    cidade: new FormControl('', [Validators.required]),

    estado: new FormControl('', [Validators.required]),

    cep: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  //função para submit para processar o formulário
  onSubmit(): void {
    this.spinner.show();

    this.httpClient
      .put(
        environment.apiFornecedor + 'api/endereco',
        this.formEdicao.value,
        { headers: this.httpHeaders } //enviando o token..
      )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
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
