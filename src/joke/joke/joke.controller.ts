import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {JokeService} from './joke.service';
import {JokeResponseDto} from '../dto/joke.response.dto';
import {JokeRequestDto} from '../dto/joke.request.dto';
import {JokeUpdateRequestDto} from '../dto/joke.update.request.dto';

@Controller('joke')
export class JokeController {
    constructor(private jokeService: JokeService) {
    }

    @Get('search')
    searchJokes(): Promise<JokeResponseDto[]> {
        return this.jokeService.importJokes();
    }

    @Get()
    findAll(): Promise<JokeResponseDto[]> {
        return this.jokeService.findAll();
    }

    @Get(':jokeId')
    findById(@Param('jokeId') jokeId: string): Promise<JokeResponseDto> {
        return this.jokeService.findById(jokeId);
    }

    @Post()
    create(@Body() request: JokeRequestDto): Promise<JokeResponseDto> {
        return this.jokeService.save(request);
    }

    @Put()
    update(@Body() request: JokeUpdateRequestDto): Promise<JokeUpdateRequestDto> {
        return this.jokeService.update(request);
    }

    @Delete(':jokeId')
    delete(@Param('jokeId') jokeId: string): Promise<void> {
        return this.jokeService.delete(jokeId);
    }
}
