import { User } from "src/modules/user/entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ContactType {
    PHONE = 'phone',
    EMAIL = 'email',
};

export enum ContactStatus {
    NEW = 'new',
    ACTIVE = 'active',
};


@Entity('user_contact')
export class UserContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ContactType,
        enumName: 'user_contact_type_enum',
        default: ContactType.PHONE,
    })
    type: ContactType;

    @Column({
        type: 'enum',
        enum: ContactStatus,
        enumName: 'user_contact_status_enum',
        default: ContactStatus.NEW,
    })
    status: ContactStatus;

    @ManyToOne(() => User, (user) => user.contacts,{onDelete: 'CASCADE'})
    user: User;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date
}