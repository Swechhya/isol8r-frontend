type FeatureEnvironemt = {
  name: string;
  dbType: string;
  createdBy: string;
  resource: Resource[];
};

interface Resource {
  appName: string;
  isAutoUpdate: Boolean;
  branchName: string;
}
