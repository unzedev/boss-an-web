import { FormControl } from "@angular/forms";

export function ConfirmField(fieldInput: string) {
    let confirmControl: FormControl;
  
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }
  
      if (!confirmControl) {
        confirmControl = control.parent.get(fieldInput) as FormControl;
        control.valueChanges.subscribe(() => {
          confirmControl.updateValueAndValidity();
        });
      }
  
      if (control.value !== confirmControl.value) {
        return {
          notMatch: true
        };
      }
      return null;
    };
}