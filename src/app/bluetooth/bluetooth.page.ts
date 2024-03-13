import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import {BleClient, ScanResult, RequestBleDeviceOptions } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})

export class BluetoothPage implements OnInit {

  availableDevices: ScanResult[] = [];
  connectedDevice: ScanResult[] = [];
  isScanning: boolean = false;

  constructor(private navCtrl: NavController) {
    BleClient.initialize();
  }

  ngOnInit() {
    this.enableBluetooth();
    this.enableLocation();
  }

  async enableBluetooth() {
    const requestEnable = await BleClient.isEnabled(); // Overí, či je Bluetooth zapnutý
    if (!requestEnable) {
      try {
        await BleClient.requestEnable(); // Vyžiada od užívateľa povolenie zapnúť Bluetooth
        // Tu môže byť pridaná logika po úspešnom povolení
      } catch (error) {
        // Užívateľ zamietol povolenie alebo došlo k chybe
        console.error('Bluetooth permission was denied or failed', error);
      }
    }
  }

  async enableLocation() {
    const isLocationEnabled = await BleClient.isLocationEnabled();
    if (!isLocationEnabled) {
      console.log('Location services are not enabled. Opening location settings...');

      // Open the device's location settings
      await BleClient.openLocationSettings();

      console.log('User is expected to enable location services manually.');
      return;
    }
  }

  async startScan() {
    this.isScanning = true;
    const options: RequestBleDeviceOptions = {
      // Zde můžete přidat konkrétní možnosti pro skenování, například filtry.
    };

    try {
      await BleClient.requestLEScan(options, (result: ScanResult) => {
        console.log(result);
        this.availableDevices.push(result);
      });

      // Zde nastavte časovač pro zastavení skenování po určité době.
      setTimeout(() => {
        BleClient.stopLEScan();
        console.log('Scan stopped');
        console.log(this.availableDevices);
        this.isScanning = false;
      }, 10000); // Zastaví skenování po 10 sekundách
    } catch (error) {
      console.error(error);
      this.isScanning = false;
    }
  }

  async connectToDevice(deviceId: string) {
    try {
      await BleClient.createBond(deviceId);
      console.log(`Bond created successfully with device: ${deviceId}`);

      console.log(`Device ${deviceId} is bonded.`);
      await this.updateDevices(deviceId);

    } catch (error) {
      console.error(`Error connecting to device: ${error}`);
    }
  }

  async updateDevices(deviceId: string) {
    try {
      const device = this.availableDevices.find(device => device.device.deviceId === deviceId);
      if (device) {
        this.availableDevices = this.availableDevices.filter(device => device.device.deviceId !== deviceId);
        this.connectedDevice.push(device);
      }
    } catch (error) {
      console.error('Error while updating connected devices:', error);
    }
  }

  async disconnectDevice() {

  }


  goBack(): void {
    this.navCtrl.back();
  }
}
