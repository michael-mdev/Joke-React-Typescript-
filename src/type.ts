export type Category = string;

export type Joke = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
  categories: Array<Category>;
}

export type APIResult = {
  total: number;
  result: Array<Joke>;
}
