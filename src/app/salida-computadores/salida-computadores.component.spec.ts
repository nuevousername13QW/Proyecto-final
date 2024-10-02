import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaComputadoresComponent } from './salida-computadores.component';

describe('SalidaComputadoresComponent', () => {
  let component: SalidaComputadoresComponent;
  let fixture: ComponentFixture<SalidaComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaComputadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
