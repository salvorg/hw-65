export interface ApiPage {
  title: string;
  pageName: string;
  content: string;
}

export type Page = Omit<ApiPage, 'pageName'>

export interface ApiPagesList {
  [id: string]: ApiPage;
}