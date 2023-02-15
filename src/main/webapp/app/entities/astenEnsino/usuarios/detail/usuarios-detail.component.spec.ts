import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsuariosDetailComponent } from './usuarios-detail.component';

describe('Usuarios Management Detail Component', () => {
  let comp: UsuariosDetailComponent;
  let fixture: ComponentFixture<UsuariosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ usuarios: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UsuariosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UsuariosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load usuarios on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.usuarios).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
