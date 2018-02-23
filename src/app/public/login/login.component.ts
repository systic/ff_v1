import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DemoVideoComponent } from '../../modals/demo-video/demo-video.component';
import { AuthenticationService } from '../../services/authentication.service';

const demoVideoURL = 'https://www.youtube.com/embed/G_PC8p8nvQw?rel=0';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordVisible = false;
  loggingIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
      rememberMe: true
    });
  }

  // launch the demo video modal
  launchDemoVideo() {
    const modalRef = this.modalService.open(DemoVideoComponent);
    // to sanitize the url
    modalRef.componentInstance.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(demoVideoURL);
  }

  login() {
    this.loggingIn = true;
    this.authService.login(this.loginForm.value)
      .subscribe( response => {
        if (response) {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
          this.router.navigate([redirect]);
        }
        this.loggingIn = false;
      });

  }

}
