import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-consultar-fornecedor',
  templateUrl: './consultar-fornecedor.component.html',
  styleUrls: ['./consultar-fornecedor.component.css']
})
export class ConsultarFornecedorComponent {
  mensagem: string = '';
  httpHeaders: HttpHeaders = new HttpHeaders();
  fornecedor: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef
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
        environment.apiFornecedor + "api/fornecedor",
        { headers: this.httpHeaders }
    )
    .subscribe({
        next: (data) => {
            this.fornecedor = data as any[];
            console.log(this.fornecedor);

            // Forçar a detecção de mudanças
            this.cdRef.detectChanges();
        },
        error: (e) => {
            this.mensagem = e.error.mensagem;
        }
    })
    .add(() => {
        this.spinner.hide();
    });
}

  onDelete(idFornecedor: string): void {


    if (window.confirm('Deseja excluir o fornecedor?')) {
      this.spinner.show();


      this.httpClient.delete(
        environment.apiFornecedor + "api/fornecedor/" + idFornecedor,
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




