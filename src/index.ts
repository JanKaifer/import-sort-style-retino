import { IStyleAPI, IStyleItem } from 'import-sort-style';
import Dotenv from 'dotenv';

const OUR_MODULES_NAMES = 'RETINO_OUR_MODULES_NAMES';

const ourModules: string[] = [];

const result = Dotenv.config();
if (result.parsed) {
  const config = result.parsed;

  if (config[OUR_MODULES_NAMES] !== undefined) {
    config[OUR_MODULES_NAMES].split(':').map(name => ourModules.push(name));
  }
} else {
  console.log(result.error);
}

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasMember,
    isNodeModule,
    isAbsoluteModule,
    always,
    moduleName,
    name,
    naturally,
    not,
    startsWith,
  } = styleApi;

  const isReact = moduleName(startsWith('react'));

  const isNotRetinoModule = and(
    ...ourModules.map(ourModule => not(moduleName(startsWith(ourModule))))
  );

  return [
    // node modules
    {
      match: and(isAbsoluteModule, isReact),
      sort: moduleName(naturally),
      sortNamedMembers: name(naturally),
    },
    {
      match: and(isAbsoluteModule, isNotRetinoModule, hasMember),
      sort: moduleName(naturally),
      sortNamedMembers: name(naturally),
    },

    // ---
    { separator: true },

    // local imports
    // import _ from "foo"
    {
      match: and(isAbsoluteModule, hasMember),
      sort: moduleName(naturally),
      sortNamedMembers: name(naturally),
    },

    // ---
    { separator: true },

    // import _ from "./foo"
    {
      match: and(hasMember),
      sort: moduleName(naturally),
      sortNamedMembers: name(naturally),
    },

    // ---
    { separator: true },

    // imports from node_modules
    // import "foo"
    {
      match: and(isNodeModule, isAbsoluteModule),
      sort: moduleName(naturally),
    },

    // local imports
    // import "foo"
    {
      match: isAbsoluteModule,
      sort: moduleName(naturally),
    },

    // import "./foo"
    {
      match: always,
      sort: moduleName(naturally),
    },
  ];
}
