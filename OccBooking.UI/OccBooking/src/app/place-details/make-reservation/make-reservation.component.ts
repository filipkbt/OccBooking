import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlaceService } from 'src/app/services/place.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationRequestModel } from 'src/app/models/reservation-request.model';
import { PlaceModel } from 'src/app/models/place.model';
import { MenuService } from 'src/app/services/menu.service';
import { MenuModel } from 'src/app/models/menu.model';
import { MenuDetailsComponent } from 'src/app/owner/place-management/menu-section/menu-details/menu-details.component';
import { MatDialog } from '@angular/material';

export class MenuOrderMap {
  menu: MenuModel;
  include: boolean;
  amountOfPeople: number;
}
@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss']
})
export class MakeReservationComponent implements OnInit {
  clientFormGroup: FormGroup;
  reservationFormGroup: FormGroup;
  dateFilter: any;
  reservedDates: Date[] = [];
  placeId: string;
  place: PlaceModel;
  menus: MenuModel[];
  menuOrderMaps: MenuOrderMap[] = [];

  constructor(private formBuilder: FormBuilder,
              private placeService: PlaceService,
              private activatedRoute: ActivatedRoute,
              private menuService: MenuService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.placeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.placeService.getPlace(this.placeId).subscribe(place => {
      this.place = place;
      this.place.occasionTypesMaps = this.placeService.mapToOccasionTypeMap(this.place.occasionTypes);
      this.menuService.getMenus(this.placeId).subscribe(menus => {
        this.menus = menus;
        for(const menu of this.menus) {
          this.menuOrderMaps.push({menu: menu, include: false, amountOfPeople: null});
        }
      });
    });
    this.placeService.getReservedDays(this.placeId).subscribe(dates => {
      for (const date of dates) {
        this.reservedDates.push(new Date(date));
      }
      this.dateFilter = (date: Date) => !this.reservedDates.some(x => x.getFullYear() === date.getFullYear()
      && x.getMonth() === date.getMonth() && x.getDate() === date.getDate());
    });
    
    this.initForms();
  }

  private initForms() {
    this.clientFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.nullValidator],
      email: ['', Validators.nullValidator],
      phoneNumber: ['', Validators.nullValidator],
    });
    this.reservationFormGroup = this.formBuilder.group({
      date: ['', Validators.required],
      occasionType: ['', Validators.required],
      options: ['', Validators.required]
    });
  }

  submit() {
    const model: ReservationRequestModel = {
      clientFirstName: this.clientFormGroup.controls['firstName'].value,
      clientLastName: this.clientFormGroup.controls['lastName'].value,
      clientEmail: this.clientFormGroup.controls['email'].value,
      clientPhoneNumber: this.clientFormGroup.controls['phoneNumber'].value,
      options: this.reservationFormGroup.controls['options'].value,
      occasionType: this.reservationFormGroup.controls['occasionType'].value,
      date: this.reservationFormGroup.controls['date'].value,
    };
    console.log(this.menuOrderMaps);
  }

  openMenuDetials(menuOrderMap: MenuOrderMap) {
    const dialogRef = this.dialog.open(MenuDetailsComponent, { data: menuOrderMap.menu });
  }
}