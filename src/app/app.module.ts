import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { CadastrarFornecedorComponent } from './components/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { ConsultarFornecedorComponent } from './components/consultar-fornecedor/consultar-fornecedor.component';
import { EditarFornecedorComponent } from './components/editar-fornecedor/editar-fornecedor.component';
import { CadastrarEnderecoComponent } from './components/cadastrar-endereco/cadastrar-endereco.component';
import { ConsultarEnderecoComponent } from './components/consultar-endereco/consultar-endereco.component';
import { EditarEnderecoComponent } from './components/editar-endereco/editar-endereco.component';


//mapeamento das rotas do projeto
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'cadastrar-endereco', component: CadastrarEnderecoComponent },
  { path: 'consultar-endereco', component: ConsultarEnderecoComponent },
  { path: 'editar-endereco/:id', component: EditarEnderecoComponent },
  { path: 'cadastrar-fornecedor', component: CadastrarFornecedorComponent },
  { path: 'consultar-fornecedor', component: ConsultarFornecedorComponent },
  { path: 'editar-fornecedor/:id', component: EditarFornecedorComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CriarContaComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    CadastrarFornecedorComponent,
    ConsultarFornecedorComponent,
    EditarFornecedorComponent,
    CadastrarEnderecoComponent,
    ConsultarEnderecoComponent,
    EditarEnderecoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando as rotas
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
