import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
// import { lookupService } from 'dns';
// import { Subscription } from 'rxjs';
// import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) {
    this.formularioLogin = this.fb.group(
      {
        'email': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required)
      });
  }

  async logIn() {
    let f = this.formularioLogin.value;

    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario.name == f.name && usuario.password == f.password) {
      console.log("Welcome");
      localStorage.setItem('logged', 'true')
      this.navCtrl.navigateRoot('home');
    }
    else {
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: 'The email or password is incorrect',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
  }



}
