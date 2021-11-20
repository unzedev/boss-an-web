import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public toast: any = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  public dangerConfirm: any = Swal.mixin({
    showCancelButton: true,
    buttonsStyling: false,
    focusCancel: true,
    customClass: {
      actions: 'buttons',
      confirmButton: 'button is-danger is-light is-outlined',
      cancelButton: 'button',
    },
  });

  constructor() { }

  public openToast(icon: string, title: string): void {
    this.toast.fire({ icon, title });
  }

  public openDangerConfirmDialog(title: string, text: string, confirmButtonText: string, cancelButtonText: string, confirmFunction: () => void): void {
    this.dangerConfirm.fire({
      title,
      text,
      confirmButtonText,
      cancelButtonText,
    })
    .then((result: any) => {
      if (result.value) {
        confirmFunction();
      }
    });
  }

  public openSuccessConfirmDialog(title: string, text: string, confirmButtonText: string, cancelButtonText: string, confirmFunction: () => void): void {
    Swal.mixin({
      showCancelButton: cancelButtonText.length > 0,
      buttonsStyling: false,
      focusCancel: true,
      customClass: {
        actions: 'buttons',
        confirmButton: 'button is-success is-light is-outlined',
        cancelButton: 'button',
      },
    }).fire({
      title,
      text,
      confirmButtonText,
      cancelButtonText,
    })
    .then((result: any) => {
      if (result.value) {
        confirmFunction();
      }
    });
  }
}
