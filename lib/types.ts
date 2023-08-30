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
  default_price: string;
  metadata: {
    Stage: string;
  };
  name: string;
  price: number;
  description: string;
};
