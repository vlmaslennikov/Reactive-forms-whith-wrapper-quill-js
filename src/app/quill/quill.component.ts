import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import Quill from "quill";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-quill",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./quill.component.html",
  styleUrls: ["./quill.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true,
    },
  ],
})
export class QuillComponent implements AfterViewInit, ControlValueAccessor {
  editor!: Quill;
  @ViewChild("quill") quillElement!: ElementRef<HTMLElement>;

  initialInputValue = new BehaviorSubject("");
  onChange = (val: any) => {};
  onTouch = (val: any) => {};

  ngAfterViewInit(): void {
    this.editor = new Quill(this.quillElement.nativeElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    });
    this.editor.on("text-change", () =>
      this.onChange(this.editor.root.innerHTML)
    );
    this.editor.off("text-change", () => {});
  }

  writeValue(value: any): void {
    this.initialInputValue.next(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
