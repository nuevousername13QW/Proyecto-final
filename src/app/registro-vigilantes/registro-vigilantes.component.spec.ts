import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVigilantesComponent } from './registro-vigilantes.component';

describe('RegistroVigilantesComponent', () => {
  let component: RegistroVigilantesComponent;
  let fixture: ComponentFixture<RegistroVigilantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVigilantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVigilantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
