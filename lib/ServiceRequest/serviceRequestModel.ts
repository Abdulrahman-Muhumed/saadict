export type ServiceRequestFormData = {
  // Step 1
  fullName: string;
  companyName: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;

  // Step 2
  requestedService: string;
  projectMode: string;
  hasExistingSystem: string;

  // Step 3
  projectName: string;
  projectSummary: string;
  businessGoal: string;
  problemToSolve: string;
  targetUsers: string;
  referenceLinks: string;

  // Step 4
  needsAdminDashboard: boolean;
  needsAuthentication: boolean;
  needsPayments: boolean;
  needsApiIntegrations: boolean;
  needsMobileApp: boolean;
  needsMultilingual: boolean;
  needsAnalytics: boolean;
  needsFileUpload: boolean;
  selectedRequirements: string[];

  // Step 5
  desiredStartDate: string;
  desiredLaunchWindow: string;
  projectStage: string;
  hasBrandingReady: string;
  hasContentReady: string;
  hasTechnicalDocsReady: string;

  // Step 6
  budgetRange: string;
  engagementModel: string;
  needsOngoingSupport: string;

  // Step 7
  additionalNotes: string;
  preferredContactMethod: string;
  confirmAccuracy: boolean;
};

export const initialServiceRequestFormData: ServiceRequestFormData = {
  fullName: "",
  companyName: "",
  jobTitle: "",
  email: "",
  phone: "",
  country: "",

  requestedService: "",
  projectMode: "",
  hasExistingSystem: "",

  projectName: "",
  projectSummary: "",
  businessGoal: "",
  problemToSolve: "",
  targetUsers: "",
  referenceLinks: "",

  needsAdminDashboard: false,
  needsAuthentication: false,
  needsPayments: false,
  needsApiIntegrations: false,
  needsMobileApp: false,
  needsMultilingual: false,
  needsAnalytics: false,
  needsFileUpload: false,
  selectedRequirements: [],

  desiredStartDate: "",
  desiredLaunchWindow: "",
  projectStage: "",
  hasBrandingReady: "",
  hasContentReady: "",
  hasTechnicalDocsReady: "",

  budgetRange: "",
  engagementModel: "",
  needsOngoingSupport: "",

  additionalNotes: "",
  preferredContactMethod: "",
  confirmAccuracy: false,
};