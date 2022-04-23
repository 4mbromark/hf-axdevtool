import { HighFiveObjectUtil } from 'hf-common-module';
import { HighFiveBaseDao } from './base.dao';
import { HighFiveBaseEntity } from '..';

export abstract class HighFiveBaseService<T extends HighFiveBaseEntity> {
    protected name: string = 'entity';

    constructor(
        private dao: HighFiveBaseDao<T>
    ) { }

    public async getAll(): Promise<T[]> {
        return await this.dao.getAll();
    }

    public async getById(id: number): Promise<T> {
        const entity = await this.dao.getById(id);
        return this.returnOrFail(entity, { name: 'id', value: id });        
    }

    protected returnOrFail(entity: T, parameter?: { name: string, value: any }): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            if (HighFiveObjectUtil.isNotNull(entity)) {
                resolve(entity);
            } else {
                let message = this.name + ' not found';
                if (parameter) {
                    message += ' for ' + parameter.name + ' = ' + parameter.value;
                }
                reject(message);
            }
        });
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

    protected checkUpdateOrfail(entity: T, oldValue: any, newValue: any): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            if (oldValue === newValue) {
                resolve(entity);
            } else {
                let message = this.name + ' update failed (' + oldValue + ' should be ' + newValue + ')';
                reject(message);
            }
        });
    }

    public async deleteById(id: number): Promise<void> {
        await this.dao.deleteById(id);
    }

    public async deleteByEntity(entity: T): Promise<void> {
        await this.dao.deleteByEntity(entity);
    }
}