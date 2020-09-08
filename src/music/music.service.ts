import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
  private musics_today: String[] = [];
  private musics_year: String[] = [];
  private us_musics_today: String[] = [];
  private us_musics_year: String[] = [];

  
  create_today_music(musics: String[]) {
    this.musics_today = musics;
  }

  create_us_today_music(musics: String[]) {
    this.us_musics_today = musics;
  }

  create_year_music(musics: String[]) {
    this.musics_year = musics;
  }

  create_us_year_music(musics: String[]) {
    this.us_musics_year = musics;
  }

  findTodayMusics(): String[] {
    return this.musics_today;
  }

  findUsTodayMusics(): String[] {
    return this.us_musics_today;
  }

  findYearMusics(): String[] {
    return this.musics_year;
  }

  findUsYearMusics(): String[] {
    return this.us_musics_year;
  }
}