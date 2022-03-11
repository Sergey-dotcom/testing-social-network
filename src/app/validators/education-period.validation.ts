import { AbstractControl, ValidationErrors } from '@angular/forms'

export function educationPeriodValidator(control: AbstractControl): ValidationErrors | null {
    const start = parseInt(control.get("start")!.value);
    const end = parseInt(control.get("end")!.value);

    return start > end ? { 'wrongEducationPeriod': true } :  null
}