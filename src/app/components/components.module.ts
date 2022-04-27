import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@NgModule({
    declarations: [ConverterComponent, CurrencyInputComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [ConverterComponent]
})
export class ComponentsModule {}
