import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { MusicService } from './music.service';
import { async } from 'rxjs';
import connect_mongo from '../model/database/connecting'
const $ = require('cheerio');
const rp = require('request-promise');
const url_music_today = 'https://chiasenhac.vn/nhac-hot/vietnam.html?playlist=';
const us_url_music_today = 'https://chiasenhac.vn/nhac-hot/us-uk.html?playlist=';
const url_music_year = 'https://chiasenhac.vn/bang-xep-hang/nam-2020/vietnam.html?playlist=';
const us_url_music_year = 'https://chiasenhac.vn/bang-xep-hang/nam-2020/us-uk.html?playlist=';
@Controller('music')
export class MusicController {
  constructor(private musicService: MusicService){

  }

  async onModuleInit() {

    
    await this.musicService.create_today_music( await getDataMusics(url_music_today, 21));
    
    await connect_mongo('today', this.musicService.findTodayMusics())
  }
  @Get("get_today")
  async getAll(@Res() res: Response): Promise<any> {
    // this.musicService.create_today_music(getDataMusics(vn_url_music_today, 21));
    // this.musicService.create_us_today_music(getDataMusics(us_url_music_today, 21));
    // if(!data_today && !data_today_us && !data_year && !data_year_us){
    // res.status(HttpStatus.OK).json({ "today": "done" });
    // }
    await this.musicService.create_today_music(await getDataMusics(url_music_today, 21));
    // await this.musicService.create_year_music(getDataMusics(url_music_year, 101));
    await res.status(HttpStatus.OK).json({ "today": "done" });
  }

  @Get("get_year_music")
  async getAll_year(@Res() res: Response): Promise<any> {
    this.musicService.create_year_music(getDataMusics(url_music_year, 101));
    // if(!data_today && !data_today_us && !data_year && !data_year_us){
    res.status(HttpStatus.OK).json({ "today": "done" });
    // }
  }

  @Get("get_year_music_us")
  async getAll_year_us(@Res() res: Response): Promise<any> {
    this.musicService.create_us_year_music(getDataMusics(us_url_music_year, 101));
    // if(!data_today && !data_today_us && !data_year && !data_year_us){
    res.status(HttpStatus.OK).json({ "today": "done" });
    // }
  }

  @Get("today_music")
  async findTodayMusics(@Res() res: Response) {
    this.musicService.findTodayMusics();
    console.log("###############")
    res.status(HttpStatus.OK).json({ "today": this.musicService.findTodayMusics() });
  }
  @Get("today_music_us")
  async findUsTodayMusics(@Res() res: Response) {
    this.musicService.findUsTodayMusics();
    res.status(HttpStatus.OK).json({ "today_us": this.musicService.findTodayMusics() });
  }

  @Get("year_music")
  async findYearMusics(@Res() res: Response) {
    this.musicService.findYearMusics();
    res.status(HttpStatus.OK).json({ "year": this.musicService.findYearMusics() });
  }

  @Get("year_music_us")
  async findUsYearMusics(@Res() res: Response) {
    this.musicService.findUsYearMusics();
    res.status(HttpStatus.OK).json({ "year_us": this.musicService.findUsYearMusics() });
  }
}

function getDataMusics(url, index) {
  return rp(url)
    .then(function (html) {
      const List_url = [];
      for (let i = 1; i < index; i++) {
        List_url.push(url + i);
      }
      return Promise.all(List_url.map(function (url) {
        return getData(url);
      }))
    }).then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.log(err);
    });
  return [];
}



const getData = function (url) {
  return rp(url)
    .then(function (html) {
      try {
        var data = html.slice(html.indexOf("sources: [") + 9, html.indexOf("title:") - 2);
        var music =  ($('.download_item', html)[0].attribs).href == null ?  ($('.download_item', html)[0].attribs).href : data.slice(data.indexOf(`,{"file": `) + 11, data.indexOf('.mp3') + 4);
        var title_html = ($('.download_item', html)[0].attribs).title;
        var img = ($('.card-img-top', html)[0].attribs).src
        // console.log(music, title_html, img);
      } catch (error) {
        console.log(error)
      }

      return {
        href: music,
        title: title_html.slice(29),
        img: img
      };
    })
    .catch(function (err) {
      console.log(err)
    });
};

function database() {
  
} 