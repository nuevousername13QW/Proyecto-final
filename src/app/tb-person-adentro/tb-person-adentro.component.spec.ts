import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbPersonAdentroComponent } from './tb-person-adentro.component';

describe('TbPersonAdentroComponent', () => {
  let component: TbPersonAdentroComponent;
  let fixture: ComponentFixture<TbPersonAdentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbPersonAdentroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbPersonAdentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
