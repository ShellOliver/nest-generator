# nestjs-generator v2.0.0

The [nestjs-generator](https://nestjs.com) generated modules for you NestJS Application
Based on https://github.com/bipin000/nestjs-generator and https://github.com/zMotivat0r/nest-crud/

## Installation

Using nestjs-generator:
```shell
$ npm install
```

## Usage:
```shell
$ node bin/nestjs-generator module myModuleName <options>

...generated controller...
...generated entity...
...generated service...
...generated module...

```

## Options:
--c: create crud api with @nestjsx/crud 


## API Methods and Endpoints

Assume you've created some CRUD controller with the route `@Controller('cats')`. In that case, Nest will create endpoints as follows:

#### `GET /cats`

Res Data: _array of entities; an empty array_
<br>Res Code: _200_

#### `GET /cats/:id`

Req Params: `:id` - _entity id_
<br>Res Data: _entity object_
<br>Res Code: _200; 400; 404_

#### `POST /cats`

Req Body: _entity object_
<br>Res Data: _entity object_
<br>Res Code: _201; 400_

#### `PUT /cats/:id`

Req Params: `:id` - _entity id_
<br>Req Body: _entity object_
<br>Res Data: _entity object_
<br>Res Code: _201; 400; 404_

#### `DELETE /cats/:id`

Req Params: `:id` - _entity id_
<br>Res Data: _empty_
<br>Res Code: _200; 400; 404_