import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {makeQuestion, QuestionOption} from "../../../models/Question";

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent {

  /**
   * 1. set up the form model
   * 2. define the export method
   * 3. bind submit event to an output emitter that calls the export method
   */

  @Output() appSave = new EventEmitter<any>();

  questionForm: FormGroup;

  typeOptions = [
    { disp: 'Text', val: 'txt' },
    { disp: 'Number', val: 'num' },
    { disp: 'True/False', val: 'boo' },
    { disp: 'Select', val: 'sel' },
    { disp: 'Multi-Select', val: 'multi-sel' }
  ];

  constructor(private fb: FormBuilder) {
    this.setupFormModel();
  }

  save() {
    this.appSave.emit(this.exportModel());
  }

  exportModel () {
    const model = this.questionForm.value;

    let options: QuestionOption[] = model.options.map( opt => { return {"txt": opt} });

    console.log(model);

    return makeQuestion({
      name: model.name,
      prompt: model.prompt,
      description: model.desc,
      default_format: model.default_format,
      true_option: model.true_option,
      false_option: model.false_option
    }, options);
  }

  setupFormModel () {
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      prompt: ['', Validators.required],
      default_format: ['txt', Validators.required],
      accepts: this.fb.array([]),
      true_option: 'Yes',
      false_option: 'No',
      options: new FormControl([])
    });
  }

}
