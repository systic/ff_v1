import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit {

  @Input() formType: string;
  @Input() formData: any;
  @Output() hideForm: EventEmitter<any> = new EventEmitter();

  roleOptions = ['admin', 'user'];
  userForm: FormGroup;
  uploadedImage: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    if (this.formData) {
      this.uploadedImage = this.formData.imgUrl;
    }
  }

  /**
   * create user form with form builder
   */
  createForm() {
    this.userForm = this.fb.group({
      name: this.formData ? this.formData.name : '',
      email: this.formData ? this.formData.email : '',
      role: this.formData ? this.formData.role : '',
      phoneNumber: this.formData ? this.formData.phoneNumber : ''
    });
  }

  // when user selects an image from file input
  onFileChange(input: any) {
    // to preview the image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedImage = e.target.result;
    };
    reader.readAsDataURL(input.target.files[0]);
  }

  closeForm() {
    this.hideForm.emit(null);
  }

}
