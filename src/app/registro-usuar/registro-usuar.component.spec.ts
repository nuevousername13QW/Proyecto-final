import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarComponent } from './registro-usuar.component';

describe('RegistroUsuarComponent', () => {
  let component: RegistroUsuarComponent;
  let fixture: ComponentFixture<RegistroUsuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
