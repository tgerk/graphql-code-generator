import { Type } from 'graphql-codegen-core';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { pickMapper, useDefaultMapper } from './mappers';
import * as Handlebars from 'handlebars';

function getRootTypeNames(schema: GraphQLSchema): string[] {
  const query = ((schema.getQueryType() || {}) as GraphQLObjectType).name;
  const mutation = ((schema.getMutationType() || {}) as GraphQLObjectType).name;
  const subscription = ((schema.getSubscriptionType() || {}) as GraphQLObjectType).name;

  return [query, mutation, subscription];
}

function isRootType(type: Type, schema: GraphQLSchema) {
  return getRootTypeNames(schema).includes(type.name);
}

export const getParentType = convert => (type: Type, options: Handlebars.HelperOptions) => {
  const config = options.data.root.config || {};
  const schema: GraphQLSchema = options.data.root.rawSchema;
  const mapper = pickMapper(type.name, config.mappers || {}, options);
  const defaultMapper = useDefaultMapper(type, options);
  let name: string;

  if (mapper) {
    name = mapper.type;
  } else if (defaultMapper) {
    name = defaultMapper.type;
  } else {
    name = `${config.interfacePrefix || ''}${convert(type.name)}`;
  }

  return isRootType(type, schema) ? '{}' : name;
};
