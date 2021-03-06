import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from '../../../../core/projects/AppProject'
import {ProjectService} from '../../../../core/projects/project.service'
import {NotifyService} from '../../../../core/notifications/notify.service'
import {InvitationsService} from '../../../../core/invitations/invitations.service'
import {User} from '../../../../core/auth/user.model'

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  @Input() project: AppProject;

  users: User[];

  inviteEmail: string = "";

  loading = 0;

  constructor(
    private projectService: ProjectService,
    private notify: NotifyService,
    private invitations: InvitationsService
  ) { }

  ngOnInit() {
    this.loading++;
    this.projectService.getResearchers(this.project.id)
      .finally(() => this.loading--)
      .subscribe(users => this.users = users);
  }

  inviteByEmail(email: string){
    this.loading++;
    this.invitations.sendResearcherEmailInvite(this.project.id, email)
      .finally(() => this.loading--)
      .catch(err => {
        this.notify.alert('Oops', "Invite couldn't be sent", "error");
        return [];
      })
      .subscribe( res => {
        this.notify.alert('Invitation Sent!');
        this.inviteEmail = "";
      })
  }

  sendInvite(user: User){
    console.log(user);
    this.loading++;
    this.projectService.inviteResearcher(this.project.id, user.id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User..", "But why?"); return [] } )
      .subscribe(() => {
        this.notify.alert('Access Granted!', user.name + " is now a researcher of " + this.project.name );
        this.ngOnInit();
      })
  }

  onRemoveCollaborator(encoder: User) {
    this.notify.confirm(() => this.removeCollaborator(encoder.id), {
      title: "Are you sure?",
      text: "This will remove the researcher from this project",
      confirmButtonText: "Remove Researcher"
    })
  }

  removeCollaborator(id: number) {
    this.loading++;
    this.projectService.removeResearcher(this.project.id, id)
      .finally(() => this.loading--)
      .catch( err => {
        switch (err.status) {
          case 403:
            this.notify.alert("Invalid collaborator count", "Projects must have at least one researcher", "error");
            break;
          default:
            this.notify.toast("Invalid User..")
        }
        return [];
      })
      .subscribe( () => {
        this.notify.toast("Successfully removed user");
        this.ngOnInit();
      })
  }

}
