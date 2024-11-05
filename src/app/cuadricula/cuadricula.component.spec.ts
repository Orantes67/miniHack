import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadriculaComponent } from './cuadricula.component';

describe('CuadriculaComponent', () => {
  let component: CuadriculaComponent;
  let fixture: ComponentFixture<CuadriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuadriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
