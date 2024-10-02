import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaComputadoresComponent } from './entrada-computadores.component';

describe('EntradaComputadoresComponent', () => {
  let component: EntradaComputadoresComponent;
  let fixture: ComponentFixture<EntradaComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaComputadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
