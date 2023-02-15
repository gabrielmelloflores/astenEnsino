import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuarios } from '../usuarios.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../usuarios.test-samples';

import { UsuariosService } from './usuarios.service';

const requireRestSample: IUsuarios = {
  ...sampleWithRequiredData,
};

describe('Usuarios Service', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuarios | IUsuarios[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Usuarios', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const usuarios = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuarios).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Usuarios', () => {
      const usuarios = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuarios).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Usuarios', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Usuarios', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Usuarios', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuariosToCollectionIfMissing', () => {
      it('should add a Usuarios to an empty array', () => {
        const usuarios: IUsuarios = sampleWithRequiredData;
        expectedResult = service.addUsuariosToCollectionIfMissing([], usuarios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarios);
      });

      it('should not add a Usuarios to an array that contains it', () => {
        const usuarios: IUsuarios = sampleWithRequiredData;
        const usuariosCollection: IUsuarios[] = [
          {
            ...usuarios,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, usuarios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Usuarios to an array that doesn't contain it", () => {
        const usuarios: IUsuarios = sampleWithRequiredData;
        const usuariosCollection: IUsuarios[] = [sampleWithPartialData];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, usuarios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarios);
      });

      it('should add only unique Usuarios to an array', () => {
        const usuariosArray: IUsuarios[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuariosCollection: IUsuarios[] = [sampleWithRequiredData];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, ...usuariosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarios: IUsuarios = sampleWithRequiredData;
        const usuarios2: IUsuarios = sampleWithPartialData;
        expectedResult = service.addUsuariosToCollectionIfMissing([], usuarios, usuarios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarios);
        expect(expectedResult).toContain(usuarios2);
      });

      it('should accept null and undefined values', () => {
        const usuarios: IUsuarios = sampleWithRequiredData;
        expectedResult = service.addUsuariosToCollectionIfMissing([], null, usuarios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarios);
      });

      it('should return initial array if no Usuarios is added', () => {
        const usuariosCollection: IUsuarios[] = [sampleWithRequiredData];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, undefined, null);
        expect(expectedResult).toEqual(usuariosCollection);
      });
    });

    describe('compareUsuarios', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuarios(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuarios(entity1, entity2);
        const compareResult2 = service.compareUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuarios(entity1, entity2);
        const compareResult2 = service.compareUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuarios(entity1, entity2);
        const compareResult2 = service.compareUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
