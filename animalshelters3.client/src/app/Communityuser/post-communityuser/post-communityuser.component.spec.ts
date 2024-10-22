import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommunityuserComponent } from './post-communityuser.component';

describe('PostCommunityuserComponent', () => {
  let component: PostCommunityuserComponent;
  let fixture: ComponentFixture<PostCommunityuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommunityuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommunityuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
