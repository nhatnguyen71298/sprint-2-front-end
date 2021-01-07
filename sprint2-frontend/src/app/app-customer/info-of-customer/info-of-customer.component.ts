import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../alert/success/success.component';
import {CustomerService} from '../../service/lvq-din/customer.service';

@Component({
  selector: 'app-info-of-customer',
  templateUrl: './info-of-customer.component.html',
  styleUrls: ['./info-of-customer.component.css']
})
export class InfoOfCustomerComponent implements OnInit {
  customer;
  imgSrc: string;
  selectedImage: any = null;
  imageUrl;
  checkAvatar = true;

  constructor(private customerService: CustomerService,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
    this.imgSrc = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg';
  }

  ngOnInit() {
    this.customerService.getCustomerByAccount(1).subscribe(data => {
      if (data.imageAvatar != null) {
        this.imgSrc = data.imageAvatar;
      }
      this.customer = data;
    });
  }

  choosePhoto(image) {
    const file = image;
    if (file.files[0] && file.files[0].type.match('image*')) {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        this.imgSrc = event.target.result;
        this.checkAvatar = false;
      };
      fileReader.readAsDataURL(file.files[0]);
      this.selectedImage = file.files[0];
    }
  }

  upFireBase(avatar) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: 'auto',
      data: {check: true},
      disableClose: false
    });
    const filePath = `avatar/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrl = url;
          this.customer.imageAvatar = this.imageUrl;
          this.customerService.updateCustomer(this.customer).subscribe(() => dialogRef.close(
            this.dialog.open(SuccessComponent, {
              width: 'auto',
              data: {check: false}
            })
          ));
        });
      })
    ).subscribe();
    avatar.value = '';
    this.checkAvatar = true;
  }

  reset(avatar) {
    avatar.value = '';
    if (this.customer.imageAvatar != null) {
      this.imgSrc = this.customer.imageAvatar;
    } else {
      this.imgSrc = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg';
    }
    this.checkAvatar = true;
  }
}
