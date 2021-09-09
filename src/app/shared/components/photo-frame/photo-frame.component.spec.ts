import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';

fdescribe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoFrameComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#Like should trigger @Output liked only once after two consecutive clicks`, fakeAsync(() => {
    let times = 0
    component.liked.subscribe(() => times++)
    component.like();
    component.like();
    tick(500);
    expect(times).toBe(1);
  }))

  it(`#Like should trigger @Output liked twice after two clicks outside debouncetime`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(2000);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }))
});
