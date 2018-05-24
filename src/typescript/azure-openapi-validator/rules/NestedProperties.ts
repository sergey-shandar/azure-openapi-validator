/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { MergeStates, OpenApiTypes, rules } from '../rule';
import { getSuccessfulResponseSchema } from './utilities/rules-helper';
export const NestedProperties: string = "NestedProperties";

const jp = require('jsonpath');

rules.push({
  id: "RXXX",
  name: NestedProperties,
  severity: "error",
  category: "SDKViolation",
  mergeState: MergeStates.individual,
  openapiType: OpenApiTypes.default | OpenApiTypes.arm,
  appliesTo_JsonQuery: "$.definitions.*.properties.*",
  run: function* (doc, node, path) {
    const msg: string = "Nested properties are not allowed.";
    if (node.properties !== undefined) {
      yield { message: `${msg} '${path[path.length - 1]}'`, location: path };
    }
  }
});