#! /usr/bin/env node
const fs = require('fs');
const [...args] = process.argv;

let options = `
Invalid Command
    supported options:
        module

    Example:
    nestg module testModule
    nestg module testModule -c (with a crud)


`;

if (args[2] === undefined || args[3] === undefined) {

    console.log(options)
    process.exit(1);
}

let option = args[2];
let moduleName = args[3];
let ifCrud = args[4];

const getFileName = (text) => {
    let rule = new RegExp(/([A-Z])/);
    let fileName = '';
    for (let t of text)
        fileName += rule.test(t) ? `-${t.toLowerCase()}` : t;
    return fileName;
};

const moduleNameFiles = getFileName(moduleName);
const moduleNameLower = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);
const moduleNameUpper = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

const setCrud = (param) => {
    if (param == '-c') {
        return {
            serviceExtend: `extends CrudTypeOrmService<${moduleNameUpper}>`,
            serviceImport: `import { CrudTypeOrmService } from '@nestjsx/crud/typeorm';`,
            controllerExtend: `extends CrudController<${moduleNameUpper}>`,
            controllerImport: `import { CrudController } from '@nestjsx/crud';`,
            controllerSuper: `super(${moduleNameLower}Service);`,
            serviceSuper: `super(${moduleNameLower}Repository);`
        }
    } else {
        return {
            serviceExtend: '',
            serviceImport: '',
            controllerExtend: '',
            controllerImport: '',
            controllerSuper: '',
            serviceSuper: ''
        }
    }
}

switch (option) {
    case "module":
        const crud = setCrud(ifCrud);
        fs.mkdir(moduleNameFiles, (err) => console.log(err));

        let controllerString = `import { Controller, Post, Body } from '@nestjs/common';
import { ${moduleNameUpper} } from './${moduleNameFiles}.entity';
import { ${moduleNameUpper}Service } from './${moduleNameFiles}.service';
${crud.controllerImport}

@Controller('${moduleNameLower}')
export class ${moduleNameUpper}Controller ${crud.controllerExtend}{
    constructor(private readonly ${moduleNameLower}Service: ${moduleNameUpper}Service) {
        ${crud.controllerSuper}
    }
}
`;


        let moduleString = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${moduleNameUpper}Service } from './${moduleNameFiles}.service';
import { ${moduleNameUpper}Controller } from './${moduleNameFiles}.controller';
import { ${moduleNameUpper} } from './${moduleNameFiles}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${moduleNameUpper}])],
  providers: [${moduleNameUpper}Service],
  controllers: [${moduleNameUpper}Controller],
})
export class ${moduleNameUpper}Module { }
`;

        let entityString = `import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ${moduleNameUpper} {
  @PrimaryGeneratedColumn()
  id: number;
}
`;

        let serviceString = `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ${moduleNameUpper} } from './${moduleNameFiles}.entity';
import { Repository } from 'typeorm/repository/Repository';
${crud.serviceImport}

@Injectable()
export class ${moduleNameUpper}Service ${crud.serviceExtend}{
  constructor(
    @InjectRepository(${moduleNameUpper})
    private readonly ${moduleNameLower}Repository: Repository<${moduleNameUpper}>
  ) { ${crud.serviceSuper} }
}
`;
        let controllerFile = `${moduleNameFiles}/${moduleNameFiles}.controller.ts`;
        let entityFile = `${moduleNameFiles}/${moduleNameFiles}.entity.ts`;
        let serviceFile = `${moduleNameFiles}/${moduleNameFiles}.service.ts`;
        let moduleFile = `${moduleNameFiles}/${moduleNameFiles}.module.ts`;

        fs.writeFile(controllerFile, controllerString, (err) => {
            if (err) throw err;
            console.log('...generated controller...')
        })
        fs.writeFile(entityFile, entityString, (err) => {
            if (err) throw err;
            console.log('...generated entity...')
        })
        fs.writeFile(serviceFile, serviceString, (err) => {
            if (err) throw err;
            console.log('...generated service...')
        })
        fs.writeFile(moduleFile, moduleString, (err) => {
            if (err) throw err;
            console.log('...generated module...')
        })

        break;
    default:
        console.log(options)
        process.exit(1);
        break;
}
