import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../services/reservation.service';

interface Room {
  title: string;
}

const NG_MODULES = [ReactiveFormsModule, CommonModule]
@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent {
  rooms: Room[] = [
    {title: "MACHUPICCHU"},
    {title: "OLLANTAYTAMBO"},
    {title: "PISAQ"},
    {title: "SAQSAYHUAMÁN"},
    {title: "TIPÓN"},
    {title: "Q'ENQO"},
  ];

  formulario: FormGroup;
  message = '';
  success = false;

  constructor(private fb: FormBuilder, private reservationService: ReservationService, private route: ActivatedRoute) {
    this.formulario = this.fb.group({
      names: ['', [Validators.required, Validators.maxLength(30)]],
      surnames: ['', [Validators.required, Validators.maxLength(30)]],
      country: ['', [Validators.required, Validators.pattern(/^\+[0-9]{1,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      room: [''],
      messaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.reservationService.sendReservation(this.formulario.value).subscribe({
        next: (res) => {
          this.message = 'Register successfully!';
          this.success = true;
          this.formulario.reset();
          this.hideAlert();
        },
        error: (err) => {
          this.message = err.error?.error || 'Error on register';
          this.success = false;
          this.hideAlert();
        },
      });
    }
  }

  hideAlert() {
    setTimeout(() => {
      this.message = '';
    }, 2000); 
  }
}