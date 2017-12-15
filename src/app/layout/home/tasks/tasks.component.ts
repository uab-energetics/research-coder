import { Component, OnInit } from '@angular/core';
import {tasks} from '../../../../../test/data/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks;

  constructor() {
    this.tasks = tasks;
  }

  ngOnInit() {
  }

}
