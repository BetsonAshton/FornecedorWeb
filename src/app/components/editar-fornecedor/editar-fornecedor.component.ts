import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-editar-fornecedor',
  templateUrl: './editar-fornecedor.component.html',
  styleUrls: ['./editar-fornecedor.component.css']
})
export class EditarFornecedorComponent {

  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();
  endereco: any[] = [];


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    //capturando o token do usuário autenticado
    if (localStorage.getItem('dados-usuario') != null) {
      var dados = JSON.parse(localStorage.getItem('dados-usuario') as string);
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${dados.token}`
      })
    }


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


    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;


    this.httpClient.get(
      environment.apiFornecedor + "api/fornecedor/" + id,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.formEdicao.patchValue(data);
          this.formEdicao.controls['idEndereco'].setValue
                     (data.endereco.idEndereco);
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


  //objeto para capturar o formulário
  formEdicao = new FormGroup({
    idFornecedor:new FormControl('', [Validators.required]),
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


  //objeto para executar as validações dos csmpos
  get form(): any {
    return this.formEdicao.controls;
  }


  //função para submit para processar o formulário
  onSubmit(): void {


    this.spinner.show();


    this.httpClient.put(
      environment.apiFornecedor + "api/fornecedor",
      this.formEdicao.value,
      { headers: this.httpHeaders } //enviando o token..
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
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





