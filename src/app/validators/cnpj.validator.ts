import { FormControl } from "@angular/forms";
import { isValidCNPJ } from "@brazilian-utils/brazilian-utils";

export function IsValidCNPJ() {
  return (control: FormControl) => {
    return isValidCNPJ(control.value) ? null : { invalidCNPJ: true };
  };
}