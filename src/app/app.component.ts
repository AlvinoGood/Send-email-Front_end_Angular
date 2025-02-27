import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailFormComponent } from './email-form/email-form.component';

// const NG_DECLARATIONS = [EmailFormComponent];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Reservation';
}
