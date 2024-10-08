import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { Greeting } from './entities/greeting.entity';
import { GreetingInterface } from './interfaces/greeting.interface';
import { RestApiService } from './rest-api.service';

@ApiTags('greetings') //creates swagger heading
@Controller('rest-api')
export class RestApiController {
  //automatically injected in the controller (nestJs instantiates the injected class for us including the type)
  constructor(private restApiService: RestApiService) {}

  @ApiOkResponse({ type: Greeting, isArray: true })
  @ApiQuery({ name: 'msg', required: false })
  @Get() //TODO: add the optional msg param
  async getGreetingMsg(): Promise<GreetingInterface[]> {
    return this.restApiService.findAll();
  }
  //INFO:js array
  // getGretingMsg(@Query('msg') msg?:string):Greeting[]{//e.g. localhost:3001/rest-api?msg=你好
  //   return this.restApiService.findAll(msg)
  // }

  @ApiOkResponse({ type: Greeting })
  @ApiNotFoundResponse() //tells swagger that a 404 answer is possible
  @Get(':id')
  async getGreetingById(@Param('id') id: string): Promise<GreetingInterface> {
    //without the pipe you need to convert from string to int
    console.log('--->', typeof id);
    const greeting = await this.restApiService.findById(id);

    if (!greeting) {
      //error handling
      throw new NotFoundException(); // https://docs.nestjs.com/exception-filters (list of nestJs classes)
    }
    return greeting;
  }
  @ApiCreatedResponse({ type: Greeting }) //provides the documentation in swagger regarding the output
  @ApiBadRequestResponse() //because of class validators
  @Post()
  async createEntry(
    @Body() body: CreateGreetingDto,
  ): Promise<GreetingInterface> {
    return this.restApiService.createEntry(body);
  }

  @ApiOkResponse({ type: Greeting })
  @ApiBadRequestResponse() //because of class validators
  @Delete(':id')
  async deleteEntry(@Param('id') id: string): Promise<any> {
    const deletedValue = this.restApiService.findById(id);
    this.restApiService.deleteEntry(id);
    return deletedValue;
  }
  //BUG:swagger docs not working
  @ApiOkResponse({ type: Greeting, isArray: true })
  @ApiQuery({ name: 'msg', required: false })
  @ApiNotFoundResponse()
  @Patch(':id')
  async updateProduct(
    @Param('id') greetingId: string,
    @Body('msg') greetingMsg: string,
  ) {
    await this.restApiService.updateEntry(greetingId, greetingMsg);
  }
}
//TODO: add Delete/put endpoints
