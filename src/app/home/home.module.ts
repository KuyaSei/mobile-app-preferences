import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HomePage }]), // ✅ Import HomePage inside imports
    HomePage  // ✅ Standalone components should be imported here
  ]
})
export class HomePageModule {}
