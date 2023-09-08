import {
  FieldState,
  ImageField,
  RelationField,
  TitleField,
} from "@prismicio/types";
import { PostDocument } from "prismic-types";

export type PostDocumentWithAuthor = PostDocument & {
  data: {
    author: AuthorContentRelationshipField;
  };
};

export type AuthorContentRelationshipField = RelationField<
  "author",
  string,
  {
    name: TitleField;
    picture: ImageField;
  },
  FieldState
>;

export type StripeProduct = {
  defaultPrice: string;
  metadata: {
    Stage: string;
    Term: string;
    Ingredients: string;
  };
  name: string;
  price: number;
  description: string;
};
