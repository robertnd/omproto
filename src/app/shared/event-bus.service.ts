import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from './event.class';
import { PersonalInfo } from './personalinfo.class';
import { Contacts } from './contacts.class';
import { Occupation } from './occupation.class';
import { Recommendation } from './recommendation.class';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<EventData>();
  private journey: Map<string, number> = new Map<string, number>()
  private plans: Map<string, string> = new Map<string, string>()
  getSubject = this.subject$.asObservable()
  private personalInfo: PersonalInfo = new PersonalInfo()
  private contacts: Contacts = new Contacts();
  private occupation: Occupation = new Occupation();
  private recommendation: Recommendation = new Recommendation(0,0,0,0);


  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }

  // deep copy, don't pass references
  setJourney(nJourney: Map<string, number>) {
    this.journey.clear()
    nJourney.forEach((value: number, key: string) => this.journey.set(key, value) )
  }

  setPlans(nPlans: Map<string, string>) {
    this.plans.clear()
    nPlans.forEach((value: string, key: string) => this.plans.set(key, value) )
  }

  setPersonalInfo(nPI: PersonalInfo) {
    this.personalInfo = {...nPI}
  }

  setContacts(nC: Contacts) {
    this.contacts = {...nC}
  }

  setOccupation(nO: Occupation) {
    this.occupation = {...nO}
  }

  getJourney() {
    return this.journey
  }

  getPlans() {
    return this.plans
  }

  getPersonalInfo() {
    return this.personalInfo
  }

  getContacts() {
    return this.contacts
  }

  getOccupation() {
    return this.occupation
  }

  setRecommendaton(nR: Recommendation) {
    this.recommendation = {...nR}
  }

  getRecommendaton() {
    return this.recommendation
  }
}