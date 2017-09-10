import { CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginServiceService } from '../service/login/login-service.service'

@Injectable()
export class LoginRouterGuard implements CanActivate {

    constructor(private login: LoginServiceService) {}
    canActivate () {
        return this.login.islogin(); 
    }
}