
import * as fileStream from 'fs';
import * as dataType from '../../utils/type';
import { log } from '../../utils/log';
import { FileHelper } from '../../utils/files';

let fileHelper = new FileHelper();

export let getTypes = (types: any, path: string) => {
  for (let item of types) {
    if (item.package) {
      let typeCodes: Array<string> = new Array();
      // typeCodes.push(`namespace ${item.package}{\n`);
      if (item.doc) {
        typeCodes.push('/**');
        typeCodes.push(` * ${item.doc}`);
        typeCodes.push(' */');
      }
      if (item.type === "class") {
        typeCodes.push(`export class ${item.name}{`);
        for (let property of item.properties) {
          typeCodes.push('\n/**')
          typeCodes.push(` * ${property.doc}`);
          typeCodes.push(' */')
          typeCodes.push(`public ${property.name}: ${dataType.toTsType(property.type)};`);
        }
      } else if (item.type === "enum") {
        typeCodes.push(`export enum ${item.name}{`);
        for (let property of item.properties) {
          typeCodes.push('\n/**')
          typeCodes.push(` * ${property.doc}`);
          typeCodes.push(' */')
          typeCodes.push(`${property.name},`);
        }
      }
      typeCodes.push("}");
      // typeCodes.push("}");

      let directory: string = `${path}${item.package.replace(/\./g, '/')}/`;
      fileHelper.saveFile(`${directory}${item.name.toLowerCase()}.ts`, typeCodes.join("\n"));
      log.info(`file had created: ${path}${item.name}.ts.`);
    }
  }
}