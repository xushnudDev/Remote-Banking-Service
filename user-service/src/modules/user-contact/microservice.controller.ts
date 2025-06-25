import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dtos';

@Controller()
export class UserContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern('create_user_contact')
  create(@Payload() dto: CreateContactDto) {
    return this.contactService.createContact(dto);
  }

  @MessagePattern('get_all_user_contacts')
  findAll() {
    return this.contactService.findAll();
  }

  @MessagePattern('get_user_contact_by_id')
  findOne(@Payload() id: number) {
    return this.contactService.findOne(id);
  }

  @MessagePattern('update_user_contact')
  update(@Payload() payload: { id: number; data: UpdateContactDto }) {
    return this.contactService.update(payload.id, payload.data);
  }

  @MessagePattern('delete_user_contact')
  remove(@Payload() id: number) {
    return this.contactService.deleteContact(id);
  }
}
