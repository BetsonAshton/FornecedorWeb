import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFornecedorComponent } from './consultar-fornecedor.component';

describe('ConsultarFornecedorComponent', () => {
  let component: ConsultarFornecedorComponent;
  let fixture: ComponentFixture<ConsultarFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarFornecedorComponent]
    });
    fixture = TestBed.createComponent(ConsultarFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
