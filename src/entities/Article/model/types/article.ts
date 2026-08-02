// entities/Article/model/types/article.ts
import { User } from "@/entities/User";

export enum ArticleSortField {
  CREATED = "createdAt",
  TITLE = "title",
  VIEWS = "views",
}

export enum ArticleBlockType {
  CODE = "CODE",
  IMAGE = "IMAGE",
  TEXT = "TEXT",
}

// ✅ Тип для перевода
export type TranslationText = {
  ru: string;
  en: string;
};

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: TranslationText; // ✅ было string, стало TranslationText
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: TranslationText; // ✅ было string[], стало TranslationText (объект с ru/en)
  title?: TranslationText; // ✅ было string, стало TranslationText
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock;

export enum ArticleType {
  IT = "IT",
  SCIENCE = "SCIENCE",
  ECONOMICS = "ECONOMICS",
  ALL = "ALL",
}

export enum ArticleView {
  BIG = "BIG",
  SMALL = "SMALL",
}

export interface Article {
  id: string;
  title: TranslationText; // ✅ было string, стало TranslationText
  subtitle: TranslationText; // ✅ было string, стало TranslationText
  user: User;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
