import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PersonProvider } from "../../providers/person/person";
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';
import { ModalController } from 'ionic-angular';
import { ResultsPage }  from "../results/results";
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};

  constructor(public navCtrl: NavController, 
              public person: PersonProvider, 
              public performanceData: PerformanceDataProvider,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private _tokenService: Angular2TokenService) {
    this.user = { distance: 1000, age: 20, gender: "female" };
  }
  calculate(user) {
    this.person.age = user.age;
    this.person.gender = user.gender;
    this.person.doAssessment(user.distance);    
  }

  showResults() {
    this.navCtrl.push(ResultsPage);
  }

  saveResults() {    
    let response = this.performanceData.saveData({ performance_data: { data: { message: this.person.assessmentMessage }}});
      response.subscribe(data => console.log(data));      
      if (this._tokenService.userSignedIn()) {
        this.presentAlert('Save successful', 'Your data has been stored'); 
      } else {
          this.presentAlert('Save failed', 'You must log in first');
        }    
  }
  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
  

}
