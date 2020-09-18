import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileList: any = []
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loadProfiles();

  }
  loadProfiles() {
    return this.profileService.getProfiles().subscribe((data: any) => {

      this.profileList = data.results;
    })
  }

  selectedValue() {

    let selectedSortValue = document.getElementById('sort') as HTMLSelectElement;

    if (selectedSortValue.value == "oldest") {

      this.profileList.sort(function (a, b) {
        if (a.dob.age > b.dob.age) {
          return -1;
        }
        if (b.dob.age > a.dob.age) {
          return 1;
        }
        return 0;
      });

    }

    else if (selectedSortValue.value == "youngest") {

      this.profileList.sort(function (a, b) {
        if (b.dob.age > a.dob.age) {
          return -1;
        }
        if (a.dob.age > b.dob.age) {
          return 1;
        }
        return 0;
      });

    } else {

      this.loadProfiles();
    }
  }
}
