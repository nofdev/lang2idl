
import * as struct from '../../utils/struct';
import * as utils from './utils';
import { Ducoment as Doc } from './docTool';
import { getMethods } from './methodTool';
import { getMetaes } from './metaTool';
import { MissingCommentError, CodeFormatError } from '../../utils/error';


let interfaceName: string;
let doc = new Doc();


export class InterfaceTool {
  typeFilesMap: { [key: string]: string };

  getInterface = (code: string) => {
    let itemInterface = struct.interfaceStruct();
    let dicTypes = [''];

    itemInterface.package = utils.getNamespace(code);

    itemInterface.name = interfaceName = utils.getObjectName(code);

    itemInterface.doc = doc.getObjectDoc(code);

    itemInterface.meta = getMetaes(code, 'interface');

    itemInterface.methods = getMethods(code, this.typeFilesMap);

    return itemInterface;
  }
}