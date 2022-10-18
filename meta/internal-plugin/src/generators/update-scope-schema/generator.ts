import {
  addProjectConfiguration,
  formatFiles,
  getProjects,
  ProjectConfiguration,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { UpdateScopeSchemaGeneratorSchema } from './schema';

function addScopeIfMissing() {}

const scopePrefix = 'scope:';
function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: ProjectConfiguration[] = Array.from(projectMap.values());
  const allScopes: string[] = projects
    .map((project) =>
      (project.tags ?? []).filter((tag) => tag.startsWith(scopePrefix))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope) => scope.slice(scopePrefix.length));
  return Array.from(new Set(allScopes));
}

export default async function (
  tree: Tree,
  options: UpdateScopeSchemaGeneratorSchema
) {
  updateJson(tree, 'nx.json', (value) => {
    value.defaultProject = 'api';
    return value;
  });
  const scopes = getScopes(getProjects(tree));
  const scopesType = scopes.map((s) => `'${s}'`).join(' | ');
  const content = /*ts*/ `
export interface UtilLibGeneratorSchema {
  name: string;
  directory: ${scopesType};
}
`.trimStart();
  tree.write(
    'meta/internal-plugin/src/generators/util-lib/schema.d.ts',
    content
  );
  await formatFiles(tree);
}
