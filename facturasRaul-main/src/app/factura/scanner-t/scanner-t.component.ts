import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../_services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-scanner-t',
  templateUrl: './scanner-t.component.html',
  styleUrls: ['./scanner-t.component.scss']
})
export class ScannerTComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScannerTComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public scannedString = '';
  public scannerEnabled = false;

  boton(evt: MouseEvent) {
    this.scannerEnabled = true;
  }

  async handleScan(evt: string) {
    this.scannerEnabled = false;
    let updated;
    try {
      updated = await this.dataService.validarFactura(this.data.id, [evt]);
    } catch (error) {
      console.error(error);
    }
    this.dialogRef.close(updated);
  }

}
