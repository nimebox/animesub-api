type SearchData = {
  pages: number;
  page: number;
  json: {
    title: string,
    added: string,
    format: string,
    user: string,
    description: string,
    id: string,
    sh: string
  }[];
};

type TitleType = 'org' | 'pl' | 'en';

declare const animesub: {
  download: (id: string, sh: string) => Promise<Buffer | ArrayBuffer>;
  search: (title: string, titletype: TitleType, page: number) => Promise<SearchData>;
};

export default animesub;
