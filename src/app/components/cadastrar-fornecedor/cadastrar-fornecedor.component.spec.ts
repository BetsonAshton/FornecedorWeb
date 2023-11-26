import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFornecedorComponent } from './cadastrar-fornecedor.component';

describe('CadastrarFornecedorComponent', () => {
  let component: CadastrarFornecedorComponent;
  let fixture: ComponentFixture<CadastrarFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarFornecedorComponent]
    });
    fixture = TestBed.createComponent(CadastrarFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
