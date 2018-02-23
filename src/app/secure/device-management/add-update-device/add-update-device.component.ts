import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-update-device',
  templateUrl: './add-update-device.component.html',
  styleUrls: ['./add-update-device.component.scss']
})
export class AddUpdateDeviceComponent implements OnInit {

  @Input() formType: string;
  @Input() formData: any;
  @Output() hideForm: EventEmitter<any> = new EventEmitter();

  deviceTypeOptions = ['POS', 'ROUTER'];
  OSOptions = ['Windows 10', 'Windows 8', 'Ubuntu', 'MacOS'];
  deviceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * create device form with form builder
   */
  createForm() {
    this.deviceForm = this.fb.group({
      deviceName: this.formData ? this.formData.name : '',
      deviceType: this.formData ? this.formData.type.toUpperCase() : '',
      storeName: this.formData ? this.formData.store.name : '',
      storeId: this.formData ? this.formData.store.id : '',
      ipAddress: this.formData ? this.formData.IP : '',
      OS: this.formData ? this.formData.OS : '',
      description: this.formData ? this.formData.description : ''
    });
  }

  closeForm() {
    this.hideForm.emit(null);
  }

}
