import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-pix',
  templateUrl: './payment-pix.component.html',
  styleUrls: ['./payment-pix.component.css']
})
export class PaymentPixComponent implements OnInit {
  qrCodeUrl: string;
  qrCodeCode: string;

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.qrCodeUrl = params['qrCodeUrl']
      this.qrCodeCode = params['qrCodeCode']
    })
  }

  copyToClipboard(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.qrCodeCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
