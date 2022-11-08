import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperComponent } from './shopkeeper.component';

describe('ShopkeeperComponent', () => {
  let component: ShopkeeperComponent;
  let fixture: ComponentFixture<ShopkeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeeperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
