import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../core/forms/AppForm";
import {AppExperimentEncoding} from "../../../../core/encodings/AppExperimentEncoding";
import * as _ from 'lodash';
import {AppBranch} from "../../../../core/form-branch/AppBranch";
import {EncodingUpdate, reduceEncoding} from "./encodingReduce";
import {mapToFormData} from "./encodingMapper";
import {NotifyService} from "../../../../core/notifications/notify.service";
import {exportResponses} from "./encodingExports";

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() appForm: AppForm;
  @Input() encoding: AppExperimentEncoding;

  @Output() onChange = new EventEmitter();
  @Output() saveResponses = new EventEmitter();
  @Output() onDeleteBranch = new EventEmitter<number>();
  @Output() onCreateBranch = new EventEmitter<object>();
  @Output() onBranchChange = new EventEmitter<object>();

  branches = [];
  originalData = {};
  changedData = {};

  constructor(private notify: NotifyService) {
  }

  ngOnInit() {
    this.branches = [];
    this.originalData = {};
    this.changedData = {};
    this.loadData(this.encoding);
  }

  ngOnChanges() {
    this.ngOnInit();
  }


  /**
   * ===============================
   * DATA METHODS
   * ===============================
   */
  loadData(encoding: AppExperimentEncoding): void {
    encoding.experiment_branches.forEach(b => this.branches.push(b));
    this.originalData = mapToFormData(encoding);
    console.log(this.originalData);
  }

  exportChangedResponses(): object[] {
    return exportResponses(this.changedData);
  }

  /**
   * ===============================
   * EVENT HANDLERS
   * ===============================
   */
  newBranch() {
    let branchName = this.notify.prompt("Give the new branch a name:");
    if(!branchName) return;
    this.onCreateBranch.emit({
      // index: this.branches.length,
      name: branchName
    });
  }

  deleteBranch(branch) {
    let afterConfirm = () => {
      this.onDeleteBranch.emit(branch.id);
    };
    this.notify.confirm(afterConfirm, {
      title: 'Delete Branch?'
    });
  }

  onResponseChanged($event: EncodingUpdate): void {
    this.changedData = reduceEncoding(this.changedData, $event);
    this.onChange.emit();
  }


  /**
   * ===============================
   * HELPERS
   * ===============================
   */
  private getBranchData(branch_key): object {
    return this.originalData[branch_key] || {};
  }

  /**
   * ==============================
   * COMPONENT STATE
   * ==============================
   */
  branchState = {};

  editBranch = (branch) => this.branchState[branch.id] = branch;
  stopEditingBranch = (branch, newName) => {
    this.branchState[branch.id] = null;
    if(branch.name === newName) return;
    this.onBranchChange.emit({ id: branch.id, name: newName });
  }
}
