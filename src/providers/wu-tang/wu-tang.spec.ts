import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
 HttpClientTestingModule,
 HttpTestingController
} from '@angular/common/http/testing';

import { WuTangProvider } from './wu-tang';


describe('WuTangProvider', () => {
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [WuTangProvider]
    });
  });


  //STRING RETURN
  it('return string',inject([WuTangProvider], (provider: WuTangProvider)=>{
    expect(WuTangProvider.wuTangls()).toBe("For the Children")
}));

//GET METHOD
it(
  'should get favorite band',
  inject(
    [HttpTestingController, WuTangProvider],
    (httpMock: HttpTestingController, WuTangService: WuTangProvider) => {
      const mockBand = [
        { band: 'WuTang Clan', website: 'www.wuTang.com' },
      ];

      WuTangService.myFavoriteBand().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body).toEqual([ Object({ band: 'WuTang Clan', website: 'www.wuTang.com' }) ]);
        }
      });

      const mockReq = httpMock.expectOne(WuTangService.url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockBand);

      httpMock.verify();
    }
  )
);
//GET METHOD
it(
  'should get favorite band',
  inject(
    [HttpTestingController, WuTangProvider],
    (httpMock: HttpTestingController, WuTangService: WuTangProvider) => {
      const mockBand = [
        { band: 'WuTang Clan', website: 'www.wuTang.com' },
      ];

      WuTangService.myFavoriteBand().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body).toEqual([ Object({ band: 'WuTang Clan', website: 'www.wuTang.com' }) ]);
        }
      });

      const mockReq = httpMock.expectOne(WuTangService.url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockBand);

      httpMock.verify();
    }
  )
);
//POST METHOD
it('POST band',
 inject(
     [HttpTestingController, WuTangProvider],
     (httpMock: HttpTestingController, dataService: WuTangProvider) => {
    dataService.newBandILIke('band').subscribe((data: any) => {
      expect(data.band).toBe('band');
    });

    const req = httpMock.expectOne(`http://replace.with.api/anything/newBand`, 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://replace.with.api/anything/newBand')

    req.flush({
      band: 'band',

    });

    httpMock.verify();
  }));

});
