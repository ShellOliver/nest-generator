#! /usr/bin/env node
const fs = require('fs');
const [...args] = process.argv;

//fs.mkdir('test');
let options=`
Invalid Command
    supported options:
        module

    Example:
    nestjs-generator module testModule

`;

if(args[2] === undefined || args[3] === undefined){

    console.log(options)
    process.exit(1);    
}

const getFileName = (text) => {
  let rule = new RegExp(/([A-Z])/);
  let fileName = '';
  for(let t of text)
  fileName += rule.test(t) ? `-${t.toLowerCase()}` : t;
  return fileName;
};

let option = args[2];
let moduleName = args[3];
switch(option){
    case "module":
    let moduleNameFiles=getFileName(moduleName);
    let moduleNameLower=moduleName.charAt(0).toLowerCase() + moduleName.slice(1);
    let moduleNameUpper= moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    fs.mkdir(moduleNameFiles, (err) => console.log(err));
    
    let controllerString=`import { Controller, Post, Body } from '@nestjs/common';
import { ${moduleNameUpper}Service } from './${moduleNameFiles}.service';
@Controller('${moduleNameLower}')
export class ${moduleNameUpper}Controller {
    constructor(private readonly ${moduleNameLower}Service: ${moduleNameUpper}Service) { }

    @Post()
    async create(@Body() ${moduleNameLower}: ${moduleNameUpper}) {
        return await this.${moduleNameLower}Service.create(${moduleNameLower});
    }

    @Post('/update')
    update(@Body() ${moduleNameLower}: ${moduleNameUpper}){
        return await this.${moduleNameLower}Service.save(${moduleNameLower});
    }
}
`;
    
    
    let moduleString=`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${moduleNameUpper}Service } from './${moduleNameFiles}.service';
import { ${moduleNameUpper}Controller } from './${moduleNameFiles}.controller';
import { ${moduleNameUpper} } from './${moduleNameFiles}.entity';
    
@Module({
  imports: [TypeOrmModule.forFeature([${moduleNameUpper}])],
  components: [${moduleNameUpper}Service],
  controllers: [${moduleNameUpper}Controller]
})
export class ${moduleNameUpper}Module { }
`;
    
    let entityString=`import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ${moduleNameUpper} {
  @PrimaryGeneratedColumn()
  id: number;
}
`;
    
    let serviceString=`import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ${moduleNameUpper} } from './${moduleNameFiles}.entity';
import { Repository } from 'typeorm/repository/Repository';

@Component()
export class ${moduleNameUpper}Service {
  constructor(
    @InjectRepository(${moduleNameUpper})
    private readonly ${moduleNameLower}Repository: Repository<${moduleNameUpper}>
  ) { }

  async create(${moduleNameLower}: ${moduleNameUpper}) {
    return await this.${moduleNameLower}Repository.create(${moduleNameLower});
  }

  async update(${moduleNameLower}: ${moduleNameUpper}) {
    return await this.${moduleNameLower}Repository.save(${moduleNameLower});
  }
}
`;
    let controllerFile=`${moduleNameFiles}/${moduleNameFiles}.controller.ts`;
    let entityFile = `${moduleNameFiles}/${moduleNameFiles}.entity.ts`;
    let serviceFile = `${moduleNameFiles}/${moduleNameFiles}.service.ts`;
    let moduleFile =  `${moduleNameFiles}/${moduleNameFiles}.module.ts`;
    
    fs.writeFile(controllerFile,controllerString,(err)=>{
        if(err) throw err;
        console.log('...generated controller...')
    })
    fs.writeFile(entityFile,entityString,(err)=>{
        if(err) throw err;
        console.log('...generated entity...')
    })
    fs.writeFile(serviceFile,serviceString,(err)=>{
        if(err) throw err;
        console.log('...generated service...')
    })
    fs.writeFile(moduleFile,moduleString,(err)=>{
        if(err) throw err;
        console.log('...generated module...')
    })
    
    break;
    default:
    console.log(options)
    process.exit(1);    
    break;
}
