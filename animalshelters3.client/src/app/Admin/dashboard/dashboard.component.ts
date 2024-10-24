import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private openedDropdowns: Set<string> = new Set();

  toggleDropdown(menuId: string) {
    if (this.openedDropdowns.has(menuId)) {
      this.openedDropdowns.delete(menuId);
    } else {
      this.openedDropdowns.clear(); // أغلق جميع القوائم المنسدلة الأخرى
      this.openedDropdowns.add(menuId);
    }
  }

  isDropdownOpen(menuId: string): boolean {
    return this.openedDropdowns.has(menuId);
  }
}
