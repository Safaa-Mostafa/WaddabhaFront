import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [
    { name: 'كهرباء', imageUrl: 'assets/Electricity.jpg' },
    { name: 'تسويق رقمي', imageUrl: 'assets/DigitalMarketing.jpg' },
    { name: 'كتابة وترجمة', imageUrl: 'assets/WritingTranslation.jpg' },
    { name: 'تصميم', imageUrl: 'assets/Design.jpg' },
    { name: 'صوتيات', imageUrl: 'assets/Audio.jpg' },
    { name: 'أعمال', imageUrl: 'assets/Business.jpg' },
    { name: 'هندسة وعمارة', imageUrl: 'assets/EngineeringArchitecture.jpg' },
    { name: 'فيديو وأنيميشن', imageUrl: 'assets/VideoAnimation.jpg' }
  ];
}
