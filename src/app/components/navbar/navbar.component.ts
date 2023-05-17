import { Component  , EventEmitter , Output , Input , OnInit} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isLoading: boolean = false;
  constructor(public _authSer:AuthService){}
  ngOnInit(): void {
    // this._authSer.isloading.subscribe((r)=> this.isLoading = r)
  }
  // toggle = false;
  // @Output()
  // toggleNavEvent = new EventEmitter<boolean>(this.toggle)

  // toggleFn(){
  //   this.toggle = !this.toggle;
  //   this.toggleNavEvent.emit(this.toggle);
  // }

  @Input()
  sideNav!: MatDrawer;
}
