import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form/form.service";
import {Form} from "../../models/Form";
import {ExperimentFormUpdate} from "../../shared/components/app-form/experiment-form/experiment-form.component";
import {EncodingService} from "../../shared/services/encoding.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  formModel: Form;
  encoding = {};
  branches = [
    {
      id: 1,
      name: 'Constants'
    },
    {
      id: 2,
      name: 'Study Group 1'
    }
  ];

  formCompletion: number = 0;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService
  ) { }

  ngOnInit() {
    this.formModel = this.formService.getForm(-1);
  }

  onFormUpdate($event: ExperimentFormUpdate){
    let update = {
      [$event.branch.id]: {
        [$event.question.id]: $event.response
      }
    };
    this.encoding = _.mergeWith(this.encoding, update);
    this.formCompletion = this.encodingService.calculateCompletion(this.formModel, this.encoding);
  }

}
