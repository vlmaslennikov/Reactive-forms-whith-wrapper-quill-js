import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      input: ['from app.component'],
    });
  }
}
