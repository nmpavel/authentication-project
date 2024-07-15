import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ckeditor-wrapper',
  standalone: true,
  imports: [FormsModule, CKEditorModule, CommonModule],
  template: `<ckeditor *ngIf="Editor" [(ngModel)]="content" [editor]="Editor" (change)="onChange($event)"></ckeditor>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkeditorWrapperComponent),
      multi: true,
    },
  ],
})
export class CkeditorWrapperComponent implements OnInit, ControlValueAccessor {
  @Input() content: string = '';  // Initialize with an empty string
  public Editor: any;

  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      import('@ckeditor/ckeditor5-build-classic').then((module) => {
        this.Editor = module.default;
      });
    }
  }

  writeValue(value: any): void {
    this.content = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if necessary
  }

  onChange(event: any) {
    this.onChangeFn(this.content);
  }
}
