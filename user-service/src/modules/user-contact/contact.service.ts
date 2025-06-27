import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContact } from './entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity';
import { CreateContactDto, UpdateContactDto } from './dtos';
import { BaseResponse } from 'src/common';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(UserContact)
    private readonly contactRepository: Repository<UserContact>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createContact(
    userId: number,
    contactDto: CreateContactDto,
  ): Promise<BaseResponse<UserContact>> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User not found',
          cause: 'Entity not found',
        },
      };
    }
    const contact = this.contactRepository.create({
      ...contactDto,
      user,
    });
    const savedContact = await this.contactRepository.save(contact);
    return {
      success: true,
      data: savedContact,
      error: null,
    };
  }

  async findAll(): Promise<BaseResponse<UserContact[]>> {
    const contacts = await this.contactRepository.find({
      relations: ['user'],
    });
    return {
      success: true,
      data: contacts,
      error: null,
    };
  }
async findOne(userId: number): Promise<BaseResponse<UserContact>> {
  const contact = await this.contactRepository.findOne({
    where: {
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!contact) {
    return {
      success: false,
      data: null,
      error: {
        code: 404,
        message: 'Contact not found',
        cause: 'Entity not found',
      },
    };
  }

  return {
    success: true,
    data: contact,
    error: null,
  };
}

  async update(
  userId: number,
  updateDto: UpdateContactDto,
): Promise<BaseResponse<UserContact>> {
  const contact = await this.contactRepository.findOne({
    where: {
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!contact) {
    return {
      success: false,
      data: null,
      error: {
        code: 404,
        message: 'Contact not found',
        cause: 'Entity not found',
        fields: [
          { name: 'userId', message: 'Contact not found for this user' },
        ],
      },
    };
  }

  contact.type = updateDto.type;
  contact.status = updateDto.status;

  const savedContact = await this.contactRepository.save(contact);

  return {
    success: true,
    data: savedContact,
    error: null,
  };
}


  async deleteContact(userId: number): Promise<BaseResponse<null>> {
  const contact = await this.contactRepository.findOne({
    where: {
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!contact) {
    return {
      success: false,
      data: null,
      error: {
        code: 404,
        message: 'Contact not found',
        cause: 'Entity not found',
        fields: [
          { name: 'userId', message: 'Contact not found for this user' },
        ],
      },
    };
  }

  await this.contactRepository.delete(contact.id);

  return {
    success: true,
    data: null,
    error: null,
  };
}

}
