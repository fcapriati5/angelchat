import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'EMOTIVE', 'MEASUREMENT', 'DAY', 'TEMPORAL', 'ROLE', 'FEELING'];
  entities: any;
  entityRecognized: any;
    


  entitiesForm = this.fb.group({
    EMOTIVE: this.fb.array([]),
    MEASUREMENT: this.fb.array([]),
    DAY: this.fb.array([]),
    TEMPORAL: this.fb.array([]),
    ROLE: this.fb.array([]),
    FEELING: this.fb.array([]),
  });

  get getEmotives(){
    return this.entitiesForm.get('EMOTIVE') as FormArray;
  }

  get getMeasurements(){
    return this.entitiesForm.get('MEASUREMENT') as FormArray;
  }

  get getDays(){
    return this.entitiesForm.get('DAY') as FormArray;
  }

  get getTemporals(){
    return this.entitiesForm.get('TEMPORAL') as FormArray;
  }

  get getRoles(){
    return this.entitiesForm.get('ROLE') as FormArray;
  }

  get getFeelings(){
    return this.entitiesForm.get('FEELING') as FormArray;
  }

  constructor(private entityService: EntityService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.entitiesForm = this.fb.group({
      EMOTIVE: this.fb.array([]),
      MEASUREMENT: this.fb.array([]),
      DAY: this.fb.array([]),
      TEMPORAL: this.fb.array([]),
      ROLE: this.fb.array([]),
      FEELING: this.fb.array([]),
    });
    this.entityService.getEntities().subscribe( (entities: string) => {
      console.log(JSON.parse(entities));
      let entitiesJson = JSON.parse(entities);

      let emotiveString = entitiesJson[0]['EMOTIVE'];
      let emotiveArray = emotiveString.split(',') as Array<string>
      emotiveArray.forEach((emotiveField: string) => {
        this.getEmotives.push(this.fb.control(emotiveField))
      })

      let measurementString = entitiesJson[0]['MEASUREMENT'];
      let measurementArray = measurementString.split(',') as Array<string>
      measurementArray.forEach((measurementField: string) => {
        this.getMeasurements.push(this.fb.control(measurementField))
      })

      let dayString = entitiesJson[0]['DAY'];
      let dayArray = dayString.split(',') as Array<string>
      dayArray.forEach((dayField: string) => {
        this.getDays.push(this.fb.control(dayField))
      })

      let temporalString = entitiesJson[0]['TEMPORAL'];
      let temporalArray = temporalString.split(',') as Array<string>
      temporalArray.forEach((temporalField: string) => {
        this.getTemporals.push(this.fb.control(temporalField))
      })

      let roleString = entitiesJson[0]['ROLE'];
      let roleArray = roleString.split(',') as Array<string>
      roleArray.forEach((roleField: string) => {
        this.getRoles.push(this.fb.control(roleField))
      })

      let feelingString = entitiesJson[0]['FEELING'];
      let feelingArray = feelingString.split(',') as Array<string>
      feelingArray.forEach((feelingField: string) => {
        this.getFeelings.push(this.fb.control(feelingField))
      })
    })
  }

  addInput(category: string){
    switch (category) {
      case 'EMOTIVE':
        this.getEmotives.push(this.fb.control('')) 
        break;
      case 'MEASUREMENT':
        this.getMeasurements.push(this.fb.control('')) 
        break;
      case 'DAY':
        this.getDays.push(this.fb.control('')) 
        break;
      case 'TEMPORAL':
        this.getTemporals.push(this.fb.control('')) 
        break;
      case 'ROLE':
        this.getRoles.push(this.fb.control('')) 
        break;
      case 'FEELING':
        this.getFeelings.push(this.fb.control('')) 
        break;
      default:
        break;
    }
  }

  removeItem(category: string, item: any){
    switch (category) {
      case 'EMOTIVE':
        this.getEmotives.removeAt(item)
        break;
      case 'MEASUREMENT':
        this.getMeasurements.removeAt(item) 
        break;
      case 'DAY':
        this.getDays.removeAt(item) 
        break;
      case 'TEMPORAL':
        this.getTemporals.removeAt(item) 
        break;
      case 'ROLE':
        this.getRoles.removeAt(item) 
        break;
      case 'FEELING':
        this.getFeelings.removeAt(item) 
        break;
      default:
        break;
    }
  }

  search($event: any){
    this.entityService.recognizeEntity({'text': $event.target.value.trim()}).subscribe((response) => {
      this.entityRecognized = JSON.stringify(response);
    })
  }

  save(){

    console.log({'EMOTIVE': this.getEmotives.getRawValue()})

    this.entityService.saveEntities({
      'EMOTIVE': this.getEmotives.getRawValue().toString(),
      'MEASUREMENT': this.getMeasurements.getRawValue().toString(),
      'DAY': this.getDays.getRawValue().toString(),
      'TEMPORAL': this.getTemporals.getRawValue().toString(),
      'ROLE': this.getRoles.getRawValue().toString(),
      'FEELING': this.getFeelings.getRawValue().toString(),
    }).subscribe((result) => {
      console.log(result);
      this.ngOnInit()
    });
  }

}
