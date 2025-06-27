import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dtos';

@Controller()
export class UserContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern('create_user_contact')
  create(@Payload() dto: CreateContactDto,@Payload() userId: number) {
    return this.contactService.createContact(userId,dto);
  }

  @MessagePattern('get_all_user_contacts')
  findAll() {
    return this.contactService.findAll();
  }

  @MessagePattern('get_user_contact_by_id')
  findOne(@Payload() userId: number) {
    return this.contactService.findOne(userId);
  }

  @MessagePattern('update_user_contact')
  update(@Payload() payload: { userId: number; data: UpdateContactDto }) {
    return this.contactService.update(payload.userId, payload.data);
  }

  @MessagePattern('delete_user_contact')
  remove(@Payload() userId: number) {
    return this.contactService.deleteContact(userId);
  }
}
