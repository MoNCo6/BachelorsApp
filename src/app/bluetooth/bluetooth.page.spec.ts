import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluetoothPage } from './bluetooth.page';

describe('BluetoothPage', () => {
  let component: BluetoothPage;
  let fixture: ComponentFixture<BluetoothPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BluetoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
