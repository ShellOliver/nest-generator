# nest-generator v0.2.0

The [nest-generator](https://nestjs.com) generated modules for you NestJS Application
Based on https://github.com/bipin000/nestjs-generator and https://github.com/zMotivat0r/nest-crud/

## Installation

Using nest-generator:
```shell
$ npm install nestg -g
```

## Usage:
```shell
$ nestg module myModuleName <options>

...generated controller...
...generated entity...
...generated service...
...generated module...

```

## Options:
-c: create crud api with @nestjsx/crud (need install it before: npm i @nestjsx/crud --save)


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