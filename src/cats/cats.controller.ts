
import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import {Cat} from './interfaces/cat';
import { CreateCatDto } from './dto/create-cat.dto'
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService){

  }
  // @Post("cc")
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send([{id: 4, name: 'cat5'}]);
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //    res.status(HttpStatus.OK).json([{id: 1, name: 'cat1'}, {id: 2, name: 'cat2'}]);
  // }

  @Post("new_cat")
  async createAcat(@Body() createCatDto : CreateCatDto){
    this.catsService.create(createCatDto);
    console.log("data_post: ", createCatDto)
  }

  @Get("all_cat")
  async getAll(): Promise<Cat[]>{
    return this.catsService.findAll();
  }
}