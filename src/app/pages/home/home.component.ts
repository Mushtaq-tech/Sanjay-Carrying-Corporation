import { Component, OnInit, Renderer2, Inject, PLATFORM_ID , ViewChild, ElementRef} from '@angular/core';
import { isPlatformBrowser, } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  videoSrc = 'assets/video.mp4';
  @ViewChild('statsSection') statsSection: ElementRef | undefined;
  @ViewChild('showcaseSection') showcaseSection: ElementRef | undefined;
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object, private fb:FormBuilder, private snack:MatSnackBar) { }

  contactData = {
    fullname: '',
    email: '',
    subject: '',
    message: ''
  };

  emailSent = false;


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startImageSlideshow();
      this.initCounters();
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

  initCounters(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = this.renderer.selectRootElement('.stats-section', true);
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateCounters(): void {
    const counters = Array.from(document.querySelectorAll('.counter')) as HTMLElement[];
    counters.forEach(counter => {
      const updateCount = () => {
        if (counter) {
          const target = +(counter.getAttribute('data-target') ?? 0);
          const count = +(counter.innerText ?? 0);

          const increment = target / 200;

          if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCount, 200);
          } else {
            counter.innerText = target.toString();
          }
        }
      };

      updateCount();
    });
  }

  scrollToStatsSection() {
    if (this.statsSection) {
      this.statsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToShowcaseSection() {
    if (this.showcaseSection) {
      this.showcaseSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async onSubmit() {

    emailjs.init('fIQYtOablJh_U8NvK')

    let resp= await emailjs.send("service_soyo507","template_tbgzbwo",{
      from_email: this.contactData.email,
      from_name: this.contactData.fullname,
      subject: this.contactData.subject,
      message: this.contactData.message,
      reply_to: this.contactData.email,
      });

      this.emailSent = true; // Show the success message
      setTimeout(() => {
        this.emailSent = false; // Hide the success message after 3 seconds
      }, 3000);
  }
}
