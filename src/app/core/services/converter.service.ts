import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PairExchange } from '../models/PairExchangeModel';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {
    constructor(private http: HttpClient) {}

    getExchangeResult(first: any, second: any, amount: number | string | null): Observable<number> {
        return this.http
            .get<PairExchange>(`${environment.api_url}/pair/${first}/${second}/${amount}`)
            .pipe(map((res) => res.conversion_result));
    }
}