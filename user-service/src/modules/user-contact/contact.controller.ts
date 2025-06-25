import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateContactDto } from './dtos';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiProperty({
    description: 'Create new contact',
  })
  @ApiResponse({
    status: 201,
    description: 'Contact created',
  })
  async createContact(@Body() contactDto: CreateContactDto) {
    return await this.contactService.createContact(contactDto);
  }

  @Get()
  @ApiProperty({
    description: 'Get all contacts',
  })
  @ApiResponse({
    status: 200,
    description: 'Contacts found',
  })
  async getContacts() {
    return await this.contactService.findAll();
  }

  @Get(':id')
  @ApiProperty({
    description: 'Get contact by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Contact found',
  })
  async getContactById(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.findOne(id);
  }

  @Put(':id')
  @ApiProperty({
    description: 'Update contact by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Contact updated',
  })
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateContactDto,
  ) {
    return await this.contactService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiProperty({
    description: 'Delete contact by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Contact deleted',
  })
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.deleteContact(id);
  }
}
