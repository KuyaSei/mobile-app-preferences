import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // ✅ Important: Mark as standalone
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  option1: boolean = false;
  option2: boolean = false;
  option3: boolean = false;
  rangeValue: number = 50;
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  radioValue: string = 'true';

  async ngOnInit() {
    await this.loadPreferences();
  }

  async loadPreferences() {
    this.option1 = (await this.getPreference('option1')) || false;
    this.option2 = (await this.getPreference('option2')) || false;
    this.option3 = (await this.getPreference('option3')) || false;
    this.rangeValue = (await this.getPreference('rangeValue')) || 50;
    this.checkbox1 = (await this.getPreference('checkbox1')) || false;
    this.checkbox2 = (await this.getPreference('checkbox2')) || false;
    this.checkbox3 = (await this.getPreference('checkbox3')) || false;
    this.radioValue = (await this.getPreference('radioValue')) || 'true';
  }

  async getPreference(key: string): Promise<any> {
    const result = await Preferences.get({ key });
    return result.value ? JSON.parse(result.value) : null;
  }

  async setPreference(key: string, value: any) {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  async onToggleChange(key: string, event: any) {
    await this.setPreference(key, event.detail.checked);
  }

  async onRangeChange(event: any) {
    await this.setPreference('rangeValue', event.detail.value);
  }

  async onCheckboxChange(key: string, event: any) {
    await this.setPreference(key, event.detail.checked);
  }

  async onRadioChange(event: any) {
    await this.setPreference('radioValue', event.detail.value);
  }

  async resetPreferences() {
    await Preferences.clear();
    await this.loadPreferences();
  }
}
