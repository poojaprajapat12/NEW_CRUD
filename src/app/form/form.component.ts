import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  editIndex: number = -1; 

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.route.queryParams.subscribe(params => {
      if (params['editIndex']) {
        this.editIndex = params['editIndex'];
        this.loadUserData(this.editIndex);
      }
    })
  }

  ngOnInit(): void {}
  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  loadUserData(index: number) {
    const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (storedData[index]) {
      this.userForm.patchValue(storedData[index]);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      let storedData = JSON.parse(localStorage.getItem('userData') || '[]');

      if (this.editIndex !== -1) 
      {
        storedData[this.editIndex] = formData;
        this.editIndex = -1;
      } 
      else {
        storedData.push(formData);
      }
      localStorage.setItem('userData', JSON.stringify(storedData));
      alert('Form submitted successfully!!');
      this.userForm.reset();
      this.router.navigate(['/dashboard']);
    }
  }
}

