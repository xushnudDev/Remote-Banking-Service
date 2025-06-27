import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos';

@ApiTags('Contact')
@Controller('users/:userId/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiProperty({ description: 'Create new contact' })
  @ApiResponse({ status: 201, description: 'Contact created' })
  async createContact(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() contactDto: CreateContactDto,
  ) {
    return await this.contactService.createContact(userId, contactDto);
  }

  @Get()
  @ApiProperty({ description: 'Get contact by userId' })
  @ApiResponse({ status: 200, description: 'Contact found' })
  async getContactByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.contactService.findOne(userId);
  }

  @Put()
  @ApiProperty({ description: 'Update contact by userId' })
  @ApiResponse({ status: 200, description: 'Contact updated' })
  async updateContact(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateDto: UpdateContactDto,
  ) {
    return await this.contactService.update(userId, updateDto);
  }

  @Patch()
  @ApiProperty({ description: 'Update contact by userId' })
  @ApiResponse({ status: 200, description: 'Contact updated' })
  async updateContactByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateDto: UpdateContactDto,
  ) {
    return await this.contactService.update(userId, updateDto);
  }

  @Delete()
  @ApiProperty({ description: 'Delete contact by userId' })
  @ApiResponse({ status: 200, description: 'Contact deleted' })
  async deleteContact(@Param('userId', ParseIntPipe) userId: number) {
    return await this.contactService.deleteContact(userId);
  }
}
