import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startImageSlideshow();
    }
  }

  startImageSlideshow(): void {
    const images1 = [
      'assets/img1.jpg',
      'assets/img3.jpg',
      'assets/img5.jpg'
    ];

    const images2 = [
      'assets/img2.jpg',
      'assets/img4.jpg',
      'assets/img6.jpg'
    ];

    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const updateImages = () => {
      currentIndex1 = (currentIndex1 + 1) % images1.length;
      currentIndex2 = (currentIndex2 + 1) % images2.length;

      const image1 = this.renderer.selectRootElement('#image1', true);
      const image2 = this.renderer.selectRootElement('#image2', true);

      if (image1) {
        this.renderer.removeClass(image1, 'fade-in');
        this.renderer.addClass(image1, 'fade-out');
        setTimeout(() => {
          this.renderer.setAttribute(image1, 'src', images1[currentIndex1]);
          this.renderer.removeClass(image1, 'fade-out');
          this.renderer.addClass(image1, 'fade-in');
        }, 500);
      }

      if (image2) {
        this.renderer.removeClass(image2, 'fade-in');
        this.renderer.addClass(image2, 'fade-out');
        setTimeout(() => {
          this.renderer.setAttribute(image2, 'src', images2[currentIndex2]);
          this.renderer.removeClass(image2, 'fade-out');
          this.renderer.addClass(image2, 'fade-in');
        }, 500);
      }
    };

    setInterval(updateImages, 3000);
  }

}
