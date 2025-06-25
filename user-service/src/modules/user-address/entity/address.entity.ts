import { User } from "modules/user/entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_address')
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region_id: number;

    @Column()
    district_id: number;

    @Column()
    address: string;

    @OneToOne(() => User, (user) => user.address)
    @JoinColumn({ name: 'user_id' })
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
    updatedAt: Date;
}