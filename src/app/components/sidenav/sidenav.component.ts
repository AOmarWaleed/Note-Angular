import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLogin = false;
  constructor(private _authSer:AuthService){}
  ngOnInit(): void {
   this._authSer.userData.subscribe((data)=> this.isLogin =  !!data)
  }

  logOut(){
    this._authSer.logOut();
  }
}
