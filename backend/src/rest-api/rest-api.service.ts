import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateGreetingDto } from './dto/create-greeting.dto';
//import { Greeting } from './entities/greeting.entity';
import { GreetingInterface } from './interfaces/greeting.interface';

@Injectable()
export class RestApiService {
  //in the production phase we want
  //INFO: GREET... string is a symbol (find and replace during creation)
  constructor(
    @Inject('GREETING_MODEL')
    private readonly greetingModel: Model<GreetingInterface>,
  ) {}
  //if more than one we can use inheritance

  //INFO:js array
  //in the development stage we can use the class entity to test
  // private greetings: Greeting[] = [
  //   { id: 0, msg: 'Hello' },
  //   { id: 1, msg: '你好' },
  //   { id: 2, msg: 'Bonjour' },
  // ];

  //INFO:js array
  // findAll(msg?: string): Greeting[] {
  //   if (msg) {
  //     return this.greetings.filter((greeting) => greeting.msg === msg);
  //   }
  //   return this.greetings;
  // }
  async findAll(): Promise<GreetingInterface[]> {
    const greeting = await this.greetingModel.find().exec();
    return greeting;
  }

  //INFO:js array
  // findById(greetingId: number): Greeting {
  //   return this.greetings.find((greeting) => greeting.id === greetingId);
  // }
  //why g => g.id === greetingId works and not (g) => {g.id === greetingId}
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  async findById(greetingId: string): Promise<GreetingInterface> {
    const greeting = await this.greetingModel
      .findOne({ _id: greetingId })
      .exec();
    return greeting;
  }

  //INFO:js array
  // createEntry(createGreetingDto: CreateGreetingDto): Greeting {
  //   const newGreeting = { id: this.greetings.length, ...createGreetingDto };
  //   //WARN: I don't understand js ...
  //   this.greetings.push(newGreeting);
  //   return newGreeting;
  // }
  async createEntry(
    createGreetingDto: CreateGreetingDto,
  ): Promise<GreetingInterface> {
    const newGreeting = new this.greetingModel(createGreetingDto);
    return newGreeting.save();
  }
  async deleteEntry(greetingId: string) {
    console.log(greetingId);
    const result = await this.greetingModel
      .deleteOne({ _id: greetingId })
      .exec();
    if ((result as any).n === 0) {
      throw new NotFoundException('greeting does not exist');
    }
    console.log(result);
  }

  async updateEntry(greetingId: string, greetingMsg: string) {
    //fetch from db and then update
    const updatedEntry = await this.findById(greetingId);
    if (greetingMsg) {
      updatedEntry.msg = greetingMsg;
    }
    updatedEntry.save();
  }
}
