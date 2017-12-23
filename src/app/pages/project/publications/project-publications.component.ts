import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../../shared/services/project.service";
import {catchError} from "rxjs/operators";
import {PublicationsService} from "../../../shared/services/publications.service";
import {NotifyService} from "../../../shared/services/notify.service";

@Component({
  selector: 'app-project-publications',
  templateUrl: './project-publications.component.html',
  styleUrls: ['./project-publications.component.css']
})
export class ProjectPublicationsComponent {

  @Input() project: AppProject;

  showLoader = false;

  publications: AppPublication[];

  /* UI Data */
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private publicationService: PublicationsService
  ) {}

  ngOnInit(){
    this.loadPublications();
  }

  loadPublications(){
    this.showLoader = true;
    this.projectService.getPublications(this.project.id)
      .pipe(catchError((err) => [] ))
      .subscribe( publications => {
        this.publications = publications;
      },()=>{}, () => {
        this.showLoader = false;
      } );
  }

  onPublicationFormSubmit(newPublication: AppPublication){
    this.showLoader = true;
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .then( () => this.loadPublications() )
      .catch( err => console.log(err) )
      .then( () => this.showLoader = false );
  }

  onDeletePublication(publication){
    this.showLoader = true;
    this.publicationService.deletePublication(publication.id)
      .finally(() => this.showLoader = false)
      .subscribe(() => {
        this.notify.toast('Publication deleted');
        this.loadPublications();
      })
  }

  openModal(content){
    this.modal = this.modalService.open(content);
  }

}