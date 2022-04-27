import { ConverterService } from './../../../core/services/converter.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    euroToUahChangeRate$: Observable<number>;
    usdToUahChangeRate$: Observable<number>;
    constructor(private converterService: ConverterService) {}

    ngOnInit(): void {
        this.euroToUahChangeRate$ = this.converterService.getExchangeResult('EUR', 'UAH', 1);
        this.usdToUahChangeRate$ = this.converterService.getExchangeResult('USD', 'UAH', 1);
    }
}
