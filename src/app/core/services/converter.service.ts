import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PairExchange } from '../models/PairExchangeModel';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {
    constructor(private http: HttpClient) {}

    private formatErrors(error: any) {
        alert(error.message);
        return throwError(error.error);
    }

    getExchangeResult(first: string, second: string, amount: number | string | null): Observable<string> {
        return this.http.get<PairExchange>(`${environment.api_url}/pair/${first}/${second}/${amount}`).pipe(
            map((res) => `${res.conversion_result.toFixed(2)}`),
            catchError(this.formatErrors)
        );
    }
}
