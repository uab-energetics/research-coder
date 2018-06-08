import {DynamicForm} from "./DynamicForm"
import {Subject} from "rxjs/Subject"
import {FormEvent} from "./events/FormEvent"
import {tap} from "rxjs/operators"
import {reduceForm} from "./formReducer"
import "rxjs/add/operator/scan"
import {BehaviorSubject} from "rxjs/BehaviorSubject"
import {lookup} from "./query";

export class FormFiller {

  form$: BehaviorSubject<DynamicForm> = new BehaviorSubject<DynamicForm>(null)
  eventHistory: FormEvent[] = []
  undoStack: FormEvent[] = []
  events$: Subject<FormEvent> = new Subject()

  constructor(private data: DynamicForm = {}) {
    new BehaviorSubject<DynamicForm>(data)

    this.events$.pipe(
      tap(E => this.eventHistory.push(E)),
    ).subscribe(E => this.form$.next(reduceForm(this.form$.getValue(), E)))
  }

  watch = () => this.form$.asObservable()

  lookup = (key: string, defaultValue = null) => lookup(this.form$.getValue(), key, defaultValue)

  digest = (event: FormEvent): void => {
    this.undoStack = []
    this.events$.next(event)
  }

  clearHistory = () => this.eventHistory = []

  undo = () => {
    if(this.eventHistory.length === 0)
      return false
    this.undoStack.push(this.eventHistory.pop())
    this.form$.next(this.eventHistory.reduce(reduceForm, {}))
    return true
  }

  redo = () => {
    if(this.undoStack.length === 0) return false
    this.events$.next(this.undoStack.pop())
    return true
  }

}
