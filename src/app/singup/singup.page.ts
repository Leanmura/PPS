import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) {
    this.formularioRegistro = this.fb.group(
      {
        'email': new FormControl("", Validators.required), // indica que el email es requerido, por eso lo marca en rojo cuando no lo completamos
        'password': new FormControl("", Validators.required),
        'confirmPassword': new FormControl("", Validators.required)
      });
  }

  ngOnInit() {
  }

  async save() {
    let f = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: 'Inputs can not be in blank',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    let usuario = {
      nombre: f.email,
      password: f.password
    }
    if (f.password == f.confirmPassword) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('logged', 'true')
      this.navCtrl.navigateRoot('home');
    }
    else {
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: 'Passwords are differents',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
  }
}
