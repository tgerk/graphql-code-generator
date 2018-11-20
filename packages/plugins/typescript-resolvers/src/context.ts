import { parseMapper } from './mappers';
import * as Handlebars from 'handlebars';

export function importContext(options: Handlebars.HelperOptions): string {
  const config = options.data.root.config || {};
  const contextType: string | undefined = config.contextType;

  if (typeof contextType !== 'string') {
    return '';
  }

  const mapper = parseMapper(contextType);

  if (!mapper.isExternal) {
    return mapper.type;
  }

  return `import { ${mapper.type} } from '${mapper.source}';`;
}

export function getContext(options: Handlebars.HelperOptions): string {
  const config = options.data.root.config || {};
  const contextType: string | undefined = config.contextType;

  if (typeof contextType !== 'string') {
    return '{}';
  }

  const mapper = parseMapper(contextType);

  return mapper.type;
}
