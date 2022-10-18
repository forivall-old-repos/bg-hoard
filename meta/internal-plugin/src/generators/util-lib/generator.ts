import {
  formatFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { UtilLibGeneratorSchema } from './schema';

type LibraryGeneratorSchema = Parameters<typeof libraryGenerator>[1];
interface NormalizedSchema extends UtilLibGeneratorSchema, LibraryGeneratorSchema {
  directory: UtilLibGeneratorSchema['directory'];
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: UtilLibGeneratorSchema): NormalizedSchema {
  const name = 'util-' + names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];
  const autoScope = `scope:${options.directory}`
  if (!parsedTags.includes(autoScope)) {
    parsedTags.unshift(autoScope);
  }

  return {
    skipBabelrc: true,
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, _options: UtilLibGeneratorSchema) {
  const options = normalizeOptions(tree, _options);
  console.log(options.name)
  await libraryGenerator(tree, options)
  await formatFiles(tree);
}
