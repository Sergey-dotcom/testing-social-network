import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'delete-confirmation.dialog.html',
})
export class DeleteConfirmationDialog {
  constructor(private translate: TranslateService) {}
}
