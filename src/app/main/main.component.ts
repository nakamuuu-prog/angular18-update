import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    SliderModule,
    ToastModule,
    RatingModule,
    ChipsModule,
    InputSwitchModule,
    FileUploadModule,
    PasswordModule,
    DividerModule,
    InputMaskModule,
    MultiSelectModule,
    AccordionModule,
    CardModule,
  ],
  providers: [MessageService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  form!: FormGroup;

  genderOptions = [
    { label: '男性', value: 'male' },
    { label: '女性', value: 'female' },
    { label: 'その他', value: 'other' },
    { label: '回答しない', value: 'prefer_not_to_say' },
  ];

  interestOptions = [
    { label: 'スポーツ', value: 'sports' },
    { label: '音楽', value: 'music' },
    { label: '読書', value: 'reading' },
    { label: '料理', value: 'cooking' },
    { label: '旅行', value: 'travel' },
    { label: 'テクノロジー', value: 'technology' },
  ];

  prefectureOptions = [
    { label: '北海道', value: 'hokkaido' },
    { label: '東京', value: 'tokyo' },
    { label: '大阪', value: 'osaka' },
    { label: '福岡', value: 'fukuoka' },
    { label: '沖縄', value: 'okinawa' },
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        phoneNumber: ['', Validators.required],
        birthDate: [null, Validators.required],
        gender: ['', Validators.required],
      }),

      addressInfo: this.fb.group({
        prefecture: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
      }),

      preferences: this.fb.group({
        interests: [[]],
        notifications: [false],
        marketingEmails: [false],
        satisfactionRating: [0],
        budgetRange: [0],
        skills: [[]],
        bio: ['', [Validators.maxLength(200)]],
      }),

      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: '送信成功',
        detail: 'フォームが正常に送信されました。',
      });
      console.log(this.form.value);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'エラー',
        detail: '入力内容を確認してください。',
      });
      this.validateAllFormFields(this.form);
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  clearForm() {
    this.form.reset();
  }
}
