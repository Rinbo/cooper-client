import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PersonProvider } from "../../providers/person/person";
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';
import { ModalController } from 'ionic-angular';
import { ResultsPage }  from "../results/results";

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
              private alertCtrl: AlertController) {
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
    if (
    this.performanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data))) {
        this.presentAlert('Save successful', 'Your data has been stored'); 
      } else {
          this.presentAlert('Something went wrong', 'Could not save');
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
