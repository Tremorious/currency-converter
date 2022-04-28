import { rates } from './../../core/services/rates';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { State } from 'src/app/core/models/StateModel';

@Component({
    selector: 'app-currency-input',
    templateUrl: './currency-input.component.html',
    styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent implements OnInit {
    @Input() initialSelectValue: string;
    @Input() initialInputValue: string | number | null;
    @Input() title: string;

    @Output() triggerValues = new EventEmitter<State>();
    @ViewChild('input') input: ElementRef;

    public rates: string[] = Object.keys(rates);
    public inputForm: FormGroup;
    public src: string;

    constructor() {}

    ngOnInit(): void {
        this.initForm();
        this.triggerInputValues();
    }

    ngOnChanges(): void {
        this.src = `https://flagcdn.com/w40/${rates[this.initialSelectValue].toLowerCase()}.png`;
    }

    private getInputValue() {
        return this.input.nativeElement.value;
    }

    private initForm(): void {
        this.inputForm = new FormGroup({
            amount: new FormControl(this.initialInputValue),
            currency: new FormControl(this.initialSelectValue)
        });
    }

    private triggerInputValues() {
        this.inputForm.valueChanges
            .pipe(
                map((val) => {
                    return {
                        amount: this.getInputValue(),
                        currency: val.currency
                    };
                })
            )
            .subscribe((data) => {
                this.triggerValues.emit(data);
            });
    }
}
