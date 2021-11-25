export const API_HOST_KEY = 'API_HOST';
export const JWT_KEY = 'JWT';

export enum ProjectFieldType {
  All = '',
  Academic = 'academic',
  Social = 'social',
  Government = 'government',
  NewInnovation = 'newinnovation',
  Startup = 'startup',
}

export const ProjectFieldTypeLabel: { [key in ProjectFieldType]: string } = {
  [ProjectFieldType.All]: 'All',
  [ProjectFieldType.Academic]: 'Academic',
  [ProjectFieldType.Social]: 'Social',
  [ProjectFieldType.Government]: 'Government',
  [ProjectFieldType.NewInnovation]: 'New Innovation',
  [ProjectFieldType.Startup]: 'Startup / IT Industry',
};

export enum BlogCategoryType {
  All = '',
  Agile = 'agile',
  UIUX = 'uiux',
  Engineering = 'engineering',
  Deployment = 'idebaru',
  Team = 'team',
}

export const BlogCategoryTypeLabel: { [key in BlogCategoryType]: string } = {
  [BlogCategoryType.All]: 'All',
  [BlogCategoryType.Agile]: 'Agile',
  [BlogCategoryType.UIUX]: 'UI/UX',
  [BlogCategoryType.Engineering]: 'Engineering',
  [BlogCategoryType.Deployment]: 'Deployment',
  [BlogCategoryType.Team]: 'Team Dynamics',
};
