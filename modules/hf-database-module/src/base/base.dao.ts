import { HighFiveBaseEntity } from './base.entity';
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class HighFiveBaseDao<T> {

    constructor(
        protected repository: Repository<T>,
    ) { }

    public async getAll(): Promise<T[]> {
        const eList = await this.repository.find();
        return eList;
    }

    public async getById(id: number): Promise<T> {
        const e = await this.repository.findOne(id);
        return e;
    }

    private async save(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    public async insert(entity: T): Promise<void> {
        await this.save(entity);
    }

    public async insertReturningId(entity: T): Promise<number> {
        const e = await this.save(entity) as unknown as HighFiveBaseEntity;
        return e.id;
    }

    public async insertReturningEntity(entity: T): Promise<T> {
        const e = await this.save(entity);
        return e;
    }

    public async update(entity: T): Promise<void> {
        await this.save(entity);
    }

    public async updateReturningId(entity: T): Promise<number> {
        const e = await this.save(entity) as unknown as HighFiveBaseEntity;
        return e.id;
    }
    
    public async updateReturningEntity(entity: T): Promise<T> {
        const e = await this.save(entity);
        return e;
    }

    public async deleteById(id: number): Promise<void> {
        const e = await this.getById(id);
        await this.deleteByEntity(e);
    }

    public async deleteByEntity(entity: T): Promise<void> {
        await this.repository.remove(entity);
    }
}