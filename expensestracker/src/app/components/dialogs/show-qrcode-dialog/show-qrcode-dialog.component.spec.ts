import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQrcodeDialogComponent } from './show-qrcode-dialog.component';

describe('ShowQrcodeDialogComponent', () => {
  let component: ShowQrcodeDialogComponent;
  let fixture: ComponentFixture<ShowQrcodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQrcodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQrcodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
