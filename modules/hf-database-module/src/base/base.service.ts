import { HighFiveBaseDao } from './base.dao';
import { Injectable } from "@nestjs/common";

@Injectable()
export class HighFiveBaseService<T> {

    constructor(
        private dao: HighFiveBaseDao<T>,
    ) { }

    public async getAll(): Promise<T[]> {
        return await this.dao.getAll();
    }

    public async getById(id: number): Promise<T> {
        return await this.dao.getById(id);
    }

    public async insert(entity: T): Promise<void> {
        await this.dao.insert(entity);
    }

    public async insertReturningId(entity: T): Promise<number> {
        return await this.dao.insertReturningId(entity);
    }

    public async insertReturningEntity(entity: T): Promise<T> {
        return await this.dao.insertReturningEntity(entity);
    }

    public async update(entity: T): Promise<void> {
        await this.dao.update(entity);
    }

    public async updateReturningId(entity: T): Promise<number> {
        return await this.dao.updateReturningId(entity);
    }
    
    public async updateReturningEntity(entity: T): Promise<T> {
        return await this.dao.updateReturningEntity(entity);
    }

    public async deleteById(id: number): Promise<void> {
        await this.dao.deleteById(id);
    }

    public async deleteByEntity(entity: T): Promise<void> {
        await this.dao.deleteByEntity(entity);
    }
}