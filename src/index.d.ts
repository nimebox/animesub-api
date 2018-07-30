type SearchData = {
  pages: number;
  page: number;
  json: { title: string; id: string; sh: string }[];
};
declare const animesub: {
  download: (id: string, sh: string) => Promise<File>;
  search: (title: string, titletype: string, page: number) => Promise<SearchData>;
};

export default animesub;
