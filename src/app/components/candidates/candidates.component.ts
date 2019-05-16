import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';




@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})



export class CandidatesComponent implements OnInit {

  public items: Observable<any[]>;
  public candidatos = [];
  public me_gusta:number;
  public no_me_gusta:number;
  public pieChartLabels = ['Me gusta', 'No me gusta'];
  public pieChartDataUribe = [];
  public pieChartDataPetro = [];
  public pieChartDataFajardo = [];
  public pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(101, 195, 116, 1)', 'rgba(195, 60, 60, 1)'],
    },
  ];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    this.items = this.db.collection('/candidatos').valueChanges();

    this.items.subscribe(data => {
      if (data) {
        this.candidatos = data;
      }
      this.pieChartDataUribe=[this.candidatos[1].likes,this.candidatos[1].dislikes];
      this.pieChartDataPetro=[this.candidatos[2].likes,this.candidatos[2].dislikes];
      this.pieChartDataFajardo=[this.candidatos[0].likes,this.candidatos[0].dislikes];

    });



  }

}
