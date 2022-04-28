import { State } from './../../core/models/StateModel';
import { Component, OnInit } from '@angular/core';
import { ConverterService } from 'src/app/core/services/converter.service';
import { BehaviorSubject, debounceTime, filter, map, switchMap } from 'rxjs';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    currencyRates: string[];

    state$ = new BehaviorSubject<State>({
        amount: null,
        currency: 'USD'
    });

    state2$ = new BehaviorSubject<State>({
        amount: null,
        currency: 'UAH'
    });

    _state2$ = this.state2$.asObservable();

    _state$ = this.state$.asObservable();

    constructor(private converterService: ConverterService) {}

    ngOnInit() {
        this.firstInputSubscription();
        this.secondInputSubscription();
    }

    private firstInputSubscription() {
        this._state$
            .pipe(
                debounceTime(200),
                //Backspace clear input case
                map((_state$) => {
                    if (_state$.amount === '') {
                        this.state2$.value.amount = '';
                        return _state$;
                    } else {
                        return _state$;
                    }
                }),
                //Prevent requests with 'nothing'
                filter(
                    (_state$) =>
                        _state$.amount !== null &&
                        _state$.currency !== null &&
                        _state$.currency !== '' &&
                        _state$.amount !== '' &&
                        _state$.amount !== '0'
                ),
                switchMap((_state$) =>
                    this.converterService.getExchangeResult(
                        this.state$.value.currency,
                        this.state2$.value.currency,
                        this.state$.value.amount
                    )
                )
            )
            .subscribe((data) => {
                this.state2$.value.amount = data;
            });
    }

    private secondInputSubscription() {
        this._state2$
            .pipe(
                debounceTime(200),
                //Backspace clear input case
                map((_state2$) => {
                    if (_state2$.amount === '') {
                        this.state$.value.amount = '';
                        return _state2$;
                    } else {
                        return _state2$;
                    }
                }),
                //Prevent requests with 'nothing'
                filter(
                    (_state2$) =>
                        _state2$.amount !== null &&
                        _state2$.currency !== null &&
                        _state2$.currency !== '' &&
                        _state2$.amount !== '' &&
                        _state2$.amount !== '0'
                ),
                switchMap((_state2$) =>
                    this.converterService.getExchangeResult(
                        this.state2$.value.currency,
                        this.state$.value.currency,
                        this.state2$.value.amount
                    )
                )
            )
            .subscribe((data) => {
                this.state$.value.amount = data;
            });
    }

    public setStateFromFirstInput(data: State) {
        this.state$.next({
            amount: data.amount,
            currency: data.currency
        });
    }

    public setStateFromSecondInput(data: State) {
        this.state2$.next({
            amount: data.amount,
            currency: data.currency
        });
    }
}
