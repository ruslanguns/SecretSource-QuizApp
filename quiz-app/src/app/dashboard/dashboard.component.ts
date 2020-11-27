import { Component } from '@angular/core';
import { Role } from '../shared/enums/role.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Role = Role;

}
