import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: (formGroup: FormGroup) => this.passwordMatchValidator(formGroup)
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  get usernameErrors() {
    const control = this.registerForm.get('username');
    return control?.errors && control.touched;
  }

  get nameErrors() {
    const control = this.registerForm.get('name');
    return control?.errors && control.touched;
  }

  get emailErrors() {
    const control = this.registerForm.get('email');
    return control?.errors && control.touched;
  }

  get passwordErrors() {
    const control = this.registerForm.get('password');
    return control?.errors && control.touched;
  }

  get confirmPasswordErrors() {
    const control = this.registerForm.get('confirmPassword');
    return control?.errors && control.touched;
  }
}