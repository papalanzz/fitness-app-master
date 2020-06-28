import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators, MinLengthValidator} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {User} from "../model/user";

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.css']
})
export class BmrComponent implements OnInit {

  userForm: FormGroup;

  errorMessages : {[key: string]: string}
  maxAge : number = 110;
  maxHeight : number = 100;
  maxWeight : number = 1000;

  private validationMessage = {
    required: 'is required',
    max: 'must be <= ' + this.maxAge 
  };

  genders: SelectItem[];
  activityLevels: SelectItem[];

  user: User;

  constructor( private formBuilder: FormBuilder) {
    this.genders = [
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
    ]
    this.activityLevels = [
      {label: 'sedentary',value: 1.2},
      {label: 'lightly active', value: 1.375},
      {label: 'moderatetely active', value: 1.55},
      {label: 'very active', value: 1.725},
      {label: 'extra active', value: 1.9},
    ]
    this.errorMessages = {  'name': '', 
                            'age': '',
                            'gender':'',
                            'height': '',
                            'weight': '',
                            'activityLevel':'' 
                          };
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required] ],
      age: ['',[ Validators.required , Validators.max(this.maxAge)] ],
      gender: ['', [Validators.required] ],
      height: ['', [Validators.required, Validators.max(this.maxHeight)] ],
      weight: ['', [Validators.required, Validators.max(this.maxWeight)] ],
      activityLevel: ['', [Validators.required] ]
    });
    
    Object.keys(this.userForm.controls).forEach( key => {
      let thisControl = this.userForm.controls[key];
      thisControl.valueChanges.subscribe(
        value => this.setGenericValidationMessage(thisControl, key)
      )
    })

  }
  setGenericValidationMessage(c: AbstractControl, keyVal: string) {
    this.errorMessages[keyVal] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.errorMessages[keyVal] = Object.keys(c.errors).map(
      key => keyVal + ' ' + this.validationMessage[key]).join('');
    }  
  }

  printDescription(multiplier : number) : string {
    let description: string;
    switch (multiplier) {
      case 1.2: {
        description = 'little or no exercise';
        break;
      }
      case 1.375: {
        description = 'light exercise/sports 1-3 days/week';
        break;
      }
      case 1.55: {
        description = 'moderate exercise/sports 3-5 days/week';
        break;
      }
      case 1.725: {
        description = 'hard exercise/sports 6-7 days a week';
        break;
      }
      case 1.9: {
        description = 'very hard exercise/sports & physical job or 2x training';
        break;
      }
    }
    return description;
  }



  determineBMR() : number {
    let bmr : number;
    let gender = this.userForm.get('gender').value;
    let weight = this.userForm.get('weight').value;
    let height = this.userForm.get('height').value;
    let age = this.userForm.get('age').value;
    let activityLevel = this.userForm.get('activityLevel').value;

    if(gender == 'Male'){
      bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
      return Math.round(bmr * activityLevel);
    } else {
      bmr = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
      return Math.round(bmr * activityLevel);
    }
  }




}
