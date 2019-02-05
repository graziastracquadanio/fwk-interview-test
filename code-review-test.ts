import { Subscription } from 'rxjs';
import { OnInit, OnDestroy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Hero {
 id: number;
 name: string;
 age: number;
 power: string;
}

@Component({
 selector: 'hero',
})
export class HeroComponent implements OnInit, OnDestroy {
 isVisible;
 details: {};

 hero: Hero;

 heroSubscription;
 detailsSubscription: Subscription;

 constructor(private http: HttpClient, private heroService) { }

 ngOnInit() {
   this.heroSubscription = this.http.get('hero/' + '1')
.subscribe((data: any) => this.hero = data)
   this.detailsSubscription = this.http.get('hero/' + '1' + '/extra')
.subscribe(data => this.details = data)
 }

 updateHero(newDetails) {
   this.isVisible = false;
   await this.heroService.update(this.hero, newDetails);
   this.isVisible = true;
 }

 toggleVisibility() {
   this.isVisible = !!this.isVisible ? false : true;
 }
}

