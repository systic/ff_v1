import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*
** custom select dropdown with multi select support
*/
@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit {

  private innerOptions: any;
  @Input() options: Array<any>;
  @Input() placeholder = 'Select';
  @Input() placement = 'bottom-left';
  @Input() multiSelect = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  get selectedOptions() {
    return this.innerOptions;
  }

  set selectedOptions(val) {
    this.innerOptions = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() { }

  ngOnInit() {
    this.options = this.options.map( opt => {
      return { text: opt, selected: false };
    });
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(val) {
    if (val) {
      this.selectedOptions = val;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  updateSelections(index: number) {
    if (this.multiSelect) {
      this.options[index].selected = !this.options[index].selected;
      this.selectedOptions = this.options.reduce((filtered, opt) => {
        if (opt.selected === true) {
          filtered.push(opt.text);
        }
        return filtered;
      }, []);
    } else {
      this.selectedOptions = this.options[index].text;
      this.options.forEach((opt, i) => {
        opt.selected = false;
        if (i === index) {
          opt.selected = true;
        }
      });
    }
  }

}
