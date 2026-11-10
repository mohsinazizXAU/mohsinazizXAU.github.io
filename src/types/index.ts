export type DrawerType = 'PROJECTS' | 'EXPERTISE' | 'ABOUT' | 'CONTACT' | null;

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  video: string;
  netlifyUrl: string;
}

export interface ToastMessage {
  id: string;
  text: string;
}
